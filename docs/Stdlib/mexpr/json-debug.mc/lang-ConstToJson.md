import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmConst x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmConst")
    , ("const", JsonString (getConstStringCode 0 x.val))
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

