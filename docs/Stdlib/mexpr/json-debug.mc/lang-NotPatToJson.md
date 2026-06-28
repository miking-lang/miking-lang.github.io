import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NotPatToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="patToJson" kind="sem">

```mc
sem patToJson : Ast_Pat -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem patToJson =
  | PatNot x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "PatNot")
    , ("subpat", patToJson x.subpat)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

