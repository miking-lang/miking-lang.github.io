import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprTensorCCompile  
  

Generation of tensor function for computing the linear index given a  
sequence of integers representing a cartesian index, and the dimensions of  
the tensor.

  
  
  
## Semantics  
  

          <DocBlock title="usesTensorTypes" kind="sem">

```mc
sem usesTensorTypes : [(Name, Ast_Type)] -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem usesTensorTypes =
  | typeEnv ->
    let isTensorType = lam ty.
      match ty with TyTensor _ then true else false
    in
    let isSeqIntType = lam ty.
      match ty with TySeq {ty = TyInt _} then true else false
    in
    if any (lam entry. isTensorType entry.1) typeEnv then
      any (lam entry. isSeqIntType entry.1) typeEnv
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_genIndexErrorStmts" kind="sem">

```mc
sem _genIndexErrorStmts : Name -> Int -> [CStmtAst_CStmt]
```



<ToggleWrapper text="Code..">
```mc
sem _genIndexErrorStmts (rank : Name) =
  | nindices ->
    let errorStr = join [
      "Accessed tensor of rank %ld using ", int2string nindices, " indices\n"] in
    [ CSExpr {expr = CEApp {
        fun = _printf,
        args = [CEString {s = errorStr}, CEVar {id = rank}]}}
    , CSRet {val = Some (CEInt {i = negi 1})} ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="specializedCartesianToLinearDef" kind="sem">

```mc
sem specializedCartesianToLinearDef : Name -> Name -> Name -> Int -> CTopAst_CTop
```

<Description>{`TODO\(larshum, 2022\-03\-21\): Lots of code duplication here. This code could  
probably be generated in a more reusable way.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem specializedCartesianToLinearDef (dims : Name) (rank : Name) (id : Name) =
  | 0 ->
    CTFun {
      ret = CTyInt64 (), id = id,
      params = [
        (CTyArray {ty = CTyInt64 (), size = Some (CEInt {i = 3})}, dims),
        (CTyInt64 (), rank)],
      body = [CSRet {val = Some (CEInt {i = 0})}]}
  | nindices ->
    let indexIds = create nindices (lam. nameSym "i") in
    let indexParams = map (lam id : Name. (CTyInt64 (), id)) indexIds in
    let params =
      concat
        [ (CTyArray {ty = CTyInt64 (), size = Some (CEInt {i = 3})}, dims)
        , (CTyInt64 (), rank)]
        indexParams in
    let rankEqExpr = lam n : Int.
      CEBinOp {
        op = COEq (),
        lhs = CEVar {id = rank},
        rhs = CEInt {i = n}} in
    let dimsExpr = lam n : Int.
      CEBinOp {
        op = COSubScript (),
        lhs = CEVar {id = dims},
        rhs = CEInt {i = n}} in
    let mulExpr = lam lhs : CExpr. lam rhs : CExpr.
      CEBinOp {op = COMul (), lhs = lhs, rhs = rhs} in
    let addExpr = lam lhs : CExpr. lam rhs : CExpr.
      CEBinOp {op = COAdd (), lhs = lhs, rhs = rhs} in
    let retStmt = lam expr : CExpr. CSRet {val = Some expr} in
    let stmt =
      match nindices with 1 then
        let i0 = CEVar {id = get indexIds 0} in
        CSIf {
          cond = rankEqExpr 3,
          thn = [retStmt (mulExpr (mulExpr (dimsExpr 2) (dimsExpr 1)) i0)],
          els = [
            CSIf {
              cond = rankEqExpr 2,
              thn = [retStmt (mulExpr (dimsExpr 1) i0)],
              els = [retStmt i0]}]}
      else match nindices with 2 then
        let i0 = CEVar {id = get indexIds 0} in
        let i1 = CEVar {id = get indexIds 1} in
        CSIf {
          cond = rankEqExpr 3,
          thn = [
            retStmt
              (addExpr
                (mulExpr (mulExpr (dimsExpr 2) (dimsExpr 1)) i0)
                (mulExpr (dimsExpr 2) i1))],
          els = [
            CSIf {
              cond = rankEqExpr 2,
              thn = [
                retStmt
                  (addExpr (mulExpr (dimsExpr 1) i0) i1)],
              els = _genIndexErrorStmts rank nindices}]}
      else match nindices with 3 then
        let i0 = CEVar {id = get indexIds 0} in
        let i1 = CEVar {id = get indexIds 1} in
        let i2 = CEVar {id = get indexIds 2} in
        CSIf {
          cond = rankEqExpr 3,
          thn = [
            retStmt
              (addExpr
                (addExpr
                  (mulExpr (mulExpr (dimsExpr 2) (dimsExpr 1)) i0)
                  (mulExpr (dimsExpr 2) i1))
                i2)],
          els = _genIndexErrorStmts rank nindices}
      else
        error
          (join ["Cannot generate specialized index for ", int2string nindices,
                 " indices"]) in
    CTFun {ret = CTyInt64 (), id = id, params = params, body = [stmt]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cartesianToLinearIndexDef" kind="sem">

```mc
sem cartesianToLinearIndexDef : MExprCCompileBase_CompileCEnv -> [CTopAst_CTop]
```



<ToggleWrapper text="Code..">
```mc
sem cartesianToLinearIndexDef =
  | env ->
    let env : CompileCEnv = env in
    let intSeqType = TySeq {ty = TyInt {info = NoInfo ()}, info = NoInfo ()} in
    let cidxName = _lookupTypeName env.typeEnv intSeqType in
    let cidxType = CTyVar {id = cidxName} in
    let dims = nameSym "dims" in
    let rank = nameSym "rank" in
    let cidx = nameSym "cartesian_idx" in

    -- NOTE(larshum, 2022-03-21): For efficiency reasons, we generate
    -- specialized functions for a given number of index arguments. Currently,
    -- as the maximum rank is set to 3, we generate functions for 0, 1, 2, and
    -- 3 indices.
    let nspecialized = 4 in
    let specializedIds =
      create 4
        (lam i.
          nameSym
            (concat
              (nameGetStr _cartesianToLinearIndex)
              (int2string i))) in
    let specializedTops =
      create 4
        (lam i.
          let id = get specializedIds i in
          specializedCartesianToLinearDef dims rank id i) in

    let params = [
      (CTyArray {ty = CTyInt64 (), size = Some (CEInt {i = 3})}, dims),
      (CTyInt64 (), rank), (cidxType, cidx)] in
    let cidxElemExpr = lam n.
      CEBinOp {
        op = COSubScript (),
        lhs = CEMember {lhs = CEVar {id = cidx}, id = _seqKey},
        rhs = CEInt {i = n}} in
    let cidxLenExpr = CEMember {lhs = CEVar {id = cidx}, id = _seqLenKey} in
    let equalIntExpr = lam n : Int.
      CEBinOp {op = COEq (), lhs = cidxLenExpr, rhs = CEInt {i = n}} in
    let callSpecializedCToL = lam n : Int.
      let args =
        concat
          [CEVar {id = dims}, CEVar {id = rank}]
          (create n (lam i. cidxElemExpr i)) in
      CEApp {fun = get specializedIds n, args = args} in
    let stmts = [
      CSIf {
        cond = equalIntExpr 1,
        thn = [CSRet {val = Some (callSpecializedCToL 1)}],
        els = [
          CSIf {
            cond = equalIntExpr 2,
            thn = [CSRet {val = Some (callSpecializedCToL 2)}],
            els = [
              CSIf {
                cond = equalIntExpr 3,
                thn = [CSRet {val = Some (callSpecializedCToL 3)}],
                els = [CSRet {val = Some (callSpecializedCToL 0)}]}]}]}] in
    snoc
      specializedTops
      (CTFun {
        ret = CTyInt64 (), id = _cartesianToLinearIndex,
        params = params, body = stmts})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorShapeDef" kind="sem">

```mc
sem tensorShapeDef : MExprCCompileBase_CompileCEnv -> CTopAst_CTop
```



<ToggleWrapper text="Code..">
```mc
sem tensorShapeDef =
  | env ->
    let env : CompileCEnv = env in
    let intType = getCIntType env in
    let mexprSeqType = TySeq {ty = TyInt {info = NoInfo ()}, info = NoInfo ()} in
    let seqName = _lookupTypeName env.typeEnv mexprSeqType in
    let seqType = CTyVar {id = seqName} in
    let dimsType = CTyArray {ty = CTyInt64 (), size = Some (CEInt {i = 3})} in
    let dimsId = nameSym "dims" in
    let rankId = nameSym "rank" in
    let seqId = nameSym "s" in
    let params = [(dimsType, dimsId), (CTyInt64 (), rankId)] in
    let stmts = [
      CSDef {ty = seqType, id = Some seqId, init = None ()},
      CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEMember {lhs = CEVar {id = seqId}, id = _seqKey},
        rhs = CEVar {id = dimsId}}},
      CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEMember {lhs = CEVar {id = seqId}, id = _seqLenKey},
        rhs = CEVar {id = rankId}}},
      CSRet {val = Some (CEVar {id = seqId})}
    ] in
    CTFun {ret = seqType, id = _tensorShape, params = params, body = stmts}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorComputeLinearIndex" kind="sem">

```mc
sem tensorComputeLinearIndex : CExprTypeAst_CExpr -> CExprTypeAst_CExpr -> CExprTypeAst_CExpr
```

<Description>{`Computes the linear index given expressions representing the tensor and  
the sequence containing the cartesian coordinates.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tensorComputeLinearIndex (tensor : CExpr) =
  | cartesianIndex ->
    let tensorDims = CEMember {lhs = tensor, id = _tensorDimsKey} in
    let tensorRank = CEMember {lhs = tensor, id = _tensorRankKey} in
    CEApp {
      fun = _cartesianToLinearIndex,
      args = [tensorDims, tensorRank, cartesianIndex]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tensorShapeCall" kind="sem">

```mc
sem tensorShapeCall : CExprTypeAst_CExpr -> CExprTypeAst_CExpr
```



<ToggleWrapper text="Code..">
```mc
sem tensorShapeCall =
  | tensor /- CExpr -/ ->
    let tensorDims = CEMember {lhs = tensor, id = _tensorDimsKey} in
    let tensorRank = CEMember {lhs = tensor, id = _tensorRankKey} in
    CEApp {fun = _tensorShape, args = [tensorDims, tensorRank]}
```
</ToggleWrapper>
</DocBlock>

