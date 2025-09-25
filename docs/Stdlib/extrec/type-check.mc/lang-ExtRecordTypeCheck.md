import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecordTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="_lookupTydeps" kind="sem">

```mc
sem _lookupTydeps : TCEnv -> Name -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _lookupTydeps env =
  | ident ->
    match mapLookup ident env.extRecordType.tyDeps with Some deps then deps
    else error "Tydeps not found!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_inspectTyWithinAlias" kind="sem">

```mc
sem _inspectTyWithinAlias : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _inspectTyWithinAlias =
  | TyAlias {content = content} -> _inspectTyWithinAlias content
  | TyApp t -> _inspectTyWithinAlias t.lhs
  | ty -> ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_wrapWithParams" kind="sem">

```mc
sem _wrapWithParams : _a -> Ast_Type -> [Name] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem _wrapWithParams env ty =
  | [] ->
    ty
  | [h] ++ t ->
    let var = newnmetavar (nameGetStr h) (Mono ()) env.currentLvl (NoInfo ()) in
    _wrapWithParams env (tyapp_ ty var) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_relevantExtensions" kind="sem">

```mc
sem _relevantExtensions : TCEnv -> Name -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _relevantExtensions env =
  | ident ->
    let tydeps = _lookupTydeps env ident in

    let f = lam extSet. lam tyIdent.
        never
    in
    setFold f (setEmpty nameCmp) tydeps
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_get_bounds" kind="sem">

```mc
sem _get_bounds : Name -> Ast_Kind -> {lower: Set Name, upper: Option (Set Name)}
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _get_bounds name =
  | Data {types = types} ->
    match mapLookup name types with Some bounds in bounds
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_update_bounds" kind="sem">

```mc
sem _update_bounds : Name -> {lower: Set Name, upper: Option (Set Name)} -> Ast_Kind -> Ast_Kind
```



<ToggleWrapper text="Code..">
```mc
sem _update_bounds name bound =
  | Data k ->
    Data {k with types = mapInsert name bound k.types}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_dump_datakind" kind="sem">

```mc
sem _dump_datakind : Ast_Kind -> ()
```



<ToggleWrapper text="Code..">
```mc
sem _dump_datakind =
  | Data k ->
    let str = strJoin "\n" (map _dump_bounds (mapValues k.types)) in
    printLn str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_dump_bounds" kind="sem">

```mc
sem _dump_bounds : {lower: Set Name, upper: Option (Set Name)} -> String
```



<ToggleWrapper text="Code..">
```mc
sem _dump_bounds =
  | t ->
    let lowerStr = strJoin ", " (map nameGetStr (setToSeq t.lower)) in
    let upperStr = match t.upper with Some s
                   then strJoin ", " (map nameGetStr (setToSeq s))
                   else "∅" in
    join ["lower = ", lowerStr, "; upper = ", upperStr]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_extend_upper_bound" kind="sem">

```mc
sem _extend_upper_bound : Name -> Name -> Ast_Kind -> Ast_Kind
```



<ToggleWrapper text="Code..">
```mc
sem _extend_upper_bound tyName fieldName =
  | Data k ->
    match mapLookup tyName k.types with Some {lower = lower, upper = upper} in
    let newUpper = match upper with Some s
                   then setInsert fieldName s
                   else setSingleton nameCmp fieldName in
    Data {k with types = mapInsert tyName {lower = lower, upper = Some newUpper} k.types}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_extend_lower_bound" kind="sem">

```mc
sem _extend_lower_bound : Name -> Name -> Ast_Kind -> Ast_Kind
```



<ToggleWrapper text="Code..">
```mc
sem _extend_lower_bound tyName fieldName =
  | Data k ->
    match mapLookup tyName k.types with Some {lower = lower, upper = upper} in
    let lower = setInsert fieldName lower in
    Data {k with types = mapInsert tyName {lower = lower, upper = upper} k.types}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_clear_lower_bounds" kind="sem">

```mc
sem _clear_lower_bounds : all a. Ast_Kind -> a
```



<ToggleWrapper text="Code..">
```mc
sem _clear_lower_bounds =
  | Data k ->
    never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_labeldep_lookup" kind="sem">

```mc
sem _labeldep_lookup : ExtRecEnvType -> Name -> String -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _labeldep_lookup env n =
  | label ->
    match mapLookup n env.labelTyDeps with Some innerMap in
    match mapLookup label innerMap with Some deps in
    deps
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclRecField t ->
    let newLvl = addi 1 env.currentLvl in
    let tyIdent = tyunknown_ in
    let conEnv = mapInsert (nameNoSym t.label) (newLvl, tyIdent) env.conEnv in
    let env = {env with conEnv = conEnv, currentLvl = newLvl} in
    (env, DeclRecField t)
  | DeclRecType t ->
    let newLvl = addi 1 env.currentLvl in
    let newTyConEnv = mapInsert t.ident (newLvl, t.params, tyvariant_ []) env.tyConEnv in
    let env = {env with tyConEnv = newTyConEnv, currentLvl = newLvl} in
    (env, DeclRecType t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckPat" kind="sem">

```mc
sem typeCheckPat : TCEnv -> Map Name Ast_Type -> Ast_Pat -> (Map Name Ast_Type, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckPat env patEnv =
  | PatExtRecord t ->
    let paramMetaVars = newParamMetaVars env t.ident in

    let typeCheckBinding = lam patEnv. lam. lam pat. typeCheckPat env patEnv pat in
    match mapMapAccum typeCheckBinding patEnv t.bindings with (patEnv, bindings) in

    let labels : Set Name = setMap nameCmp (lam sid. nameNoSym (sidToString sid)) (setOfKeys t.bindings) in

    let kind = Data {types = mapSingleton nameCmp t.ident {lower = labels, upper = None ()}} in
    let r = newnmetavar "r" kind env.currentLvl noinfo_ in
    let ty = TyCon {ident = t.ident,
                    data = r,
                    info = noinfo_} in
    let ty = tyapps_ ty paramMetaVars in

    (patEnv, PatExtRecord {t with bindings = bindings, ty = ty})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmMatch {pat = PatRecord p} & TmMatch t ->
    let target = typeCheckExpr env t.target in

    let handleExtRec = lam extRec.
      let labelToType = match mapLookup extRec.ident env.extRecordType.defs with Some labelToType
                        then labelToType
                        else errorSingle [p.info] (join [
                          "* The type '",
                          nameGetStr extRec.ident,
                          "' is not defined!"
                        ]) in
      match mapLookup extRec.ident env.extRecordType.tyDeps with Some tydeps in

      let typeCheckBinding = lam patEnv. lam sid. lam pat.
        let label = sidToString sid in
        let tyAbs = match mapLookup label labelToType with Some (_, tyAbs)
                    then tyAbs
                    else errorSingle [p.info] (join [
                      "* The label '",
                      label,
                      "' is not defined for the type '",
                      nameGetStr extRec.ident,
                      "'!"]) in
        match mapLookup label labelToType with Some (_, tyAbs) in
        recursive let work = lam ty. match ty with TyAbs t then work t.body else ty in
        let body = work tyAbs in

        match (body, pat) with (TyCon {ident = ident}, PatRecord p) then
          let pat = PatExtRecord {ident = ident,
                                  bindings = p.bindings,
                                  info = p.info,
                                  ty = p.ty} in
          typeCheckPat env patEnv pat
        else
          typeCheckPat env patEnv pat in
      match mapMapAccum typeCheckBinding (mapEmpty nameCmp) p.bindings with (patEnv, bindings) in

      let paramMetaVars = newParamMetaVars env extRec.ident in
      let paramMetaVars = cons extRec.data paramMetaVars in

      let bindingPairs = mapToSeq bindings in
      let tcPair = lam accBound. lam pair.
        match pair with (labelSid, pat) in
        let ty = tyPat pat in
        let tyAbs  = match mapLookup (sidToString labelSid) labelToType with Some (_, tyAbs)
                     then tyAbs
                     else errorSingle [p.info] (join [
                      "* The label '",
                      sidToString labelSid,
                      "' is not defined for the type '",
                      nameGetStr extRec.ident,
                      "'!"
                     ]) in
        let expectedTy = resolveAll tyAbs paramMetaVars in
        let expectedTy = resolveType (NoInfo ()) env false expectedTy in
        unify env [NoInfo ()] ty expectedTy ;

        setInsert (nameNoSym (sidToString labelSid)) accBound
      in
      let lowerBound = foldl tcPair (setEmpty nameCmp) bindingPairs in

      let kindMap = mapMap (lam. {lower = setEmpty nameCmp, upper = None ()}) tydeps in
      let kindMap = mapInsert extRec.ident {lower = lowerBound, upper = None ()} kindMap in
      let kind = Data {types = kindMap} in
      let r = newnmetavar "r" kind env.currentLvl (NoInfo ()) in
      let ty = TyCon {info = noinfo_, ident = extRec.ident, data = r} in

      let ty = foldl tyapp_ ty (tail paramMetaVars) in

      (patEnv, PatRecord {p with bindings = bindings, ty = ty})
    in

    let res = match _inspectTyWithinAlias (tyTm target) with TyCon extRec then
      handleExtRec extRec
    else
      match typeCheckPat env (mapEmpty nameCmp) t.pat with (patEnv, pat) in
      (patEnv, pat)
    in

    match res with (patEnv, pat) in
    unify env [infoTm target, infoPat pat] (tyPat pat) (tyTm target);

    let matchLvl = addi 1 env.matchLvl in
    match
      if env.disableConstructorTypes then ([], [])
      else
        let np = patToNormpat pat in
        (matchNormpat (t.target, np), matchNormpat (t.target, normpatComplement np))
    with
      (posMatches, negMatches)
    in

    let mkMatches =
      lam matches.
        joinMap (lam a.
          (joinMap (lam b.
            let m = mapUnionWith normpatIntersect a b in
            if mapAll (lam np. not (null np)) m then [m] else [])
             env.matches))
          matches
    in
    let mkMatchVars = lam matches.
      foldl
        (mapFoldWithKey (lam acc. lam n. lam. mapInsert n matchLvl acc))
        env.matchVars matches
    in

    let baseEnv = {env with varEnv = mapUnion env.varEnv patEnv,
                            matchLvl = matchLvl} in
    let thnEnv = if env.disableConstructorTypes then baseEnv
                 else {baseEnv with matches = mkMatches posMatches,
                                    matchVars = mkMatchVars posMatches} in
    let elsEnv = if env.disableConstructorTypes then baseEnv
                 else {baseEnv with matches = mkMatches negMatches,
                                    matchVars = mkMatchVars negMatches} in
    let thn = typeCheckExpr thnEnv t.thn in
    let els = typeCheckExpr elsEnv t.els in
    unify env [infoTm thn, infoTm els] (tyTm thn) (tyTm els);
    TmMatch {t with target = target
            , thn = thn
            , els = els
            , ty = tyTm thn
            , pat = pat}
```
</ToggleWrapper>
</DocBlock>

