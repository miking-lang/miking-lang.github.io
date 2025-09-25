import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmRecord x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmRecord")
    , ("bindings", JsonObject
      (mapFromSeq cmpString
        (map (lam x. (sidToString x.0, exprToJson x.1))
          (mapBindings x.bindings))))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
  | TmRecordUpdate x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmRecordUpdate")
    , ("rec", exprToJson x.rec)
    , ("key", JsonString (sidToString x.key))
    , ("value", exprToJson x.value)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

