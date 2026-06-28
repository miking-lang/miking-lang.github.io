import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyInt x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyInt")
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

