import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="apply" kind="sem">

```mc
sem apply : Eval_EvalCtx -> Info -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem apply ctx info =
  | (TmClos t, arg) ->
    eval {ctx with env = evalEnvInsert t.ident arg (t.env ())} t.body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmLam t ->
    TmClos {ident = t.ident, body = t.body, env = lam. ctx.env, info = t.info}
  | TmClos t -> TmClos t
```
</ToggleWrapper>
</DocBlock>

