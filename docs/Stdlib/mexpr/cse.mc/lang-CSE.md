import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CSE  
  

  
  
  
## Semantics  
  

          <DocBlock title="insertSubexpressionDeclarations" kind="sem">

```mc
sem insertSubexpressionDeclarations : CSEApplyEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem insertSubexpressionDeclarations (env : CSEApplyEnv) =
  | t /- : Expr -/ ->
    optionGetOrElse
      (lam. t)
      (optionMap
        (lam exprs : [(Name, Expr)].
          foldl
            (lam acc. lam namedExpr : (Name, Expr).
              match namedExpr with (id, e) then
                TmDecl
                { decl = DeclLet
                  { ident = id
                  , tyAnnot = tyTm e
                  , tyBody = tyTm e
                  , body = e
                  , info = infoTm e
                  }
                , ty = tyTm acc
                , info = infoTm e
                , inexpr = acc
                }
              else never)
            t
            exprs)
        (mapLookup env.index env.posToSubexpr))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseCount" kind="sem">

```mc
sem cseCount : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseCount (pos : ProgramPos) (env : CSESearchEnv) =
  | t ->
    let opt = mapLookup t env.subexprs in
    let env =
      match opt with None () then
        -- Subexpression found for the first time
        {env with subexprs = mapInsert t (Once pos) env.subexprs}
      else match opt with Some (Once prevPos | Multiple prevPos) then
        -- Subexpression found at least once
        let newPos = Multiple (programPosLCP prevPos pos) in
        {env with subexprs = mapInsert t newPos env.subexprs}
      else never
    in
    sfold_Expr_Expr (cseSearch pos) env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseSearchH" kind="sem">

```mc
sem cseSearchH : ProgramPos -> CSESearchEnv -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearchH (pos : ProgramPos) (env : CSESearchEnv) =
  | t -> sfold_Expr_Expr (cseSearch pos) env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseSearch" kind="sem">

```mc
sem cseSearch : [PosIndex] -> {index: Int, subexprs: Map Ast_Expr ExprStatus, recursiveIdents: Set Name} -> Ast_Expr -> CSESearchEnv
```



<ToggleWrapper text="Code..">
```mc
sem cseSearch (pos : ProgramPos) (env : CSESearchEnv) =
  | t -> cseSearchH pos {env with index = addi env.index 1} t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseReplace" kind="sem">

```mc
sem cseReplace : CSEApplyEnv -> Ast_Expr -> (CSEApplyEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem cseReplace (env : CSEApplyEnv) =
  | t ->
    match mapLookup t env.exprIdent with Some ident then
      (env, TmVar {ident = ident, ty = tyTm t, info = infoTm t, frozen = false})
    else smapAccumL_Expr_Expr cseApply env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseApplyH" kind="sem">

```mc
sem cseApplyH : CSEApplyEnv -> Ast_Expr -> (CSEApplyEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem cseApplyH (env : CSEApplyEnv) =
  | t -> smapAccumL_Expr_Expr cseApply env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cseApply" kind="sem">

```mc
sem cseApply : CSEApplyEnv -> Ast_Expr -> (CSEApplyEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem cseApply (env : CSEApplyEnv) =
  | t -> cseApplyH {env with index = addi env.index 1} t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cse" kind="sem">

```mc
sem cse : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem cse =
  | t ->
    let emptySearchEnv = {
      index = 0,
      subexprs = mapEmpty cmpExpr,
      recursiveIdents = setEmpty nameCmp
    } in
    let initialApplyEnv = {
      index = 0,
      posToSubexpr = mapEmpty subi,
      exprIdent = mapEmpty cmpExpr
    } in
    let searchEnv : CSESearchEnv = cseSearch [] emptySearchEnv t in
    let applyEnv : CSEApplyEnv =
      foldl
        (lam applyEnv : CSEApplyEnv. lam exprEntry : (Expr, ExprStatus).
          -- Ignore expressions that are only used once.
          match exprEntry with (_, Once _) then applyEnv
          else match exprEntry with (expr, Multiple pos) then
            let tempId = nameSym "t" in
            let index = match pos with _ ++ [x] then x else 0 in
            let posToSubexpr = mapInsertWith concat index [(tempId, expr)]
                                             applyEnv.posToSubexpr in
            {{applyEnv with posToSubexpr = posToSubexpr}
                       with exprIdent = mapInsert expr tempId applyEnv.exprIdent}
          else never)
        initialApplyEnv
        (mapBindings searchEnv.subexprs) in
    match cseApply applyEnv t with (env, t) then
      insertSubexpressionDeclarations applyEnv t
    else never
```
</ToggleWrapper>
</DocBlock>

