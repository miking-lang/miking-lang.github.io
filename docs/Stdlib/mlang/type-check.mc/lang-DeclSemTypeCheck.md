import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclSemTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckSemDecls" kind="sem">

```mc
sem typeCheckSemDecls : TCEnv -> [SemDeclAst_DeclSemType] -> (TCEnv, [SemDeclAst_DeclSemType])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem typeCheckSemDecls env =
  | sems ->
    -- First: Generate a new environment a type variable for each semantic
    -- function.
    let semIteratee = lam acc. lam t : DeclSemType.
      let tyAnnot = resolveType t.info env false t.tyAnnot in
      let tyAnnot = substituteNewReprs env tyAnnot in
      let tyBody = substituteUnknown t.info {env with currentLvl = 0} (Poly ()) tyAnnot in
      let newEnv = _insertVar t.ident tyBody acc.0 in
      let newTyVars = foldr (uncurry mapInsert) acc.1 (stripTyAll tyBody).0 in
      ((newEnv, newTyVars), {t with tyAnnot = tyAnnot, tyBody = tyBody})
    in
    match mapAccumL semIteratee (env, mapEmpty nameCmp) sems
    with ((recLetEnv, tyVars), sems) in

    let newTyVarEnv =
      mapFoldWithKey (lam vs. lam v. lam k. mapInsert v (0, k) vs) recLetEnv.tyVarEnv tyVars in
    let newEnv = {recLetEnv with currentLvl = 0, tyVarEnv = newTyVarEnv} in

    -- Second: Type check the body of each binding in the new environment
    let typeCheckCase
      : Type -> TCEnv -> {pat : Pat, thn : Expr} -> {pat : Pat, thn : Expr}
      = lam targetTy. lam env. lam c : {pat : Pat, thn : Expr}.
      match typeCheckPat env (mapEmpty nameCmp) c.pat with (patEnv, pat) in
      let env = {env with varEnv = mapUnion env.varEnv patEnv} in
      unify env [NoInfo (), NoInfo ()] (tyPat pat) targetTy;
      let thn = typeCheckExpr env c.thn in
      {pat = pat, thn = thn}
    in

    let typeCheckSem = lam env : TCEnv. lam semType : DeclSemType.
      match semType.args with Some args in

      let insertArg : TCEnv -> {ident : Name, tyAnnot : Type} -> (TCEnv, Type) =
        lam env. lam a.

        let resultTy = substituteUnknown (NoInfo ()) env (Mono ()) a.tyAnnot in
        let resultEnv = _insertVar a.ident resultTy env in
        (resultEnv, resultTy)
      in

      match mapAccumL insertArg env args with (env, tyParams) in

      let targetTy = newmetavar (Mono ()) 2 (NoInfo ())  in

      let cases = map (lam c. typeCheckCase targetTy env c) semType.cases in

      let headThn = (head cases).thn in
      iter (lam c. unify env [NoInfo (), NoInfo ()] (tyTm headThn) (tyTm c.thn)) (tail cases);

      let resultTy = tyarrow_ targetTy (tyTm headThn) in
      let resultTy = foldr tyarrow_ resultTy tyParams in
      (env, {semType with cases = cases, tyBody = resultTy})
    in
    match mapAccumL typeCheckSem newEnv sems with (newEnv, sems) in

    let envIteratee = lam acc. lam s.
      match gen env.currentLvl acc.1 s.tyBody with (tyBody, vars) in
      let newEnv = _insertVar s.ident tyBody acc.0 in
      let newTyVars = foldr (uncurry mapInsert) acc.1 vars in
      ((newEnv, newTyVars), {s with tyBody = tyBody})
    in
    match mapAccumL envIteratee (env, tyVars) sems with ((env, _), sems) in

    (env, sems)
```
</ToggleWrapper>
</DocBlock>

