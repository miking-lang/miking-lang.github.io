import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarConstantFold  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldExpr" kind="sem">

```mc
sem constantFoldExpr : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldExpr ctx =
  | TmVar r ->
    match evalEnvLookup r.ident ctx.env with Some t then t
    else TmVar r
```
</ToggleWrapper>
</DocBlock>

