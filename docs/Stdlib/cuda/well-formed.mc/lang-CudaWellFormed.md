import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaWellFormed  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="WFError" kind="syn">

```mc
syn WFError
```



<ToggleWrapper text="Code..">
```mc
syn WFError =
  | CudaExprError Expr
  | CudaDeclError Decl
  | CudaTypeError Type
  | CudaPatternError Pat
  | CudaConstantError Info
  | CudaAppArgTypeError Expr
  | CudaAppResultTypeError Expr
  | CudaFunctionDefError Expr
  | CudaFunctionInMatch Expr
  | CudaHigherOrderArgument Expr
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
  | () -> "CUDA"
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
  | CudaExprError expr ->
    (infoTm expr, "Expression is not supported")
  | CudaTypeError ty ->
    (infoTy ty, "Type is not supported")
  | CudaPatternError pat ->
    (infoPat pat, "Pattern is not supported")
  | CudaConstantError info ->
    (info, "Constant is not supported")
  | CudaAppResultTypeError app ->
    (infoTm app, "Return values of function type are not supported")
  | CudaFunctionDefError fun ->
    (infoTm fun, join ["Functions must be defined using explicit lambdas, ",
                       "using one lambda per parameter"])
  | CudaFunctionInMatch e ->
    (infoTm e, join ["Result of conditional expression cannot be a function"])
  | CudaHigherOrderArgument e ->
    (infoTm e, join ["Unsupported higher-order argument"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedExpr" kind="sem">

```mc
sem cudaWellFormedExpr : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedExpr acc =
  -- NOTE(larshum, 2022-08-09): Currently, the MLang transformation of semantic
  -- functions produce code containing unknown types, which are not allowed.
  -- We add the line below as a hack to allow compiling semantic functions.
  | TmApp {lhs = TmConst {val = CError _}} | TmNever _ -> acc
  | e ->
    let acc = cudaWellFormedType acc (tyTm e) in
    cudaWellFormedExprH acc e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaCheckConstApp" kind="sem">

```mc
sem _cudaCheckConstApp : [WellFormed_WFError] -> [Ast_Expr] -> ConstAst_Const -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _cudaCheckConstApp acc args =
  | CFoldl _ ->
    let acc = cudaWellFormedHigherOrder acc (get args 0) in
    let acc = cudaWellFormedExpr acc (get args 1) in
    cudaWellFormedExpr acc (get args 2)
  | CTensorSliceExn _ ->
    let acc = cudaWellFormedExpr acc (get args 0) in
    cudaWellFormedExpr acc (get args 1)
  | CTensorSubExn _ ->
    let acc = cudaWellFormedExpr acc (get args 0) in
    let acc = cudaWellFormedExpr acc (get args 1) in
    cudaWellFormedExpr acc (get args 2)
  | _ -> foldl cudaWellFormedExpr acc args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaCheckApp" kind="sem">

```mc
sem _cudaCheckApp : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _cudaCheckApp acc =
  | (TmApp t) & app ->
    match collectAppArguments app with (fun, args) in
    let acc =
      match fun with TmConst {val = c} then _cudaCheckConstApp acc args c
      else foldl cudaWellFormedExpr acc args in
    cudaWellFormedExpr acc fun
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedDecl" kind="sem">

```mc
sem cudaWellFormedDecl : [WellFormed_WFError] -> Ast_Decl -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedDecl acc =
  | DeclLet t ->
    let acc =
      if cudaWellFormedLambdas (t.body, t.tyBody) then acc
      else cons (CudaFunctionDefError t.body) acc in
    cudaWellFormedExpr acc t.body
  | DeclRecLets t ->
    let checkBinding = lam acc. lam bind.
      let acc =
        if cudaWellFormedLambdas (bind.body, bind.tyBody) then acc
        else cons (CudaFunctionDefError bind.body) acc in
      cudaWellFormedExpr acc bind.body
    in
    foldl checkBinding acc t.bindings
  | DeclExt _ -> acc
  | DeclType t -> cudaWellFormedType acc t.tyIdent
  | decl -> cons (CudaDeclError decl) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedExprH" kind="sem">

```mc
sem cudaWellFormedExprH : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedExprH acc =
  | TmVar t -> acc
  | (TmApp t) & app ->
    match t.ty with TyArrow _ then
      cons (CudaAppResultTypeError app) acc
    else _cudaCheckApp acc app
  | TmLam t -> cudaWellFormedExpr acc t.body
  | TmDecl x ->
    let acc = cudaWellFormedDecl acc x.decl in
    cudaWellFormedExpr acc x.inexpr
  | TmConst t ->
    if isCudaSupportedConstant t.val then acc
    else cons (CudaConstantError t.info) acc
  | TmMatch t ->
    let acc = cudaWellFormedExpr acc t.target in
    let acc = cudaWellFormedPattern acc t.pat in
    let acc = cudaWellFormedExpr acc t.thn in
    let acc = cudaWellFormedExpr acc t.els in
    match t.ty with TyArrow _ then cons (CudaFunctionInMatch (TmMatch t)) acc
    else acc
  | TmNever _ -> acc
  | TmRecord {bindings = bindings} ->
    mapFoldWithKey
      (lam acc. lam. lam expr. cudaWellFormedExpr acc expr) acc bindings
  | TmSeq {tms = tms} ->
    foldl (lam acc. lam expr. cudaWellFormedExpr acc expr) acc tms
  | TmLoop t | TmParallelLoop t ->
    let acc = cudaWellFormedExpr acc t.n in
    cudaWellFormedHigherOrder acc t.f
  | TmLoopAcc t ->
    let acc = cudaWellFormedExpr acc t.ne in
    let acc = cudaWellFormedExpr acc t.n in
    cudaWellFormedHigherOrder acc t.f
  | TmPrintFloat t -> acc
  | expr -> cons (CudaExprError expr) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedHigherOrder" kind="sem">

```mc
sem cudaWellFormedHigherOrder : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedHigherOrder acc =
  | TmVar t -> acc
  | app & (TmApp _) -> _cudaCheckApp acc app
  | t -> cons (CudaHigherOrderArgument t) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedType" kind="sem">

```mc
sem cudaWellFormedType : [WellFormed_WFError] -> Ast_Type -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedType acc =
  | TyInt _ | TyFloat _ | TyChar _ | TyBool _ -> acc
  | TyArrow {from = from, to = to} ->
    let acc = cudaWellFormedType acc from in
    cudaWellFormedType acc to
  | (TyRecord {fields = fields}) & recTy ->
    let containsArrowType = lam ty. containsArrowType false ty in
    let acc =
      if any containsArrowType (mapValues fields) then
        cons (CudaTypeError recTy) acc
      else acc
    in
    mapFoldWithKey
      (lam acc. lam. lam ty. cudaWellFormedType acc ty) acc fields
  | TySeq {ty = ty} & seqTy ->
    if containsArrowType false ty then
      cons (CudaTypeError seqTy) acc
    else
      cudaWellFormedType acc ty
  | TyTensor {ty = TyInt _ | TyFloat _} -> acc
  | TyCon _ -> acc
  | TyAlias t -> cudaWellFormedType acc t.content
  | ty -> cons (CudaTypeError ty) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="containsArrowType" kind="sem">

```mc
sem containsArrowType : Bool -> Ast_Type -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem containsArrowType acc =
  | TyArrow _ -> true
  | ty -> sfold_Type_Type containsArrowType acc ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedPattern" kind="sem">

```mc
sem cudaWellFormedPattern : [WellFormed_WFError] -> Ast_Pat -> [WellFormed_WFError]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedPattern acc =
  | PatNamed _ | PatBool _ -> acc
  | PatRecord {bindings = bindings} ->
    mapFoldWithKey
      (lam acc. lam. lam pat. cudaWellFormedPattern acc pat)
      acc bindings
  | pat -> cons (CudaPatternError pat) acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaWellFormedLambdas" kind="sem">

```mc
sem cudaWellFormedLambdas : (Ast_Expr, Ast_Type) -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cudaWellFormedLambdas =
  | (TmLam e, TyArrow ty) ->
    match ty.from with TyArrow _ then false
    else cudaWellFormedLambdas (e.body, ty.to)
  | (e, !(TyArrow _)) -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isCudaSupportedConstant" kind="sem">

```mc
sem isCudaSupportedConstant : ConstAst_Const -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isCudaSupportedConstant =
  | CInt _ | CFloat _ | CChar _ | CBool _ -> true
  | CAddi _ | CAddf _ | CSubi _ | CSubf _ | CMuli _ | CMulf _ | CDivi _
  | CDivf _ | CModi _ | CNegi _ | CNegf _ | CEqi _ | CEqf _ | CLti _ | CLtf _
  | CGti _ | CGtf _ | CLeqi _ | CLeqf _ | CGeqi _ | CGeqf _ | CNeqi _
  | CNeqf _ -> true
  | CPrint _ | CDPrint _ | CInt2float _ | CFloorfi _ | CGet _ | CLength _
  | CFoldl _ | CError _ -> true
  | CTensorGetExn _ | CTensorSetExn _ | CTensorLinearGetExn _
  | CTensorLinearSetExn _ | CTensorRank _ | CTensorShape _
  | CTensorSliceExn _ | CTensorSubExn _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedExprH" kind="sem">

```mc
sem wellFormedExprH : [WellFormed_WFError] -> Ast_Expr -> [WellFormed_WFError]
```



<ToggleWrapper text="Code..">
```mc
sem wellFormedExprH acc =
  | e -> cudaWellFormedExpr acc e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="wellFormedTypeH" kind="sem">

```mc
sem wellFormedTypeH : [WellFormed_WFError] -> Ast_Type -> [WellFormed_WFError]
```



<ToggleWrapper text="Code..">
```mc
sem wellFormedTypeH acc =
  | ty -> cudaWellFormedType acc ty
```
</ToggleWrapper>
</DocBlock>

