import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataToJson  
  

DeclConDef \-\-

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclConDef x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclConDef")
    , ("ident", nameToJson x.ident)
    , ("tyIdent", typeToJson x.tyIdent)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

