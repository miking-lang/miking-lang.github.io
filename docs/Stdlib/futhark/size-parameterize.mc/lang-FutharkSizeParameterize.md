import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkSizeParameterize  
  

  
  
  
## Semantics  
  

          <DocBlock title="parameterizeLengthExprs" kind="sem">

```mc
sem parameterizeLengthExprs : FutharkSizeType_SizeParameterizeEnv -> FutharkExprAst_FutExpr -> (FutharkSizeType_SizeParameterizeEnv, FutharkExprAst_FutExpr)
```

<Description>{`Transforms a length expression applied on a function parameter to make it  
instead use a size type variable of the parameter.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parameterizeLengthExprs env =
  | FEApp ({lhs = FEConst {val = FCLength ()},
            rhs = FEVar {ident = s}} & t) ->
    let lengthParamVar = lam ident. lam info.
      FEVar {ident = ident, ty = FTyInt {info = info, sz = I64 ()}, info = info}
    in
    match mapLookup s env.paramMap with Some (FTyArray tyArray) then
      match tyArray.dim with Some (NamedDim n) then
        (env, lengthParamVar n tyArray.info)
      else
        let n = nameSym "n" in
        let newParamType = FTyArray {tyArray with dim = Some (NamedDim n)} in
        let typeParam = FPSize {val = n} in
        let typeParams = mapInsert n typeParam env.typeParams in
        let env = {{env with paramMap = mapInsert s newParamType env.paramMap}
                        with typeParams = typeParams} in
        (env, lengthParamVar n tyArray.info)
    else smapAccumL_FExpr_FExpr parameterizeLengthExprs env (FEApp t)
  | t -> smapAccumL_FExpr_FExpr parameterizeLengthExprs env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lookupReplacement" kind="sem">

```mc
sem lookupReplacement : Name -> Map Name Name -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lookupReplacement id =
  | replacements ->
    match mapLookup id replacements with Some newId then
      lookupReplacement newId replacements
    else id
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateParamAliases" kind="sem">

```mc
sem eliminateParamAliases : FutharkSizeType_SizeParameterizeEnv -> Map Name Name -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateParamAliases env replacements =
  | FEVar t ->
    let paramId = lookupReplacement t.ident replacements in
    FEVar {t with ident = paramId}
  | FELet ({body = FEVar {ident = id}} & t) ->
    match mapLookup id env.typeParams with Some param then
      let paramId = futTypeParamIdent param in
      let replacements = mapInsert t.ident paramId replacements in
      eliminateParamAliases env replacements t.inexpr
    else
      FELet {t with inexpr = eliminateParamAliases env replacements t.inexpr}
  | FESizeCoercion (t & {ty = FTyArray (array & {dim = Some (NamedDim dimId)})}) ->
    let newDimId = lookupReplacement dimId replacements in
    FESizeCoercion {t with ty = FTyArray {array with dim = Some (NamedDim newDimId)}}
  | t -> smap_FExpr_FExpr (eliminateParamAliases env replacements) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectSizeParameters" kind="sem">

```mc
sem collectSizeParameters : FutharkSizeType_SizeParamMap -> (Name, FutharkTypeAst_FutType) -> FutharkSizeType_SizeParamMap
```

<Description>{`Collects all size parameters by constructing a map from each distinct size  
parameter, where multi\-dimensional array sizes are distinguished by the  
dimension. These size parameters are mapped to a unique index and a name  
representing this size type.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectSizeParameters acc =
  | (id, ty) ->
    recursive let work = lam acc. lam dimIdx. lam ty.
      match ty with FTyArray {elem = elem, dim = Some (NamedDim dimId)} then
        let sizeParam = {id = id, dim = dimIdx} in
        let posIdx = mapSize acc.sizeToIndex in
        let acc =
          { sizeToIndex = mapInsert sizeParam posIdx acc.sizeToIndex
          , indexToIdent = mapInsert posIdx dimId acc.indexToIdent } in
        work acc (addi dimIdx 1) elem
      else acc
    in work acc 1 ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parameterizeSizeEqualities" kind="sem">

```mc
sem parameterizeSizeEqualities : FutharkSizeType_SizeParamMap -> FutharkSizeType_SizeParameterizeEnv -> FutharkExprAst_FutExpr -> (FutharkSizeType_SizeParameterizeEnv, FutharkExprAst_FutExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parameterizeSizeEqualities sizeParams env =
  | FELet {body = FESizeEquality t, inexpr = inexpr} ->
    let p1 : SizeParam = {id = t.x1, dim = t.d1} in
    let p2 : SizeParam = {id = t.x2, dim = t.d2} in
    match mapLookup p1 sizeParams.sizeToIndex with Some idx1 then
      match mapLookup p2 sizeParams.sizeToIndex with Some idx2 then
        let env = {env with equalSizes = unionFindUnion env.equalSizes idx1 idx2} in
        parameterizeSizeEqualities sizeParams env inexpr
      else error "Invalid size equality constraint"
    else error "Invalid size equality constraint"
  | t -> smapAccumL_FExpr_FExpr (parameterizeSizeEqualities sizeParams) env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="includeSizeEqualityConstraints" kind="sem">

```mc
sem includeSizeEqualityConstraints : FutharkSizeType_SizeParamMap -> FutharkSizeType_SizeParameterizeEnv -> FutharkSizeType_SizeParameterizeEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem includeSizeEqualityConstraints sizeParams =
  | env ->
    recursive let work = lam dimIdx. lam id. lam ty.
      match ty with FTyArray (t & {dim = Some (NamedDim dimId)}) then
        let sizeParam = {id = id, dim = dimIdx} in
        let newDimId =
          match mapLookup sizeParam sizeParams.sizeToIndex with Some idx then
            let parent = unionFindFind env.equalSizes idx in
            if neqi idx parent then
              optionMap
                (lam v. NamedDim v)
                (mapLookup parent sizeParams.indexToIdent)
            else Some (NamedDim dimId)
          else Some (NamedDim dimId) in
        let elem = work (addi dimIdx 1) id t.elem in
        FTyArray {{t with elem = elem} with dim = newDimId}
      else ty in
    {{env with paramMap = mapMapWithKey (work 1) env.paramMap}
          with retType = work 1 (nameNoSym "") env.retType}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="identifySizeTypeReplacements" kind="sem">

```mc
sem identifySizeTypeReplacements : FutharkSizeType_SizeParamMap -> FutharkSizeType_SizeParameterizeEnv -> Map Name Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem identifySizeTypeReplacements sizeParams =
  | env ->
    let uf = env.equalSizes in
    let insertId = lam fromIdx. lam toIdx. lam acc.
      match mapLookup fromIdx sizeParams.indexToIdent with Some fromId then
        match mapLookup toIdx sizeParams.indexToIdent with Some toId then
          mapInsert fromId toId acc
        else acc
      else acc in
    recursive let work = lam acc. lam idx.
      if eqi idx uf.size then acc
      else
        let parent = unionFindFind uf idx in
        let acc =
          if eqi parent idx then acc
          else insertId idx parent acc in
        work acc (addi idx 1)
    in
    work (mapEmpty nameCmp) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parameterizeSizesDecl" kind="sem">

```mc
sem parameterizeSizesDecl : FutharkAst_FutDecl -> FutharkAst_FutDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parameterizeSizesDecl =
  | FDeclFun t ->
    let nameAndType : FutTypeParam -> (Name, FutTypeParam) = lam typeParam.
      let typeParamName =
        match typeParam with FPSize {val = id} then id
        else match typeParam with FPType {val = id} then id
        else never in
      (typeParamName, typeParam)
    in
    let emptyBiMap = { sizeToIndex = mapEmpty cmpSizeParam
                     , indexToIdent = mapEmpty subi } in
    let sizeParams : SizeParamMap =
      collectSizeParameters
        (foldl collectSizeParameters emptyBiMap t.params)
        (nameNoSym "", t.ret) in
    let env = {
      paramMap = mapFromSeq nameCmp t.params,
      typeParams = mapFromSeq nameCmp (map nameAndType t.typeParams),
      retType = t.ret,
      equalSizes = unionFindInit (mapSize sizeParams.sizeToIndex)} in
    match parameterizeLengthExprs env t.body with (env, body) in
    match parameterizeSizeEqualities sizeParams env body with (env, body) in
    let replacements = identifySizeTypeReplacements sizeParams env in
    let env = includeSizeEqualityConstraints sizeParams env in
    let body = eliminateParamAliases env replacements body in
    let params =
      map
        (lam param : (Name, FutType).
          let ty = mapFindOrElse (lam. param.1) param.0 env.paramMap in
          (param.0, ty))
        t.params in
    FDeclFun {{{{t with typeParams = mapValues env.typeParams}
                   with params = params}
                   with ret = env.retType}
                   with body = body}
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parameterizeSizes" kind="sem">

```mc
sem parameterizeSizes : FutharkAst_FutProg -> FutharkAst_FutProg
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parameterizeSizes =
  | FProg t ->
    let f = lam decl. eliminateUnnecessarySizeTypes decl in
    let decls = map parameterizeSizesDecl t.decls in
--    printLn (use FutharkPrettyPrint in printFutProg (FProg {decls = decls}));
    FProg {t with decls = map f decls}
```
</ToggleWrapper>
</DocBlock>

