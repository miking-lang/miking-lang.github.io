import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MonoKindToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="kindToJson" kind="sem">

```mc
sem kindToJson : Ast_Kind -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem kindToJson =
  | Mono _ -> JsonString "Mono"
```
</ToggleWrapper>
</DocBlock>

