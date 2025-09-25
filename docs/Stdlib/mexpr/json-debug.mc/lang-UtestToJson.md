import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestToJson  
  

DeclUtest \-\-

  
  
  
## Semantics  
  

          <DocBlock title="declToJson" kind="sem">

```mc
sem declToJson : Ast_Decl -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem declToJson =
  | DeclUtest x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "DeclUtest")
    , ("test", exprToJson x.test)
    , ("expected", exprToJson x.expected)
    , ("tusing", optToNull (optionMap exprToJson x.tusing))
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

