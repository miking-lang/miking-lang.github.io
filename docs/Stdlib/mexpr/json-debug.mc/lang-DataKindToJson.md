import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="kindToJson" kind="sem">

```mc
sem kindToJson : Ast_Kind -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem kindToJson =
  | Data x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "Data")
    , ("types",
      let inner = lam r. JsonObject (mapFromSeq cmpString
        [ ("lower", JsonArray (map nameToJson (setToSeq r.lower)))
        , ("upper", optToNull
          (optionMap (lam upper. JsonArray (map nameToJson (setToSeq upper)))
            r.upper))
        ] ) in
      JsonArray (map (lam x. JsonArray [nameToJson x.0, inner x.1])
        (mapBindings x.types)))
    ] )
```
</ToggleWrapper>
</DocBlock>

