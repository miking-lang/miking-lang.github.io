import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkCToOCamlWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="_generateAllocOCamlLoop" kind="sem">

```mc
sem _generateAllocOCamlLoop : Name -> Name -> Name -> CExprTypeAst_CExpr -> [CStmtAst_CStmt] -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateAllocOCamlLoop iterIdent dstIdent dimIdent tag =
  | bodyStmts ->
    let iterInitStmt = CSDef {
      ty = CTyInt64 (), id = Some iterIdent,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let dstAllocStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = dstIdent},
      rhs = CEApp {
        fun = _getIdentExn "caml_alloc",
        args = [CEVar {id = dimIdent}, tag]}}} in
    let iterIncrStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = iterIdent},
      rhs = CEBinOp {
        op = COAdd (),
        lhs = CEVar {id = iterIdent},
        rhs = CEInt {i = 1}}}} in
    let whileBody = snoc bodyStmts iterIncrStmt in
    let whileStmt = CSWhile {
      cond = CEBinOp {
        op = COLt (),
        lhs = CEVar {id = iterIdent},
        rhs = CEVar {id = dimIdent}},
      body = whileBody} in
    [iterInitStmt, dstAllocStmt, whileStmt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_allocateSequenceOCamlDataH" kind="sem">

```mc
sem _allocateSequenceOCamlDataH : CExprTypeAst_CType -> Name -> Name -> Name -> [Name] -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _allocateSequenceOCamlDataH elemTy countIdent srcIdent dstIdent =
  | [dimIdent] ++ dimIdents ->
    let iterIdent = nameSym "i" in
    let innerDstIdent = nameSym "x" in
    let innerDstInitStmt = CSDef {
      ty = CTyVar {id = _getIdentExn "value"}, id = Some innerDstIdent,
      init = None ()} in
    let stmts = _allocateSequenceOCamlDataH elemTy countIdent srcIdent
                                            innerDstIdent dimIdents in
    let storeFieldStmt = CSExpr {expr = CEApp {
      fun = _getIdentExn "Store_field",
      args = [
        CEVar {id = dstIdent},
        CEVar {id = iterIdent},
        CEVar {id = innerDstIdent}]}} in
    let tagExpr = CEInt {i = 0} in
    let loopStmts = join [[innerDstInitStmt], stmts, [storeFieldStmt]] in
    _generateAllocOCamlLoop iterIdent dstIdent dimIdent tagExpr loopStmts
  | [dimIdent] ->
    let iterIdent = nameSym "i" in
    let valueExpr = CEBinOp {
      op = COSubScript (),
      lhs = CEVar {id = srcIdent},
      rhs = CEVar {id = countIdent}} in
    let fieldStoreExpr =
      match elemTy with CTyDouble _ then
        CEApp {
          fun = _getIdentExn "Store_double_field",
          args = [
            CEVar {id = dstIdent},
            CEVar {id = iterIdent},
            valueExpr]}
      else
        let cExprToValueExpr = CEApp {
          fun = cToOCamlConversionFunctionIdent elemTy,
          args = [valueExpr]} in
        CEApp {
          fun = _getIdentExn "Store_field",
          args = [
            CEVar {id = dstIdent},
            CEVar {id = iterIdent},
            cExprToValueExpr]}
    in
    let fieldStoreStmt = CSExpr {expr = fieldStoreExpr} in
    let countIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = countIdent},
      rhs = CEBinOp {
        op = COAdd (),
        lhs = CEVar {id = countIdent},
        rhs = CEInt {i = 1}}}} in
    let tagExpr =
      match elemTy with CTyDouble _ then
        CEVar {id = _getIdentExn "Double_array_tag"}
      else CEInt {i = 0} in
    let loopStmts = [fieldStoreStmt, countIncrementStmt] in
    _generateAllocOCamlLoop iterIdent dstIdent dimIdent tagExpr loopStmts
  | [] -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_allocateSequenceOCamlData" kind="sem">

```mc
sem _allocateSequenceOCamlData : Name -> Name -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _allocateSequenceOCamlData srcIdent dstIdent =
  | FutharkSeqRepr t ->
    let countIdent = nameSym "count" in
    let countDeclStmt = CSDef {
      ty = CTyInt64 (), id = Some countIdent,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let freeStmt = CSExpr {expr = CEApp {
      fun = _getIdentExn "free",
      args = [CEVar {id = srcIdent}]}} in
    let allocStmts = _allocateSequenceOCamlDataH t.elemTy countIdent srcIdent
                                                 dstIdent t.dimIdents in
    join [[countDeclStmt], allocStmts, [freeStmt]]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateCToOCamlWrapperStmts" kind="sem">

```mc
sem _generateCToOCamlWrapperStmts : Name -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateCToOCamlWrapperStmts dstIdent =
  | t & (FutharkSeqRepr {ident = ident}) ->
    _allocateSequenceOCamlData ident dstIdent t
  | FutharkRecordRepr t ->
    if null t.fields then []
    else
      let wrapField : Int -> CDataRepr -> [CStmt] = lam idx. lam field.
        let tempDstIdent = nameSym "c_tmp" in
        let fieldStmts = _generateCToOCamlWrapperStmts tempDstIdent field in
        let storeStmt = CSExpr {expr = CEApp {
          fun = _getIdentExn "Store_field",
          args = [
            CEVar {id = dstIdent},
            CEInt {i = idx},
            CEVar {id = tempDstIdent}]}} in
        snoc fieldStmts storeStmt
      in
      let recordAllocStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEVar {id = dstIdent},
        rhs = CEApp {
          fun = _getIdentExn "caml_alloc",
          args = [CEInt {i = length t.fields}, CEInt {i = 0}]}}} in
      let fieldStmts = join (mapi wrapField t.fields) in
      cons recordAllocStmt fieldStmts
  | FutharkBaseTypeRepr t ->
    let toOCamlStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = dstIdent},
      rhs = CEApp {
        fun = cToOCamlConversionFunctionIdent t.ty,
        args = [CEUnOp {op = CODeref (), arg = CEVar {id = t.ident}}]}}} in
    [toOCamlStmt]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateCToOCamlWrapper" kind="sem">

```mc
sem generateCToOCamlWrapper : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateCToOCamlWrapper =
  | env ->
    match env.return with {mexprIdent = mexprIdent, cData = cData} in
    _generateCToOCamlWrapperStmts mexprIdent cData
```
</ToggleWrapper>
</DocBlock>

