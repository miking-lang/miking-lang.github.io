import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordKindToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="kindToJson" kind="sem">

```mc
sem kindToJson : Ast_Kind -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem kindToJson =
  | Record x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "Record")
    , ("bindings", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, typeToJson x.1))
          (mapBindings x.fields))))
    ] )
```
</ToggleWrapper>
</DocBlock>

