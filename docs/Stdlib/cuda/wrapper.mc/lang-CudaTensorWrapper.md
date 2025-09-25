import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaTensorWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateGlobalTensorTops" kind="sem">

```mc
sem generateGlobalTensorTops : MExprCCompileBase_CompileCEnv -> [CudaAst_CuTop]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateGlobalTensorTops =
  | env ->
    let dimsSize = CEInt {i = env.options.tensorMaxRank} in
    let intervalSelfRef = CTyPtr {
      ty = CTyStruct {id = Some _tensorIntervalTypeId, mem = None ()}} in
    let intervalType = CTyStruct {
      id = Some _tensorIntervalTypeId,
      mem = Some ([
        (CTyInt64 (), Some _tensorIntervalId),
        (CTyInt64 (), Some _tensorIntervalBegin),
        (CTyInt64 (), Some _tensorIntervalEnd),
        (CTyInt64 (), Some _tensorIntervalRank),
        (CTyArray {ty = CTyInt64 (), size = Some dimsSize}, Some _tensorIntervalDims),
        (intervalSelfRef, Some _tensorIntervalNext),
        (CTyInt (), Some _tensorIntervalOmitCopyTo),
        (CTyInt (), Some _tensorIntervalOmitCopyFrom),
        (CTyInt (), Some _tensorIntervalCudaElemType)])} in
    let intervalDefTop = CuTTop {
      attrs = [],
      top = CTTyDef {ty = intervalType, id = _tensorIntervalTypeId}} in
    let constVoidPtrTy = CTyConst {ty = CTyPtr {ty = CTyVoid ()}} in
    let lhs = nameSym "lhs" in
    let rhs = nameSym "rhs" in
    let l = nameSym "l" in
    let r = nameSym "r" in
    let intervalType = CTyPtr {ty = CTyVar {id = _tensorIntervalTypeId}} in
    let beginField = lam t.
      CEArrow {lhs = CEVar {id = t}, id = _tensorIntervalBegin} in
    let idField = lam t.
      CEArrow {lhs = CEVar {id = t}, id = _tensorIntervalId} in
    let intervalCmpBeginTop = CuTTop {
      attrs = [],
      top = CTFun {
        ret = CTyInt (), id = _intervalCmpBegin,
        params = [(constVoidPtrTy, lhs), (constVoidPtrTy, rhs)],
        body = [
          CSDef {
            ty = intervalType, id = Some l,
            init = Some (CIExpr {expr = CECast {
              ty = intervalType, rhs = CEVar {id = lhs}}})},
          CSDef {
            ty = intervalType, id = Some r,
            init = Some (CIExpr {expr = CECast {
              ty = intervalType, rhs = CEVar {id = rhs}}})},
          CSRet {val = Some (CEBinOp {
            op = COSub (),
            lhs = CEBinOp {op = COGt (), lhs = beginField l, rhs = beginField r},
            rhs = CEBinOp {op = COLt (), lhs = beginField l, rhs = beginField r}})}]}} in
    let intervalCmpIdTop = CuTTop {
      attrs = [],
      top = CTFun {
        ret = CTyInt (), id = _intervalCmpId,
        params = [(constVoidPtrTy, lhs), (constVoidPtrTy, rhs)],
        body = [
          CSDef {
            ty = intervalType, id = Some l,
            init = Some (CIExpr {expr = CECast {
              ty = intervalType, rhs = CEVar {id = lhs}}})},
          CSDef {
            ty = intervalType, id = Some r,
            init = Some (CIExpr {expr = CECast {
              ty = intervalType, rhs = CEVar {id = rhs}}})},
          CSRet {val = Some (CEBinOp {
            op = COSub (),
            lhs = CEBinOp {op = COGt (), lhs = idField l, rhs = idField r},
            rhs = CEBinOp {op = COLt (), lhs = idField l, rhs = idField r}})}]}} in
    let topTensorSelfRef = CTyPtr {
      ty = CTyStruct {id = Some _topTensorTypeId, mem = None ()}} in
    let topTensorType = CTyStruct {
      id = Some _topTensorTypeId,
      mem = Some ([
        (CTyInt64 (), Some _topTensorId),
        (CTyPtr {ty = CTyVoid ()}, Some _topTensorOCaml),
        (CTyPtr {ty = CTyVoid ()}, Some _topTensorCuda),
        (CTyInt64 (), Some _topTensorSize),
        (topTensorSelfRef, Some _topTensorPred),
        (CTyInt (), Some _topTensorOmitCopyTo),
        (CTyInt (), Some _topTensorOmitCopyFrom),
        (CTyInt (), Some _topTensorCudaElemType)])} in
    let topTensorDefTop = CuTTop {
      attrs = [],
      top = CTTyDef {ty = topTensorType, id = _topTensorTypeId}} in
    [intervalDefTop, intervalCmpBeginTop, intervalCmpIdTop, topTensorDefTop]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateTensorIntervalArgStmts" kind="sem">

```mc
sem _generateTensorIntervalArgStmts : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt] -> PMExprCWrapper_ArgData -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateTensorIntervalArgStmts env acc =
  | {mexprIdent = mid, copyStatus = cs, gpuIdent = gid, cData = cdata} ->
    let incrementStmt = lam id.
      CSExpr {expr = CEBinOp {
        op = COAssign (), lhs = CEVar {id = id},
        rhs = CEBinOp {
          op = COAdd (), lhs = CEVar {id = id}, rhs = CEInt {i = 1}}}} in
    let tensorFn = lam env. lam elemType. lam tensor.
      let tid = nameSym "t" in
      let t = CEVar {id = tid} in
      let intervalType = CTyVar {id = _tensorIntervalTypeId} in
      let intervalInitStmt = CSDef {
        ty = CTyPtr {ty = intervalType}, id = Some tid,
        init = Some (CIExpr {expr = CECast {
          ty = CTyPtr {ty = intervalType},
          rhs = CEApp {
            fun = _malloc, args = [CESizeOfType {ty = intervalType}]}}})} in
      let intervalIdStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalId},
        rhs = CEVar {id = _tensorCountId}}} in
      let tensorCountIncrement = incrementStmt _tensorCountId in
      let intervalRankStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalRank},
        rhs = CEArrow {
          lhs = CEApp {
            fun = _getIdentExn "Caml_ba_array_val",
            args = [tensor]},
          id = _bigarrayNumDimsKey}}} in
      let intervalBeginStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalBegin},
        rhs = CECast {
          ty = CTyInt64 (),
          rhs = CEApp {
            fun = _getIdentExn "Caml_ba_data_val",
            args = [tensor]}}}} in
      let iterId = nameSym "i" in
      let iter = CEVar {id = iterId} in
      let iterInitStmt = CSDef {
        ty = CTyInt64 (), id = Some iterId,
        init = Some (CIExpr {expr = CEInt {i = 0}})} in
      let sizeId = nameSym "n" in
      let size = CEVar {id = sizeId} in
      let sizeInitStmt = CSDef {
        ty = CTyInt64 (), id = Some sizeId,
        init = Some (CIExpr {expr = CESizeOfType {ty = CTyInt64 ()}})} in

      let dimsSetStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEBinOp {
          op = COSubScript (),
          lhs = CEArrow {lhs = t, id = _tensorIntervalDims},
          rhs = iter},
        rhs = CEBinOp {
          op = COSubScript (),
          lhs = CEArrow {
            lhs = CEApp {
              fun = _getIdentExn "Caml_ba_array_val",
              args = [tensor]},
            id = _bigarrayDimKey},
          rhs = iter}}} in
      let multiplySizeStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = size,
        rhs = CEBinOp {
          op = COMul (),
          lhs = size,
          rhs = CEBinOp {
            op = COSubScript (),
            lhs = CEArrow {
              lhs = CEApp {
                fun = _getIdentExn "Caml_ba_array_val",
                args = [tensor]},
              id = _bigarrayDimKey},
            rhs = iter}}}} in
      let iterIncrement = incrementStmt iterId in
      let loopCond = CEBinOp {
        op = COLt (),
        lhs = iter,
        rhs = CEArrow {
          lhs = CEApp {
            fun = _getIdentExn "Caml_ba_array_val",
            args = [tensor]},
          id = _bigarrayNumDimsKey}} in
      let dimLoopStmt = CSWhile {
        cond = loopCond,
        body = [dimsSetStmt, multiplySizeStmt, iterIncrement]} in

      let intervalEndStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalEnd},
        rhs = CEBinOp {
          op = COAdd (),
          lhs = CECast {
            ty = CTyInt64 (),
            rhs = CEArrow {lhs = t, id = _tensorIntervalBegin}},
          rhs = size}}} in
      let headNextStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = CEVar {id = _tensorHeadId}, id = _tensorIntervalNext},
        rhs = t}} in
      let intervalOmitCopyToStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalOmitCopyTo},
        rhs = CEInt {i = if copyStatusTo cs then 0 else 1}}} in
      let intervalOmitCopyFromStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalOmitCopyFrom},
        rhs = CEInt {i = if copyStatusFrom cs then 0 else 1}}} in
      let intervalElementTypeStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEArrow {lhs = t, id = _tensorIntervalCudaElemType},
        rhs = elemType}} in
      let headUpdateStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEVar {id = _tensorHeadId}, rhs = t}} in
      [ intervalInitStmt, intervalIdStmt, tensorCountIncrement
      , intervalRankStmt, intervalBeginStmt, iterInitStmt, sizeInitStmt
      , dimLoopStmt, intervalEndStmt, headNextStmt, intervalOmitCopyToStmt
      , intervalOmitCopyFromStmt, intervalElementTypeStmt, headUpdateStmt ]
    in
    let src = CEVar {id = mid} in
    concat acc (mapTensorsToStmts env tensorFn src cdata)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateTensorIntervalStmts" kind="sem">

```mc
sem generateTensorIntervalStmts : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateTensorIntervalStmts =
  | env ->
    let counterInit = CSDef {
      ty = CTyInt64 (), id = Some _tensorCountId,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let tensorIntervalType = CTyVar {id = _tensorIntervalTypeId} in
    let startInterval = CSDef {
      ty = tensorIntervalType, id = Some _tensorStartId,
      init = None ()} in
    let start = CEVar {id = _tensorStartId} in
    let startIntervalNextNull = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEMember {lhs = start, id = _tensorIntervalNext},
      rhs = CEVar {id = _getIdentExn "NULL"}}} in
    let headInitStmt = CSDef {
      ty = CTyPtr {ty = tensorIntervalType}, id = Some _tensorHeadId,
      init = Some (CIExpr {expr = CEUnOp {op = COAddrOf (), arg = start}})} in
    concat
      [counterInit, startInterval, startIntervalNextNull, headInitStmt]
      (foldl (_generateTensorIntervalArgStmts env) [] env.arguments)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateIntervalSort" kind="sem">

```mc
sem generateIntervalSort : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateIntervalSort =
  | env ->
    let intervalType = CTyVar {id = _tensorIntervalTypeId} in
    let intervalsArrayInitStmt = CSDef {
      ty = CTyPtr {ty = intervalType}, id = Some _tensorIntervalsId,
      init = Some (CIExpr {expr = CECast {
        ty = CTyPtr {ty = intervalType},
        rhs = CEApp {
          fun = _malloc,
          args = [CEBinOp {
            op = COMul (),
            lhs = CEVar {id = _tensorCountId},
            rhs = CESizeOfType {ty = intervalType}}]}}})} in
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let iterStmt = CSDef {
      ty = CTyInt64 (), id = Some iterId,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let setHeadNullStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = CEVar {id = _tensorHeadId}, id = _tensorIntervalNext},
      rhs = CEVar {id = _getIdentExn "NULL"}}} in
    let currId = nameSym "curr" in
    let currIntervalStmt = CSDef {
      ty = CTyPtr {ty = intervalType}, id = Some currId,
      init = Some (CIExpr {expr = CEMember {
        lhs = CEVar {id = _tensorStartId},
        id = _tensorIntervalNext}})} in

    let intervalsSetStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (),
        lhs = CEVar {id = _tensorIntervalsId},
        rhs = iter},
      rhs = CEUnOp {
        op = CODeref (),
        arg = CEVar {id = currId}}}} in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = iter,
      rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let tempId = nameSym "temp_ptr" in
    let tempIntervalPtrStmt = CSDef {
      ty = CTyPtr {ty = CTyVar {id = _tensorIntervalTypeId}},
      id = Some tempId,
      init = Some (CIExpr {expr = CEVar {id = currId}})} in
    let nextStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = CEVar {id = currId},
      rhs = CEArrow {
        lhs = CEVar {id = currId},
        id = _tensorIntervalNext}}} in
    let freeTempPtrStmt = CSExpr {expr = CEApp {
      fun = _free, args = [CEVar {id = tempId}]}} in
    let loopStmt = CSWhile {
      cond = CEVar {id = currId},
      body = [ intervalsSetStmt, iterIncrementStmt, tempIntervalPtrStmt
             , nextStmt, freeTempPtrStmt ]} in

    let qsortStmt = CSExpr {expr = CEApp {
      fun = _getIdentExn "qsort",
      args = [
        CEVar {id = _tensorIntervalsId},
        CEVar {id = _tensorCountId},
        CESizeOfType {ty = CTyVar {id = _tensorIntervalTypeId}},
        CEVar {id = _intervalCmpBegin}]}} in

    [ intervalsArrayInitStmt, iterStmt, setHeadNullStmt, currIntervalStmt
    , loopStmt, qsortStmt ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateTopTensorConstruction" kind="sem">

```mc
sem generateTopTensorConstruction : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateTopTensorConstruction =
  | env ->
    let incrementStmt = lam var.
      CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = var,
        rhs = CEBinOp {op = COAdd (), lhs = var, rhs = CEInt {i = 1}}}} in
    let sizeExpr = CEBinOp {
      op = COMul (), lhs = CEVar {id = _tensorCountId},
      rhs = CESizeOfType {ty = CTyInt64 ()}} in
    let topMapInitStmt = CSDef {
      ty = CTyPtr {ty = CTyInt64 ()}, id = Some _tensorTopMapId,
      init = Some (CIExpr {expr = CECast {
        ty = CTyPtr {ty = CTyInt64 ()},
        rhs = CEApp {fun = _getIdentExn "malloc", args = [sizeExpr]}}})} in
    let mainCountId = nameSym "top_count" in
    let mainCount = CEVar {id = mainCountId} in
    let mainCountStmt = CSDef {
      ty = CTyInt64 (), id = Some mainCountId,
      init = Some (CIExpr {expr = CEVar {id = _tensorCountId}})} in
    let fstId = nameSym "fst" in
    let fst = CEVar {id = fstId} in
    let topTensorType = CTyVar {id = _topTensorTypeId} in
    let fstTopTensorDeclStmt = CSDef {
      ty = CTyPtr {ty = topTensorType}, id = Some fstId, init = None ()} in
    let stackId = nameSym "stack" in
    let stack = CEVar {id = stackId} in
    let tensorStackInitStmt = CSDef {
      ty = CTyPtr {ty = topTensorType}, id = Some stackId,
      init = Some (CIExpr {expr = CEVar {id = _getIdentExn "NULL"}})} in
    let fstInitStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = fst,
      rhs = CECast {
        ty = CTyPtr {ty = topTensorType},
        rhs = CEApp {
          fun = _malloc,
          args = [CESizeOfType {ty = topTensorType}]}}}} in
    let stackInitStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = stack, rhs = fst}} in
    let fstIdSetStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _tensorIntervalId},
      rhs = CEVar {id = mainCountId}}} in
    let firstIntervalExpr = CEBinOp {
      op = COSubScript (),
      lhs = CEVar {id = _tensorIntervalsId},
      rhs = CEInt {i = 0}} in
    let topMapSetStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (),
        lhs = CEVar {id = _tensorTopMapId},
        rhs = CEMember {lhs = firstIntervalExpr, id = _topTensorId}},
      rhs = CEInt {i = 0}}} in
    let incrementMainStmt = incrementStmt mainCount in
    let fstOCamlStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _topTensorOCaml},
      rhs = CECast {
        ty = CTyPtr {ty = CTyVoid ()},
        rhs = CEMember {
          lhs = firstIntervalExpr, id = _tensorIntervalBegin}}}} in
    let fstSizeStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _topTensorSize},
      rhs = CEBinOp {
        op = COSub (),
        lhs = CECast {
          ty = CTyInt64 (),
          rhs = CEMember {lhs = firstIntervalExpr, id = _tensorIntervalEnd}},
        rhs = CECast {
          ty = CTyInt64 (),
          rhs = CEMember {
            lhs = firstIntervalExpr, id = _tensorIntervalBegin}}}}} in
    let fstPredStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _topTensorPred},
      rhs = CEVar {id = _getIdentExn "NULL"}}} in
    let fstOmitCopyToStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _topTensorOmitCopyTo},
      rhs = CEMember {lhs = firstIntervalExpr, id = _tensorIntervalOmitCopyTo}}} in
    let fstOmitCopyFromStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _topTensorOmitCopyFrom},
      rhs = CEMember {lhs = firstIntervalExpr, id = _tensorIntervalOmitCopyFrom}}} in
    let fstElemSizeStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = fst, id = _topTensorCudaElemType},
      rhs = CEMember {lhs = firstIntervalExpr, id = _tensorIntervalCudaElemType}}} in
    let fstCondInitStmt = CSIf {
      cond = CEBinOp {
        op = COGt (),
        lhs = CEVar {id = _tensorCountId},
        rhs = CEInt {i = 0}},
      thn = [ fstInitStmt, stackInitStmt, fstIdSetStmt, topMapSetStmt
            , incrementMainStmt, fstOCamlStmt, fstSizeStmt, fstPredStmt
            , fstOmitCopyToStmt, fstOmitCopyFromStmt, fstElemSizeStmt ],
      els = []} in
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let iterInitStmt = CSDef {
      ty = CTyInt64 (), id = Some iterId,
      init = Some (CIExpr {expr = CEInt {i = 1}})} in

    let intervalExpr = CEBinOp {
      op = COSubScript (),
      lhs = CEVar {id = _tensorIntervalsId},
      rhs = iter} in
    let overlappingCondExpr = CEBinOp {
      op = COGe (),
      lhs = CEBinOp {
        op = COAdd (),
        lhs = CECast {
          ty = CTyInt64 (),
          rhs = CEArrow {lhs = stack, id = _topTensorOCaml}},
        rhs = CEArrow {lhs = stack, id = _topTensorSize}},
      rhs = CEMember {
        lhs = intervalExpr, id = _tensorIntervalBegin}} in
    let thnTopMapUpdateStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (),
        lhs = CEVar {id = _tensorTopMapId},
        rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalId}},
      rhs = CEBinOp {
        op = COSub (),
        lhs = CEArrow {lhs = stack, id = _topTensorId},
        rhs = CEVar {id = _tensorCountId}}}} in
    let maxIfStmt = CSIf {
      cond = CEBinOp {
        op = COGt (),
        lhs = CEMember {lhs = intervalExpr, id = _tensorIntervalEnd},
        rhs = CEBinOp {
          op = COAdd (),
          lhs = CECast {
            ty = CTyInt64 (),
            rhs = CEArrow {lhs = stack, id = _topTensorOCaml}},
          rhs = CEArrow {lhs = stack, id = _topTensorSize}}},
      thn = [
        CSExpr {expr = CEBinOp {
          op = COAssign (),
          lhs = CEArrow {lhs = stack, id = _topTensorSize},
          rhs = CEBinOp {
            op = COSub (),
            lhs = CECast {
              ty = CTyInt64 (),
              rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalEnd}},
            rhs = CECast {
              ty = CTyInt64 (),
              rhs = CEArrow {lhs = stack, id = _topTensorOCaml}}}}}],
      els = []} in
    let nextId = nameSym "next" in
    let next = CEVar {id = nextId} in
    let nextInitStmt = CSDef {
      ty = CTyPtr {ty = topTensorType}, id = Some nextId,
      init = Some (CIExpr {expr = CECast {
        ty = CTyPtr {ty = topTensorType},
        rhs = CEApp {
          fun = _malloc,
          args = [CESizeOfType {ty = topTensorType}]}}})} in
    let nextIdStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorId},
      rhs = mainCount}} in
    let elsTopMapUpdateStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (),
        lhs = CEVar {id = _tensorTopMapId},
        rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalId}},
      rhs = CEBinOp {
        op = COSub (),
        lhs = CEArrow {lhs = next, id = _topTensorId},
        rhs = CEVar {id = _tensorCountId}}}} in
    let mainIncrementStmt = incrementStmt mainCount in
    let nextOCamlStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorOCaml},
      rhs = CECast {
        ty = CTyPtr {ty = CTyVoid ()},
        rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalBegin}}}} in
    let nextSizeStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorSize},
      rhs = CEBinOp {
        op = COSub (),
        lhs = CECast {
          ty = CTyInt64 (),
          rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalEnd}},
        rhs = CECast {
          ty = CTyInt64 (),
          rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalBegin}}}}} in
    let nextPredStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorPred},
      rhs = stack}} in
    let nextOmitCopyToStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorOmitCopyTo},
      rhs = CEInt {i = 1}}} in
    let nextOmitCopyFromStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorOmitCopyFrom},
      rhs = CEInt {i = 1}}} in
    let nextElementTypeStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = next, id = _topTensorCudaElemType},
      rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalCudaElemType}}} in
    let stackUpdateStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = stack, rhs = next}} in
    let condStmt = CSIf {
      cond = overlappingCondExpr,
      thn = [thnTopMapUpdateStmt, maxIfStmt],
      els = [ nextInitStmt, nextIdStmt, elsTopMapUpdateStmt, mainIncrementStmt
            , nextOCamlStmt, nextSizeStmt, nextPredStmt, nextOmitCopyToStmt
            , nextOmitCopyFromStmt, nextElementTypeStmt, stackUpdateStmt ]} in
    let updateTopOmitCopyToStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = stack, id = _topTensorOmitCopyTo},
      rhs = CEBinOp {
        op = COAnd (),
        lhs = CEArrow {lhs = stack, id = _topTensorOmitCopyTo},
        rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalOmitCopyTo}}}} in
    let updateTopOmitCopyFromStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEArrow {lhs = stack, id = _topTensorOmitCopyFrom},
      rhs = CEBinOp {
        op = COAnd (),
        lhs = CEArrow {lhs = stack, id = _topTensorOmitCopyFrom},
        rhs = CEMember {lhs = intervalExpr, id = _tensorIntervalOmitCopyFrom}}}} in
    let iterIncrementStmt = incrementStmt iter in
    let loopCondExpr = CEBinOp {
      op = COLt (), lhs = iter, rhs = CEVar {id = _tensorCountId}} in
    let loopStmt = CSWhile {
      cond = loopCondExpr,
      body = [ condStmt, updateTopOmitCopyToStmt, updateTopOmitCopyFromStmt
             , iterIncrementStmt ]} in

    -- Construct an array containing the top-level tensors from the linked-list
    -- structure used to represent the stack.
    let nmainInitStmt = CSDef {
      ty = CTyInt64 (), id = Some _tensorNmainId,
      init = Some (CIExpr {expr = CEBinOp {
        op = COSub (),
        lhs = mainCount, rhs = CEVar {id = _tensorCountId}}})} in
    let topTensorSize = CEBinOp {
      op = COMul (),
      lhs = CEVar {id = _tensorNmainId},
      rhs = CESizeOfType {ty = topTensorType}} in
    let topTensorsInitStmt = CSDef {
      ty = CTyPtr {ty = topTensorType},
      id = Some _tensorTopsId,
      init = Some (CIExpr {expr = CECast {
        ty = CTyPtr {ty = topTensorType},
        rhs = CEApp {fun = _malloc, args = [topTensorSize]}}})} in
    let iterSetStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = iter,
      rhs = CEBinOp {
        op = COSub (),
        lhs = CEVar {id = _tensorNmainId},
        rhs = CEInt {i = 1}}}} in

    let topTensorsSetStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (), lhs = CEVar {id = _tensorTopsId}, rhs = iter},
      rhs = CEUnOp {op = CODeref (), arg = stack}}} in
    let tempPtrId = nameSym "temp_ptr" in
    let tempPtrStmt = CSDef {
      ty = CTyPtr {ty = topTensorType}, id = Some tempPtrId,
      init = Some (CIExpr {expr = stack})} in
    let stackUpdateStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = stack,
      rhs = CEArrow {lhs = stack, id = _topTensorPred}}} in
    let deallocStmt = CSExpr {expr = CEApp {
      fun = _free,
      args = [CEVar {id = tempPtrId}]}} in
    let iterDecrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (), lhs = iter,
      rhs = CEBinOp {op = COSub (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let topTensorLoopStmt = CSWhile {
      cond = stack,
      body = [ topTensorsSetStmt, tempPtrStmt, stackUpdateStmt, deallocStmt
             , iterDecrementStmt ]} in

    [ topMapInitStmt, mainCountStmt, fstTopTensorDeclStmt, tensorStackInitStmt
    , fstCondInitStmt, iterInitStmt, loopStmt, nmainInitStmt
    , topTensorsInitStmt, iterSetStmt, topTensorLoopStmt ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateTensorCudaAlloc" kind="sem">

```mc
sem generateTensorCudaAlloc : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateTensorCudaAlloc =
  | env ->
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let iterInitStmt = CSDef {
      ty = CTyInt64 (), id = Some iterId,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let next = CEBinOp {
      op = COSubScript (), lhs = CEVar {id = _tensorTopsId}, rhs = iter} in
    let accessField = lam id. CEMember {lhs = next, id = id} in
    let addrOfCudaData = CEUnOp {
      op = COAddrOf (), arg = accessField _topTensorCuda} in
    let mallocManagedStmt = CSExpr {expr = CEApp {
      fun = _cudaMallocManaged,
      args = [addrOfCudaData, accessField _topTensorSize]}} in
    let memcpyStmt = CSExpr {expr = CEApp {
      fun = _CUDA_UTILS_COPY_OCAML_CUDA,
      args = [
        accessField _topTensorOCaml,
        accessField _topTensorCuda,
        accessField _topTensorSize,
        accessField _topTensorCudaElemType]}} in
    let copyCondition = CEBinOp {
      op = COEq (),
      lhs = accessField _topTensorOmitCopyTo,
      rhs = CEInt {i = 0}} in
    let condMemcpyStmt = CSIf {
      cond = copyCondition,
      thn = [memcpyStmt, _cudaErrorCheckStmt],
      els = []} in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = iter,
      rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let allocLoopCond = CEBinOp {
      op = COLt (), lhs = iter, rhs = CEVar {id = _tensorNmainId}} in
    let allocCopyLoop = CSWhile {
      cond = allocLoopCond,
      body = [ mallocManagedStmt, _cudaErrorCheckStmt, condMemcpyStmt
             , iterIncrementStmt ]} in
    let qsortIntervalsStmt = CSExpr {expr = CEApp {
      fun = _getIdentExn "qsort",
      args = [
        CEVar {id = _tensorIntervalsId},
        CEVar {id = _tensorCountId},
        CESizeOfType {ty = CTyVar {id = _tensorIntervalTypeId}},
        CEVar {id = _intervalCmpId}]}} in
    [iterInitStmt, allocCopyLoop, qsortIntervalsStmt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateTensorCudaDealloc" kind="sem">

```mc
sem generateTensorCudaDealloc : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateTensorCudaDealloc =
  | env ->
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let iterInitStmt = CSDef {
      ty = CTyInt64 (), id = Some iterId,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let next = CEBinOp {
      op = COSubScript (), lhs = CEVar {id = _tensorTopsId}, rhs = iter} in
    let accessField = lam id. CEMember {lhs = next, id = id} in
    let copyCondition = CEBinOp {
      op = COEq (),
      lhs = accessField _topTensorOmitCopyFrom,
      rhs = CEInt {i = 0}} in
    let memcpyStmt = CSExpr {expr = CEApp {
      fun = _CUDA_UTILS_COPY_CUDA_OCAML,
      args = [
        accessField _topTensorCuda,
        accessField _topTensorOCaml,
        accessField _topTensorSize,
        accessField _topTensorCudaElemType]}} in
    let condMemcpyStmt = CSIf {
      cond = copyCondition,
      thn = [memcpyStmt, _cudaErrorCheckStmt],
      els = []} in
    let freeStmt = CSExpr {expr = CEApp {
      fun = _cudaFree,
      args = [accessField _topTensorCuda]}} in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = iter,
      rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let loopStmt = CSWhile {
      cond = CEBinOp {
        op = COLt (), lhs = iter, rhs = CEVar {id = _tensorNmainId}},
      body = [ condMemcpyStmt, freeStmt, _cudaErrorCheckStmt
             , iterIncrementStmt ]} in
    let freeTopsStmt = CSExpr {expr = CEApp {
      fun = _free,
      args = [CEVar {id = _tensorTopsId}]}} in
    [iterInitStmt, loopStmt, freeTopsStmt]
```
</ToggleWrapper>
</DocBlock>

