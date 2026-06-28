import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsToJson  
  

DeclRecLets \-\-

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclRecLets x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclRecLets")
    , ( "bindings"
      , let bindingToJson = lam b. JsonObject (mapFromSeq cmpString
          [ ("ident", nameToJson b.ident)
          , ("tyAnnot", typeToJson b.tyAnnot)
          , ("tyBody", typeToJson b.tyBody)
          , ("body", exprToJson b.body)
          , ("info", infoToJson b.info)
          ] ) in
        JsonArray (map bindingToJson x.bindings)
      )
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

