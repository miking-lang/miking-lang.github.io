import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BaseKindCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpKind" kind="sem">

```mc
sem cmpKind : _a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpKind =
  | (Mono (), Mono ()) -> 0
  | (Poly (), Poly ()) -> 0
```
</ToggleWrapper>
</DocBlock>

