import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnifyPure  
  

  
  
  
## Types  
  

          <DocBlock title="UniVarSubst" kind="type">

```mc
type UniVarSubst : { metas: Map Name (Name, Int), reprs: Map Symbol (Symbol, Int) }
```



<ToggleWrapper text="Code..">
```mc
type UniVarSubst = {metas : Map Name (Name, Int), reprs : Map Symbol (Symbol, Int)}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="emptyUnification" kind="sem">

```mc
sem emptyUnification : () -> Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyUnification = | _ ->
    { reprs = pufEmpty (lam a. lam b. subi (sym2hash a) (sym2hash b))
    , types = pufEmpty nameCmp
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="uniImplies" kind="sem">

```mc
sem uniImplies : Unification -> Unification -> Bool
```

<Description>{`A partial order over unification environments. True if all  
assertions present in the second argument are true in the first.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem uniImplies a = | b ->
    let rEq = eitherEq nameEq (lam l. lam r. and (eqsym l.0 r.0) (eqi l.1 r.1)) in
    let tyEq = eitherEq
      (lam l. lam r. eqi 0 (cmpType (pureApplyUniToType a l) (pureApplyUniToType a r)))
      (lam l. lam r. and (nameEq l.0 r.0) (eqi l.1 r.1)) in
    let reprImplied = pufFold
      (lam acc. lam r1. lam r2. if acc
       then rEq (pufUnwrap a.reprs r1) (pufUnwrap a.reprs r2)
       else false)
      (lam acc. lam r. lam out. if acc
       then rEq (pufUnwrap a.reprs r) (Left out)
       else false)
      true
      b.reprs in
    if reprImplied then
      let typeImplied = pufFold
        (lam acc. lam ty1. lam ty2. if acc
         then tyEq (pufUnwrap a.types ty1) (pufUnwrap a.types ty2)
         else false)
        (lam acc. lam ty. lam out. if acc
         then tyEq (pufUnwrap a.types ty) (Left out)
         else false)
        true
        b.types in
      typeImplied
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pureApplyUniToType" kind="sem">

```mc
sem pureApplyUniToType : Unification -> Ast_Type -> Ast_Type
```

<Description>{`Apply the rewrites present in the \`Unification\` in the given type  
everywhere. The returned type will be "disconnected" from all  
other types, in the sense that none of its \`TyMetaVar\` or  
\`ReprVar\`s are shared, i.e., a side\-effecting unification  
afterwards won't do the right thing.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pureApplyUniToType uni =
  | ty -> smap_Type_Type (pureApplyUniToType uni) ty
  | TyMetaVar x -> switch deref x.contents
    case Link ty then pureApplyUniToType uni ty
    case Unbound u then
      switch pufUnwrap uni.types (u.ident, u.level)
      case Left ty then pureApplyUniToType uni ty
      case Right (ident, level) then
        TyMetaVar {x with contents = ref (Unbound {u with ident = ident, level = level})}
      end
    end
  | TyRepr x ->
    let arg = pureApplyUniToType uni x.arg in
    switch deref (botRepr x.repr)
    case BotRepr {sym = sym, scope = scope} then
      match pufUnwrapN uni.reprs (sym, scope) with (sym, scope) in
      TyRepr {x with arg = arg, repr = ref (BotRepr {sym = sym, scope = scope})}
    case UninitRepr _ then
      TyRepr {x with arg = arg, repr = ref (UninitRepr ())}
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_handlePufReprs" kind="sem">

```mc
sem _handlePufReprs : Unification -> PUFResults Symbol Name (Name, Name) -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _handlePufReprs uni = | res ->
    if any (lam eq. not (nameEq eq.0 eq.1)) res.sides then None () else
    Some {uni with reprs = res.puf}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_handlePufTypes" kind="sem">

```mc
sem _handlePufTypes : Unification -> PUFResults Name Ast_Type (Ast_Type, Ast_Type) -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _handlePufTypes uni = | res ->
    let uni = {uni with types = res.puf} in
    optionFoldlM (lam uni. lam eq. unifyPure uni eq.0 eq.1) uni res.sides
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeUnifications" kind="sem">

```mc
sem mergeUnifications : Unification -> Unification -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mergeUnifications l = | r ->
    let juggle = lam f. lam acc. lam a. lam b. pufBind acc (f a b) in

    let reprRes = pufFold (juggle (pufUnify (lam a. lam b. ((a, b), a)))) (juggle (pufSetOut (lam a. lam b. ((a, b), a))))
      (pufEmptyResults l.reprs)
      r.reprs in
    if any (lam eq. not (nameEq eq.0 eq.1)) reprRes.sides then None () else

    let typeRes = pufFold (juggle (pufUnify (lam a. lam b. ((a, b), a)))) (juggle (pufSetOut (lam a. lam b. ((a, b), a))))
      (pufEmptyResults l.types)
      r.types in
    let uni = {reprs = reprRes.puf, types = typeRes.puf} in
    optionFoldlM (lam uni. lam eq. unifyPure uni eq.0 eq.1) uni typeRes.sides
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_handlePufRepr" kind="sem">

```mc
sem _handlePufRepr : Unification -> PUFResult Symbol Name (Name, Name) -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _handlePufRepr uni = | x ->
    let pairOk = match x.side with Some (a, b)
      then nameEq a b
      else true in
    if pairOk then
      Some {uni with reprs = x.puf}
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_handlePufType" kind="sem">

```mc
sem _handlePufType : Unify_UnifyEnv -> Unification -> PUFResult Name Ast_Type (Ast_Type, Ast_Type) -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _handlePufType env uni = | x ->
    let uni = {uni with types = x.puf} in
    match x.side with Some (a, b) then unifyPureWithEnv env uni a b else Some uni
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyReprPure" kind="sem">

```mc
sem unifyReprPure : Unification -> ReprVar -> ReprVar -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyReprPure uni lr = | rr ->
    match (deref (botRepr lr), deref (botRepr rr)) with (BotRepr lr, BotRepr rr) in
    _handlePufRepr uni (pufUnify (lam a. lam b. ((a, b), a)) (lr.sym, lr.scope) (rr.sym, rr.scope) uni.reprs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifySetReprPure" kind="sem">

```mc
sem unifySetReprPure : Unification -> ReprVar -> Name -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifySetReprPure uni r = | subst ->
    match deref (botRepr r) with BotRepr r in
    _handlePufRepr uni (pufSetOut (lam a. lam b. ((a, b), a)) (r.sym, r.scope) subst uni.reprs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyPureWithEnv" kind="sem">

```mc
sem unifyPureWithEnv : Unify_UnifyEnv -> Unification -> Ast_Type -> Ast_Type -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyPureWithEnv env uni lty = | rty ->
    let uniRef = ref (Some uni) in
    let tyAsMeta = lam ty.
      match ty with TyMetaVar x then
        match deref x.contents with Unbound x in
        Right (x.ident, x.level)
      else Left ty in
    recursive
      let unifier = lam.
        { empty = ()
        , combine = lam. lam. ()
        , unify = lam env. lam lty. lam rty.
          match deref uniRef with Some uni then
            switch
              ( eitherBindRight (tyAsMeta lty) (pufUnwrap uni.types)
              , eitherBindRight (tyAsMeta rty) (pufUnwrap uni.types)
              )
            case (Left lty, Left rty) then
              modref uniRef (unifyPureWithEnv env uni lty rty)
            case (Left ty, Right n) | (Right n, Left ty) then
              modref uniRef (_handlePufType env uni (pufSetOut (lam a. lam b. ((a, b), a)) n ty uni.types))
            case (Right l, Right r) then
              modref uniRef (_handlePufType env uni (pufUnify (lam a. lam b. ((a, b), a)) l r uni.types))
            end
          else ()
        , unifyRepr = lam env. lam lvar. lam rvar.
          match deref uniRef with Some uni then
            modref uniRef (unifyReprPure uni lvar rvar)
          else ()
        , err = lam err. modref uniRef (None ())
        }
    in
    unifyTypes (unifier ()) env (lty, rty);
    deref uniRef
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyPure" kind="sem">

```mc
sem unifyPure : Unification -> Ast_Type -> Ast_Type -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyPure uni lty = | rty ->
    let env : UnifyEnv =
      { boundNames = biEmpty
      , wrappedLhs = lty
      , wrappedRhs = rty
      } in
    unifyPureWithEnv env uni lty rty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substituteInUnification" kind="sem">

```mc
sem substituteInUnification : ((Name, Int) -> (Name, Int)) -> ((Symbol, Int) -> (Symbol, Int)) -> (Ast_Type -> Ast_Type) -> Unification -> Option Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteInUnification fn fs fty = | uni ->
    let reprRes = pufMapAll (lam a. lam b. subi (sym2hash a) (sym2hash b)) fs (lam x. x) (lam a. lam b. ((a, b), a)) uni.reprs in
    match _handlePufReprs uni reprRes with Some uni then
      let typeRes = pufMapAll nameCmp fn fty (lam a. lam b. ((a, b), a)) uni.types in
      _handlePufTypes uni typeRes
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterUnificationFunction" kind="sem">

```mc
sem filterUnificationFunction : ((Symbol, Int) -> Bool) -> ((Name, Int) -> Bool) -> Unification -> Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem filterUnificationFunction frepr fmeta = | uni ->
    { reprs = pufFilterFunction frepr uni.reprs
    , types = pufFilterFunction fmeta uni.types
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="filterUnification" kind="sem">

```mc
sem filterUnification : {reprs: {syms: Set Symbol, scope: Int}, types: {level: Int, names: Set Name}} -> Unification -> Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem filterUnification filters = | uni ->
    { reprs = pufFilter filters.reprs.scope filters.reprs.syms uni.reprs
    , types = pufFilter filters.types.level filters.types.names uni.types
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substUniVars" kind="sem">

```mc
sem substUniVars : UnifyPure_UniVarSubst -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substUniVars subst =
  | ty & TyRepr x ->
    match deref (botRepr x.repr) with BotRepr b then
      let repr = optionMapOr (BotRepr b) (lam pair. BotRepr {b with sym = pair.0, scope = pair.1})
        (mapLookup b.sym subst.reprs) in
      TyRepr {x with repr = ref repr, arg = substUniVars subst x.arg}
    else ty
  | ty & TyMetaVar x ->
    switch deref x.contents
    case Unbound b then
      let pair = optionGetOr (b.ident, b.level) (mapLookup b.ident subst.metas) in
      let kind = smap_Kind_Type (substUniVars subst) b.kind in
      TyMetaVar {x with contents = ref (Unbound {b with ident = pair.0, level = pair.1, kind = kind})}
    case Link ty then
      substUniVars subst ty
    end
  | ty -> smap_Type_Type (substUniVars subst) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substUniVarsInUni" kind="sem">

```mc
sem substUniVarsInUni : UnifyPure_UniVarSubst -> Unification -> Unification
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substUniVarsInUni subst = | uni ->
    let new = substituteInUnification
      (lam pair. optionGetOr pair (mapLookup pair.0 subst.metas))
      (lam pair. optionGetOr pair (mapLookup pair.0 subst.reprs))
      (substUniVars subst)
      uni in
    match new with Some uni then uni else
    error "Compiler error, substUniVarsInUni failed"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="simplifyUniWithKeep" kind="sem">

```mc
sem simplifyUniWithKeep : ((Symbol, Int) -> Bool) -> ((Name, Int) -> Bool) -> Unification -> (Unification, UnifyPure_UniVarSubst)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem simplifyUniWithKeep keepRepr keepMeta = | uni ->
    -- TODO(vipa, 2024-01-21): for each unified partition, keep a
    -- subset of the variables. A partition is kept if it has an \\`out\\`
    -- or at least two vars in \\`prio\\`. If a partition is to be kept,
    -- retain all vars in \\`prio\\`, or the lowest level var if none are
    -- in \\`prio\\`.
    let keepPartition : all k. all out. ((k, Int) -> Bool) -> ([(k, Int)] -> Option out -> [(k, Int)])
      = lam f. lam ks. lam out.
        match filter f ks with kept & ([_] ++ _)
        then kept
        else optionMapOr [] (lam x. [x]) (min (lam a. lam b. subi a.1 b.1) ks) in
    let types = pufFilterPartitions (keepPartition keepMeta) uni.types in
    let reprs = pufFilterPartitions (keepPartition keepRepr) uni.reprs in
    let subst = {metas = types.substituted, reprs = reprs.substituted} in
    let types = pufMapOut (substUniVars subst) types.puf in
    let reprs = reprs.puf in
    -- TODO(vipa, 2024-01-21): This could actually substitute away
    -- tyvars to concrete types as well if the vars aren't marked to
    -- be kept
    ({types = types, reprs = reprs}, subst)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unificationToDebug" kind="sem">

```mc
sem unificationToDebug : String -> PprintEnv -> Unification -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unificationToDebug indent env = | uni ->
    match pufToDebug (snoc indent ' ') (lam env. lam sym. (env, int2string (sym2hash sym))) "<unknown>" pprintVarName env uni.reprs with (env, reprs) in
    match pufToDebug (snoc indent ' ') pprintVarName "<unknown>" (getTypeStringCode 2) env uni.types with (env, types) in
    (env, join [indent, "reprs:\n", reprs, indent, "types:\n", types])
```
</ToggleWrapper>
</DocBlock>

