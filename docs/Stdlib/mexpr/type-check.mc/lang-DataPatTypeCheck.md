import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckPat" kind="sem">

```mc
sem typeCheckPat : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckPat env patEnv =
  | PatCon t ->
    match mapLookup t.ident env.conEnv with Some (_, ty) then
      match inst t.info env.currentLvl ty with TyArrow {from = from, to = to} then
        match typeCheckPat env patEnv t.subpat with (patEnv, subpat) in
        unify env [infoPat subpat] from (tyPat subpat);
        (patEnv, PatCon {t with subpat = subpat, ty = to})
      else error "Invalid constructor type in typeCheckPat!"
    else
      let msg = join [
        "* Encountered an unbound constructor: ",
        nameGetStr t.ident, "\n",
        "* When type checking the pattern\n"
      ] in
      errorSingle [t.info] msg
```
</ToggleWrapper>
</DocBlock>

