import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TySeq x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TySeq")
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

