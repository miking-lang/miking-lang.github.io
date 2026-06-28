import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharPatToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | PatChar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatChar")
    , ("val", JsonString [x.val])
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

