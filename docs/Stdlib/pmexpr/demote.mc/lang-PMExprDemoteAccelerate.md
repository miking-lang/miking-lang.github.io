import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemoteAccelerate  
  

  
  
  
## Semantics  
  

          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | TmAccelerate t -> demoteParallel t.e
```
</ToggleWrapper>
</DocBlock>

