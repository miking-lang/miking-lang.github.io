import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldExpr" kind="sem">

```mc
sem constantFoldExpr : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldExpr ctx =
  | TmDecl (x & {decl = DeclLet r}) ->
    let body = constantFoldExpr ctx r.body in
    if doPropagate body then
      let ctx = { ctx with env = evalEnvInsert r.ident body ctx.env } in
      constantFoldExpr ctx x.inexpr
    else
      TmDecl {x with decl = DeclLet {r with body = body}, inexpr = constantFoldExpr ctx x.inexpr}
```
</ToggleWrapper>
</DocBlock>

