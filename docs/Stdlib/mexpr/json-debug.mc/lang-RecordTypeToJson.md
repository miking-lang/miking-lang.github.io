import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyRecord x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyRecord")
    , ("fields", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, typeToJson x.1))
          (mapBindings x.fields))))
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

