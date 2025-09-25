import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangProgramToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="progToJson" kind="sem">

```mc
sem progToJson : _a -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem progToJson =
  | x -> JsonObject (mapFromSeq cmpString
    [ ("decls", JsonArray (map declToJson x.decls))
    , ("expr", exprToJson x.expr)
    ] )
```
</ToggleWrapper>
</DocBlock>

