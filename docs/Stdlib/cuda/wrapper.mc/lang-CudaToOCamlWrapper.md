import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaToOCamlWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="_generateCudaToOCamlWrapperH" kind="sem">

```mc
sem _generateCudaToOCamlWrapperH : PMExprCWrapper_CWrapperEnv -> CExprTypeAst_CExpr -> CExprTypeAst_CExpr -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCudaToOCamlWrapperH env src dst =
  | CudaSeqRepr t ->
    let lengthExpr = _accessMember t.ty src _seqLenKey in
    let tagExpr =
      match t.elemTy with CTyFloat _ | CTyDouble _ then
        CEVar {id = _getIdentExn "Double_array_tag"}
      else CEInt {i = 0} in
    let seqAllocStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = src,
      rhs = CEApp {
        fun = _getIdentExn "caml_alloc", args = [lengthExpr, tagExpr]}}} in
    let iterId = nameSym "i" in
    let iter = CEVar {id = iterId} in
    let iterInitStmt = CSDef {
      ty = CTyInt64 (), id = Some iterId,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let srcExpr = CEBinOp {op = COSubScript (), lhs = dst, rhs = iter} in
    let fieldStoreStmts =
      match t.elemTy with CTyFloat _ | CTyDouble _ then
        [ CSExpr {expr = CEApp {
            fun = _getIdentExn "Store_double_field",
            args = [dst, iter, srcExpr]}} ]
      else
        let fieldId = nameSym "cuda_seq_temp" in
        let field = CEVar {id = fieldId} in
        let fieldDefStmt = CSDef {
          ty = t.elemTy, id = Some fieldId, init = None ()} in
        let innerStmts = _generateCudaToOCamlWrapperH env srcExpr field t.data in
        let storeFieldStmt = CSExpr {expr = CEApp {
          fun = _getIdentExn "Store_field",
          args = [dst, iter, CEVar {id = fieldId}]}} in
        join [[fieldDefStmt], innerStmts, [storeFieldStmt]] in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = iter,
      rhs = CEBinOp {op = COAdd (), lhs = iter, rhs = CEInt {i = 1}}}} in
    let storeLoopStmt = CSWhile {
      cond = CEBinOp {op = COLt (), lhs = iter, rhs = lengthExpr},
      body = snoc fieldStoreStmts iterIncrementStmt} in
    [seqAllocStmt, iterInitStmt, storeLoopStmt]
  | CudaTensorRepr t ->
    error "Tensors cannot be returned from accelerated code"
  | CudaRecordRepr t ->
    if null t.fields then []
    else
      let wrapField = lam idx : Int. lam field : CDataRepr.
        let labelId = nameNoSym (sidToString (get t.labels idx)) in
        let fieldSrcExpr = _accessMember t.ty src labelId in
        let tempId = nameSym "cuda_rec_tmp" in
        let temp = CEVar {id = tempId} in
        let fieldStmts = _generateCudaToOCamlWrapperH env fieldSrcExpr temp field in
        let storeStmt = CSExpr {expr = CEApp {
          fun = _getIdentExn "Store_field",
          args = [dst, CEInt {i = idx}, temp]}} in
        snoc fieldStmts storeStmt
      in
      let recordAllocStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = dst,
        rhs = CEApp {
          fun = _getIdentExn "caml_alloc",
          args = [CEInt {i = length t.fields}, CEInt {i = 0}]}}} in
      let fieldStmts = join (mapi wrapField t.fields) in
      cons recordAllocStmt fieldStmts
  | CudaDataTypeRepr t ->
    error "Data types cannot be returned from accelerated code"
  | CudaBaseTypeRepr t ->
    [ CSExpr {
        expr = CEBinOp {
          op = COAssign (),
          lhs = dst,
          rhs = CEApp {
            fun = cToOCamlConversionFunctionIdent t.ty,
            args = [CECast {ty = t.ty, rhs = src}]}}} ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateCudaToOCamlWrapper" kind="sem">

```mc
sem generateCudaToOCamlWrapper : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```



<ToggleWrapper text="Code..">
```mc
sem generateCudaToOCamlWrapper =
  | env ->
    let env : CWrapperEnv = env in
    let return = env.return in
    let src = CEVar {id = return.gpuIdent} in
    let dst = CEVar {id = return.mexprIdent} in
    _generateCudaToOCamlWrapperH env src dst return.cData
```
</ToggleWrapper>
</DocBlock>

