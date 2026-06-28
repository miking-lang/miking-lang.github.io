import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntPatToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | PatInt x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatInt")
    , ("val", JsonInt x.val)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

