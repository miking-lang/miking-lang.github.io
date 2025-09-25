import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OverloadedOpDesugar  
  

  
  
  
## Semantics  
  

          <DocBlock title="desugarExpr" kind="sem">

```mc
sem desugarExpr : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem desugarExpr =
  | TmOverloadedOp x ->
    match unwrapType x.ty with TyArrow t then
      recursive let flattenArrow = lam acc. lam t.
        match unwrapType t with TyArrow t then flattenArrow (snoc acc t.from) t.to
        else snoc acc t
      in
      let types = map unwrapType (flattenArrow [t.from] t.to) in
      resolveOp x.info {params = init types, return = last types, op = x.op}
    else errorSingle [x.info] "Wrong type shape in desugarExpr"
```
</ToggleWrapper>
</DocBlock>

