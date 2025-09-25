import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MetaVarToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeToJson" kind="sem">

```mc
sem typeToJson : Ast_Type -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem typeToJson =
  | TyMetaVar x ->
    let contents = switch deref x.contents
      case Unbound u then
        JsonObject (mapFromSeq cmpString
          [ ("ident", nameToJson u.ident)
          , ("level", JsonInt u.level)
          , ("kind", kindToJson u.kind)
          ])
      case Link ty then
        typeToJson ty
      end in
    JsonObject (mapFromSeq cmpString
    [ ("con", JsonString "TyMetaVar")
    , ("contents", contents)
    ] )
```
</ToggleWrapper>
</DocBlock>

