import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclLangTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclLang d ->
    let typeDecls = mapOption (lam d. match d with DeclType d then Some (DeclType d) else None ()) d.decls in
    let synDecls = mapOption (lam d. match d with DeclSyn d then Some (DeclSyn d) else None ()) d.decls in
    let semDeclTypes = mapOption (lam d. match d with DeclSem d then Some d else None ()) d.decls in

    match mapAccumL typeCheckDecl env typeDecls with (env, typeDecls) in
    match mapAccumL typeCheckDecl env synDecls with (env, synDecls) in
    match typeCheckSemDecls env semDeclTypes with (env, semDeclTypes) in


    let semDecls = map (lam x. DeclSem x) semDeclTypes in

    (env, DeclLang {d with decls = join [typeDecls, synDecls, semDecls]})
```
</ToggleWrapper>
</DocBlock>

