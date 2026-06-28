import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GenerateEqCon  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getEqFunction" kind="sem">

```mc
sem _getEqFunction : GenerateEq_GEqEnv -> Ast_Type -> (GenerateEq_GEqEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getEqFunction env =
  | ty & TyCon x ->
    -- TODO(vipa, 2025-01-27): Invalidate old eq functions if
    -- we've introduced constructors to pre-existing types
    match mapLookup x.ident env.conFunctions with Some n then (env, nvar_ n) else

    let fname = nameSym (concat "eq" (nameGetStr x.ident)) in
    let env = {env with conFunctions = mapInsert x.ident fname env.conFunctions} in

    -- TODO(vipa, 2025-01-27): We cannot see locally defined types
    -- here, which might be an issue
    let params = match mapLookup x.ident env.tcEnv.tyConEnv with Some (_, params, _)
      then params
      else errorSingle [x.info] (concat "Typecheck environment does not contain information about type " (nameGetStr x.ident)) in
    let paramFNames = foldl (lam acc. lam n. mapInsert n (nameSetNewSym n) acc) (mapEmpty nameCmp) params in
    let fullType = tyapps_ ty (map ntyvar_ (mapKeys paramFNames)) in
    let prevVarFunctions = env.varFunctions in
    let env = {env with varFunctions = mapUnion env.varFunctions paramFNames} in

    let constructors = mapIntersectWith
      (lam. lam pair. pair.1)
      (mapLookupOr (setEmpty nameCmp) x.ident env.tcEnv.conDeps)
      env.tcEnv.conEnv in

    let lName = nameSym "l" in
    let rName = nameSym "r" in
    let addMatch = lam acc. lam c. lam t.
      match acc with (env, tm) in
      match inst (infoTy t) 0 t with TyArrow {from = from, to = to} in
      let uni = emptyUnification () in
      match unifyPure uni to fullType with Some uni then
        match getEqFunction env t with (env, subf) in
        let subl = nameSym "subl" in
        let subr = nameSym "subr" in
        let tm = match_ (nvar_ lName) (npcon_ c (npvar_ subl))
          (match_ (nvar_ rName) (npcon_ c (npvar_ subr))
            (appf2_ subf (nvar_ subl) (nvar_ subr))
            false_)
          tm in
        (env, tm)
      else error "Unification should always be possible here" in
    match mapFoldWithKey addMatch (env, never_) constructors with (env, matchChain) in
    let matchChain = nulam_ lName (nulam_ rName matchChain) in
    let body = foldr (lam pname. lam body. nulam_ (mapFindExn pname paramFNames) body) matchChain params in

    let env = {env with varFunctions = prevVarFunctions, newFunctions = snoc env.newFunctions (fname, body)} in
    (env, nvar_ fname)
```
</ToggleWrapper>
</DocBlock>

