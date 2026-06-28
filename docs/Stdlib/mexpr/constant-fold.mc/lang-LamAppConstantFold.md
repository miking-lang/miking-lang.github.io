import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamAppConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldExpr" kind="sem">

```mc
sem constantFoldExpr : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldExpr ctx =
  | TmApp (appr & {lhs = TmLam lamr}) ->
    let rhs = constantFoldExpr ctx appr.rhs in
    if doPropagate rhs then
      let ctx = { ctx with env = evalEnvInsert lamr.ident rhs ctx.env } in
      constantFoldExpr ctx lamr.body
    else
      TmApp {
        appr with
        lhs = smap_Expr_Expr (constantFoldExpr ctx) (TmLam lamr),
        rhs = rhs
      }
```
</ToggleWrapper>
</DocBlock>

