import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyAll x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyAll")
    , ("ident", nameToJson x.ident)
    , ("kind", kindToJson x.kind)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

