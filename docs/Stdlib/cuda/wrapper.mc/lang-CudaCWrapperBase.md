import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaCWrapperBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CDataRepr" kind="syn">

```mc
syn CDataRepr
```



<ToggleWrapper text="Code..">
```mc
syn CDataRepr =
  | CudaSeqRepr {ident : Name, data : CDataRepr, elemTy : CType, ty : CType}
  | CudaTensorRepr {ident : Name, data : CDataRepr, elemTy : CType, ty : CType}
  | CudaRecordRepr {ident : Name, labels : [SID], fields : [CDataRepr], ty : CType}
  | CudaDataTypeRepr {ident : Name, constrs : Map Name (CType, CDataRepr), ty : CType}
  | CudaBaseTypeRepr {ident : Name, ty : CType}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TargetWrapperEnv" kind="syn">

```mc
syn TargetWrapperEnv
```



<ToggleWrapper text="Code..">
```mc
syn TargetWrapperEnv =
  | CudaTargetEnv {
      -- Provides a mapping from the name of the C wrapper function to a CUDA
      -- wrapper function which handles interaction with CUDA kernels. Note
      -- that the name of the C wrapper function must be globally unique as it
      -- will be called from the OCaml code, while that of the CUDA wrapper
      -- does not, since it is called from a function stored in the same file.
      wrapperMap : Map Name Name,
      
      -- Reversed type environment from type lifting. Enables looking up the
      -- name of the replacement of a lifted type.
      revTypeEnv : Map Type Name,

      -- C compiler environment, used to compile MExpr types to the C
      -- equivalents.
      compileCEnv : CompileCEnv,

      -- Determines the maximum rank of a tensor. Larger values result in more
      -- memory usage per tensor.
      tensorMaxRank : Int}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="lookupTypeIdent" kind="sem">

```mc
sem lookupTypeIdent : PMExprCWrapper_TargetWrapperEnv -> Ast_Type -> Option Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lookupTypeIdent env =
  | (TyRecord t) & tyrec ->
    if mapIsEmpty t.fields then None ()
    else
    match env with CudaTargetEnv cenv in
    let fields : Option [(SID, Type)] =
      optionMapM
        (lam f : (SID, Type).
          match f with (key, ty) in
          match lookupTypeIdent env ty with Some ty then
            Some (key, ty)
          else None ())
        (tyRecordOrderedFields tyrec) in
    match fields with Some fieldsSeq then
      let fields = mapFromSeq cmpSID fieldsSeq in
      let ty = TyRecord {t with fields = fields} in
      optionMap
        (lam id. nitycon_ id t.info)
        (mapLookup ty cenv.revTypeEnv)
    else None ()
  | ty & (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) ->
    let elemTy =
      match lookupTypeIdent env elemTy with Some ty then ty
      else elemTy in
    let ty =
      match ty with TySeq t then TySeq {t with ty = elemTy}
      else match ty with TyTensor t then TyTensor {t with ty = elemTy}
      else never in
    match env with CudaTargetEnv cenv in
    match mapLookup ty cenv.revTypeEnv with Some id then
      Some (nitycon_ id (infoTy ty))
    else None ()
  | ty & (TyVariant _) ->
    match env with CudaTargetEnv cenv in
    match mapLookup ty cenv.revTypeEnv with Some id then
      Some (nitycon_ id (infoTy ty))
    else None ()
  | TyAlias t -> lookupTypeIdent env t.content
  | ty -> Some ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getCudaType" kind="sem">

```mc
sem getCudaType : PMExprCWrapper_TargetWrapperEnv -> Ast_Type -> CExprTypeAst_CType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getCudaType env =
  | ty & (TyRecord {fields = fields}) ->
    match env with CudaTargetEnv cenv in
    if mapIsEmpty fields then CTyVoid ()
    else match lookupTypeIdent env ty with Some (TyCon {ident = id}) then
      if any (nameEq id) cenv.compileCEnv.ptrTypes then
        CTyPtr {ty = CTyVar {id = id}}
      else CTyVar {id = id}
    else
      errorSingle [infoTy ty]
        "Reverse type lookup failed when generating CUDA wrapper code"
  | ty & (TySeq _ | TyTensor _ | TyVariant _) ->
    match env with CudaTargetEnv cenv in
    match lookupTypeIdent env ty with Some (TyCon {ident = id}) then
      if any (nameEq id) cenv.compileCEnv.ptrTypes then
        CTyPtr {ty = CTyVar {id = id}}
      else CTyVar {id = id}
    else
      errorSingle [infoTy ty]
        "Reverse type lookup failed when generating CUDA wrapper code"
  | ty ->
    match env with CudaTargetEnv cenv in
    compileType cenv.compileCEnv ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getOcamlTensorType" kind="sem">

```mc
sem getOcamlTensorType : PMExprCWrapper_TargetWrapperEnv -> Ast_Type -> CExprTypeAst_CType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getOcamlTensorType env =
  | TyFloat _ -> CTyDouble ()
  | TyInt _ -> CTyInt64 ()
  | ty -> errorSingle [infoTy ty] "Type is not supported for CUDA tensors"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateCDataRepresentation" kind="sem">

```mc
sem _generateCDataRepresentation : PMExprCWrapper_CWrapperEnv -> Ast_Type -> PMExprCWrapper_CDataRepr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCDataRepresentation env =
  | ty & (TySeq t) ->
    match env.targetEnv with CudaTargetEnv cenv in
    let elemTy = _unwrapType cenv.compileCEnv.typeEnv t.ty in
    CudaSeqRepr {
      ident = nameSym "cuda_seq_tmp",
      data = _generateCDataRepresentation env elemTy,
      elemTy = getCudaType env.targetEnv t.ty, ty = getCudaType env.targetEnv ty}
  | ty & (TyTensor t) ->
    CudaTensorRepr {
      ident = nameSym "cuda_tensor_tmp",
      data = _generateCDataRepresentation env t.ty,
      elemTy = getCudaType env.targetEnv t.ty,
      ty = getCudaType env.targetEnv ty}
  | ty & (TyRecord t) ->
    match env.targetEnv with CudaTargetEnv cenv in
    let labels = tyRecordOrderedLabels ty in
    let fields : [CDataRepr] =
      map
        (lam label : SID.
          match mapLookup label t.fields with Some ty then
            let ty = _unwrapType cenv.compileCEnv.typeEnv ty in
            _generateCDataRepresentation env ty
          else errorSingle [t.info] "Inconsistent labels in record type")
        labels in
    CudaRecordRepr {
      ident = nameSym "cuda_rec_tmp", labels = labels, fields = fields,
      ty = getCudaType env.targetEnv ty}
  | ty & (TyVariant t) ->
    match env.targetEnv with CudaTargetEnv cenv in
    let constrs : Map Name (CType, CDataRepr) =
      mapMapWithKey
        (lam constrId : Name. lam constrTy : Type.
          let constrTy = _unwrapType cenv.compileCEnv.typeEnv constrTy in
          ( getCudaType env.targetEnv constrTy
          , _generateCDataRepresentation env constrTy ))
        t.constrs in
    CudaDataTypeRepr {
      ident = nameSym "cuda_adt_tmp", constrs = constrs,
      ty = getCudaType env.targetEnv ty}
  | ty & (TyCon _) ->
    match env.targetEnv with CudaTargetEnv cenv in
    let ty = _unwrapType cenv.compileCEnv.typeEnv ty in
    match ty with TyCon _ then errorSingle [infoTy ty] "Could not unwrap type"
    else _generateCDataRepresentation env ty
  | TyAlias t ->
    _generateCDataRepresentation env t.content
  | ty ->
    CudaBaseTypeRepr {
      ident = nameSym "cuda_tmp",
      ty = getCudaType env.targetEnv ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapTensorsToStmts" kind="sem">

```mc
sem mapTensorsToStmts : PMExprCWrapper_CWrapperEnv -> (PMExprCWrapper_CWrapperEnv -> CExprTypeAst_CExpr -> CExprTypeAst_CExpr -> [CStmtAst_CStmt]) -> CExprTypeAst_CExpr -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`Applies an operation on all tensors contained in an expression of a given  
data representation.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapTensorsToStmts env tensorFn src =
  | CudaSeqRepr t ->
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let innerSrc = CEApp {
      fun = _getIdentExn "Field",
      args = [src, iter]} in
    let stmts = mapTensorsToStmts env tensorFn innerSrc t.data in
    if null stmts then []
    else
      let iterInitStmt = CSDef {
        ty = CTyInt64 (), id = Some iterId,
        init = Some (CIExpr {expr = CEInt {i = 0}})} in
      let iterIncrementStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = iter,
        rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
      let lenExpr = CEApp {fun = _getIdentExn "Wosize_val", args = [src]} in
      let loopStmt = CSWhile {
        cond = CEBinOp {op = COLt (), lhs = iter, rhs = lenExpr},
        body = snoc stmts iterIncrementStmt} in
      [iterInitStmt, loopStmt]
  | CudaRecordRepr t ->
    foldl
      (lam acc. lam field : (SID, (Int, CDataRepr)).
        match field with (key, (idx, fieldRepr)) in
        let fieldId = nameNoSym (sidToString key) in
        let innerSrc = CEApp {
          fun = _getIdentExn "Field",
          args = [src, CEInt {i = idx}]} in
        let stmts = mapTensorsToStmts env tensorFn innerSrc fieldRepr in
        concat acc stmts)
      [] (zip t.labels (create (length t.fields) (lam i. (i, get t.fields i))))
  | CudaDataTypeRepr t ->
    let counter = ref 0 in
    mapFoldWithKey
      (lam acc. lam constrId. lam constrTyData.
        match constrTyData with (constrTy, constrData) in
        let constrExpr = _accessMember t.ty src constrId in
        let count = deref counter in
        modref counter (addi count 1);
        let stmts = mapTensorsToStmts env tensorFn constrExpr constrData in
        if null stmts then acc
        else
          [ CSIf {
              cond = CEBinOp {
                op = COEq (),
                lhs = _accessMember t.ty src _constrKey,
                rhs = CEInt {i = count}},
              thn = stmts,
              els = acc} ])
      [] t.constrs
  | CudaBaseTypeRepr _ -> []
  | CudaTensorRepr t ->
    let elemTypeId =
      match t.elemTy with CTyInt64 _ | CTyDouble _ then 0
      else match t.elemTy with CTyInt32 _ then 1
      else match t.elemTy with CTyFloat _ then 2
      else never in
    let elemType = CEInt {i = elemTypeId} in
    tensorFn env elemType src
```
</ToggleWrapper>
</DocBlock>

