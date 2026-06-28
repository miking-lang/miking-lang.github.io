import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Desugar  
  

  
  
  
## Semantics  
  

          <DocBlock title="desugarExpr" kind="sem">

```mc
sem desugarExpr : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem desugarExpr =
  | tm -> smap_Expr_Expr desugarExpr tm
```
</ToggleWrapper>
</DocBlock>

