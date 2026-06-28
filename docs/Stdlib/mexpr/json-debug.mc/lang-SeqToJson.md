import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmSeq x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmSeq")
    , ("tms", JsonArray (map exprToJson x.tms))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

