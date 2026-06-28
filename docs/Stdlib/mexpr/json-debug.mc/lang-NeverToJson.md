import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NeverToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | TmNever x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TmNever")
    , ("ty", typeToJson x.ty)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

