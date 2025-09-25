import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnknownTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyUnknown x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyUnknown")
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

