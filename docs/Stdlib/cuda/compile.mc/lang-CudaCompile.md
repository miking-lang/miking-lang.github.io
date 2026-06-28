import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaCompile  
  

  
  
  
## Semantics  
  

          <DocBlock title="_stripPointer" kind="sem">

```mc
sem _stripPointer : CExprTypeAst_CType -> CExprTypeAst_CType
```



<ToggleWrapper text="Code..">
```mc
sem _stripPointer =
  | CTyPtr {ty = ty} -> ty
  | _ -> error "_stripPointer called with non-pointer type argument"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_accessMember" kind="sem">

```mc
sem _accessMember : CExprTypeAst_CType -> CExprTypeAst_CExpr -> Name -> CExprTypeAst_CExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _accessMember lhsType lhs =
  | id ->
    match lhsType with CTyPtr _ then
      CEArrow {lhs = lhs, id = id}
    else CEMember {lhs = lhs, id = id}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getFunctionArgTypes" kind="sem">

```mc
sem _getFunctionArgTypes : MExprCCompileBase_CompileCEnv -> Ast_Expr -> [CExprTypeAst_CType]
```



<ToggleWrapper text="Code..">
```mc
sem _getFunctionArgTypes (env : CompileCEnv) =
  | TmVar _ -> []
  | t & (TmApp _) ->
    match collectAppArguments t with (_, args) in
    map (lam arg. compileType env (tyTm arg)) args
  | t -> errorSingle [infoTm t] "Unsupported function type"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileExpr" kind="sem">

```mc
sem compileExpr : MExprCCompileBase_CompileCEnv -> Ast_Expr -> CExprTypeAst_CExpr
```



<ToggleWrapper text="Code..">
```mc
sem compileExpr (env : CompileCEnv) =
  | TmSeqMap t -> errorSingle [t.info] "Maps are not supported"
  | TmSeqFoldl t ->
    let argTypes = _getFunctionArgTypes env t.f in
    CESeqFoldl {
      f = compileExpr env t.f, acc = compileExpr env t.acc,
      s = compileExpr env t.s, sTy = compileType env (tyTm t.s),
      argTypes = argTypes, ty = compileType env t.ty}
  | TmParallelReduce t ->
    -- NOTE(larshum, 2022-03-22): Parallel reductions that are not promoted to
    -- a kernel are compiled to sequential folds.
    let argTypes = _getFunctionArgTypes env t.f in
    CESeqFoldl {
      f = compileExpr env t.f, acc = compileExpr env t.ne,
      s = compileExpr env t.as, sTy = compileType env (tyTm t.as),
      argTypes = argTypes, ty = compileType env t.ty}
  | TmTensorSliceExn t ->
    CETensorSliceExn {
      t = compileExpr env t.t, slice = compileExpr env t.slice,
      ty = compileType env t.ty}
  | TmTensorSubExn t ->
    CETensorSubExn {
      t = compileExpr env t.t, ofs = compileExpr env t.ofs,
      len = compileExpr env t.len, ty = compileType env t.ty}
  | TmMapKernel t -> errorSingle [t.info] "Maps are not supported"
  | TmReduceKernel t -> errorSingle [t.info] "not implemented yet"
  | TmLoop t | TmParallelLoop t ->
    -- NOTE(larshum, 2022-03-08): Parallel loops that were not promoted to a
    -- kernel are compiled to sequential loops.
    let argTypes = _getFunctionArgTypes env t.f in
    CESeqLoop {
      n = compileExpr env t.n, f = compileExpr env t.f, argTypes = argTypes}
  | TmLoopAcc t ->
    let argTypes = _getFunctionArgTypes env t.f in
    CESeqLoopAcc {
      ne = compileExpr env t.ne, n = compileExpr env t.n,
      f = compileExpr env t.f, neTy = compileType env (tyTm t.ne),
      argTypes = argTypes}
  | TmLoopKernel t ->
    let argTypes = _getFunctionArgTypes env t.f in
    CELoopKernel {
      n = compileExpr env t.n, f = compileExpr env t.f, argTypes = argTypes,
      opsPerThread = 10}
  | TmPrintFloat t ->
    CEApp {
      fun = _printf, args = [
        CEString { s = "%f" },
        compileExpr env t.e]}
```
</ToggleWrapper>
</DocBlock>

