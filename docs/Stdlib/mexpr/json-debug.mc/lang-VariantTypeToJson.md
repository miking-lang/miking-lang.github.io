import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantTypeToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyVariant x -> JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyVariant")
    , ("constrs", JsonArray
      (map (lam x. JsonArray [nameToJson x.0, typeToJson x.1])
        (mapBindings x.constrs)))
    , ("info", infoToJson x.info)
    ] )
```
</ToggleWrapper>
</DocBlock>

