import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypePropagation  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateExpectedType" kind="sem">

```mc
sem propagateExpectedType : Map Name Ast_Type -> _a -> _a1
```



<ToggleWrapper text="Code..">
```mc
sem propagateExpectedType (tyEnv : Map Name Type) =
  | (_, t) -> t
```
</ToggleWrapper>
</DocBlock>

