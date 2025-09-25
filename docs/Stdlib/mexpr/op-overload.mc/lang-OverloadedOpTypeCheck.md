import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OverloadedOpTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmOverloadedOp x ->
    let types = opMkTypes x.info env x.op in
    let ty = tyarrows_ (snoc types.params types.return) in
    TmOverloadedOp {x with ty = ty}
```
</ToggleWrapper>
</DocBlock>

