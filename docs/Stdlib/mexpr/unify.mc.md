import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# unify.mc  
  

Unification of MExpr types.  See type\-check.mc for an overview of  
the type checker.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/result.mc"} style={S.link}>result.mc</a>, <a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>mexpr/eq.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>mexpr/info.mc</a>, <a href={"/docs/Stdlib/mexpr/type.mc"} style={S.link}>mexpr/type.mc</a>  
  
## Types  
  

          <DocBlock title="PUFContent" kind="type">

```mc
type PUFContent
```

<Description>{`A map representing the partitioning induced by a series of  
unifications of variables. Variables have a concept of levels, such  
that the representative element of each partition will have the  
lowest level included in the partition. Each partition may also  
have an \`out\` \(e.g., a \`Type\` when working with type unification  
variables\).`}</Description>


<ToggleWrapper text="Code..">
```mc
type PUFContent k out
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PureUnionFind" kind="type">

```mc
type PureUnionFind
```



<ToggleWrapper text="Code..">
```mc
type PureUnionFind k out =
  Map k {level : Int, content : PUFContent k out}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PUFResult" kind="type">

```mc
type PUFResult
```

<Description>{`All operations that "modify" a PUF return this type, which  
summarizes, which contains the new PUF as well as whatever the  
supplied merging function returned if it was called.`}</Description>


<ToggleWrapper text="Code..">
```mc
type PUFResult k out side =
  { side : Option side
  , puf : PureUnionFind k out
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PUFResults" kind="type">

```mc
type PUFResults
```



<ToggleWrapper text="Code..">
```mc
type PUFResults k out side =
  { sides : [side]
  , puf : PureUnionFind k out
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Unification" kind="type">

```mc
type Unification : { reprs: PureUnionFind Symbol Name, types: PureUnionFind Name Type }
```



<ToggleWrapper text="Code..">
```mc
type Unification = use Ast in
  { reprs : PureUnionFind Symbol Name
  , types : PureUnionFind Name Type
  }
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="PUFLink" kind="con">

```mc
con PUFLink : all k . all out . k -> PUFContent k out
```



<ToggleWrapper text="Code..">
```mc
con PUFLink : all k. all out. k -> PUFContent k out
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PUFEmpty" kind="con">

```mc
con PUFEmpty : all k . all out . () -> PUFContent k out
```



<ToggleWrapper text="Code..">
```mc
con PUFEmpty : all k. all out. () -> PUFContent k out
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="PUFOut" kind="con">

```mc
con PUFOut : all k . all out . out -> PUFContent k out
```



<ToggleWrapper text="Code..">
```mc
con PUFOut : all k. all out. out -> PUFContent k out
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="Unify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-Unify">

```mc
lang Unify
```



<ToggleWrapper text="Code..">
```mc
lang Unify = Ast
  type UnifyEnv = {
    wrappedLhs: Type,  -- The currently examined left-hand subtype, before resolving aliases
    wrappedRhs: Type,  -- The currently examined right-hand subtype, before resolving aliases
    boundNames: BiNameMap  -- The bijective correspondence between bound variables in scope
  }

  syn UnifyError =
  | Types (Type, Type)
  | Records (Map SID Type, Map SID Type)
  | Kinds (Kind, Kind)

  type Unifier u = {
    empty : u,
    combine : u -> u -> u,
    unify : UnifyEnv -> Type -> Type -> u,
    unifyRepr : UnifyEnv -> ReprVar -> ReprVar -> u,
    err : UnifyError -> u
  }

  -- Unify the types \\`ty1\\` and \\`ty2\\` under the assumptions of \\`env\\`.
  -- Takes an abstract type \\`u\\` satisfying the interface \\`Unifier\\` to
  -- perform the actual variable unifications.
  -- For an example usage, see \\`unifyPure\\` below.
  sem unifyTypes : all u. Unifier u -> UnifyEnv -> (Type, Type) -> u
  sem unifyTypes u env =
  | (ty1, ty2) ->
    unifyBase u
      {env with wrappedLhs = ty1, wrappedRhs = ty2}
      (unwrapType ty1, unwrapType ty2)

  -- unifyBase env (ty1, ty2) unifies ty1 and ty2 under the
  -- assumptions of env.
  -- IMPORTANT: Assumes that ty1 = unwrapType env.wrappedLhs and
  -- ty2 = unwrapType env.wrappedRhs.
  sem unifyBase : all u. Unifier u -> UnifyEnv -> (Type, Type) -> u
  sem unifyBase u env =
  | (ty1, ty2) ->
    u.err (Types (ty1, ty2))

  sem unifyKinds : all u. Unifier u -> UnifyEnv -> (Kind, Kind) -> u
  sem unifyKinds u env =
  | (k1, k2) -> u.err (Kinds (k1, k2))

  sem addKinds : all u. Unifier u -> UnifyEnv -> (Kind, Kind) -> (u, Kind)
  sem addKinds u env =
  | (k1, k2) -> (u.err (Kinds (k1, k2)), k1)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UnifyRecords" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-UnifyRecords">

```mc
lang UnifyRecords
```

<Description>{`Helper language providing functions to unify fields of record\-like types`}</Description>


<ToggleWrapper text="Code..">
```mc
lang UnifyRecords = Unify
  -- Check that 'm1' is a subset of 'm2'
  sem unifyRecordsSubset : all u. Unifier u -> UnifyEnv -> Map SID Type -> Map SID Type -> u
  sem unifyRecordsSubset u env m1 =
  | m2 ->
    let f = lam acc. lam b.
      let unifier =
        match b with (k, tyfield1) in
        match mapLookup k m2 with Some tyfield2 then
          unifyTypes u env (tyfield1, tyfield2)
        else
          u.err (Records (m1, m2))
      in
      u.combine acc unifier
    in
    foldl f u.empty (mapBindings m1)

  -- Check that 'm1' and 'm2' contain the same fields
  sem unifyRecordsStrict : all u. Unifier u -> UnifyEnv -> Map SID Type -> Map SID Type -> u
  sem unifyRecordsStrict u env m1 =
  | m2 ->
    if eqi (mapSize m1) (mapSize m2) then
      unifyRecordsSubset u env m1 m2
    else
      u.err (Records (m1, m2))

  -- Check that the intersection of 'm1' and 'm2' unifies, then return their union
  sem unifyRecordsUnion : all u. Unifier u -> UnifyEnv -> Map SID Type -> Map SID Type -> (u, Map SID Type)
  sem unifyRecordsUnion u env m1 =
  | m2 ->
    let f = lam acc. lam b.
      match b with (k, tyfield1) in
      match mapLookup k acc.1 with Some tyfield2 then
        (u.combine acc.0 (unifyTypes u env (tyfield1, tyfield2)), acc.1)
      else
        (acc.0, mapInsert k tyfield1 acc.1)
    in
    foldl f (u.empty, m2) (mapBindings m1)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-VarTypeUnify">

```mc
lang VarTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang VarTypeUnify = Unify + VarTypeAst
  sem unifyBase u env =
  | (TyVar t1 & ty1, TyVar t2 & ty2) ->
    if nameEq t1.ident t2.ident then u.empty
    else if biMem (t1.ident, t2.ident) env.boundNames then u.empty
    else u.err (Types (ty1, ty2))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MetaVarTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-MetaVarTypeUnify">

```mc
lang MetaVarTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang MetaVarTypeUnify = Unify + MetaVarTypeAst
  sem unifyBase u env =
  | (TyMetaVar _ & ty1, ty2) -> u.unify env ty1 ty2
  | (!TyMetaVar _ & ty1, TyMetaVar _ & ty2) ->
    unifyBase u {env with wrappedLhs = env.wrappedRhs, wrappedRhs = env.wrappedLhs} (ty2, ty1)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FunTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-FunTypeUnify">

```mc
lang FunTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang FunTypeUnify = Unify + FunTypeAst
  sem unifyBase u env =
  | (TyArrow t1, TyArrow t2) ->
    u.combine
      (unifyTypes u env (t1.from, t2.from))
      (unifyTypes u env (t1.to, t2.to))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AppTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-AppTypeUnify">

```mc
lang AppTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang AppTypeUnify = Unify + AppTypeAst
  sem unifyBase u env =
  | (TyApp t1, TyApp t2) ->
    u.combine
      (unifyTypes u env (t1.lhs, t2.lhs))
      (unifyTypes u env (t1.rhs, t2.rhs))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AllTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-AllTypeUnify">

```mc
lang AllTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang AllTypeUnify = Unify + AllTypeAst
  sem unifyBase u env =
  | (TyAll t1, TyAll t2) ->
    u.combine
      (unifyKinds u env (t1.kind, t2.kind))
      (let env = {env with boundNames = biInsert (t1.ident, t2.ident) env.boundNames} in
       unifyTypes u env (t1.ty, t2.ty))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-ConTypeUnify">

```mc
lang ConTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang ConTypeUnify = Unify + ConTypeAst
  sem unifyBase u env =
  | (TyCon t1 & ty1, TyCon t2 & ty2) ->
    if nameEq t1.ident t2.ident then
      unifyTypes u env (t1.data, t2.data)
    else
      u.err (Types (ty1, ty2))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-DataTypeUnify">

```mc
lang DataTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang DataTypeUnify = Unify + DataTypeAst
  sem unifyBase u env =
  | (TyData t1 & ty1, TyData t2 & ty2) ->
    if mapEq setEq (computeData t1) (computeData t2) then u.empty
    else
      u.err (Types (ty1, ty2))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UnknownTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-UnknownTypeUnify">

```mc
lang UnknownTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang UnknownTypeUnify = Unify + UnknownTypeAst
  sem unifyBase u env =
  | (TyUnknown _, TyUnknown _) -> u.empty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BoolTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-BoolTypeUnify">

```mc
lang BoolTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang BoolTypeUnify = Unify + BoolTypeAst
  sem unifyBase u env =
  | (TyBool _, TyBool _) -> u.empty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IntTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-IntTypeUnify">

```mc
lang IntTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang IntTypeUnify = Unify + IntTypeAst
  sem unifyBase u env =
  | (TyInt _, TyInt _) -> u.empty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FloatTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-FloatTypeUnify">

```mc
lang FloatTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang FloatTypeUnify = Unify + FloatTypeAst
  sem unifyBase u env =
  | (TyFloat _, TyFloat _) -> u.empty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CharTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-CharTypeUnify">

```mc
lang CharTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang CharTypeUnify = Unify + CharTypeAst
  sem unifyBase u env =
  | (TyChar _, TyChar _) -> u.empty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-SeqTypeUnify">

```mc
lang SeqTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang SeqTypeUnify = Unify + SeqTypeAst
  sem unifyBase u env =
  | (TySeq t1, TySeq t2) ->
    unifyTypes u env (t1.ty, t2.ty)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TensorTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-TensorTypeUnify">

```mc
lang TensorTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang TensorTypeUnify = Unify + TensorTypeAst
  sem unifyBase u env =
  | (TyTensor t1, TyTensor t2) ->
    unifyTypes u env (t1.ty, t2.ty)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-RecordTypeUnify">

```mc
lang RecordTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang RecordTypeUnify = UnifyRecords + RecordTypeAst
  sem unifyBase u env =
  | (TyRecord t1, TyRecord t2) ->
    unifyRecordsStrict u env t1.fields t2.fields
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TyWildUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-TyWildUnify">

```mc
lang TyWildUnify
```



<ToggleWrapper text="Code..">
```mc
lang TyWildUnify = Unify + TyWildAst
  sem unifyBase u env =
  | (TyWild _, TyWild _) -> u.empty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BaseKindUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-BaseKindUnify">

```mc
lang BaseKindUnify
```



<ToggleWrapper text="Code..">
```mc
lang BaseKindUnify = Unify + PolyKindAst + MonoKindAst
  sem unifyKinds u env =
  | (_, Mono () | Poly ()) -> u.empty

  sem addKinds u env =
  | (Mono _ | Poly _, !(Mono _ | Poly _) & k)
  | (!(Mono _ | Poly _) & k, Mono _ | Poly _)
  | (Poly _, (Poly _ | Mono _) & k) ->
    (u.empty, k)
  | (Mono _, Poly _ | Mono _) ->
    (u.empty, Mono ())
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecordKindUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-RecordKindUnify">

```mc
lang RecordKindUnify
```



<ToggleWrapper text="Code..">
```mc
lang RecordKindUnify = UnifyRecords + RecordKindAst
  sem unifyKinds u env =
  | (Record r1, Record r2) ->
    unifyRecordsSubset u env r2.fields r1.fields

  sem addKinds u env =
  | (Record r1, Record r2) ->
    match unifyRecordsUnion u env r1.fields r2.fields with (unifier, fields) in
    (unifier, Record {r1 with fields = fields})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataKindUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-DataKindUnify">

```mc
lang DataKindUnify
```



<ToggleWrapper text="Code..">
```mc
lang DataKindUnify = Unify + DataKindAst + PolyKindAst + MonoKindAst
  sem hasNoBounds : {lower : Set Name, upper : Option (Set Name)} -> Bool
  sem hasNoBounds =
  | ks -> if setIsEmpty ks.lower then optionIsNone ks.upper else false

  sem unifyKinds u env =
  | ((Mono _ | Poly _) & k, Data r) ->
    if mapAll hasNoBounds r.types then u.empty
    else u.err (Kinds (k, Data r))
  | (Data r1, Data r2) ->
    if mapAllWithKey
         (lam t. lam ks2.
           optionMapOrElse
             (lam. hasNoBounds ks2)
             (lam ks1.
               if setSubset ks2.lower ks1.lower then
                 match ks2.upper with Some m2 then
                   match ks1.upper with Some m1 then
                     setSubset (setUnion ks1.lower m1) (setUnion ks2.lower m2)
                   else false
                 else true
               else false)
             (mapLookup t r1.types))
         r2.types
    then u.empty
    else u.err (Kinds (Data r1, Data r2))

  sem addKinds u env =
  | (Data r1, Data r2) ->
    let checkSubset = lam lower1. lam lower2. lam upper.
      optionMapOr true
        (lam m. setSubset (setSubtract lower1 lower2) m) upper
    in
    match
      mapFoldlOption
        (lam acc. lam t. lam ks1.
          match mapLookup t acc with Some ks2 then
            if checkSubset ks1.lower ks2.lower ks2.upper then
              if checkSubset ks2.lower ks1.lower ks1.upper then
                let upper =
                  switch (ks1.upper, ks2.upper)
                  case (Some u1, Some u2) then Some (setIntersect u1 u2)
                  case (Some u, None _) then Some (setSubtract u ks2.lower)
                  case (None _, Some u) then Some (setSubtract u ks1.lower)
                  case _ then None ()
                  end
                in
                Some
                  (mapInsert t {lower = setUnion ks1.lower ks2.lower,
                                upper = upper} acc)
              else None ()
            else None ()
          else Some (mapInsert t ks1 acc))
        r2.types r1.types
    with Some types then
      (u.empty, Data {r1 with types = types})
    else
      (u.err (Kinds (Data r1, Data r2)), Data r1)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprTypeUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-ReprTypeUnify">

```mc
lang ReprTypeUnify
```



<ToggleWrapper text="Code..">
```mc
lang ReprTypeUnify = ReprTypeAst + Unify
  sem unifyBase u env =
  | (TyRepr a, TyRepr b) ->
    u.combine
      (u.unifyRepr env a.repr b.repr)
      (unifyTypes u env (a.arg, b.arg))
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UnifyPure" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-UnifyPure">

```mc
lang UnifyPure
```



<ToggleWrapper text="Code..">
```mc
lang UnifyPure = Unify + MetaVarTypeAst + VarTypeSubstitute + ReprTypeAst + Cmp + PrettyPrint

  sem emptyUnification : () -> Unification
  sem emptyUnification = | _ ->
    { reprs = pufEmpty (lam a. lam b. subi (sym2hash a) (sym2hash b))
    , types = pufEmpty nameCmp
    }

  -- A partial order over unification environments. True if all
  -- assertions present in the second argument are true in the first.
  sem uniImplies : Unification -> Unification -> Bool
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

  -- Apply the rewrites present in the \\`Unification\\` in the given type
  -- everywhere. The returned type will be "disconnected" from all
  -- other types, in the sense that none of its \\`TyMetaVar\\` or
  -- \\`ReprVar\\`s are shared, i.e., a side-effecting unification
  -- afterwards won't do the right thing.
  sem pureApplyUniToType : Unification -> Type -> Type
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

  sem _handlePufReprs : Unification -> PUFResults Symbol Name (Name, Name) -> Option Unification
  sem _handlePufReprs uni = | res ->
    if any (lam eq. not (nameEq eq.0 eq.1)) res.sides then None () else
    Some {uni with reprs = res.puf}

  sem _handlePufTypes : Unification -> PUFResults Name Type (Type, Type) -> Option Unification
  sem _handlePufTypes uni = | res ->
    let uni = {uni with types = res.puf} in
    optionFoldlM (lam uni. lam eq. unifyPure uni eq.0 eq.1) uni res.sides

  sem mergeUnifications : Unification -> Unification -> Option Unification
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

  sem _handlePufRepr : Unification -> PUFResult Symbol Name (Name, Name) -> Option Unification
  sem _handlePufRepr uni = | x ->
    let pairOk = match x.side with Some (a, b)
      then nameEq a b
      else true in
    if pairOk then
      Some {uni with reprs = x.puf}
    else None ()

  sem _handlePufType : UnifyEnv -> Unification -> PUFResult Name Type (Type, Type) -> Option Unification
  sem _handlePufType env uni = | x ->
    let uni = {uni with types = x.puf} in
    match x.side with Some (a, b) then unifyPureWithEnv env uni a b else Some uni

  sem unifyReprPure : Unification -> ReprVar -> ReprVar -> Option Unification
  sem unifyReprPure uni lr = | rr ->
    match (deref (botRepr lr), deref (botRepr rr)) with (BotRepr lr, BotRepr rr) in
    _handlePufRepr uni (pufUnify (lam a. lam b. ((a, b), a)) (lr.sym, lr.scope) (rr.sym, rr.scope) uni.reprs)

  sem unifySetReprPure : Unification -> ReprVar -> Name -> Option Unification
  sem unifySetReprPure uni r = | subst ->
    match deref (botRepr r) with BotRepr r in
    _handlePufRepr uni (pufSetOut (lam a. lam b. ((a, b), a)) (r.sym, r.scope) subst uni.reprs)

  sem unifyPureWithEnv : UnifyEnv -> Unification -> Type -> Type -> Option Unification
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

  sem unifyPure : Unification -> Type -> Type -> Option Unification
  sem unifyPure uni lty = | rty ->
    let env : UnifyEnv =
      { boundNames = biEmpty
      , wrappedLhs = lty
      , wrappedRhs = rty
      } in
    unifyPureWithEnv env uni lty rty

  sem substituteInUnification : ((Name, Int) -> (Name, Int)) -> ((Symbol, Int) -> (Symbol, Int)) -> (Type -> Type) -> Unification -> Option Unification
  sem substituteInUnification fn fs fty = | uni ->
    let reprRes = pufMapAll (lam a. lam b. subi (sym2hash a) (sym2hash b)) fs (lam x. x) (lam a. lam b. ((a, b), a)) uni.reprs in
    match _handlePufReprs uni reprRes with Some uni then
      let typeRes = pufMapAll nameCmp fn fty (lam a. lam b. ((a, b), a)) uni.types in
      _handlePufTypes uni typeRes
    else None ()

  sem filterUnificationFunction
    : ((Symbol, Int) -> Bool)
    -> ((Name, Int) -> Bool)
    -> Unification
    -> Unification
  sem filterUnificationFunction frepr fmeta = | uni ->
    { reprs = pufFilterFunction frepr uni.reprs
    , types = pufFilterFunction fmeta uni.types
    }

  sem filterUnification
    : {reprs : {scope : Int, syms : Set Symbol}, types : {level : Int, names : Set Name}}
    -> Unification
    -> Unification
  sem filterUnification filters = | uni ->
    { reprs = pufFilter filters.reprs.scope filters.reprs.syms uni.reprs
    , types = pufFilter filters.types.level filters.types.names uni.types
    }

  type UniVarSubst = {metas : Map Name (Name, Int), reprs : Map Symbol (Symbol, Int)}
  sem substUniVars : UniVarSubst -> Type -> Type
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

  sem substUniVarsInUni : UniVarSubst -> Unification -> Unification
  sem substUniVarsInUni subst = | uni ->
    let new = substituteInUnification
      (lam pair. optionGetOr pair (mapLookup pair.0 subst.metas))
      (lam pair. optionGetOr pair (mapLookup pair.0 subst.reprs))
      (substUniVars subst)
      uni in
    match new with Some uni then uni else
    error "Compiler error, substUniVarsInUni failed"

  sem simplifyUniWithKeep : ((Symbol, Int) -> Bool) -> ((Name, Int) -> Bool) -> Unification -> (Unification, UniVarSubst)
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

  sem unificationToDebug : String -> PprintEnv -> Unification -> (PprintEnv, String)
  sem unificationToDebug indent env = | uni ->
    match pufToDebug (snoc indent ' ') (lam env. lam sym. (env, int2string (sym2hash sym))) "<unknown>" pprintVarName env uni.reprs with (env, reprs) in
    match pufToDebug (snoc indent ' ') pprintVarName "<unknown>" (getTypeStringCode 2) env uni.types with (env, types) in
    (env, join [indent, "reprs:\n", reprs, indent, "types:\n", types])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-MExprUnify">

```mc
lang MExprUnify
```



<ToggleWrapper text="Code..">
```mc
lang MExprUnify =
  VarTypeUnify + MetaVarTypeUnify + FunTypeUnify + AppTypeUnify + AllTypeUnify +
  ConTypeUnify + DataTypeUnify + UnknownTypeUnify + BoolTypeUnify + IntTypeUnify +
  FloatTypeUnify + CharTypeUnify + SeqTypeUnify + TensorTypeUnify + RecordTypeUnify +

  BaseKindUnify + RecordKindUnify + DataKindUnify
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RepTypesUnify" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-RepTypesUnify">

```mc
lang RepTypesUnify
```



<ToggleWrapper text="Code..">
```mc
lang RepTypesUnify = TyWildUnify + ReprTypeUnify
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/unify.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = UnifyPure + MExprUnify + MExprCmp + MetaVarTypeCmp + MExprPrettyPrint + MetaVarTypePrettyPrint end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="pufPhysicalCmp" kind="let">

```mc
let pufPhysicalCmp outCmp a b : all k. all out. (out -> out -> Int) -> PureUnionFind k out -> PureUnionFind k out -> Int
```



<ToggleWrapper text="Code..">
```mc
let pufPhysicalCmp : all k. all out. (out -> out -> Int) -> PureUnionFind k out -> PureUnionFind k out -> Int
  = lam outCmp. lam a. lam b.
    let cmp = mapGetCmpFun a in
    let ceq = lam a. lam b. switch (a, b)
      case (PUFLink a, PUFLink b) then cmp a b
      case (PUFEmpty _, PUFEmpty _) then 0
      case (PUFOut a, PUFOut b) then outCmp a b
      case _ then subi (constructorTag a) (constructorTag b)
      end in
    let f = lam a. lam b.
      let res = subi a.level b.level in
      if neqi 0 res then res else
      ceq a.content b.content in
    mapCmp f a b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufToDebug" kind="let">

```mc
let pufToDebug indent pk pempty pout env puf : all k. all out. all env. String -> (env -> k -> (env, String)) -> String -> (env -> out -> (env, String)) -> env -> PureUnionFind k out -> (env, String)
```



<ToggleWrapper text="Code..">
```mc
let pufToDebug
  : all k. all out. all env.
  String
  -> (env -> k -> (env, String))
  -> String
  -> (env -> out -> (env, String))
  -> env
  -> PureUnionFind k out
  -> (env, String)
  = lam indent. lam pk. lam pempty. lam pout. lam env. lam puf.
    let f = lam acc. lam k. lam record.
      match acc with (env, str) in
      match pk env k with (env, k) in
      match switch record.content
        case PUFLink k then pk env k
        case PUFEmpty _ then (env, pempty)
        case PUFOut out then
          match pout env out with (env, out) in
          (env, concat "(out) " out)
        end
      with (env, content) in
      (env, join [str, indent, k, "@", int2string record.level, " -> ", content, "\n"])
    in
    mapFoldWithKey f (env, "") puf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufEmptyResults" kind="let">

```mc
let pufEmptyResults puf : all a. all a1. a -> {puf: a, sides: [a1]}
```



<ToggleWrapper text="Code..">
```mc
let pufEmptyResults = lam puf.
  { sides = []
  , puf = puf
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufBind" kind="let">

```mc
let pufBind res f : all k. all out. all side. PUFResults k out side -> (PureUnionFind k out -> PUFResult k out side) -> PUFResults k out side
```



<ToggleWrapper text="Code..">
```mc
let pufBind : all k. all out. all side
  . PUFResults k out side
  -> (PureUnionFind k out -> PUFResult k out side)
  -> PUFResults k out side
  = lam res. lam f.
    let new = f res.puf in
    { sides = optionMapOr res.sides (snoc res.sides) new.side
    , puf = new.puf
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufEmpty" kind="let">

```mc
let pufEmpty  : all k. all v. (k -> k -> Int) -> Map k v
```



<ToggleWrapper text="Code..">
```mc
let pufEmpty = mapEmpty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pufUnwrap" kind="let">

```mc
let _pufUnwrap k puf : all k. all out. (k, Int) -> PureUnionFind k out -> {k: k, level: Int, content: Option out}
```



<ToggleWrapper text="Code..">
```mc
let _pufUnwrap : all k. all out.
  (k, Int)
  -> PureUnionFind k out
  -> {k : k, level : Int, content : Option out}
  = lam k. lam puf.
    recursive let work = lam k.
      switch mapLookup k.0 puf
      case Some {content = PUFLink n} then work (n, negi 0)
      case Some (a & {content = PUFOut out}) then {k = k.0, level = a.level, content = Some out}
      case Some (a & {content = PUFEmpty _}) then {k = k.0, level = a.level, content = None ()}
      case None _ then {k = k.0, level = k.1, content = None ()}
      end
    in work k
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_pufWrap" kind="let">

```mc
let _pufWrap x : all k. all out. {k: k, level: Int, content: Option out} -> {level: Int, content: PUFContent k out}
```



<ToggleWrapper text="Code..">
```mc
let _pufWrap : all k. all out.
  {k : k, level : Int, content : Option out}
  -> {level : Int, content : PUFContent k out}
  = lam x. switch x.content
    case Some out then {level = x.level, content = PUFOut out}
    case None _ then {level = x.level, content = PUFEmpty ()}
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufUnwrapN" kind="let">

```mc
let pufUnwrapN puf k : all k. all out. PureUnionFind k out -> (k, Int) -> (k, Int)
```



<ToggleWrapper text="Code..">
```mc
let pufUnwrapN : all k. all out. PureUnionFind k out -> (k, Int) -> (k, Int)
  = lam puf. lam k.
    let x = _pufUnwrap k puf in
    (x.k, x.level)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufUnwrap" kind="let">

```mc
let pufUnwrap puf k : all k. all out. PureUnionFind k out -> (k, Int) -> Either out (k, Int)
```



<ToggleWrapper text="Code..">
```mc
let pufUnwrap : all k. all out. PureUnionFind k out -> (k, Int) -> Either out (k, Int)
  = lam puf. lam k.
    switch _pufUnwrap k puf
    case {content = Some out} then Left out
    case x then Right (x.k, x.level)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufUnify" kind="let">

```mc
let pufUnify combine l r puf : all k. all out. all side. (out -> out -> (side, out)) -> (k, Int) -> (k, Int) -> PureUnionFind k out -> PUFResult k out side
```



<ToggleWrapper text="Code..">
```mc
let pufUnify
  : all k. all out. all side. (out -> out -> (side, out)) -> (k, Int) -> (k, Int) -> PureUnionFind k out -> PUFResult k out side
  = lam combine. lam l. lam r. lam puf.
    match (_pufUnwrap l puf, _pufUnwrap r puf) with (l, r) in
    if eqi 0 (mapGetCmpFun puf l.k r.k) then { side = None (), puf = puf} else
    let cmpRes =
      let res = subi l.level r.level in
      if neqi res 0 then res else
      mapGetCmpFun puf l.k r.k in
    match if lti cmpRes 0 then (r, l) else (l, r) with (from, to) in
    match
      switch (from.content, to.content)
      case (Some out, None _) | (None _, Some out) then
        (Some out, None ())
      case (Some a, Some b) then
        match combine a b with (side, out) in
        (Some out, Some side)
      case (None _, None _) then
        (None (), None ())
      end
    with (out, side) in
    { side = side
    , puf = mapInsert from.k {level = from.level, content = PUFLink to.k}
      (mapInsert to.k (_pufWrap {to with content = out}) puf)
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufSetOut" kind="let">

```mc
let pufSetOut combine k out puf : all k. all out. all side. (out -> out -> (side, out)) -> (k, Int) -> out -> PureUnionFind k out -> PUFResult k out side
```



<ToggleWrapper text="Code..">
```mc
let pufSetOut
  : all k. all out. all side. (out -> out -> (side, out)) -> (k, Int) -> out -> PureUnionFind k out -> PUFResult k out side
  = lam combine. lam k. lam out. lam puf.
    switch _pufUnwrap k puf
    case x & {content = Some prev} then
      match combine prev out with (side, out) in
      { side = Some side
      , puf = mapInsert  x.k (_pufWrap {x with content = Some out}) puf
      }
    case x & {content = None _} then
      { side = None ()
      , puf = mapInsert x.k (_pufWrap {x with content = Some out}) puf
      }
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufFoldRaw" kind="let">

```mc
let pufFoldRaw feq fout acc puf : all k. all out. all acc. (acc -> (k, Int) -> (k, Int) -> acc) -> (acc -> (k, Int) -> out -> acc) -> acc -> PureUnionFind k out -> acc
```



<ToggleWrapper text="Code..">
```mc
let pufFoldRaw
  : all k. all out. all acc
  .  (acc -> (k, Int) -> (k, Int) -> acc)
  -> (acc -> (k, Int) -> out -> acc)
  -> acc
  -> PureUnionFind k out
  -> acc
  = lam feq. lam fout. lam acc. lam puf.
    mapFoldWithKey
      (lam acc. lam k. lam kX.
        let k = (k, kX.level) in
        switch kX.content
        case PUFLink toK then
          let level = (mapFindExn toK puf).level in
          feq acc k (toK, level)
        case PUFEmpty _ then acc
        case PUFOut out then
          fout acc k out
        end)
      acc
      puf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufFold" kind="let">

```mc
let pufFold feq fout acc puf : all k. all out. all acc. (acc -> (k, Int) -> (k, Int) -> acc) -> (acc -> (k, Int) -> out -> acc) -> acc -> PureUnionFind k out -> acc
```



<ToggleWrapper text="Code..">
```mc
let pufFold
  : all k. all out. all acc
  .  (acc -> (k, Int) -> (k, Int) -> acc)
  -> (acc -> (k, Int) -> out -> acc)
  -> acc
  -> PureUnionFind k out
  -> acc
  = lam feq. lam fout. lam acc. lam puf.
    mapFoldWithKey
      (lam acc. lam k. lam kX.
        let k = (k, kX.level) in
        let x = _pufUnwrap k puf in
        match x.content with Some out
        then fout acc k out
        else if neqi 0 (mapGetCmpFun puf k.0 x.k)
          then feq acc k (x.k, x.level)
          else acc)
      acc
      puf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufMerge" kind="let">

```mc
let pufMerge combine a b : all k. all out. all side. (out -> out -> (side, out)) -> PureUnionFind k out -> PureUnionFind k out -> PUFResults k out side
```



<ToggleWrapper text="Code..">
```mc
let pufMerge
  : all k. all out. all side
  . (out -> out -> (side, out))
  -> PureUnionFind k out
  -> PureUnionFind k out
  -> PUFResults k out side
  = lam combine. lam a. lam b.
    pufFoldRaw
      (lam acc. lam l. lam r. pufBind acc (pufUnify combine l r))
      (lam acc. lam l. lam out. pufBind acc (pufSetOut combine l out))
      (pufEmptyResults a)
      b
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufMapAll" kind="let">

```mc
let pufMapAll cmp fk fout combine puf : all k1. all out1. all k2. all out2. all side. (k2 -> k2 -> Int) -> ((k1, Int) -> (k2, Int)) -> (out1 -> out2) -> (out2 -> out2 -> (side, out2)) -> PureUnionFind k1 out1 -> PUFResults k2 out2 side
```



<ToggleWrapper text="Code..">
```mc
let pufMapAll
  : all k1. all out1. all k2. all out2. all side
  . (k2 -> k2 -> Int)
  -> ((k1, Int) -> (k2, Int))
  -> (out1 -> out2)
  -> (out2 -> out2 -> (side, out2))
  -> PureUnionFind k1 out1
  -> PUFResults k2 out2 side
  = lam cmp. lam fk. lam fout. lam combine. lam puf.
    pufFoldRaw
      (lam acc. lam l. lam r. pufBind acc (pufUnify combine (fk l) (fk r)))
      (lam acc. lam l. lam out. pufBind acc (pufSetOut combine (fk l) (fout out)))
      (pufEmptyResults (mapEmpty cmp))
      puf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufMapOut" kind="let">

```mc
let pufMapOut f puf : all k. all out1. all out2. (out1 -> out2) -> PureUnionFind k out1 -> PureUnionFind k out2
```



<ToggleWrapper text="Code..">
```mc
let pufMapOut
  : all k. all out1. all out2
  . (out1 -> out2)
  -> PureUnionFind k out1
  -> PureUnionFind k out2
  = lam f. lam puf.
    let f = lam acc. lam k. lam v. switch v.content
      case PUFLink x then mapInsert k {level = v.level, content = PUFLink x} acc
      case PUFEmpty _ then mapInsert k {level = v.level, content = PUFEmpty ()} acc
      case PUFOut out then mapInsert k {level = v.level, content = PUFOut (f out)} acc
      end in
    mapFoldWithKey f (mapEmpty (mapGetCmpFun puf)) puf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufFilterPartitions" kind="let">

```mc
let pufFilterPartitions shouldKeep puf : all k. all out. ([(k, Int)] -> Option out -> [(k, Int)]) -> PureUnionFind k out -> {puf: PureUnionFind k out, substituted: Map k (k, Int)}
```



<ToggleWrapper text="Code..">
```mc
let pufFilterPartitions
  : all k. all out
  . ([(k, Int)] -> Option out -> [(k, Int)])
  -> PureUnionFind k out
  -> {puf : PureUnionFind k out, substituted : Map k (k, Int)}
  = lam shouldKeep. lam puf.
    -- NOTE(vipa, 2023-10-14): Here we know, by construction, that the
    -- extra outputs in PUFResult are empty, so we just access \\`puf\\`
    -- and call it a day.
    let cmp = mapGetCmpFun puf in
    let f = lam acc. lam k. lam kX.
      let x = _pufUnwrap (k, kX.level) puf in
      { partition = mapInsertWith concat x.k [(k, kX.level)] acc.partition
      , outs = match kX.content with PUFOut out
        then mapInsert k out acc.outs
        else acc.outs
      } in
    let data = mapFoldWithKey f {partition = mapEmpty cmp, outs = mapEmpty cmp} puf in
    let f = lam acc. lam k. lam equals.
      let out = mapLookup k data.outs in
      let toKeep = shouldKeep equals out in
      let puf =
        match toKeep with toKeep & ([center] ++ ks) then
          let puf = foldl
            (lam acc. lam k2. (pufUnify (lam. lam. error "compiler error in pufFilter unify") center k2 acc).puf)
            acc.puf
            ks in
          match out with Some out
          then (pufSetOut (lam. lam. error "compiler error in pufFilter setOut") center out puf).puf
          else puf
        else acc.puf in
      let substituted =
        let target = match toKeep with [target] ++ _
          then target
          else optionGetOrElse
            (lam. error "Compiler error: empty partition in pufFilter")
            (min (lam a. lam b. subi a.1 b.1) equals) in
        let invariant = setInsert target.0 (setOfSeq cmp (map (lam x. x.0) toKeep)) in
        let f = lam acc. lam x. if mapMem x.0 invariant
          then acc
          else mapInsert x.0 target acc in
        foldl f acc.substituted equals in
      {puf = puf, substituted = substituted} in
    mapFoldWithKey f {puf = pufEmpty cmp, substituted = mapEmpty cmp} data.partition
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufFilterFunction" kind="let">

```mc
let pufFilterFunction shouldKeep puf : all k. all out. ((k, Int) -> Bool) -> PureUnionFind k out -> PureUnionFind k out
```



<ToggleWrapper text="Code..">
```mc
let pufFilterFunction
  : all k. all out
  . ((k, Int) -> Bool)
  -> PureUnionFind k out
  -> PureUnionFind k out
  = lam shouldKeep. lam puf.
    (pufFilterPartitions (lam ks. lam. filter shouldKeep ks) puf).puf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pufFilter" kind="let">

```mc
let pufFilter level ks puf : all k. all out. Int -> Set k -> PureUnionFind k out -> PureUnionFind k out
```



<ToggleWrapper text="Code..">
```mc
let pufFilter
  : all k. all out
  . Int
  -> Set k
  -> PureUnionFind k out
  -> PureUnionFind k out
  = lam level. lam ks. lam puf.
    let shouldKeep = lam pair.
      if lti pair.1 level then true
      else setMem pair.0 ks in
    pufFilterFunction shouldKeep puf
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

use TestLang in

let a = nameSym "a" in
let b = nameSym "b" in

let wa =
  TyMetaVar {info = NoInfo (),
             contents = ref (Unbound {ident = a,
                                      level = 0,
                                      kind  = Mono ()})} in
let wb =
  TyMetaVar {info = NoInfo (),
             contents = ref (Unbound {ident = b,
                                      level = 0,
                                      kind  = Mono ()})} in
let testUnify = unifyPure (emptyUnification ()) in
let mkUni = lam eqs. optionFoldlM (lam uni. lam pair. unifyPure uni pair.0 pair.1) (emptyUnification ()) eqs in
let uniEq = lam a. lam b. if uniImplies a b then uniImplies b a else false in
let unifyEq = optionEq uniEq in

utest testUnify tyint_ tyint_ with mkUni [] using unifyEq in

utest testUnify tybool_ tyint_ with None () using unifyEq in

utest testUnify wa tyint_ with testUnify tyint_ wa using unifyEq in

utest testUnify (tyarrow_ wa wb) (tyarrow_ tyint_ tybool_)
  with mkUni [(wa, tyint_), (wb, tybool_)]
  using unifyEq
in

utest testUnify (tyarrow_ wa wa) (tyarrow_ tyint_ tybool_)
  with None ()
  using unifyEq
in

utest testUnify (tyarrow_ wa tybool_) (tyarrow_ wb wb)
  with mkUni [(wa, tybool_), (wb, tybool_)]
  using unifyEq
in

utest testUnify (tytuple_ [wa, wb]) (tytuple_ [wa, wa])
  with mkUni [(wb, wa)]
  using unifyEq
in

-- TODO(vipa, 2023-12-06): Regression that's a bit more annoying to
-- deal with in the current system: we loop forever on cyclic types

-- utest testUnify (tytuple_ [wa, wa]) (tytuple_ [tyseq_ wa, tyseq_ (tyseq_ wa)])
--   with mkUni [(wa, tyseq_ wa)]
--   using unifyEq
-- in

()
```
</ToggleWrapper>
</DocBlock>

