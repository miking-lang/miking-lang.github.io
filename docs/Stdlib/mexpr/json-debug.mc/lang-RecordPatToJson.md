import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | PatRecord x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatRecord")
    , ("bindings", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, patToJson x.1))
          (mapBindings x.bindings))))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

