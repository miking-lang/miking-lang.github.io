import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# compile.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/c/compile.mc"} style={S.link}>c/compile.mc</a>, <a href={"/docs/Stdlib/cuda/ast.mc"} style={S.link}>cuda/ast.mc</a>, <a href={"/docs/Stdlib/cuda/pmexpr-ast.mc"} style={S.link}>cuda/pmexpr-ast.mc</a>, <a href={"/docs/Stdlib/pmexpr/utils.mc"} style={S.link}>pmexpr/utils.mc</a>  
  
## Languages  
  

          <DocBlock title="CudaCompile" kind="lang" link="/docs/Stdlib/cuda/compile.mc/lang-CudaCompile">

```mc
lang CudaCompile
```



<ToggleWrapper text="Code..">
```mc
lang CudaCompile = MExprCCompileAlloc + CudaPMExprAst + CudaAst
  sem _stripPointer =
  | CTyPtr {ty = ty} -> ty
  | _ -> error "_stripPointer called with non-pointer type argument"

  sem _accessMember : CType -> CExpr -> Name -> CExpr
  sem _accessMember lhsType lhs =
  | id ->
    match lhsType with CTyPtr _ then
      CEArrow {lhs = lhs, id = id}
    else CEMember {lhs = lhs, id = id}

  sem _getFunctionArgTypes (env : CompileCEnv) =
  | TmVar _ -> []
  | t & (TmApp _) ->
    match collectAppArguments t with (_, args) in
    map (lam arg. compileType env (tyTm arg)) args
  | t -> errorSingle [infoTm t] "Unsupported function type"

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
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_cudaMalloc" kind="let">

```mc
let _cudaMalloc  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaMalloc = nameNoSym "cudaMalloc"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaMallocManaged" kind="let">

```mc
let _cudaMallocManaged  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaMallocManaged = nameNoSym "cudaMallocManaged"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaMemcpy" kind="let">

```mc
let _cudaMemcpy  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaMemcpy = nameNoSym "cudaMemcpy"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaMemcpyDeviceToHost" kind="let">

```mc
let _cudaMemcpyDeviceToHost  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaMemcpyDeviceToHost = nameNoSym "cudaMemcpyDeviceToHost"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaMemcpyHostToDevice" kind="let">

```mc
let _cudaMemcpyHostToDevice  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaMemcpyHostToDevice = nameNoSym "cudaMemcpyHostToDevice"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaFree" kind="let">

```mc
let _cudaFree  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaFree = nameNoSym "cudaFree"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cudaDeviceSynchronize" kind="let">

```mc
let _cudaDeviceSynchronize  : Name
```



<ToggleWrapper text="Code..">
```mc
let _cudaDeviceSynchronize = nameNoSym "cudaDeviceSynchronize"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_malloc" kind="let">

```mc
let _malloc  : Name
```



<ToggleWrapper text="Code..">
```mc
let _malloc = nameNoSym "malloc"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_free" kind="let">

```mc
let _free  : Name
```



<ToggleWrapper text="Code..">
```mc
let _free = nameNoSym "free"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_CUDA_UTILS_CHECK_CUDA_ERROR" kind="let">

```mc
let _CUDA_UTILS_CHECK_CUDA_ERROR  : Name
```



<ToggleWrapper text="Code..">
```mc
let _CUDA_UTILS_CHECK_CUDA_ERROR = nameNoSym "CUDA_UTILS_CHECK_CUDA_ERROR"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_CUDA_UTILS_COPY_OCAML_CUDA" kind="let">

```mc
let _CUDA_UTILS_COPY_OCAML_CUDA  : Name
```



<ToggleWrapper text="Code..">
```mc
let _CUDA_UTILS_COPY_OCAML_CUDA = nameNoSym "cuda_utils_copyOCamlToCuda"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_CUDA_UTILS_COPY_CUDA_OCAML" kind="let">

```mc
let _CUDA_UTILS_COPY_CUDA_OCAML  : Name
```



<ToggleWrapper text="Code..">
```mc
let _CUDA_UTILS_COPY_CUDA_OCAML = nameNoSym "cuda_utils_copyCudaToOCaml"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cudaIncludes" kind="let">

```mc
let cudaIncludes  : [String]
```



<ToggleWrapper text="Code..">
```mc
let cudaIncludes = concat cIncludes []
```
</ToggleWrapper>
</DocBlock>

