import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | PatSeqEdge x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatSeqEdge")
    , ("prefix", JsonArray (map patToJson x.prefix))
    , ("middle", patNameToJson x.middle)
    , ("postfix", JsonArray (map patToJson x.postfix))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

