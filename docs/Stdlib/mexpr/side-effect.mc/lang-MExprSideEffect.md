import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprSideEffect  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprHasSideEffectH" kind="sem">

```mc
sem exprHasSideEffectH : SideEffectEnv -> Bool -> Bool -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem exprHasSideEffectH env lambdaCounting acc =
  | TmVar t ->
    if acc then true
    else if and lambdaCounting (geqi (identArity env t.ident) 1) then false
    else identHasSideEffects env t.ident
  | TmApp t ->
    if acc then true
    else if exprHasSideEffectH env lambdaCounting false t.rhs then true
    else if lambdaCounting then
      let larity = exprArity env t.lhs in
      if leqi larity 1 then
        -- NOTE(larshum, 2022-02-01): If we find that the left-hand side has
        -- arity at most 1, we check whether the left-hand side argument
        -- contains side-effects while ignoring the lambda count.
        exprHasSideEffectH env false false t.lhs
      else false
    else exprHasSideEffectH env lambdaCounting false t.lhs
  | TmLam t ->
    if acc then true
    else if lambdaCounting then false
    else exprHasSideEffectH env lambdaCounting false t.body
  | TmConst t -> if acc then true else constHasSideEffect t.val
  | t -> if acc then true else sfold_Expr_Expr (exprHasSideEffectH env lambdaCounting) false t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprArity" kind="sem">

```mc
sem exprArity : SideEffectEnv -> Ast_Expr -> Int
```



<ToggleWrapper text="Code..">
```mc
sem exprArity (env : SideEffectEnv) =
  | TmVar t -> identArity env t.ident
  | TmApp t -> subi (exprArity env t.lhs) 1
  | TmLam t -> addi (exprArity env t.body) 1
  | TmConst t -> constArity t.val
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constructSideEffectEnv" kind="sem">

```mc
sem constructSideEffectEnv : Ast_Expr -> SideEffectEnv
```

<Description>{`Constructs a SideEffectEnv from a given expression 't', which can be used  
to determine whether any subexpression of 't' contains a side\-effect.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constructSideEffectEnv =
  | t -> constructSideEffectEnvH (sideEffectEnvEmpty ()) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constructSideEffectEnvH" kind="sem">

```mc
sem constructSideEffectEnvH : SideEffectEnv -> Ast_Expr -> SideEffectEnv
```



<ToggleWrapper text="Code..">
```mc
sem constructSideEffectEnvH (env : SideEffectEnv) =
  | TmDecl (x & {decl = DeclLet t}) ->
    let bodySideEffect = exprHasSideEffectH env false false t.body in
    let lambdaCount = countArityExpr 0 t.body in
    let env = updateSideEffectEnv env t.ident lambdaCount bodySideEffect in
    let env = constructSideEffectEnvH env t.body in
    constructSideEffectEnvH env x.inexpr
  | tm & TmDecl (x & {decl = DeclRecLets t}) ->
    -- NOTE(larshum, 2022-02-01): The call graph implementation stores bindings
    -- by name, not index, so we need to use a map for binding lookup.
    let bindMap : Map Name DeclLetRecord =
      mapFromSeq nameCmp
        (map (lam bind : DeclLetRecord. (bind.ident, bind)) t.bindings) in
    let sideEffectsScc = lam env : SideEffectEnv. lam scc : [Name].
      let sccBindings : [DeclLetRecord] =
        foldl
          (lam acc. lam id. optionMapOr acc (snoc acc) (mapLookup id bindMap))
          []
          scc
      in
      -- Determine whether the body of any binding within this strongly
      -- connected component contains side-effects. If we find any side-effect,
      -- we know they must all contain a side-effect as they can be called from
      -- each other.
      let sccHasSideEffect =
        foldl
          (lam acc : Bool. lam bind : DeclLetRecord.
            exprHasSideEffectH env false acc bind.body)
          false sccBindings in
      -- Update the entries for all the bindings in this SCC.
      foldl
        (lam env : SideEffectEnv. lam bind : DeclLetRecord.
          let lambdaCount = countArityExpr 0 bind.body in
          updateSideEffectEnv env bind.ident lambdaCount sccHasSideEffect)
      env sccBindings in
    let g : Digraph Name Int = constructCallGraph tm in
    let sccs = digraphTarjan g in
    let env = foldl sideEffectsScc env (reverse sccs) in
    let env =
      foldl
        (lam env : SideEffectEnv. lam bind : DeclLetRecord.
          constructSideEffectEnvH env bind.body)
        env t.bindings in
    constructSideEffectEnvH env x.inexpr
  | TmDecl (x & {decl = DeclExt t}) ->
    let lambdaCount = countArityType 0 t.tyIdent in
    let env = updateSideEffectEnv env t.ident lambdaCount t.effect in
    constructSideEffectEnvH env x.inexpr
  | t -> sfold_Expr_Expr constructSideEffectEnvH env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countArityExpr" kind="sem">

```mc
sem countArityExpr : Int -> Ast_Expr -> Int
```



<ToggleWrapper text="Code..">
```mc
sem countArityExpr (count : Int) =
  | TmLam t -> countArityExpr (addi count 1) t.body
  | _ -> count
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countArityType" kind="sem">

```mc
sem countArityType : Int -> Ast_Type -> Int
```



<ToggleWrapper text="Code..">
```mc
sem countArityType (count : Int) =
  | TyArrow t -> countArityType (addi count 1) t.to
  | _ -> count
```
</ToggleWrapper>
</DocBlock>

