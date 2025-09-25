import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordKindCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpKind" kind="sem">

```mc
sem cmpKind : _a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpKind =
  | (Record l, Record r) ->
    mapCmp cmpType l.fields r.fields
```
</ToggleWrapper>
</DocBlock>

