import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PatNameCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatName" kind="sem">

```mc
sem cmpPatName : _a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatName =
  | (PName l, PName r) -> nameCmp l r
  | (PName _, PWildcard _) -> 1
  | (PWildcard _, PName _) -> negi 1
  | _ -> 0
```
</ToggleWrapper>
</DocBlock>

