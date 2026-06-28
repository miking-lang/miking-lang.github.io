import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast-builder.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/futhark/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>  
  
## Variables  
  

          <DocBlock title="futUnknownTy_" kind="let">

```mc
let futUnknownTy_  : FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futUnknownTy_ = use FutharkAst in
  FTyUnknown {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futIntTy_" kind="let">

```mc
let futIntTy_  : FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futIntTy_ = use FutharkAst in
  FTyInt {info = NoInfo (), sz = I64 ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futFloatTy_" kind="let">

```mc
let futFloatTy_  : FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futFloatTy_ = use FutharkAst in
  FTyFloat {info = NoInfo (), sz = F64 ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futBoolTy_" kind="let">

```mc
let futBoolTy_  : FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futBoolTy_ = use FutharkAst in
  FTyBool {info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nFutIdentTy_" kind="let">

```mc
let nFutIdentTy_ n : Name -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let nFutIdentTy_ = use FutharkAst in
  lam n.
  FTyIdent {ident = n, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futIdentTy_" kind="let">

```mc
let futIdentTy_ str : String -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futIdentTy_ = lam str.
  nFutIdentTy_ (nameNoSym str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futSizedArrayTy_" kind="let">

```mc
let futSizedArrayTy_ elemTy szId : FutharkTypeAst_FutType -> Name -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futSizedArrayTy_ = use FutharkAst in
  lam elemTy. lam szId.
  FTyArray {elem = elemTy, dim = Some (NamedDim szId), info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futUnsizedArrayTy_" kind="let">

```mc
let futUnsizedArrayTy_ elemTy : FutharkTypeAst_FutType -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futUnsizedArrayTy_ = use FutharkAst in
  lam elemTy.
  FTyArray {elem = elemTy, dim = None (), info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futRecordTy_" kind="let">

```mc
let futRecordTy_ fieldSeq : [(String, FutharkTypeAst_FutType)] -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futRecordTy_ = use FutharkAst in
  lam fieldSeq.
  FTyRecord {fields = mapFromSeq cmpSID (map
                        (lam kv : (String, FutType). (stringToSid kv.0, kv.1))
                        fieldSeq),
             info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futTupleTy_" kind="let">

```mc
let futTupleTy_ fields : [FutharkTypeAst_FutType] -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futTupleTy_ = use FutharkAst in
  lam fields.
  futRecordTy_ (create (length fields) (lam i. (int2string i, get fields i)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futProjTy_" kind="let">

```mc
let futProjTy_ target label : FutharkTypeAst_FutType -> String -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futProjTy_ = use FutharkAst in
  lam target. lam label.
  FTyProj {target = target, label = stringToSid label, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futUnitTy_" kind="let">

```mc
let futUnitTy_ _ : all a. a -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futUnitTy_ = lam. futRecordTy_ []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futArrowTy_" kind="let">

```mc
let futArrowTy_ fromTy toTy : FutharkTypeAst_FutType -> FutharkTypeAst_FutType -> FutharkTypeAst_FutType
```



<ToggleWrapper text="Code..">
```mc
let futArrowTy_ = use FutharkAst in
  lam fromTy. lam toTy.
  FTyArrow {from = fromTy, to = toTy, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nFutPvar_" kind="let">

```mc
let nFutPvar_ n : Name -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
let nFutPvar_ = use FutharkAst in
  lam n : Name.
  FPNamed {ident = PName n, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futPvarw_" kind="let">

```mc
let futPvarw_ _ : all a. a -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
let futPvarw_ = use FutharkAst in
  lam.
  FPNamed {ident = PWildcard (), ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futPint_" kind="let">

```mc
let futPint_ i : Int -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
let futPint_ = use FutharkAst in
  lam i : Int.
  FPInt {val = i, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futPbool_" kind="let">

```mc
let futPbool_ b : Bool -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
let futPbool_ = use FutharkAst in
  lam b : Bool.
  FPBool {val = b, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futPrecord_" kind="let">

```mc
let futPrecord_ bindings : [(String, FutharkPatAst_FutPat)] -> FutharkPatAst_FutPat
```



<ToggleWrapper text="Code..">
```mc
let futPrecord_ = use FutharkAst in
  lam bindings : [(String, FutPat)].
  let bindingMapFunc = lam b : (String, FutPat). (stringToSid b.0, b.1) in
  FPRecord {bindings = mapFromSeq cmpSID (map bindingMapFunc bindings),
            ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futBind_" kind="let">

```mc
let futBind_ letexpr expr : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futBind_ = use FutharkAst in
  lam letexpr. lam expr.
  match letexpr with FELet t then
    FELet {t with inexpr = futBind_ t.inexpr expr}
  else expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futBindall_" kind="let">

```mc
let futBindall_ exprs : [FutharkExprAst_FutExpr] -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futBindall_ = lam exprs. foldr1 futBind_ exprs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nFutVar_" kind="let">

```mc
let nFutVar_ n : Name -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let nFutVar_ = use FutharkAst in
  lam n.
  FEVar {ident = n, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futVar_" kind="let">

```mc
let futVar_ str : String -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futVar_ = lam str. nFutVar_ (nameNoSym str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futVarExt_" kind="let">

```mc
let futVarExt_ str : String -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futVarExt_ = use FutharkAst in
  lam str.
  FEVarExt {ident = str, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futSizeCoercion_" kind="let">

```mc
let futSizeCoercion_ e ty : FutharkExprAst_FutExpr -> FutharkTypeAst_FutType -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futSizeCoercion_ = use FutharkAst in
  lam e. lam ty.
  FESizeCoercion {e = e, ty = ty, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futSizeEquality_" kind="let">

```mc
let futSizeEquality_ x1 d1 x2 d2 : Name -> Int -> Name -> Int -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futSizeEquality_ = use FutharkAst in
  lam x1. lam d1. lam x2. lam d2.
  FESizeEquality {x1 = x1, d1 = d1, x2 = x2, d2 = d2,
                  ty = FTyUnknown {info = NoInfo ()}, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futProj_" kind="let">

```mc
let futProj_ target label : FutharkExprAst_FutExpr -> String -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futProj_ = use FutharkAst in
  lam target. lam label.
  FEProj {target = target, label = stringToSid label, ty = futUnknownTy_,
          info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futRecord_" kind="let">

```mc
let futRecord_ fieldSeq : [(String, FutharkExprAst_FutExpr)] -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futRecord_ = use FutharkAst in
  lam fieldSeq.
  FERecord {fields = mapFromSeq cmpSID (map
                       (lam kv : (String, FutExpr). (stringToSid kv.0, kv.1))
                       fieldSeq),
            ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futTuple_" kind="let">

```mc
let futTuple_ fields : [FutharkExprAst_FutExpr] -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futTuple_ = use FutharkAst in
  lam fields.
  futRecord_ (create (length fields) (lam i. (int2string i, get fields i)))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futUnit_" kind="let">

```mc
let futUnit_ _ : all a. a -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futUnit_ = lam. futRecord_ []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futRecordProj_" kind="let">

```mc
let futRecordProj_  : FutharkExprAst_FutExpr -> String -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futRecordProj_ = futProj_
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futRecordUpdate_" kind="let">

```mc
let futRecordUpdate_ rec field v : FutharkExprAst_FutExpr -> String -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futRecordUpdate_ = use FutharkAst in
  lam rec. lam field. lam v.
  FERecordUpdate {rec = rec, key = stringToSid field, value = v,
                  ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futArray_" kind="let">

```mc
let futArray_ tms : [FutharkExprAst_FutExpr] -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futArray_ = use FutharkAst in
  lam tms.
  FEArray {tms = tms, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futArrayAccess_" kind="let">

```mc
let futArrayAccess_ array index : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futArrayAccess_ = use FutharkAst in
  lam array. lam index.
  FEArrayAccess {array = array, index = index, ty = futUnknownTy_,
                 info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futArrayUpdate_" kind="let">

```mc
let futArrayUpdate_ array index value : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futArrayUpdate_ = use FutharkAst in
  lam array. lam index. lam value.
  FEArrayUpdate {array = array, index = index, value = value,
                 ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futArraySlice_" kind="let">

```mc
let futArraySlice_ array startIdx endIdx : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futArraySlice_ = use FutharkAst in
  lam array. lam startIdx. lam endIdx.
  FEArraySlice {array = array, startIdx = startIdx, endIdx = endIdx,
                ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futConst_" kind="let">

```mc
let futConst_ c : FutharkConstAst_FutConst -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futConst_ = use FutharkAst in
  lam c.
  FEConst {val = c, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nFutLam_" kind="let">

```mc
let nFutLam_ n body : Name -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let nFutLam_ = use FutharkAst in
  lam n. lam body.
  FELam {ident = n, body = body, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futLam_" kind="let">

```mc
let futLam_ str body : String -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futLam_ = lam str. lam body.
  nFutLam_ (nameNoSym str) body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futApp_" kind="let">

```mc
let futApp_ lhs rhs : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futApp_ = use FutharkAst in
  lam lhs. lam rhs.
  FEApp {lhs = lhs, rhs = rhs, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futAppSeq_" kind="let">

```mc
let futAppSeq_ f seq : FutharkExprAst_FutExpr -> [FutharkExprAst_FutExpr] -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futAppSeq_ = lam f. lam seq.
  foldl futApp_ f seq
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futBinop_" kind="let">

```mc
let futBinop_ op a b : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futBinop_ = lam op. lam a. lam b.
  futAppSeq_ op [a, b]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nFutLet_" kind="let">

```mc
let nFutLet_ n ty body : Name -> FutharkTypeAst_FutType -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let nFutLet_ = use FutharkAst in
  lam n. lam ty. lam body.
  FELet {ident = n, tyBody = ty, body = body, inexpr = futUnit_ (),
         ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="nuFutLet_" kind="let">

```mc
let nuFutLet_ n body : Name -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let nuFutLet_ =
  lam n. lam body.
  nFutLet_ n futUnknownTy_ body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="uFutLet_" kind="let">

```mc
let uFutLet_ str body : String -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let uFutLet_ = lam str. lam body.
  nuFutLet_ (nameNoSym str) body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futLet_" kind="let">

```mc
let futLet_ str ty body : String -> FutharkTypeAst_FutType -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futLet_ = lam str. lam ty. lam body.
  nFutLet_ (nameNoSym str) ty body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futIf_" kind="let">

```mc
let futIf_ cond thn els : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futIf_ = use FutharkAst in
  lam cond. lam thn. lam els.
  FEIf {cond = cond, thn = thn, els = els, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futForEach_" kind="let">

```mc
let futForEach_ param loopVar seq body : (FutharkPatAst_FutPat, FutharkExprAst_FutExpr) -> Name -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futForEach_ = use FutharkAst in
  lam param : (FutPat, FutExpr). lam loopVar. lam seq. lam body.
  FEForEach {param = param, loopVar = loopVar, seq = seq, body = body,
             ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futMatch_" kind="let">

```mc
let futMatch_ target cases : FutharkExprAst_FutExpr -> [(FutharkPatAst_FutPat, FutharkExprAst_FutExpr)] -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futMatch_ = use FutharkAst in
  lam target. lam cases : [(FutPat, FutExpr)].
  FEMatch {target = target, cases = cases, ty = futUnknownTy_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futInt_" kind="let">

```mc
let futInt_ n : Int -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futInt_ = use FutharkAst in
  lam n.
  futConst_ (FCInt {val = n, sz = Some (I64 ())})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futFloat_" kind="let">

```mc
let futFloat_ f : Float -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futFloat_ = use FutharkAst in
  lam f.
  futConst_ (FCFloat {val = f, sz = Some (F64 ())})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futAdd_" kind="let">

```mc
let futAdd_  : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futAdd_ = use FutharkAst in
  futBinop_ (futConst_ (FCAdd ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futSub_" kind="let">

```mc
let futSub_  : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futSub_ = use FutharkAst in
  futBinop_ (futConst_ (FCSub ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futMul_" kind="let">

```mc
let futMul_  : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futMul_ = use FutharkAst in
  futBinop_ (futConst_ (FCMul ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futDiv_" kind="let">

```mc
let futDiv_  : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futDiv_ = use FutharkAst in
  futBinop_ (futConst_ (FCDiv ()))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futMap_" kind="let">

```mc
let futMap_ f as : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futMap_ = use FutharkAst in
  lam f. lam as.
  futAppSeq_ (futConst_ (FCMap ())) [f, as]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futMap2_" kind="let">

```mc
let futMap2_ f as bs : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futMap2_ = use FutharkAst in
  lam f. lam as. lam bs.
  futAppSeq_ (futConst_ (FCMap2 ())) [f, as, bs]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futReduce_" kind="let">

```mc
let futReduce_ f ne as : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futReduce_ = use FutharkAst in
  lam f. lam ne. lam as.
  futAppSeq_ (futConst_ (FCReduce ())) [f, ne, as]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futFlatten_" kind="let">

```mc
let futFlatten_ s : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futFlatten_ = use FutharkAst in
  lam s.
  futApp_ (futConst_ (FCFlatten ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futIndices_" kind="let">

```mc
let futIndices_ s : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futIndices_ = use FutharkAst in
  lam s.
  futApp_ (futConst_ (FCIndices ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futIota_" kind="let">

```mc
let futIota_ n : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futIota_ = use FutharkAst in
  lam n.
  futApp_ (futConst_ (FCIota ())) n
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futReplicate_" kind="let">

```mc
let futReplicate_ n e : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futReplicate_ = use FutharkAst in
  lam n. lam e.
  futAppSeq_ (futConst_ (FCReplicate ())) [n, e]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futTabulate_" kind="let">

```mc
let futTabulate_ n f : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futTabulate_ = use FutharkAst in
  lam n. lam f.
  futAppSeq_ (futConst_ (FCTabulate ())) [n, f]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futCopy_" kind="let">

```mc
let futCopy_ s : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futCopy_ = use FutharkAst in
  lam s.
  futApp_ (futConst_ (FCCopy ())) s
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futLength_" kind="let">

```mc
let futLength_ s : FutharkExprAst_FutExpr -> FutharkExprAst_FutExpr
```



<ToggleWrapper text="Code..">
```mc
let futLength_ = use FutharkAst in
  lam s.
  futApp_ (futConst_ (FCLength ())) s
```
</ToggleWrapper>
</DocBlock>

