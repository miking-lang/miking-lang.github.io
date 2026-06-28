import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclRecLets t ->
    -- NOTE(aathn, 2024-05-24): This code assumes that each recursive let-binding
    -- is a syntactic lambda, so that generalization is always safe.
    let newLvl = addi 1 env.currentLvl in
    -- First: Generate a new environment containing the recursive bindings
    let recLetEnvIteratee = lam acc. lam b: DeclLetRecord.
      let tyAnnot = resolveType t.info env false b.tyAnnot in
      let tyAnnot = substituteNewReprs env tyAnnot in
      let tyBody = substituteUnknown t.info {env with currentLvl = newLvl} (Poly ()) tyAnnot in
      let newEnv = _insertVar b.ident tyBody acc.0 in
      let newTyVars = foldr (uncurry mapInsert) acc.1 (stripTyAll tyBody).0 in
      ((newEnv, newTyVars), {b with tyAnnot = tyAnnot, tyBody = tyBody})
    in
    match mapAccumL recLetEnvIteratee (env, mapEmpty nameCmp) t.bindings
    with ((recLetEnv, tyVars), bindings) in
    let newTyVarEnv =
      mapFoldWithKey (lam vs. lam v. lam k. mapInsert v (newLvl, k) vs) recLetEnv.tyVarEnv tyVars in
    let newEnv = {recLetEnv with currentLvl = newLvl, tyVarEnv = newTyVarEnv} in

    -- Second: Type check the body of each binding in the new environment
    let typeCheckBinding = lam b: DeclLetRecord.
      let body =
        let body = typeCheckExpr newEnv (propagateTyAnnot (b.body, b.tyAnnot)) in
        -- Unify the inferred type of the body with the annotated one
        unify newEnv [infoTy b.tyAnnot, infoTm body] (stripTyAll b.tyBody).1 (tyTm body);
        body
      in
      {b with body = body}
    in
    let bindings = map typeCheckBinding bindings in
    (if env.disableRecordPolymorphism then
       iter (lam b. disableRecordGeneralize env.currentLvl b.tyBody) bindings
     else ());

    -- Third: Produce a new environment with generalized types
    let envIteratee = lam acc. lam b : DeclLetRecord.
      match gen env.currentLvl acc.1 b.tyBody with (tyBody, vars) in
      let newEnv = _insertVar b.ident tyBody acc.0 in
      let newTyVars = foldr (uncurry mapInsert) acc.1 vars in
      ((newEnv, newTyVars), {b with tyBody = tyBody})
    in
    match mapAccumL envIteratee (env, tyVars) bindings with ((env, _), bindings) in
    ( env
    , DeclRecLets {t with bindings = bindings}
    )
```
</ToggleWrapper>
</DocBlock>

