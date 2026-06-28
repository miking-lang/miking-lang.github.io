import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkSizeTypeEliminate  
  

  
  
  
## Semantics  
  

          <DocBlock title="_incrementUseCount" kind="sem">

```mc
sem _incrementUseCount : Map Name Int -> Name -> Map Name Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _incrementUseCount typeParamUseCount =
  | typeParamId ->
    optionGetOrElse
      (lam. typeParamUseCount)
      (optionMap
        (lam count. mapInsert typeParamId (addi count 1) typeParamUseCount)
        (mapLookup typeParamId typeParamUseCount))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countSizeTypeParamUsesType" kind="sem">

```mc
sem countSizeTypeParamUsesType : Map Name Int -> FutharkTypeAst_FutType -> Map Name Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem countSizeTypeParamUsesType typeParamUseCount =
  | FTyArray {elem = elem, dim = Some (NamedDim dimId)} ->
    let typeParamUseCount =
      let count =
        match mapLookup dimId typeParamUseCount with Some count then
          addi count 1
        else 1 in
      mapInsert dimId count typeParamUseCount in
    countSizeTypeParamUsesType typeParamUseCount elem
  | t -> sfold_FType_FType countSizeTypeParamUsesType typeParamUseCount t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="countSizeTypeParamUsesExpr" kind="sem">

```mc
sem countSizeTypeParamUsesExpr : Map Name Int -> FutharkExprAst_FutExpr -> Map Name Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem countSizeTypeParamUsesExpr typeParamUseCount =
  | FEVar t -> _incrementUseCount typeParamUseCount t.ident
  | FESizeCoercion {ty = FTyArray {dim = Some (NamedDim dimId)}} ->
    _incrementUseCount typeParamUseCount dimId
  | t -> sfold_FExpr_FExpr countSizeTypeParamUsesExpr typeParamUseCount t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectUnnecessarySizeTypes" kind="sem">

```mc
sem collectUnnecessarySizeTypes : FutharkAst_FutDecl -> Set Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectUnnecessarySizeTypes =
  | FDeclFun t ->
    let typeParamUseCount : Map Name Int =
      mapFromSeq nameCmp
        (foldl
          (lam acc. lam p : FutTypeParam.
            match p with FPSize {val = id} then snoc acc (id, 0)
            else acc)
          [] t.typeParams) in
    let typeParamUseCount = countSizeTypeParamUsesType typeParamUseCount t.ret in
    let paramTypes = map (lam p : (Name, FutType). p.1) t.params in
    let typeParamUseCount =
      countSizeTypeParamUsesExpr
        (foldl countSizeTypeParamUsesType typeParamUseCount paramTypes)
        t.body in
    mapFoldWithKey
      (lam acc : Set Name. lam k : Name. lam v : Int.
        if leqi v 1 then setInsert k acc else acc)
      (setEmpty nameCmp) typeParamUseCount
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stripUndefSizeParamsExpr" kind="sem">

```mc
sem stripUndefSizeParamsExpr : Set Name -> FutharkExprAst_FutExpr -> (Set Name, FutharkExprAst_FutExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem stripUndefSizeParamsExpr vars =
  | FELet t ->
    let tyBody = stripUndefSizeParamsType vars t.tyBody in
    match stripUndefSizeParamsExpr vars t.body with (vars, body) in
    let vars = setInsert t.ident vars in
    match stripUndefSizeParamsExpr vars t.inexpr with (vars, inexpr) in
    let ty = stripUndefSizeParamsType vars t.ty in
    ( vars
    , FELet {t with tyBody = tyBody, body = body, inexpr = inexpr, ty = ty} )
  | FESizeCoercion t ->
    match stripUndefSizeParamsExpr vars t.e with (vars, e) in
    let ty = stripUndefSizeParamsType vars t.ty in
    ( vars
    , FESizeCoercion {t with e = e, ty = ty} )
  | t -> smapAccumL_FExpr_FExpr stripUndefSizeParamsExpr vars t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stripUndefSizeParamsType" kind="sem">

```mc
sem stripUndefSizeParamsType : Set Name -> FutharkTypeAst_FutType -> FutharkTypeAst_FutType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem stripUndefSizeParamsType vars =
  | FTyArray (t & {dim = Some (NamedDim dimId)}) ->
    let elem = stripUndefSizeParamsType vars t.elem in
    let dim =
      if setMem dimId vars then Some (NamedDim dimId)
      else None () in
    FTyArray {t with elem = elem, dim = dim}
  | ty -> smap_FType_FType (stripUndefSizeParamsType vars) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sizeTypeParamId" kind="sem">

```mc
sem sizeTypeParamId : FutharkTypeParamAst_FutTypeParam -> [Name]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sizeTypeParamId =
  | FPSize t -> [t.val]
  | FPType _ -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeUnnecessarySizeTypes" kind="sem">

```mc
sem removeUnnecessarySizeTypes : Set Name -> FutharkAst_FutDecl -> FutharkAst_FutDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem removeUnnecessarySizeTypes unnecessaryTypeParams =
  | FDeclFun t ->
    let stripTypeParams = lam vars. lam ty : FutType.
      stripUndefSizeParamsType vars ty in
    let typeParams =
      foldl
        (lam acc. lam p : FutTypeParam.
          match p with FPSize t then
            if setMem t.val unnecessaryTypeParams then acc else snoc acc p
          else snoc acc p)
        [] t.typeParams in
    let vars =
      setUnion
        (setOfSeq nameCmp (join (map sizeTypeParamId typeParams)))
        (setOfSeq nameCmp (map (lam param. param.0) t.params)) in
    let params =
      foldl
        (lam acc. lam param : (Name, FutType).
          let paramType = stripTypeParams vars param.1 in
          snoc acc (param.0, paramType))
        [] t.params in
    let ret = stripTypeParams vars t.ret in
    match stripUndefSizeParamsExpr vars t.body with (_, body) in
    FDeclFun {t with typeParams = typeParams, params = params,
                     ret = ret, body = body}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateUnnecessarySizeTypes" kind="sem">

```mc
sem eliminateUnnecessarySizeTypes : FutharkAst_FutDecl -> FutharkAst_FutDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateUnnecessarySizeTypes =
  | (FDeclFun t) & decl ->
    let unnecessaryTypeParameters = collectUnnecessarySizeTypes decl in
    removeUnnecessarySizeTypes unnecessaryTypeParameters decl
  | FDeclType t ->
    let definedVars = setOfSeq nameCmp (join (map sizeTypeParamId t.typeParams)) in
    let ty = stripUndefSizeParamsType definedVars t.ty in
    FDeclType {t with ty = ty}
  | t -> t
```
</ToggleWrapper>
</DocBlock>

