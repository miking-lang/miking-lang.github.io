import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmVar x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmVar")
    , ("ident", nameToJson x.ident)
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    , ("frozen", JsonBool x.frozen)
    ] )
```
</ToggleWrapper>
</DocBlock>

