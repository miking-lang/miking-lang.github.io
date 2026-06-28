import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyApp x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyApp")
    , ("lhs", typeToJson x.lhs)
    , ("rhs", typeToJson x.rhs)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

