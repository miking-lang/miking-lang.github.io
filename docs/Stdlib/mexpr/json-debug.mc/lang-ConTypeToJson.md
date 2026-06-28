import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyCon x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyCon")
    , ("ident", nameToJson x.ident)
    , ("data", typeToJson x.data)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

