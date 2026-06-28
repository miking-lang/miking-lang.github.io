import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkRecordParamLift  
  

  
  
  
## Types  
  

          <DocBlock title="ParamData" kind="type">

```mc
type ParamData : (Name, FutType)
```



<ToggleWrapper text="Code..">
```mc
type ParamData = (Name, FutType)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FunctionReplaceData" kind="type">

```mc
type FunctionReplaceData : { newType: FutType, oldParams: [ParamData], paramReplace: Map Name (Map SID ParamData) }
```



<ToggleWrapper text="Code..">
```mc
type FunctionReplaceData = {
    -- Contains the type of the function after replacing record parameters with a
    -- record field parameters.
    newType : FutType,

    -- The sequence of parameter names and type, as expected by the function
    -- prior to the record parameter lifting.
    oldParams : [ParamData],

    -- Maps the name of a replaced record parameter to the parameters of the
    -- fields that replaced it.
    paramReplace : Map Name (Map SID ParamData)
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="updateParams" kind="sem">

```mc
sem updateParams : FutharkRecordParamLift_FunctionReplaceData -> FutharkExprAst_FutExpr -> [FutharkExprAst_FutExpr] -> Info -> FutharkExprAst_FutExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateParams data target args =
  | info ->
    let data : FunctionReplaceData = data in
    let nargs = length args in
    let nparams = length data.oldParams in
    let addedArgs =
      if lti nargs nparams then
        let diff = subi nparams nargs in
        create diff (lam i.
          let idx = addi i nargs in
          let param : ParamData = get data.oldParams idx in
          FEVar {ident = nameSym "x", ty = param.1, info = info})
      else [] in
    let args = concat args addedArgs in
    let appArgs : [FutExpr] =
      join
        (map
          (lam argParam : (FutExpr, ParamData).
            let argExpr = argParam.0 in
            let param = argParam.1 in
            match mapLookup param.0 data.paramReplace with Some fields then
              mapValues
                (mapMapWithKey
                  (lam k : SID. lam v : ParamData.
                    FEProj {
                      target = argExpr, label = k, ty = v.1,
                      info = infoFutTm argExpr})
                  fields)
            else [argExpr])
          (zip args data.oldParams)) in
    let target = withTypeFutTm data.newType target in
    foldr
      (lam extraArg : FutExpr. lam acc : FutExpr.
        let info = mergeInfo (infoFutTm extraArg) (infoFutTm acc) in
        match extraArg with FEVar t then
          FELam {ident = t.ident, body = acc, info = info,
                 ty = FTyArrow {from = tyFutTm extraArg,
                                to = tyFutTm acc,
                                info = info}}
        else errorSingle [info] "")
      (_constructAppSeq target appArgs)
      addedArgs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="updateApplicationParameters" kind="sem">

```mc
sem updateApplicationParameters : Map Name FutharkRecordParamLift_FunctionReplaceData -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem updateApplicationParameters replaceMap =
  | FEVar t ->
    match mapLookup t.ident replaceMap with Some data then
      let data : FunctionReplaceData = data in
      updateParams data (FEVar t) [] t.info
    else FEVar t
  | app & (FEApp t) ->
    match _collectAppTargetAndArgs app with (target, args) in
    match target with FEVar {ident = id} then
      match mapLookup id replaceMap with Some data then
        updateParams data target args t.info
      else smap_FExpr_FExpr (updateApplicationParameters replaceMap) app
    else smap_FExpr_FExpr (updateApplicationParameters replaceMap) app
  | t -> smap_FExpr_FExpr (updateApplicationParameters replaceMap) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectRecordFields" kind="sem">

```mc
sem collectRecordFields : Map Name (Map SID FutharkRecordParamLift_ParamData) -> FutharkExprAst_FutExpr -> Map Name (Map SID FutharkRecordParamLift_ParamData)
```



<ToggleWrapper text="Code..">
```mc
sem collectRecordFields (paramReplace : Map Name (Map SID ParamData)) =
  | FEVar t ->
    if mapMem t.ident paramReplace then
      mapRemove t.ident paramReplace
    else paramReplace
  | FEApp t ->
    match t.rhs with FEVar {ident = id} then
      if mapMem id paramReplace then
        mapRemove id (collectRecordFields paramReplace t.lhs)
      else sfold_FExpr_FExpr collectRecordFields paramReplace (FEApp t)
    else sfold_FExpr_FExpr collectRecordFields paramReplace (FEApp t)
  | FEProj t ->
    match t.target with FEVar {ident = id} then
      match mapLookup id paramReplace with Some usedFields then
        let fieldId = nameSym (concat (nameGetStr id) (sidToString t.label)) in
        let usedFields = mapInsert t.label (fieldId, t.ty) usedFields in
        mapInsert id usedFields paramReplace
      else sfold_FExpr_FExpr collectRecordFields paramReplace (FEProj t)
    else sfold_FExpr_FExpr collectRecordFields paramReplace (FEProj t)
  | FERecordUpdate t ->
    match t.rec with FEVar {ident = id} then
      mapRemove id paramReplace
    else paramReplace
  | t -> sfold_FExpr_FExpr collectRecordFields paramReplace t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceProjections" kind="sem">

```mc
sem replaceProjections : Map Name (Map SID FutharkRecordParamLift_ParamData) -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
sem replaceProjections (paramReplace : Map Name (Map SID ParamData)) =
  | FEProj t ->
    match t.target with FEVar {ident = id} then
      match mapLookup id paramReplace with Some usedFields then
        match mapLookup t.label usedFields with Some data then
          let data : ParamData = data in
          FEVar {ident = data.0, ty = data.1, info = t.info}
        else
          -- NOTE(larshum 2021-10-29): This case should never be reached, as all
          -- record projections found here should also be found in the
          -- collection phase. If we were to get here, there is a bug in the
          -- implementation. What would be a good error message here?
          errorSingle [t.info] "Failed to replace record with its fields"
      else smap_FExpr_FExpr (replaceProjections paramReplace) (FEProj t)
    else smap_FExpr_FExpr (replaceProjections paramReplace) (FEProj t)
  | t -> smap_FExpr_FExpr (replaceProjections paramReplace) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftRecordParametersDecl" kind="sem">

```mc
sem liftRecordParametersDecl : Map Name FutharkRecordParamLift_FunctionReplaceData -> FutharkAst_FutDecl -> (Map Name FutharkRecordParamLift_FunctionReplaceData, FutharkAst_FutDecl)
```



<ToggleWrapper text="Code..">
```mc
sem liftRecordParametersDecl (replaceMap : Map Name FunctionReplaceData) =
  | FDeclFun t ->
    -- 1. Update calls to functions in body for which the parameters have been
    -- updated, by using the replaceMap.
    let body = updateApplicationParameters replaceMap t.body in

    -- 2. Collect record parameters of the function. Stop immediately if there
    -- are no such parameters.
    let paramReplace : Map Name (Map SID ParamData) =
      foldl
        (lam replace. lam param : (Name, FutType).
          match param.1 with FTyRecord _ then
            mapInsert param.0 (mapEmpty cmpSID) replace
          else replace)
        (mapEmpty nameCmp)
        t.params in
    if mapIsEmpty paramReplace then
      (replaceMap, FDeclFun {t with body = body})
    else
      -- 3. Collect record fields which should replace each record parameter. A
      -- record parameter should be replaced by a (subset) of its fields if it is
      -- only used in record projections. If no such parameters are found, the
      -- following steps are not necessary.
      let paramReplace = collectRecordFields paramReplace body in

      -- 4. Construct a new sequence of parameters by replacing record parameters
      -- with fields.
      let newParams : [(Name, FutType)] =
        join
          (map
            (lam param : (Name, FutType).
              match mapLookup param.0 paramReplace with Some fieldReplacements then
                map
                  (lam entry : (SID, ParamData). entry.1)
                  (mapBindings fieldReplacements)
              else [param])
            t.params) in

      -- 5. Replace applicable record projections on record parameters, in the
      -- function body, with the corresponding record field parameter.
      let newBody = replaceProjections paramReplace body in

      -- 6. Store the applied replacements of the function, so that we can
      -- easily update calls in step 1 on later functions.
      let newFunctionType =
        foldr
          (lam param : (Name, FutType). lam accType : FutType. 
            let info = mergeInfo (infoFutTy accType) (infoFutTy param.1) in
            FTyArrow {from = param.1, to = accType, info = info})
          t.ret newParams in
      let functionReplaceData = {
        newType = newFunctionType, oldParams = t.params,
        paramReplace = paramReplace} in
      let replaceMap = mapInsert t.ident functionReplaceData replaceMap in
      let declFun = FDeclFun {{t with params = newParams}
                                 with body = newBody} in
      (replaceMap, declFun)
  | t -> (replaceMap, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftRecordParameters" kind="sem">

```mc
sem liftRecordParameters : FutharkAst_FutProg -> FutharkAst_FutProg
```



<ToggleWrapper text="Code..">
```mc
sem liftRecordParameters =
  | FProg t ->
    let replaceMap : Map Name FunctionReplaceData = mapEmpty nameCmp in
    match mapAccumL liftRecordParametersDecl replaceMap t.decls
    with (_, decls) then
      FProg {t with decls = decls}
    else never
```
</ToggleWrapper>
</DocBlock>

