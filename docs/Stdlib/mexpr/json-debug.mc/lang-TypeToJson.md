import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeToJson  
  

DeclType \-\-

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclType x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclType")
    , ("ident", nameToJson x.ident)
    , ("params", JsonArray (map nameToJson x.params))
    , ("tyIdent", typeToJson x.tyIdent)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

