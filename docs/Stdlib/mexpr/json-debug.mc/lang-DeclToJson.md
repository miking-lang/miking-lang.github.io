import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclToJson  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprToJson" kind="sem">

```mc
sem exprToJson : Ast_Expr -> JsonValue
```



<ToggleWrapper text="Code..">
```mc
sem exprToJson =
  | tm & TmDecl x ->
    recursive let work = lam acc. lam tm.
      match tm with TmDecl x
      then work (snoc acc x.decl) x.inexpr
      else (acc, tm) in
    match work [] tm with (decls, inexpr) in
    JsonObject (mapFromSeq cmpString
      [ ("con", JsonString "TmDecl (merged)")
      , ("decls", JsonArray (map declToJson decls))
      , ("inexpr", exprToJson inexpr)
      , ("ty", typeToJson x.ty)
      , ("info", infoToJson x.info)
      ] )
```
</ToggleWrapper>
</DocBlock>

