import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AliasTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyAlias x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyAlias")
    , ("display", typeToJson x.display)
    , ("content", typeToJson x.content)
    ] )
```
</ToggleWrapper>
</DocBlock>

