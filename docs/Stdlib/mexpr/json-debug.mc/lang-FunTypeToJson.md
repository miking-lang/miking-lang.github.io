import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FunTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyArrow x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyArrow")
    , ("from", typeToJson x.from)
    , ("to", typeToJson x.to)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

