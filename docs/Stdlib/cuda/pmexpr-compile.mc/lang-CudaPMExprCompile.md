import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaPMExprCompile  
  

  
  
  
## Semantics  
  

          <DocBlock title="toCudaPMExpr" kind="sem">

```mc
sem toCudaPMExpr : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem toCudaPMExpr =
  | t -> generateKernelApplications t
```
</ToggleWrapper>
</DocBlock>

