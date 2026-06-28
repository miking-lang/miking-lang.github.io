import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaTensorSliceIntrinsic  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateCudaIntrinsicFunction" kind="sem">

```mc
sem generateCudaIntrinsicFunction : MExprCCompileBase_CompileCEnv -> CExprTypeAst_CExpr -> (Name, CudaAst_CuTop)
```



<ToggleWrapper text="Code..">
```mc
sem generateCudaIntrinsicFunction (ccEnv : CompileCEnv) =
  | CETensorSliceExn t ->
    let tId = nameSym "t" in
    let sliceId = nameSym "slice" in
    let tensor = CEVar {id = tId} in
    let slice = CEVar {id = sliceId} in
    let intType = getCIntType ccEnv in
    let i = nameSym "i" in
    let elsStmts = [
      CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEMember {lhs = tensor, id = _tensorDataKey},
        rhs = CEBinOp {
          op = COAdd (),
          lhs = CEMember {lhs = tensor, id = _tensorDataKey},
          rhs = tensorComputeLinearIndex tensor slice}}},
      CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEMember {lhs = tensor, id = _tensorRankKey},
        rhs = CEBinOp {
          op = COSub (),
          lhs = CEMember {lhs = tensor, id = _tensorRankKey},
          rhs = CEMember {lhs = slice, id = _seqLenKey}}}},
      CSDef {
        ty = intType, id = Some i,
        init = Some (CIExpr {expr = CEInt {i = 0}})},
      CSWhile {
        cond = CEBinOp {
          op = COLt (),
          lhs = CEVar {id = i},
          rhs = CEMember {lhs = tensor, id = _tensorRankKey}},
        body = [
          CSExpr {expr = CEBinOp {
            op = COAssign (),
            lhs = CEBinOp {
              op = COSubScript (),
              lhs = CEMember {lhs = tensor, id = _tensorDimsKey},
              rhs = CEVar {id = i}},
            rhs = CEBinOp {
              op = COSubScript (),
              lhs = CEMember {lhs = tensor, id = _tensorDimsKey},
              rhs = CEBinOp {
                op = COAdd (),
                lhs = CEMember {lhs = slice, id = _seqLenKey},
                rhs = CEVar {id = i}}}}},
          CSExpr {expr = CEBinOp {
            op = COAssign (),
            lhs = CEVar {id = i},
            rhs = CEBinOp {
              op = COAdd (),
              lhs = CEVar {id = i},
              rhs = CEInt {i = 1}}}}]},
      CSRet {val = Some tensor}
    ] in
    let ifEmptySlice = CSIf {
      cond = CEBinOp {
        op = COEq (),
        lhs = CEMember {lhs = CEVar {id = sliceId}, id = _seqLenKey},
        rhs = CEInt {i = 0}},
      thn = [CSRet {val = Some tensor}],
      els = elsStmts} in
    let intrinsicId = nameSym "tensor_slice" in
    let seqIntTypeName = _lookupTypeName ccEnv.typeEnv (tyseq_ tyint_) in
    let seqIntType = CTyVar {id = seqIntTypeName} in
    let top = CuTTop {
      attrs = [CuAHost (), CuADevice ()],
      top = CTFun {
        ret = t.ty, id = intrinsicId,
        params = [(t.ty, tId), (seqIntType, sliceId)],
        body = [ifEmptySlice]}} in
    (intrinsicId, top)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateCudaIntrinsicCall" kind="sem">

```mc
sem generateCudaIntrinsicCall : MExprCCompileBase_CompileCEnv -> [CudaAst_CuTop] -> CExprTypeAst_CExpr -> CExprTypeAst_CExpr -> ([CudaAst_CuTop], CStmtAst_CStmt)
```



<ToggleWrapper text="Code..">
```mc
sem generateCudaIntrinsicCall (ccEnv : CompileCEnv) (acc : [CuTop]) (outExpr : CExpr) =
  | CETensorSliceExn t ->
    match generateCudaIntrinsicFunction ccEnv (CETensorSliceExn t) with (id, top) in
    let tensorSliceCall = CEApp {fun = id, args = [t.t, t.slice]} in
    let acc = cons top acc in
    let stmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = outExpr,
      rhs = tensorSliceCall}} in
    (acc, stmt)
```
</ToggleWrapper>
</DocBlock>

