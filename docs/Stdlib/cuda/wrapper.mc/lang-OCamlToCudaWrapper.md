import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OCamlToCudaWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="_generateOCamlToCudaWrapperStmts" kind="sem">

```mc
sem _generateOCamlToCudaWrapperStmts : PMExprCWrapper_CWrapperEnv -> CExprTypeAst_CExpr -> Name -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateOCamlToCudaWrapperStmts env src dstIdent =
  | CudaSeqRepr t ->
    let seqInitExpr =
      match t.ty with CTyPtr {ty = ty} then
        let sizeExpr = CESizeOfType {ty = ty} in
        Some (CECast {ty = t.ty, rhs = CEApp {fun = _malloc, args = [sizeExpr]}})
      else None () in
    let seqDefStmt = CSDef {
      ty = t.ty, id = Some dstIdent,
      init = optionMap (lam e. CIExpr {expr = e}) seqInitExpr} in
    let dst = CEVar {id = dstIdent} in
    let seqLenExpr = _accessMember t.ty dst _seqLenKey in
    let setLenStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = seqLenExpr, rhs = _wosize src}} in
    let elemTy = t.elemTy in
    let sizeExpr = CEBinOp {
      op = COMul (),
      lhs = _wosize src,
      rhs = CESizeOfType {ty = elemTy}} in
    let allocSeqStmt = CSExpr {expr = CEApp {
      fun = _cudaMallocManaged,
      args = [
        CEUnOp {op = COAddrOf (), arg = _accessMember t.ty dst _seqKey},
        sizeExpr]}} in

    let iterIdent = nameSym "i" in
    let iter = CEVar {id = iterIdent} in
    let iterDefStmt = CSDef {
      ty = CTyInt64 (), id = Some iterIdent,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let fieldDstExpr = CEBinOp {
      op = COSubScript (),
      lhs = _accessMember t.ty dst _seqKey,
      rhs = iter} in
    let fieldUpdateStmts =
      match elemTy with CTyFloat _ | CTyDouble _ then
        [ CSExpr {expr = CEBinOp {
            op = COAssign (),
            lhs = fieldDstExpr,
            rhs = CECast {
              ty = elemTy,
              rhs = CEApp {
                fun = _getIdentExn "Double_field",
                args = [src, iter]}}}} ]
      else
        let fieldId = nameSym "cuda_seq_temp" in
        let fieldExpr = CEApp {fun = _getIdentExn "Field", args = [src, iter]} in
        let fieldDefStmt = CSDef {
          ty = elemTy, id = Some fieldId,
          init = Some (CIExpr {expr = fieldExpr})} in
        let stmts = _generateOCamlToCudaWrapperStmts env fieldExpr fieldId t.data in
        let fieldUpdateStmt = CSExpr {expr = CEBinOp {
          op = COAssign (),
          lhs = fieldDstExpr,
          rhs = CEVar {id = fieldId}}} in
        snoc stmts fieldUpdateStmt in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = iter,
      rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let dataCopyLoopStmt = CSWhile {
      cond = CEBinOp {op = COLt (), lhs = iter, rhs = seqLenExpr},
      body = snoc fieldUpdateStmts iterIncrementStmt} in
    [ seqDefStmt, setLenStmt, allocSeqStmt, _cudaErrorCheckStmt, iterDefStmt, dataCopyLoopStmt ]
  | CudaTensorRepr t ->
    match env.targetEnv with CudaTargetEnv cenv in
    let bigarrayValId = _getIdentExn "Caml_ba_array_val" in
    let dst = CEVar {id = dstIdent} in
    let tensorDefStmt = CSDef {ty = t.ty, id = Some dstIdent, init = None ()} in
    let setTensorIdStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = _accessMember t.ty dst _tensorIdKey,
      rhs = CEVar {id = _tensorCountId}}} in
    let incrementTensorCountStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = _tensorCountId},
      rhs = CEBinOp {
        op = COAdd (),
        lhs = CEVar {id = _tensorCountId},
        rhs = CEInt {i = 1}}}} in

    let tensorIdExpr = _accessMember t.ty dst _tensorIdKey in
    let intervalExpr = CEBinOp {
      op = COSubScript (),
      lhs = CEVar {id = _tensorIntervalsId},
      rhs = tensorIdExpr} in
    let setTensorRankStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = _accessMember t.ty dst _tensorRankKey,
      rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalRank}}} in
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let iterInitStmt = CSDef {
      ty = CTyInt64 (), id = Some iterId,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let updateDimsStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (),
        lhs = _accessMember t.ty dst _tensorDimsKey,
        rhs = iter},
      rhs = CEBinOp {
        op = COSubScript (),
        lhs = CEMember {lhs = intervalExpr, id = _tensorIntervalDims},
        rhs = iter}}} in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = iter,
      rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let updateDimsLoopStmt = CSWhile {
      cond = CEBinOp {
        op = COLt (), lhs = iter,
        rhs = _accessMember t.ty dst _tensorRankKey},
      body = [updateDimsStmt, iterIncrementStmt]} in
    let setTensorSizeStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = _accessMember t.ty dst _tensorSizeKey,
      rhs = CEBinOp {
        op = COSub (),
        lhs = CEMember {lhs = intervalExpr, id = _tensorIntervalEnd},
        rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalBegin}}}} in
    let topMapAccessExpr = CEBinOp {
      op = COSubScript (),
      lhs = CEVar {id = _tensorTopMapId},
      rhs = tensorIdExpr} in
    let mainTensorsExpr = CEBinOp {
      op = COSubScript (),
      lhs = CEVar {id = _tensorTopsId},
      rhs = topMapAccessExpr} in
    let offsetExpr = CEBinOp {
      op = COSub (),
      lhs = CEMember {lhs = intervalExpr, id = _tensorIntervalBegin},
      rhs = CECast {
        ty = CTyInt64 (),
        rhs = CEMember {lhs = mainTensorsExpr, id = _topTensorOCaml}}} in
    let setTensorDataStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = _accessMember t.ty dst _tensorDataKey,
      rhs = CECast {
        ty = CTyPtr {ty = t.elemTy},
        rhs = CEBinOp {
          op = COAdd (),
          lhs = CECast {
            ty = CTyInt64 (),
            rhs = CEMember {lhs = mainTensorsExpr, id = _topTensorCuda}},
          rhs = offsetExpr}}}} in
    [ tensorDefStmt, setTensorIdStmt, incrementTensorCountStmt
    , setTensorRankStmt, iterInitStmt, updateDimsLoopStmt, setTensorSizeStmt
    , setTensorDataStmt ]
  | CudaRecordRepr t ->
    let dst = CEVar {id = dstIdent} in
    let generateMarshallingField : [CStmt] -> (CDataRepr, Int) -> [CStmt] =
      lam acc. lam fieldIdx.
      match fieldIdx with (field, idx) in
      let valueType = CTyVar {id = _getIdentExn "value"} in
      let srcExpr = CEApp {
        fun = _getIdentExn "Field",
        args = [src, CEInt {i = idx}]} in
      let labelId : Name = nameNoSym (sidToString (get t.labels idx)) in
      let fieldDstIdent = nameSym "cuda_rec_field" in
      let innerStmts = _generateOCamlToCudaWrapperStmts env srcExpr fieldDstIdent field in
      let fieldUpdateStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = _accessMember t.ty dst labelId,
        rhs = CEVar {id = fieldDstIdent}}} in
      join [acc, innerStmts, [fieldUpdateStmt]]
    in
    let indexedFields = create (length t.fields) (lam i. (get t.fields i, i)) in
    let recordInitExpr =
      match t.ty with CTyPtr {ty = ty} then
        let sizeExpr = CESizeOfType {ty = ty} in
        Some (CECast {ty = t.ty, rhs = CEApp {fun = _malloc, args = [sizeExpr]}})
      else None () in
    let recordDefStmt = CSDef {
      ty = t.ty, id = Some dstIdent,
      init = optionMap (lam e. CIExpr {expr = e}) recordInitExpr} in
    cons
      recordDefStmt
      (foldl generateMarshallingField [] indexedFields)
  | CudaDataTypeRepr t ->
    let sizeExpr = CESizeOfType {ty = t.ty} in
    let tagValExpr = CEApp {fun = nameNoSym "Tag_val", args = [src]} in
    let unknownTagStmt = CSExpr {expr = CEApp {
      fun = _printf,
      args = [
        CEString {s = "Unknown constructor with tag %d\n"},
        tagValExpr]}} in
    let dst = CEVar {id = dstIdent} in
    let dstAllocStmt = CSDef {
      ty = t.ty, id = Some dstIdent,
      init = Some (CIExpr {expr = CECast {
        ty = t.ty,
        rhs = CEApp {
          fun = _malloc,
          args = [CESizeOfType {ty = _stripPointer t.ty}]}}})} in
    let dst = CEVar {id = dstIdent} in
    -- NOTE(larshum, 2022-03-29): Use a counter to keep track of which
    -- constructor we are currently at.
    let counter = ref 0 in
    let constructorInitStmt =
      mapFoldWithKey
        (lam acc : CStmt. lam constrId : Name. lam v : (CType, CDataRepr).
          match v with (constrTy, constrData) in
          let setConstrStmt = CSExpr {expr = CEBinOp {
            op = COAssign (),
            lhs = CEArrow {lhs = dst, id = _constrKey},
            rhs = CEVar {id = constrId}}} in
          let innerId = nameSym "cuda_constr_inner_tmp" in
          let getFieldFirst : CExpr -> CExpr = lam expr.
            CEApp {fun = _getIdentExn "Field", args = [expr, CEInt {i = 0}]} in
          let srcExpr =
            match constrData with CudaRecordRepr _ then src
            else getFieldFirst src in
          let setTempStmts =
            _generateOCamlToCudaWrapperStmts env srcExpr innerId constrData in
          let setValueStmt = CSExpr {expr = CEBinOp {
            op = COAssign (),
            lhs = CEArrow {lhs = dst, id = constrId},
            rhs = CEVar {id = innerId}}} in
          let body = join [[setConstrStmt], setTempStmts, [setValueStmt]] in
          let count = deref counter in
          (modref counter (addi count 1));
          CSIf {
            cond = CEBinOp {
              op = COEq (),
              lhs = tagValExpr,
              rhs = CEInt {i = count}},
            thn = body, els = [acc]})
        unknownTagStmt t.constrs in
    [dstAllocStmt, constructorInitStmt]
  | CudaBaseTypeRepr t ->
    [ CSDef {ty = t.ty, id = Some dstIdent, init = Some (CIExpr {expr = CEApp {
        fun = ocamlToCConversionFunctionIdent t.ty,
        args = [src]}})} ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateOCamlToCudaWrapperArg" kind="sem">

```mc
sem _generateOCamlToCudaWrapperArg : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt] -> PMExprCWrapper_ArgData -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateOCamlToCudaWrapperArg env acc =
  | {mexprIdent = mid, copyStatus = cs, gpuIdent = gid, cData = cdata} ->
    let src = CEVar {id = mid} in
    concat acc (_generateOCamlToCudaWrapperStmts env src gid cdata)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateOCamlToCudaWrapper" kind="sem">

```mc
sem generateOCamlToCudaWrapper : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateOCamlToCudaWrapper =
  | env ->
    let resetTensorCountStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = _tensorCountId}, rhs = CEInt {i = 0}}} in
    let freeTopMap = CSExpr {expr = CEApp {
      fun = _free, args = [CEVar {id = _tensorTopMapId}]}} in
    let freeIntervals = CSExpr {expr = CEApp {
      fun = _free, args = [CEVar {id = _tensorIntervalsId}]}} in
    join [ [resetTensorCountStmt]
         , foldl (_generateOCamlToCudaWrapperArg env) [] env.arguments
         , [freeTopMap, freeIntervals] ]
```
</ToggleWrapper>
</DocBlock>

