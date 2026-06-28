import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SpecializeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmSpecialize {e: Expr, info: Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isKeyword" kind="sem">

```mc
sem isKeyword : Ast_Expr -> Bool
```

<Description>{`States that the new terms are indeed mapping from keywords`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isKeyword =
  | TmSpecialize _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchKeywordString" kind="sem">

```mc
sem matchKeywordString : Info -> String -> Option (Int, [Ast_Expr] -> Ast_Expr)
```

<Description>{`Defines the new mapping from keyword to new terms`}</Description>


<ToggleWrapper text="Code..">
```mc
sem matchKeywordString (info: Info) =
  | "specialize" -> Some (1, lam lst. TmSpecialize {e = get lst 0,
                                          info = info})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmSpecialize t -> tyTm t.e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmSpecialize t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType (ty : Type) =
  | TmSpecialize t -> TmSpecialize {t with e = withType ty t.e}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr (env : TCEnv) =
  | TmSpecialize t ->
    let e = typeCheckExpr env t.e in
    TmSpecialize {t with e = e}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | TmSpecialize t ->
    match f acc t.e with (acc, e) in
    (acc, TmSpecialize {t with e = e})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```

<Description>{`Equality of the new terms`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmSpecialize r ->
    match lhs with TmSpecialize l then
      eqExprH env free l.e r.e
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval (ctx : EvalCtx) =
  | TmSpecialize e ->
    switch eval ctx e.e
    case clos & TmClos _ then
      let res = use MExprPEval in peval clos in
        match res with TmLam _ then
          eval (evalCtxEmpty ()) res -- TmClos ...
        else res
    case x then x
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isAtomic" kind="sem">

```mc
sem isAtomic : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isAtomic =
  | TmSpecialize _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCode" kind="sem">

```mc
sem pprintCode : Int -> PprintEnv -> Ast_Expr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCode (indent : Int) (env : PprintEnv) =
  | TmSpecialize t ->
    match printParen indent env t.e with (env, e) in
    (env, join ["specialize", pprintNewline indent , e])
```
</ToggleWrapper>
</DocBlock>

