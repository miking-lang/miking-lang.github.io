import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyData x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyData")
    , ("universe", JsonArray
      (map (lam x. JsonArray [nameToJson x.0, JsonArray (map nameToJson (setToSeq x.1))])
        (mapBindings x.universe)))
    , ("positive", JsonBool x.positive)
    , ("cons", JsonArray (map nameToJson (setToSeq x.cons)))
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

