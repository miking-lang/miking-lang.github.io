import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchTypeStream  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeStreamNext" kind="sem">

```mc
sem typeStreamNext : String -> TypeStreamInterface_TypeStreamContext -> TypeStreamInterface_TypeStreamNextResult
```



<ToggleWrapper text="Code..">
```mc
sem typeStreamNext name =
  | { stack = [TmMatch { target = target, thn = thn, els = els }] ++ stack } ->
    typeStreamNext name { stack = concat [target, thn, els] stack }
```
</ToggleWrapper>
</DocBlock>

