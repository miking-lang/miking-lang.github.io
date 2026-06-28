import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# GeneratePprintCon  
  

  
  
  
## Semantics  
  

          <DocBlock title="_getPprintFunction" kind="sem">

```mc
sem _getPprintFunction : GeneratePprint_GPprintEnv -> Ast_Type -> (GeneratePprint_GPprintEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem _getPprintFunction env =
  | ty & TyCon x ->
    -- TODO(vipa, 2025-01-27): Invalidate old pprint functions if
    -- we've introduced constructors to pre-existing types
    match mapLookup x.ident env.conFunctions with Some n then (env, nvar_ n) else

    let fname = nameSym (concat "pprint" (nameGetStr x.ident)) in
    let env = {env with conFunctions = mapInsert x.ident fname env.conFunctions} in

    -- TODO(vipa, 2025-01-27): We cannot see locally defined types
    -- here, which might be an issue
    let params = match mapLookup x.ident env.tcEnv.tyConEnv with Some (_, params, _)
      then params
      else errorSingle [x.info] (concat "Typecheck environment does not contain information about type " (nameGetStr x.ident)) in
    let paramFNames = foldl (lam acc. lam n. mapInsert n (nameSetNewSym n) acc) (mapEmpty nameCmp) params in

    let constructors = mapIntersectWith
      (lam. lam pair. pair.1)
      (mapLookupOr (setEmpty nameCmp) x.ident env.tcEnv.conDeps)
      env.tcEnv.conEnv in

    let fullType = tyapps_ ty (map ntyvar_ (mapKeys paramFNames)) in
    let prevVarFunctions = env.varFunctions in
    let env = {env with varFunctions = mapUnion env.varFunctions paramFNames} in

    let targetName = nameSym "_target" in
    let addMatch = lam acc. lam c. lam t.
      match acc with (env, tm) in
      match inst (infoTy t) 0 t with TyArrow {from = from, to = to} in
      let uni = emptyUnification () in
      match unifyPure uni to fullType with Some uni then
        let from = pureApplyUniToType uni from in
        match getPprintFunction env from with (env, subf) in
        let sub = nameSym "x" in
        let tm = match_ (nvar_ targetName) (npcon_ c (npvar_ sub))
          (cons_ (char_ '(') (snoc_ (concat_ (str_ (pprintConString (nameGetStr c))) (cons_ (char_ ' ') (app_ subf (nvar_ sub)))) (char_ ')')))
          tm in
        (env, tm)
      else error "Unification should always be possible here" in
    match mapFoldWithKey addMatch (env, str_ (join ["<missing case for ", nameGetStr x.ident, ">"])) constructors with (env, matchChain) in
    let matchChain = nulam_ targetName matchChain in
    let body = foldr (lam pname. lam body. nulam_ (mapFindExn pname paramFNames) body) matchChain params in

    let env = {env with varFunctions = prevVarFunctions, newFunctions = snoc env.newFunctions (fname, body)} in
    (env, nvar_ fname)
```
</ToggleWrapper>
</DocBlock>

