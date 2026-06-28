import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtToJson  
  

DeclExt \-\-

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclExt x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclExt")
    , ("ident", nameToJson x.ident)
    , ("tyIdent", typeToJson x.tyIdent)
    , ("effect", JsonBool x.effect)
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

