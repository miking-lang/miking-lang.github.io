import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTypeStream  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeStreamNext" kind="sem">

```mc
sem typeStreamNext : String -> TypeStreamInterface_TypeStreamContext -> TypeStreamInterface_TypeStreamNextResult
```



<ToggleWrapper text="Code..">
```mc
sem typeStreamNext name =
  | { stack = [TmSeq { tms = tms }] ++ stack } ->

    typeStreamNext name { stack = concat tms stack }
```
</ToggleWrapper>
</DocBlock>

