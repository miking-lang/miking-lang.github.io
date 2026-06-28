import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | PatNamed x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatNamed")
    , ("ident", patNameToJson x.ident)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

