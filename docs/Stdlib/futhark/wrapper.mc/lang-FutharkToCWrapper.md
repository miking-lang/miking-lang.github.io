import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkToCWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="_generateFutharkToCWrapperH" kind="sem">

```mc
sem _generateFutharkToCWrapperH : Name -> Name -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateFutharkToCWrapperH ctxIdent srcIdent =
  | FutharkSeqRepr t ->
    -- Find dimensions of result value through the use of 'futhark_shape_*'
    let futReturnTypeString = getSeqFutharkTypeString (FutharkSeqRepr t) in
    let futharkShapeString = concat "futhark_shape_" futReturnTypeString in
    let futharkShapeIdent = _getIdentOrInitNew futharkShapeString in
    -- NOTE(larshum, 2022-03-09): We use casting to remove the const of the
    -- type because the C AST cannot express constant types.
    let dimIdent = nameSym "dim" in
    let dimsStmt = CSDef {
      ty = CTyPtr {ty = CTyInt64 ()},
      id = Some dimIdent,
      init = Some (CIExpr {expr = CECast {
        ty = CTyPtr {ty = CTyInt64 ()},
        rhs = CEApp {
          fun = futharkShapeIdent,
          args = [
            CEVar {id = ctxIdent},
            CEVar {id = srcIdent}]}}})} in
    let dimInitStmts =
      mapi
        (lam i. lam ident.
          CSDef {
            ty = CTyInt64 (), id = Some ident,
            init = Some (CIExpr {expr = CEBinOp {
              op = COSubScript (),
              lhs = CEVar {id = dimIdent},
              rhs = CEInt {i = i}}})})
        t.dimIdents in
    let dimProdExpr =
      foldl
        (lam expr. lam id.
          CEBinOp {op = COMul (), lhs = expr, rhs = CEVar {id = id}})
        (CEVar {id = head t.dimIdents})
        (tail t.dimIdents) in
    let sizeInitStmt = CSDef {
      ty = CTyInt64 (), id = Some t.sizeIdent,
      init = Some (CIExpr {expr = dimProdExpr})} in

    -- Allocate C memory to contain results.
    let cType = CTyPtr {ty = t.elemTy} in
    let cAllocStmt = CSDef {
      ty = cType, id = Some t.ident,
      init = Some (CIExpr {expr = CECast {
        ty = cType,
        rhs = CEApp {
          fun = _getIdentExn "malloc",
          args = [CEBinOp {
            op = COMul (),
            lhs = CEVar {id = t.sizeIdent},
            rhs = CESizeOfType {ty = cType}}]}}})} in

    -- Copy from Futhark to C using the 'futhark_values_*' function.
    let futValuesString = concat "futhark_values_" futReturnTypeString in
    let futValuesIdent = _getIdentOrInitNew futValuesString in
    let copyFutharkToCStmt = CSExpr {expr = CEApp {
      fun = futValuesIdent,
      args = [
        CEVar {id = ctxIdent},
        CEVar {id = srcIdent},
        CEVar {id = t.ident}]}} in

    -- Free Futhark memory
    let futFreeString = concat "futhark_free_" futReturnTypeString in
    let futFreeIdent = _getIdentOrInitNew futFreeString in
    let freeFutharkStmt = CSExpr {expr = CEApp {
      fun = futFreeIdent,
      args = [CEVar {id = ctxIdent}, CEVar {id = srcIdent}]}} in

    join [
      [dimsStmt], dimInitStmts,
      [sizeInitStmt, cAllocStmt, copyFutharkToCStmt, freeFutharkStmt]]
  | FutharkRecordRepr t ->
    -- TODO(larshum, 2022-03-09): Implement support for returning records from
    -- Futhark.
    error "Record return values have not been implemented for Futhark"
  | FutharkBaseTypeRepr t ->
    [CSDef {
      ty = CTyPtr {ty = t.ty}, id = Some t.ident,
      init = Some (CIExpr {expr = CEUnOp {
        op = COAddrOf (),
        arg = CEVar {id = srcIdent}}})}]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateFutharkToCWrapper" kind="sem">

```mc
sem generateFutharkToCWrapper : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateFutharkToCWrapper =
  | env ->
    match env.return with {gpuIdent = gpuIdent, cData = cData} in
    match env.targetEnv with FutharkTargetEnv fenv in
    let futCtx = fenv.futharkContextIdent in
    _generateFutharkToCWrapperH futCtx gpuIdent cData
```
</ToggleWrapper>
</DocBlock>

