import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypeStream  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeStreamNext" kind="sem">

```mc
sem typeStreamNext : String -> TypeStreamInterface_TypeStreamContext -> TypeStreamInterface_TypeStreamNextResult
```



<ToggleWrapper text="Code..">
```mc
sem typeStreamNext name =
      | { stack = [TmRecord { bindings = bindings }] ++ stack } ->
        typeStreamNext name { stack = concat (mapValues  bindings) stack }
      | { stack = [TmRecordUpdate { rec = rec, value = value }] ++ stack } ->
        typeStreamNext name { stack = concat [rec, value] stack }
```
</ToggleWrapper>
</DocBlock>

