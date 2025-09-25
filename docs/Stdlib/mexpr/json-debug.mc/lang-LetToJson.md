import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclLet x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclLet")
    , ("ident", nameToJson x.ident)
    , ("tyAnnot", typeToJson x.tyAnnot)
    , ("tyBody", typeToJson x.tyBody)
    , ("body", exprToJson x.body)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

