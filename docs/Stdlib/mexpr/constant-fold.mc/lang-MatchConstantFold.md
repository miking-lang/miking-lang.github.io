import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldExpr" kind="sem">

```mc
sem constantFoldExpr : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldExpr ctx =
  | TmMatch r ->
    let target = constantFoldExpr ctx r.target in
    if isConstant target then
      match tryMatch ctx.env target r.pat with Some newEnv then
        constantFoldExpr { ctx with env = newEnv } r.thn
      else
        constantFoldExpr ctx r.els
    else
      let newEnv =
        match tryMatch (evalEnvEmpty ()) target r.pat with Some newEnv then
          evalEnvConcat (evalEnvFilter (lam x. isConstant x.1) newEnv) ctx.env
        else ctx.env
      in
      TmMatch {
        r with
        target = target,
        thn = constantFoldExpr { ctx with env = newEnv } r.thn,
        els = constantFoldExpr ctx r.els
      }
```
</ToggleWrapper>
</DocBlock>

