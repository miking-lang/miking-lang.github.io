import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IndependentAst  
  

Independency annotation

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmIndependent {lhs : Expr,
                   rhs : Expr,
                   info: Info,
                   ty : Type}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="stripTuneAnnotations" kind="sem">

```mc
sem stripTuneAnnotations : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem stripTuneAnnotations =
  | TmIndependent t -> t.lhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isKeyword" kind="sem">

```mc
sem isKeyword : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isKeyword =
  | TmIndependent _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchKeywordString" kind="sem">

```mc
sem matchKeywordString : Info -> String -> Option (Int, [Ast_Expr] -> Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem matchKeywordString (info : Info) =
  | "independent" -> Some (2, lam lst.
    let e1 = get lst 0 in
    let e2 = get lst 1 in
    TmIndependent {lhs = e1, rhs = e2, info = info, ty = tyTm e1})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmIndependent t ->
    normalizeName (lam l.
      normalizeName (lam r.
        k (TmIndependent {{t with lhs = l}
                             with rhs = r})
        )
      t.rhs)
    t.lhs
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
  | TmIndependent {info = info} -> info
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
  | TmIndependent {ty = ty} -> ty
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
  | TmIndependent t -> TmIndependent {t with ty = ty}
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
  | TmIndependent t ->
    match f acc t.lhs with (acc, lhs) then
      match f acc t.rhs with (acc, rhs) then
        (acc, TmIndependent {{t with lhs = lhs} with rhs = rhs})
      else never
    else never
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
  | TmIndependent t ->
    match printParen indent env t.lhs with (env, lhs) in
    let aindent = pprintIncr indent in
    match printParen aindent env t.rhs with (env, rhs) in
    (env, join ["independent ", lhs, pprintNewline aindent, rhs])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr (env: TCEnv) =
  | TmIndependent t ->
    let lhs = typeCheckExpr env t.lhs in
    let rhs = typeCheckExpr env t.rhs in
    TmIndependent {{{t with lhs = lhs}
                       with rhs = rhs}
                       with ty = tyTm lhs}
```
</ToggleWrapper>
</DocBlock>

