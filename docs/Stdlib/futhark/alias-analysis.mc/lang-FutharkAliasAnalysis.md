import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkAliasAnalysis  
  

  
  
  
## Semantics  
  

          <DocBlock title="aliasAnalysisLetBody" kind="sem">

```mc
sem aliasAnalysisLetBody : FutharkAliasAnalysisEnv -> FutharkExprAst_FutExpr -> (AliasResult, FutharkAliasAnalysisEnv)
```



<ToggleWrapper text="Code..">
```mc
sem aliasAnalysisLetBody (env : FutharkAliasAnalysisEnv) =
  | FEVar t ->
    match mapLookup t.ident env.aliases with Some result then
      (result, {env with expired = setInsert t.ident env.expired})
    else (EmptyAliasResult (), env)
  | FERecord t ->
    match
      mapFoldWithKey
        (lam acc. lam k : SID. lam v : FutExpr.
          match acc with (aliasResult, env) in
          match aliasAnalysisLetBody env v with (fieldResult, env) in
          (mapInsert k fieldResult aliasResult, env))
        (mapEmpty cmpSID, env) t.fields
    with (binds, env) in
    (RecordAliasResult binds, env)
  | FEArrayAccess {array = FEVar {ident = _}, index = index} ->
    -- NOTE(larshum, 2021-11-24): This operation does not alias the accessed
    -- array.
    aliasAnalysisLetBody env index
  | FEArrayUpdate {array = FEApp {lhs = FEConst {val = FCCopy ()},
                                  rhs = FEVar {ident = updateId}},
                   value = value} ->
    match aliasAnalysisLetBody env value with (_, env) in
    let env : FutharkAliasAnalysisEnv = env in
    match mapLookup updateId env.aliases with Some result then
      if setMem updateId env.expired then (EmptyAliasResult (), env)
      else
        match result with LeafAliasResult arrayId then
          let env : FutharkAliasAnalysisEnv = env in
          -- NOTE(larshum, 2021-11-19): We only allow at most one in-place
          -- update per array alias, to simplify implementation.
          if setMem arrayId env.inPlaceUpdates then (EmptyAliasResult (), env)
          else
            let inPlaceUpdates = setInsert arrayId env.inPlaceUpdates in
            let env = {{env with inPlaceUpdates = inPlaceUpdates}
                            with expired = setInsert updateId env.expired} in
            (result, env)
        else (EmptyAliasResult (), env)
    else (EmptyAliasResult (), env)
  | FEForEach {param = (pat, FEVar {ident = accId}),
               seq = FEVar {ident = seqId}, body = body} ->
    let env =
      match mapLookup seqId env.aliases with Some (LeafAliasResult _) then
        -- NOTE(larshum, 2021-11-19): If we iterate over an array in a
        -- for-loop, it cannot be used for in-place updates within the loop, so
        -- we conservatively mark it as expired.
        {env with expired = setInsert seqId env.expired}
      else env in
    let env =
      match mapLookup accId env.aliases with Some result then
        let t = (pat, result) in
        match t with (FPNamed {ident = PName id}, LeafAliasResult _) then
          {{env with aliases = mapInsert id result env.aliases}
                with expired = setInsert accId env.expired}
        else match t with (FPRecord t, RecordAliasResult binds) then
          let env = {env with expired = setInsert accId env.expired} in
          addBindingAliasesToEnv env pat result
        else env
      else env in
    aliasAnalysisExpr env body
  | FEApp {lhs = FEConst {val = FCFlatten ()}, rhs = FEVar {ident = id}} ->
    match mapLookup id env.aliases with Some aliasResult then
      (aliasResult, env)
    else (EmptyAliasResult (), env)
  | FEArray _
  | FEApp {lhs = FEConst {val = FCIota () | FCIndices ()}}
  | FEApp {lhs = FEApp {lhs = FEConst {val = FCMap () | FCTabulate () |
                                             FCReplicate () | FCConcat ()}}}
  | FEApp {lhs = FEApp {lhs = FEApp {lhs = FEConst {val = FCMap2 ()}}}} ->
    -- NOTE(larshum, 2021-11-19): The above intrinsics introduce a fresh array,
    -- which is guaranteed not to be aliased. We create a new identifier to
    -- represent this underlying array.
    let arrayId = nameSym "" in
    (LeafAliasResult arrayId, env)
  | t ->
    -- NOTE(larshum, 2021-11-19: For other kinds of expressions, it is possible
    -- that multiple aliases of the same array are created. To be conservative,
    -- we ignore the resulting array identifiers, but update the environment to
    -- take any variables used in the expression into account.
    let f = lam env. lam t : FutExpr.
      match aliasAnalysisLetBody env t with (_, env) in
      env
    in
    let env = sfold_FExpr_FExpr f env t in
    (EmptyAliasResult (), env)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="aliasAnalysisExpr" kind="sem">

```mc
sem aliasAnalysisExpr : FutharkAliasAnalysisEnv -> FutharkExprAst_FutExpr -> (AliasResult, FutharkAliasAnalysisEnv)
```



<ToggleWrapper text="Code..">
```mc
sem aliasAnalysisExpr (env : FutharkAliasAnalysisEnv) =
  | FELet t ->
    match aliasAnalysisLetBody env t.body with (result, env) in
    let env : FutharkAliasAnalysisEnv = env in
    let env = {env with aliases = mapInsert t.ident result env.aliases} in
    aliasAnalysisExpr env t.inexpr
  | FEVar t ->
    match mapLookup t.ident env.aliases with Some result then
      if setMem t.ident env.expired then (EmptyAliasResult (), env)
      else (result, env)
    else (EmptyAliasResult (), env)
  | FERecord t ->
    match
      mapFoldWithKey
        (lam acc. lam k : SID. lam v : FutExpr.
          match acc with (aliasResult, env) in
          match aliasAnalysisLetBody env v with (fieldResult, env) in
          (mapInsert k fieldResult aliasResult, env))
        (mapEmpty cmpSID, env) t.fields
    with (binds, env) in
    (RecordAliasResult binds, env)
  | t -> (EmptyAliasResult (), env)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateCopyInArrayUpdate" kind="sem">

```mc
sem eliminateCopyInArrayUpdate : FutharkAliasAnalysisEnv -> Set Name -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem eliminateCopyInArrayUpdate (env : FutharkAliasAnalysisEnv)
                                 (safeArrays : Set Name) =
  | FEArrayUpdate ({array = FEApp {lhs = FEConst {val = FCCopy ()},
                                   rhs = FEVar ({ident = updateId} & var)}} & t) ->
    match mapLookup updateId env.aliases with Some (LeafAliasResult arrayId) then
      if setMem arrayId safeArrays then
        FEArrayUpdate {t with array = FEVar var}
      else FEArrayUpdate t
    else FEArrayUpdate t
  | t -> smap_FExpr_FExpr (eliminateCopyInArrayUpdate env safeArrays) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="aliasAnalysisDecl" kind="sem">

```mc
sem aliasAnalysisDecl : FutharkAst_FutDecl -> FutharkAst_FutDecl
```



<ToggleWrapper text="Code..">
```mc
sem aliasAnalysisDecl =
  | FDeclFun t ->
    let emptyEnv : FutharkAliasAnalysisEnv = {
      aliases = mapEmpty nameCmp,
      expired = setEmpty nameCmp,
      inPlaceUpdates = setEmpty nameCmp} in
    match aliasAnalysisExpr emptyEnv t.body with (res, env) in
    let env : FutharkAliasAnalysisEnv = env in
    -- NOTE(larshum, 2021-11-19): Use the array identifiers of the resulting
    -- term and the environment to determine which, if any, in-place array
    -- updates can have their copy expression eliminated.
    let resultIdents = setToSeq (getAliasResultIdentifiers res) in
    let safeIdents =
      foldl
        (lam acc. lam ident : Name.
          if setMem ident env.inPlaceUpdates then
            setInsert ident acc
          else acc)
        (setEmpty nameCmp) resultIdents in
    let body = eliminateCopyInArrayUpdate env safeIdents t.body in
    FDeclFun {t with body = body}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="aliasAnalysis" kind="sem">

```mc
sem aliasAnalysis : FutharkAst_FutProg -> FutharkAst_FutProg
```



<ToggleWrapper text="Code..">
```mc
sem aliasAnalysis =
  | FProg t ->
    FProg {t with decls = map aliasAnalysisDecl t.decls}
```
</ToggleWrapper>
</DocBlock>

