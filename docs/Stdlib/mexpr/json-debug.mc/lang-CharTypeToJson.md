import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyChar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyChar")
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

