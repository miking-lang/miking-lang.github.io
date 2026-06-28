import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PolyKindToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="kindToJson" kind="sem">

```mc
sem kindToJson : Ast_Kind -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem kindToJson =
  | Poly _ -> JsonString "Poly"
```
</ToggleWrapper>
</DocBlock>

