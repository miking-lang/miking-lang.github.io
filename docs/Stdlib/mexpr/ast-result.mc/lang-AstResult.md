import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AstResult  
  

  
  
  
## Semantics  
  

          <DocBlock title="smapAccumL_ResultM_Expr_Expr" kind="sem">

```mc
sem smapAccumL_ResultM_Expr_Expr : all w. all e. all a. (a -> Ast_Expr -> (a, Result w e Ast_Expr)) -> a -> Ast_Expr -> (a, Result w e Ast_Expr)
```

<Description>{`Perform a computation on the immediate sub\-expressions of an expression,  
while simultaneously threading an accumulator. Produces a non\-error only if  
all individual computations produce a non\-error. Preserves all errors and  
warningsNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_ResultM_Expr_Expr f acc =
  | e ->
    let withAnnot = result.withAnnotations in
    let consume = result.consume in
    let ok = result.ok in
    let inner = lam acc. lam e.
      match acc with (annot, a) in
      match f a e with (a, res) in
      let e = match consume res with (_, Right e) then e else e in
      ((withAnnot res annot, a), e)
    in
    match smapAccumL_Expr_Expr inner (ok (), acc) e
      with ((annot, acc), e)
    in
    (acc, withAnnot annot (ok e))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_ResultM_Expr_Expr" kind="sem">

```mc
sem smap_ResultM_Expr_Expr : all w. all e. (Ast_Expr -> Result w e Ast_Expr) -> Ast_Expr -> Result w e Ast_Expr
```

<Description>{`Perform a computation on the the immediate sub\-expressions of an  
expression. Produces a non\-error only if all individual computations  
produce a non\-error. Preserves all errors and warnings.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_ResultM_Expr_Expr f =| e ->
    (smapAccumL_ResultM_Expr_Expr (lam. lam e. ((), f e)) () e).1
```
</ToggleWrapper>
</DocBlock>

