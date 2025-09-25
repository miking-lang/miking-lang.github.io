import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ApplyReprSubsts  
  

  
  
  
## Semantics  
  

          <DocBlock title="applyReprSubsts" kind="sem">

```mc
sem applyReprSubsts : TCEnv -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyReprSubsts env =
  | TySubst s ->
    match unwrapType (applyReprSubsts env s.arg) with TyRepr r then
      match mapLookup s.subst env.reptypes.reprEnv with Some subst then
        let pat = (wildToMeta env.currentLvl (setEmpty nameCmp) subst.pat).1 in
        let repr = (wildToMeta env.currentLvl (setEmpty nameCmp) subst.repr).1 in
        let combinedFromSubst = foldr ntyall_ (tytuple_ [pat, repr]) subst.vars in
        let combinedFromSubst = inst s.info env.currentLvl combinedFromSubst in
        let replacement = newvar env.currentLvl s.info in
        let combinedFromTy = tytuple_ [r.arg, replacement] in
        unify env [infoTy subst.pat, infoTy subst.repr, s.info] combinedFromSubst combinedFromTy;
        replacement
      else
        let msg = join [
          "* Encountered an unbound repr: ",
          nameGetStr s.subst, "\n",
          "* When substituting representations in a type\n"
        ] in
        errorSingle [s.info] msg
    else
      let msg = join [
        "* Encountered a substitution applied to a non-Repr type\n",
        "* When substituting representations in a type\n"
      ] in
      errorSingle [s.info] msg
  | TyAlias x -> TyAlias {x with content = applyReprSubsts env x.content}
  | TyAll x ->
    let newEnv = {env with tyVarEnv = mapInsert x.ident (env.currentLvl, x.kind) env.tyVarEnv} in
    TyAll { x with ty = applyReprSubsts newEnv x.ty }
  | ty -> smap_Type_Type (applyReprSubsts env) ty
```
</ToggleWrapper>
</DocBlock>

