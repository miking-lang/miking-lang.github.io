import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpImplTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclOpImpl x ->
    match mapLookup x.ident env.varEnv with Some ty then
      if optionIsSome (mapLookup x.ident env.reptypes.opNamesInScope) then
        let newLvl = addi 1 env.currentLvl in
        let typeCheckBody = lam env.
          let newEnv = {env with currentLvl = newLvl} in
          let specTypeInfo = infoTy x.specType in
          let opTypeInfo = infoTy ty in
          -- NOTE(vipa, 2023-06-30): First we want to check that
          -- \\`specType\\` is a stricter version of the original op-decl's
          -- type, modulo wildcards. We instantiate the op-decl's type,
          -- strip \\`specType\\`, and unify the two.
          let ty = inst x.info newLvl ty in
          let ty = substituteNewReprs env ty in
          let specType = resolveType (infoTy x.specType) env false x.specType in
          let specType = substituteUnknown x.info newEnv (Poly ()) specType in
          let specType = inst x.info newLvl specType in
          let specType = substituteNewReprs env specType in
          let specType = (wildToMeta newLvl (setEmpty nameCmp) specType).1 in
          -- NOTE(vipa, 2023-07-03): This may do some unifications from
          -- substitutions, as a side-effect, so we do it here rather
          -- than later.
          let reprType = applyReprSubsts newEnv specType in
          unify newEnv [opTypeInfo, specTypeInfo] ty (removeReprSubsts specType);
          -- NOTE(vipa, 2023-06-30): Next we want to type-check the body
          -- of the impl against the strictest type signature we have
          -- available: \\`specType\\` after filling in wildcards and
          -- applying explicit repr substitutions. We get there by
          -- generalizing \\`reprType\\`, then stripping it.
          match gen env.currentLvl (mapEmpty nameCmp) reprType with (reprType, genVars) in
          match stripTyAll reprType with (vars, reprType) in
          let newTyVars = foldr (lam v. mapInsert v.0 (newLvl, v.1)) env.tyVarEnv vars in
          let newEnv = {env with currentLvl = newLvl, tyVarEnv = newTyVars} in
          match captureDelayedReprUnifications env
            (lam. typeCheckExpr newEnv (propagateTyAnnot (x.body, reprType)))
            with (body, delayedReprUnifications) in
          unify newEnv [specTypeInfo, infoTm body] reprType (tyTm body);

          -- NOTE(vipa, 2023-08-15): Later analysis requires that
          -- \\`specType\\` references the reprs that exist in the alt-body,
          -- thus we generalize it here
          match gen env.currentLvl (mapFromSeq nameCmp genVars) specType with (specType, _) in
          {x with body = body, delayedReprUnifications = delayedReprUnifications, specType = specType} in
        match withNewReprScope env (lam env. typeCheckBody env)
          with (x, reprScope, []) in
        ( env
        , DeclOpImpl
          { x with reprScope = reprScope
          , metaLevel = newLvl
          }
        )
      else
        let msg = join
          [ "* Encountered implementation of a non-operation: "
          , nameGetStr x.ident, "\n"
          , "* When type checking the expression\n"
          ] in
        errorSingle [x.info] msg
    else
      let msg = join [
        "* Encountered an unbound variable: ",
        nameGetStr x.ident, "\n",
        "* When type checking the expression\n"
      ] in
      errorSingle [x.info] msg
```
</ToggleWrapper>
</DocBlock>

