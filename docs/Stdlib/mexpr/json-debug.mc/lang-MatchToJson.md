import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmMatch x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmMatch")
    , ("target", exprToJson x.target)
    , ("pat", patToJson x.pat)
    , ("thn", exprToJson x.thn)
    , ("els", exprToJson x.els)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

