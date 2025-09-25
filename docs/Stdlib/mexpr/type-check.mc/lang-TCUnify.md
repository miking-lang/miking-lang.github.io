import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TCUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unify" kind="sem">

```mc
sem unify : TCEnv -> [Info] -> Ast_Type -> Ast_Type -> ()
```

<Description>{`Unify the types \`ty1' and \`ty2', where  
\`ty1' is the expected type of an expression, and  
\`ty2' is the inferred type of the expression.  
Modifies the types in place.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unify (tcenv : TCEnv) (info : [Info]) (ty1 : Type) =
  | ty2 ->
    recursive let u : () -> Unifier () = lam.
      { empty = (),
        combine = lam. lam. (),
        unify = lam env. lam ty1. lam ty2. unifyMeta (u ()) tcenv info env (ty1, ty2),
        unifyRepr = lam env. lam l. lam r. unifyReprs tcenv.reptypes.reprScope tcenv.reptypes.delayedReprUnifications l r,
        err = lam err. unificationError [err] info ty1 ty2
      } in
    let env : UnifyEnv = {
      boundNames = biEmpty,
      wrappedLhs = ty1,
      wrappedRhs = ty2
    } in
    unifyTypes (u ()) env (ty1, ty2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyMeta" kind="sem">

```mc
sem unifyMeta : Unify_Unifier () -> TCEnv -> [Info] -> Unify_UnifyEnv -> (Ast_Type, Ast_Type) -> ()
```

<Description>{`unifyMeta unifies a metavariable with a given type, in a side\-effecting way.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyMeta u tcenv info env =
  | _ -> error "Left hand side of unifyMeta input not a TyMetaVar!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheck" kind="sem">

```mc
sem unifyCheck : TCEnv -> [Info] -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```

<Description>{`unifyCheck is called before a variable \`tv' is unified with another type.  
Performs multiple tasks in one traversal:  
\- Occurs check  
\- Update level fields of MetaVars  
\- If \`tv' is monomorphic, ensure it is not unified with a polymorphic type  
\- If \`tv' is unified with a free type variable, ensure no capture occursNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyCheck env info tv =
  | ty -> unifyCheckType env info (setEmpty nameCmp) tv ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheckType" kind="sem">

```mc
sem unifyCheckType : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyCheckType env info boundVars tv =
  | ty -> unifyCheckBase env info boundVars tv (unwrapType ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheckBase" kind="sem">

```mc
sem unifyCheckBase : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Type -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyCheckBase env info boundVars tv =
  | ty ->
    sfold_Type_Type (lam. lam ty. unifyCheckType env info boundVars tv ty) () ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyCheckKind" kind="sem">

```mc
sem unifyCheckKind : TCEnv -> [Info] -> Set Name -> MetaVarTypeAst_MetaVarRec -> Ast_Kind -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyCheckKind env info boundVars tv =
  | ki ->
    sfold_Kind_Type (lam. lam ty. unifyCheckType env info boundVars tv ty) () ki
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintUnifyError" kind="sem">

```mc
sem pprintUnifyError : PprintEnv -> Unify_UnifyError -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintUnifyError env =
  | Types (l, r) ->
    match getTypeStringCode 0 env l with (env, l) in
    match getTypeStringCode 0 env r with (env, r) in
    (env, join ["types ", l, " != ", r])
  | Records (l, r) ->
    let lExclusive = strJoin ", " (map sidToString (mapKeys (mapDifference l r))) in
    let rExclusive = strJoin ", " (map sidToString (mapKeys (mapDifference r l))) in
    (env, join ["record inequality (only in left: ", lExclusive, ", only in right: ", rExclusive, ")"])
  | Kinds (Data d1, Data d2) ->
    let getDiff = lam ks1. lam ks2.
      match ks2.upper with Some upper then
        let diff = setSubtract ks1.lower (setUnion ks2.lower upper) in
        if not (setIsEmpty diff) then Some diff else None ()
      else None ()
    in
    match
      findMap
        (lam x.
          match mapLookup x.0 d2.types with Some ks then
            match getDiff x.1 ks with Some _ & diff then diff else
              getDiff ks x.1
          else None ())
        (mapBindings d1.types)
    with Some diff then
      match mapAccumL pprintConName env (setToSeq diff) with (env, diff) in
      (env, join ["these constructors required by one kind but not allowed in the other:\n",
                  strJoin " " diff, "\n"])
    else (env, "")
  | Kinds (l, r) ->
    match getKindStringCode 0 env l with (env, l) in
    match getKindStringCode 0 env r with (env, r) in
    let msg = join
      [ "kind inequality (", l, " != ", r, ")"
      ] in
    (env, msg)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unificationError" kind="sem">

```mc
sem unificationError : [Unify_UnifyError] -> [Info] -> Ast_Type -> Ast_Type -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unificationError errors info expectedType =
  | foundType ->
    let pprintEnv = pprintEnvEmpty in
    match getTypeStringCode 0 pprintEnv expectedType with (pprintEnv, expected) in
    match getTypeStringCode 0 pprintEnv foundType with (pprintEnv, found) in
    recursive
      let collectAliasesAndKinds
        :  {aliases : Map Type Type, kinds : Map Name Kind}
        -> Type
        -> {aliases : Map Type Type, kinds : Map Name Kind}
        = lam acc. lam ty.
          switch ty
          case TyAlias x then
            let acc = {acc with aliases = mapInsert x.display x.content acc.aliases} in
            let acc = collectAliasesAndKinds acc x.display in
            collectAliasesAndKinds acc x.content
          case TyMetaVar x then
            switch deref x.contents
            case Unbound u then
              let acc = {acc with kinds = mapInsert u.ident u.kind acc.kinds} in
              sfold_Kind_Type collectAliasesAndKinds acc u.kind
            case Link ty then
              collectAliasesAndKinds acc ty
            end
          case TyVar t then
            acc
          case other then
            sfold_Type_Type collectAliasesAndKinds acc ty
          end
    in
    let res =
      collectAliasesAndKinds
        { aliases = mapEmpty cmpType
        , kinds = mapEmpty nameCmp } expectedType in
    let res = collectAliasesAndKinds res foundType in
    match
      if mapIsEmpty res.kinds then (pprintEnv, "") else
        let f = lam env. lam pair.
          match pprintVarName env pair.0 with (env, l) in
          match getKindStringCode 0 env pair.1 with (env, r) in
          (env, join ["\n*   ", l, " :: ", r]) in
        match mapAccumL f pprintEnv (mapBindings res.kinds) with (pprintEnv, kinds) in
        (pprintEnv, join [join kinds, "\n"])
    with (pprintEnv, kinds) in
    match
      if mapIsEmpty res.aliases then (pprintEnv, "") else
        let f = lam env. lam pair.
          match getTypeStringCode 0 env pair.0 with (env, l) in
          match getTypeStringCode 0 env pair.1 with (env, r) in
          (env, join ["\n*   ", l, " = ", r]) in
        match mapAccumL f pprintEnv (mapBindings res.aliases) with (pprintEnv, aliases) in
        (pprintEnv, join [join aliases, "\n"])
    with (pprintEnv, aliases) in
    match mapAccumL pprintUnifyError pprintEnv errors with (pprintEnv, errors) in
    let msg = join [
      "* Expected an expression of type: ",
      expected, "\n",
      "*    Found an expression of type: ",
      found, "\n",
      if and (null kinds) (null aliases) then "" else "* where",
      kinds,
      aliases,
      "* (errors: ", strJoin ", " errors, ")\n",
      "* When type checking the expression\n"
    ] in
    errorSingle info msg
```
</ToggleWrapper>
</DocBlock>

