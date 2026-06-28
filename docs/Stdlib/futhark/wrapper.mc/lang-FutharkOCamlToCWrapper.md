import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkOCamlToCWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="_computeSequenceDimensions" kind="sem">

```mc
sem _computeSequenceDimensions : Name -> Int -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _computeSequenceDimensions srcIdent idx =
  | t & (FutharkSeqRepr {dimIdents = dimIdents, sizeIdent = sizeIdent}) ->
    let dimIdent = get dimIdents idx in
    let initDimStmt = CSDef {
      ty = CTyInt64 (), id = Some dimIdent,
      init = Some (CIExpr {expr = _wosize (CEVar {id = srcIdent})})} in
    let updateSizeStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = sizeIdent},
      rhs = CEBinOp {
        op = COMul (),
        lhs = CEVar {id = sizeIdent},
        rhs = CEVar {id = dimIdent}}}} in
    let idx = addi idx 1 in
    if eqi idx (length dimIdents) then [initDimStmt, updateSizeStmt]
    else
      let innerSrcIdent = nameSym "t" in
      -- NOTE(larshum, 2022-03-09): We assume sequences are non-empty here.
      let innerSrcStmt = CSDef {
        ty = CTyVar {id = _getIdentExn "value"},
        id = Some innerSrcIdent,
        init = Some (CIExpr {expr = CEApp {
          fun = _getIdentExn "Field",
          args = [CEVar {id = srcIdent}, CEInt {i = 0}]}})} in
      let stmts = _computeSequenceDimensions innerSrcIdent idx t in
      concat [initDimStmt, updateSizeStmt, innerSrcStmt] stmts
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateForLoop" kind="sem">

```mc
sem _generateForLoop : Name -> Name -> [CStmtAst_CStmt] -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateForLoop iterIdent dimIdent =
  | bodyWithoutIterIncrement ->
    let iterDefStmt = CSDef {
      ty = CTyInt64 (), id = Some iterIdent,
      init = Some (CIExpr {expr = CEInt {i = 0}})} in
    let iterIncrementStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEVar {id = iterIdent},
      rhs = CEBinOp {
        op = COAdd (),
        lhs = CEVar {id = iterIdent},
        rhs = CEInt {i = 1}}}} in
    [ iterDefStmt
    , CSWhile {
        cond = CEBinOp {
          op = COLt (),
          lhs = CEVar {id = iterIdent},
          rhs = CEVar {id = dimIdent}},
        body = snoc bodyWithoutIterIncrement iterIncrementStmt} ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_allocateSequenceCDataH" kind="sem">

```mc
sem _allocateSequenceCDataH : CExprTypeAst_CType -> Name -> Name -> [Name] -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _allocateSequenceCDataH elemTy srcIdent dstIdent =
  | [dimIdent] ++ dimIdents ->
    let iterIdent = nameSym "i" in
    let innerSrcIdent = nameSym "x" in
    let innerDstIdent = nameSym "y" in
    let valueTy = CTyVar {id = _getIdentExn "value"} in
    let innerSrcInitStmt = CSDef {
      ty = valueTy, id = Some innerSrcIdent,
      init = Some (CIExpr {expr = CEApp {
        fun = _getIdentExn "Field",
        args = [CEVar {id = srcIdent}, CEVar {id = iterIdent}]}})} in
    let offsetExpr = CEBinOp {
      op = COMul (),
      lhs = CEVar {id = iterIdent},
      rhs = _wosize (CEVar {id = innerSrcIdent})} in
    let innerCopyStmt = CSDef {
      ty = CTyPtr {ty = elemTy}, id = Some innerDstIdent,
      init = Some (CIExpr {expr = CEUnOp {
        op = COAddrOf (),
        arg = CEBinOp {
          op = COSubScript (),
          lhs = CEVar {id = dstIdent},
          rhs = offsetExpr}}})} in
    let innerStmts = _allocateSequenceCDataH elemTy innerSrcIdent innerDstIdent dimIdents in
    let loopBodyStmts = concat [innerSrcInitStmt, innerCopyStmt] innerStmts in
    _generateForLoop iterIdent dimIdent loopBodyStmts
  | [dimIdent] ->
    let iterIdent = nameSym "i" in
    -- NOTE(larshum, 2022-03-09): We need to treat sequences of doubles
    -- specially, because an OCaml array of floats must be accessed via
    -- 'Double_field' rather than 'Field' as for other arrays.
    let fieldAccessExpr =
      match elemTy with CTyDouble _ then
        CEApp {
          fun = _getIdentExn "Double_field",
          args = [CEVar {id = srcIdent}, CEVar {id = iterIdent}]}
      else
        let fieldExpr = CEApp {
          fun = _getIdentExn "Field",
          args = [CEVar {id = srcIdent}, CEVar {id = iterIdent}]} in
        CEApp {
          fun = ocamlToCConversionFunctionIdent elemTy,
          args = [fieldExpr]}
    in
    let fieldWriteStmt = CSExpr {expr = CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {
        op = COSubScript (),
        lhs = CEVar {id = dstIdent},
        rhs = CEVar {id = iterIdent}},
      rhs = fieldAccessExpr}} in
    _generateForLoop iterIdent dimIdent [fieldWriteStmt]
  | [] -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_allocateSequenceCData" kind="sem">

```mc
sem _allocateSequenceCData : Name -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _allocateSequenceCData srcIdent =
  | FutharkSeqRepr t ->
    let cType = CTyPtr {ty = t.elemTy} in
    let sizeExpr = CEBinOp {
      op = COMul (),
      lhs = CEVar {id = t.sizeIdent},
      rhs = CESizeOfType {ty = t.elemTy}} in
    let allocStmt = CSDef {
      ty = cType, id = Some t.ident,
      init = Some (CIExpr {expr = CECast {
        ty = cType,
        rhs = CEApp {
          fun = _getIdentExn "malloc",
          args = [sizeExpr]}}})} in
    cons
      allocStmt
      (_allocateSequenceCDataH t.elemTy srcIdent t.ident t.dimIdents)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateOCamlToCWrapperStmts" kind="sem">

```mc
sem _generateOCamlToCWrapperStmts : Name -> PMExprCWrapper_CDataRepr -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateOCamlToCWrapperStmts srcIdent =
  | t & (FutharkSeqRepr {sizeIdent = sizeIdent}) ->
    let initSizeStmt = CSDef {
      ty = CTyInt64 (), id = Some sizeIdent,
      init = Some (CIExpr {expr = CEInt {i = 1}})} in
    let dimStmts = _computeSequenceDimensions srcIdent 0 t in
    let allocStmts = _allocateSequenceCData srcIdent t in
    join [[initSizeStmt], dimStmts, allocStmts]
  | FutharkRecordRepr t ->
    let generateMarshallingField : [CStmt] -> (CDataRepr, Int) -> [CStmt] =
      lam acc. lam fieldIdx.
        match fieldIdx with (field, idx) in
        let valueType = CTyVar {id = _getIdentExn "value"} in
        let fieldId = nameSym "c_tmp" in
        let fieldValueStmt = CSDef {
          ty = valueType, id = Some fieldId,
          init = Some (CIExpr {expr = CEApp {
            fun = _getIdentExn "Field",
            args = [CEVar {id = srcIdent}, CEInt {i = idx}]}})} in
        let innerStmts = _generateOCamlToCWrapperStmts fieldId field in
        join [acc, [fieldValueStmt], innerStmts]
    in
    let indexedFields = create (length t.fields) (lam i. (get t.fields i, i)) in
    foldl generateMarshallingField [] indexedFields
  | FutharkBaseTypeRepr t ->
    let conversionFunctionId : Name = ocamlToCConversionFunctionIdent t.ty in
    let tmp = nameSym "c_tmp" in
    [ CSDef {ty = t.ty, id = Some tmp, init = None ()}
    , CSDef {
        ty = CTyPtr {ty = t.ty}, id = Some t.ident,
        init = Some (CIExpr {expr = CEUnOp {
          op = COAddrOf (),
          arg = CEVar {id = tmp}}})}
    , CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEUnOp {op = CODeref (), arg = CEVar {id = t.ident}},
        rhs = CEApp {
          fun = conversionFunctionId,
          args = [CEVar {id = srcIdent}]}}} ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_generateOCamlToCWrapperArg" kind="sem">

```mc
sem _generateOCamlToCWrapperArg : [CStmtAst_CStmt] -> PMExprCWrapper_ArgData -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _generateOCamlToCWrapperArg accStmts =
  | arg ->
    concat accStmts (_generateOCamlToCWrapperStmts arg.mexprIdent arg.cData)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateOCamlToCWrapper" kind="sem">

```mc
sem generateOCamlToCWrapper : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateOCamlToCWrapper =
  | env ->
    foldl _generateOCamlToCWrapperArg [] env.arguments
```
</ToggleWrapper>
</DocBlock>

