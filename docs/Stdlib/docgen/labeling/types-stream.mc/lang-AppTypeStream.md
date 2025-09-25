import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeStream  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeStreamNext" kind="sem">

```mc
sem typeStreamNext : String -> TypeStreamInterface_TypeStreamContext -> TypeStreamInterface_TypeStreamNextResult
```



<ToggleWrapper text="Code..">
```mc
sem typeStreamNext name =
  | { stack = [TmApp { lhs = lhs, rhs = rhs }] ++ stack } ->

    typeStreamNext name { stack = concat [lhs, rhs] stack }
```
</ToggleWrapper>
</DocBlock>

