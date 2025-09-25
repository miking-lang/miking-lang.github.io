import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmLam x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmLam")
    , ("ident", nameToJson x.ident)
    , ("tyAnnot", typeToJson x.tyAnnot)
    , ("tyParam", typeToJson x.tyParam)
    , ("body", exprToJson x.body)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

