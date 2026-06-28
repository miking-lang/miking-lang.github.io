import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CExprTypeAst  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
C TYPES AND EXPRESSIONS \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="CType" kind="syn">

```mc
syn CType
```



<ToggleWrapper text="Code..">
```mc
syn CType =
  | CTyVar    { id: Name }
  | CTyChar   {}
  | CTyInt    {}
  | CTyInt32  {}
  | CTyInt64  {}
  | CTyFloat  {}
  | CTyDouble {}
  | CTyVoid   {}
  | CTyPtr    { ty: CType }
  | CTyFun    { ret: CType, params: [CType] }
  | CTyArray  { ty: CType, size: Option CExpr }
  | CTyStruct { id: Option Name, mem: Option [(CType,Option Name)] }
  | CTyUnion  { id: Option Name, mem: Option [(CType,Option Name)] }
  | CTyEnum   { id: Option Name, mem: Option [Name] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CExpr" kind="syn">

```mc
syn CExpr
```



<ToggleWrapper text="Code..">
```mc
syn CExpr =
  | CEVar        /- Variables -/            { id: Name }
  | CEApp        /- Function application -/ { fun: Name, args: [CExpr] }
  | CEInt        /- Integer literals -/     { i: Int }
  | CEFloat      /- Float literals -/       { f: Float }
  | CEChar       /- Character literals -/   { c: Char }
  | CEString     /- String literals -/      { s: String }
  | CEBinOp      /- Binary operators -/     { op: CBinOp,
                                              lhs: CExpr,
                                              rhs: CExpr }
  | CEUnOp       /- Unary operators -/      { op: CUnOp, arg: CExpr }
  | CEMember     /- lhs.id -/               { lhs: CExpr, id: Name }
  | CEArrow      /- lhs->id -/              { lhs: CExpr, id: Name }
  | CECast       /- (ty) rhs -/             { ty: CType, rhs: CExpr }
  | CESizeOfType /- sizeof(ty) -/           { ty: CType }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CBinOp" kind="syn">

```mc
syn CBinOp
```



<ToggleWrapper text="Code..">
```mc
syn CBinOp =
  | COAssign    /- lhs = rhs -/  {}
  | COSubScript /- lhs[rhs] -/   {}
  | COOr        /- lhs || rhs -/ {}
  | COAnd       /- lhs && rhs -/ {}
  | COEq        /- lhs == rhs -/ {}
  | CONeq       /- lhs != rhs -/ {}
  | COLt        /- lhs < rhs -/  {}
  | COGt        /- lhs > rhs -/  {}
  | COLe        /- lhs <= rhs -/ {}
  | COGe        /- lhs >= rhs -/ {}
  | COShiftL    /- lhs << rhs -/ {}
  | COShiftR    /- lhs >> rhs -/ {}
  | COAdd       /- lhs + rhs -/  {}
  | COSub       /- lhs - rhs -/  {}
  | COMul       /- lhs * rhs -/  {}
  | CODiv       /- lhs / rhs -/  {}
  | COMod       /- lhs % rhs -/  {}
  | COBOr       /- lhs | rhs -/  {}
  | COBAnd      /- lhs & rhs -/  {}
  | COXor       /- lhs ^ rhs -/  {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CUnOp" kind="syn">

```mc
syn CUnOp
```



<ToggleWrapper text="Code..">
```mc
syn CUnOp =
  | COSizeOf /- sizeof(arg) -/ {}
  | CODeref  /- *arg -/        {}
  | COAddrOf /- &arg -/        {}
  | CONeg    /- -arg -/        {}
  | CONot    /- ~arg -/        {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="_mapAccumLMem" kind="sem">

```mc
sem _mapAccumLMem : all acc. (acc -> CExprTypeAst_CType -> (acc, CExprTypeAst_CType)) -> acc -> Option [(CExprTypeAst_CType, Option Name)] -> (acc, Option [(CExprTypeAst_CType, Option Name)])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _mapAccumLMem f acc =
  | mem ->
    let fMem = lam acc. lam memEntry : (CType, Option Name).
      match memEntry with (ty, optId) in
      match f acc ty with (acc, ty) in
      (acc, (ty, optId)) in
    match mem with Some mem then
      match mapAccumL fMem acc mem with (acc, mem) in
      (acc, Some mem)
    else (acc, mem)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumLCTypeCType" kind="sem">

```mc
sem smapAccumLCTypeCType : all acc. (acc -> CExprTypeAst_CType -> (acc, CExprTypeAst_CType)) -> acc -> CExprTypeAst_CType -> (acc, CExprTypeAst_CType)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumLCTypeCType f acc =
  | CTyPtr t ->
    match f acc t.ty with (acc, ty) in
    (acc, CTyPtr {t with ty = ty})
  | CTyFun t ->
    match f acc t.ret with (acc, ret) in
    match mapAccumL f acc t.params with (acc, params) in
    (acc, CTyFun {{t with ret = ret} with params = params})
  | CTyArray t ->
    match f acc t.ty with (acc, ty) in
    (acc, CTyArray {t with ty = ty})
  | CTyStruct t ->
    match _mapAccumLMem f acc t.mem with (acc, mem) in
    (acc, CTyStruct {t with mem = mem})
  | CTyUnion t ->
    match _mapAccumLMem f acc t.mem with (acc, mem) in
    (acc, CTyStruct {t with mem = mem})
  | ty -> (acc, ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapCTypeCType" kind="sem">

```mc
sem smapCTypeCType : (CExprTypeAst_CType -> CExprTypeAst_CType) -> CExprTypeAst_CType -> CExprTypeAst_CType
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapCTypeCType f =
  | p ->
    match smapAccumLCTypeCType (lam. lam a. ((), f a)) () p with (_, p) in p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfoldCTypeCType" kind="sem">

```mc
sem sfoldCTypeCType : all acc. (acc -> CExprTypeAst_CType -> acc) -> acc -> CExprTypeAst_CType -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfoldCTypeCType f acc =
  | p ->
    match smapAccumLCTypeCType (lam acc. lam a. (f acc a, a)) acc p
    with (acc, _) in
    acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumLCExprCExpr" kind="sem">

```mc
sem smapAccumLCExprCExpr : all acc. (acc -> CExprTypeAst_CExpr -> (acc, CExprTypeAst_CExpr)) -> acc -> CExprTypeAst_CExpr -> (acc, CExprTypeAst_CExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumLCExprCExpr f acc =
  | CEApp t ->
    match mapAccumL f acc t.args with (acc, args) in
    (acc, CEApp {t with args = args})
  | CEBinOp t ->
    match f acc t.lhs with (acc, lhs) in
    match f acc t.rhs with (acc, rhs) in
    (acc, CEBinOp {{t with lhs = lhs} with rhs = rhs})
  | CEUnOp t ->
    match f acc t.arg with (acc, arg) in
    (acc, CEUnOp {t with arg = arg})
  | CEMember t ->
    match f acc t.lhs with (acc, lhs) in
    (acc, CEMember {t with lhs = lhs})
  | CEArrow t ->
    match f acc t.lhs with (acc, lhs) in
    (acc, CEArrow {t with lhs = lhs})
  | CECast t ->
    match f acc t.rhs with (acc, rhs) in
    (acc, CECast {t with rhs = rhs})
  | (CEVar _ | CEInt _ | CEFloat _ | CEChar _ | CEString _ | CESizeOfType _) & ty ->
    (acc, ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_CExpr_CExpr" kind="sem">

```mc
sem smap_CExpr_CExpr : (CExprTypeAst_CExpr -> CExprTypeAst_CExpr) -> CExprTypeAst_CExpr -> CExprTypeAst_CExpr
```



<ToggleWrapper text="Code..">
```mc
sem smap_CExpr_CExpr (f: CExpr -> CExpr) =
  | p ->
    match smapAccumLCExprCExpr (lam. lam a. ((), f a)) () p with (_, p) in p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_CExpr_CExpr" kind="sem">

```mc
sem sfold_CExpr_CExpr : all acc. (acc -> CExprTypeAst_CExpr -> acc) -> acc -> CExprTypeAst_CExpr -> acc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_CExpr_CExpr f acc =
  | p ->
    match smapAccumLCExprCExpr (lam acc. lam a. (f acc a, a)) acc p
    with (acc, _) in
    acc
```
</ToggleWrapper>
</DocBlock>

