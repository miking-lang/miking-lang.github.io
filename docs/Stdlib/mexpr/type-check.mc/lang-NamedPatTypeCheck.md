import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckPat" kind="sem">

```mc
sem typeCheckPat : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckPat env patEnv =
  | PatNamed t ->
    match t.ident with PName n then
      match mapLookup n patEnv with Some ty then
        (patEnv, PatNamed {t with ty = ty})
      else
        let patTy = newpolyvar env.currentLvl t.info in
        (mapInsert n patTy patEnv, PatNamed {t with ty = patTy})
    else
      (patEnv, PatNamed {t with ty = newpolyvar env.currentLvl t.info})
```
</ToggleWrapper>
</DocBlock>

