import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkWellFormed  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="WFError" kind="syn">

```mc
syn WFError
```



<ToggleWrapper text="Code..">
```mc
syn WFError =
  | FutharkFunctionInArray Type
  | FutharkFunctionInRecord Type
  | FutharkFunctionFromIf Expr
  | FutharkFunctionFromCreate Expr
  | FutharkFunctionFromFold Expr
  | FutharkFunctionFromMap Expr
  | FutharkRecLet Expr
  | FutharkExprError Expr
  | FutharkTypeError Type
  | FutharkPatternError Pat
  | FutharkConstantError Info
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="wellFormednessBackendName" kind="sem">

```mc
sem wellFormednessBackendName : () -> String
```



<ToggleWrapper text="Code..">
```mc
sem wellFormednessBackendName =
  | () -> "Futhark"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintWellFormedError" kind="sem">

```mc
sem pprintWellFormedError : WellFormed_WFError -> (Info, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintWellFormedError =
  | FutharkFunctionInArray ty ->
    (infoTy ty, "Sequences of function-type elements are not supported")
  | FutharkFunctionInRecord ty ->
    (infoTy ty, "Records containing function-type fields are not supported")
  | FutharkFunctionFromCreate expr ->
    (infoTm expr, "Creating sequences of functions is not supported")
  | FutharkFunctionFromMap expr ->
    (infoTm expr, "Map functions producing functions is not supported")
  | FutharkFunctionFromIf expr ->
    (infoTm expr, "Conditionals returning functions are not supported")
  | FutharkFunctionFromFold expr ->
    (infoTm expr, "Folds with accumulator of function type are not supported")
  | FutharkRecLet expr ->
    (infoTm expr, "Recursive let-expressions are not supported")
  | FutharkExprError expr ->
    (infoTm expr, "Expression is not supported")
  | FutharkTypeError ty ->
    (infoTy ty, "Type is not supported")
  | FutharkPatternError pat ->
    (infoPat pat, "Pattern is not supported")
  | FutharkConstantError info ->
    (info, "Constant is not supported")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futharkWellFormedExpr" kind="sem">

```mc
sem futharkWellFormedExpr : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem futharkWellFormedExpr acc =
  | e ->
    let acc = futharkWellFormedType acc (tyTm e) in
    futharkWellFormedExprH acc e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futharkWellFormedExprH" kind="sem">

```mc
sem futharkWellFormedExprH : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem futharkWellFormedExprH acc =
  | TmVar t -> acc
  | (TmApp t) & app ->
    let wellFormedApp = lam fun. lam args.
      let acc = futharkWellFormedExpr acc fun in
      foldl futharkWellFormedExpr acc args in
    match collectAppArguments app with (fun, args) in
    match fun with TmConst {val = CFoldl _, ty = ty} then
      match ty with TyArrow {to = TyArrow {from = TyArrow _}} then
        cons (FutharkFunctionFromFold app) acc
      else wellFormedApp fun args
    else wellFormedApp fun args
  | TmLam t -> futharkWellFormedExpr acc t.body
  | TmDecl (x & {decl = DeclLet t}) ->
    let acc = futharkWellFormedExpr acc t.body in
    futharkWellFormedExpr acc x.inexpr
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let acc = cons (FutharkRecLet (TmDecl x)) acc in
    futharkWellFormedExpr acc x.inexpr
  | TmConst t ->
    if isFutharkSupportedConstant t.val then acc
    else cons (FutharkConstantError t.info) acc
  | TmMatch t ->
    let acc = futharkWellFormedExpr acc t.target in
    let acc = futharkWellFormedPattern acc t.pat in
    let acc = futharkWellFormedExpr acc t.thn in
    let acc = futharkWellFormedExpr acc t.els in
    match t.ty with TyArrow _ then cons (FutharkFunctionFromIf (TmMatch t)) acc
    else acc
  | TmNever _ -> acc
  | TmRecord t ->
    mapFoldWithKey
      (lam acc. lam. lam expr. futharkWellFormedExpr acc expr)
      acc t.bindings
  | TmRecordUpdate t ->
    let acc = futharkWellFormedExpr acc t.rec in
    futharkWellFormedExpr acc t.value
  | TmSeq {tms = tms} -> foldl futharkWellFormedExpr acc tms
  | TmDecl (x & {decl = DeclExt t}) -> futharkWellFormedExpr acc x.inexpr
  | TmDecl (x & {decl = DeclType t}) ->
    let acc = futharkWellFormedType acc t.tyIdent in
    futharkWellFormedExpr acc x.inexpr
  | TmFlatten t -> futharkWellFormedExpr acc t.e
  | TmMap2 t ->
    let acc = futharkWellFormedExpr acc t.f in
    let acc = futharkWellFormedExpr acc t.as in
    futharkWellFormedExpr acc t.bs
  | TmParallelReduce t ->
    -- NOTE(larshum, 2021-12-13): A parallel reduce requires that the
    -- accumulator has the same type as the elements of the provided sequence.
    -- In addition, this type must not be a functional type.
    match t.ty with TyArrow _ then
      cons (FutharkFunctionFromFold (TmParallelReduce t)) acc
    else sfold_Expr_Expr futharkWellFormedExpr acc (TmParallelReduce t)
  | TmParallelSizeCoercion t -> futharkWellFormedExpr acc t.e
  | TmParallelSizeEquality t -> acc
  | expr -> cons (FutharkExprError expr) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futharkWellFormedType" kind="sem">

```mc
sem futharkWellFormedType : [WellFormed_WFError] -> Ast_Type -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem futharkWellFormedType acc =
  | TyInt _ | TyFloat _ | TyChar _ | TyBool _ -> acc
  | TyArrow {from = from, to = to} ->
    let acc = futharkWellFormedType acc from in
    futharkWellFormedType acc to
  | (TyRecord {fields = fields}) & recTy ->
    let isArrowType = lam ty. match ty with TyArrow _ then true else false in
    let acc =
      if any isArrowType (mapValues fields) then
        cons (FutharkFunctionInRecord recTy) acc
      else acc in
    mapFoldWithKey
      (lam acc. lam. lam ty. futharkWellFormedType acc ty) acc fields
  | TySeq {ty = ty & !(TyArrow _)} -> futharkWellFormedType acc ty
  | (TySeq _) & seqTy -> cons (FutharkFunctionInArray seqTy) acc
  | TyCon _ -> acc
  | TyVar _ -> acc
  | TyAlias t -> futharkWellFormedType acc t.content
  | ty -> cons (FutharkTypeError ty) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="futharkWellFormedPattern" kind="sem">

```mc
sem futharkWellFormedPattern : [WellFormed_WFError] -> Ast_Pat -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem futharkWellFormedPattern acc =
  | PatNamed _ | PatBool _ -> acc
  | PatRecord {bindings = bindings} ->
    mapFoldWithKey
      (lam acc. lam. lam pat. futharkWellFormedPattern acc pat)
      acc bindings
  | pat -> cons (FutharkPatternError pat) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isFutharkSupportedConstant" kind="sem">

```mc
sem isFutharkSupportedConstant : ConstAst_Const -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isFutharkSupportedConstant =
  | CInt _ | CFloat _ | CChar _ | CBool _ -> true
  | CAddi _ | CAddf _ | CSubi _ | CSubf _ | CMuli _ | CMulf _ | CDivi _
  | CDivf _ | CModi _ | CNegi _ | CNegf _ | CEqi _ | CEqf _ | CLti _ | CLtf _
  | CGti _ | CGtf _ | CLeqi _ | CLeqf _ | CGeqi _ | CGeqf _ | CNeqi _
  | CNeqf _ | CFloorfi _ | CInt2float _ -> true
  | CCreate _ | CLength _ | CReverse _ | CConcat _ | CHead _ | CTail _
  | CNull _ | CSubsequence _ | CMap _ | CFoldl _ | CGet _ | CSet _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedExprH" kind="sem">

```mc
sem wellFormedExprH : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormedExprH acc =
  | t -> futharkWellFormedExpr acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedTypeH" kind="sem">

```mc
sem wellFormedTypeH : [WellFormed_WFError] -> Ast_Type -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wellFormedTypeH acc =
  | t -> futharkWellFormedType acc t
```
</ToggleWrapper>
</DocBlock>

