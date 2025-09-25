import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclSynTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclSyn d ->
    -- We add a tyConEnv to the env if this is the base syn definition.
    let env = if null d.includes then
      {env with tyConEnv = mapInsert d.ident (0, d.params, tyvariant_ []) env.tyConEnv}
    else
      env
    in

    let typeCheckDef = lam env. lam def.
      let tyIdent = resolveType d.info env false def.tyIdent in
      let tyArrow = TyArrow {from = tyIdent, to = ntycon_ d.ident, info = d.info} in
      let env = {env with conEnv = mapInsert def.ident (0, tyArrow) env.conEnv} in
      (env, {def with tyIdent = tyIdent})
    in

    match mapAccumL typeCheckDef env d.defs with (env, defs) in
    (env, DeclSyn {d with defs = defs})
```
</ToggleWrapper>
</DocBlock>

