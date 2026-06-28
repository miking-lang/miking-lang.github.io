import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="_printCudaDim" kind="sem">

```mc
sem _printCudaDim : CudaAst_CudaDimension -> String
```



<ToggleWrapper text="Code..">
```mc
sem _printCudaDim =
  | CuDX _ -> "x"
  | CuDY _ -> "y"
  | CuDZ _ -> "z"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCType" kind="sem">

```mc
sem printCType : String -> PprintEnv -> CExprTypeAst_CType -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem printCType decl env =
  | CTyConst {ty = ty} ->
    match printCType decl env ty with (env, ty) in
    (env, _joinSpace "const" ty)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCExpr" kind="sem">

```mc
sem printCExpr : PprintEnv -> CExprTypeAst_CExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCExpr (env : PprintEnv) =
  | CESeqMap {f = f, s = s} ->
    match printCExpr env f with (env, f) in
    match printCExpr env s with (env, s) in
    (env, join ["seqMap(", f, ", ", s, ")"])
  | CESeqFoldl {f = f, acc = acc, s = s} ->
    match printCExpr env f with (env, f) in
    match printCExpr env acc with (env, acc) in
    match printCExpr env s with (env, s) in
    (env, join ["seqFoldl(", f, ", ", acc, ", ", s, ")"])
  | CESeqLoop {n = n, f = f} ->
    match printCExpr env n with (env, n) in
    match printCExpr env f with (env, f) in
    (env, join ["seqLoop(", n, ", ", f, ")"])
  | CESeqLoopAcc {ne = ne, n = n, f = f} ->
    match printCExpr env ne with (env, ne) in
    match printCExpr env n with (env, n) in
    match printCExpr env f with (env, f) in
    (env, join ["seqLoopFoldl(", ne, ", ", n, ", ", f, ")"])
  | CETensorSliceExn {t = t, slice = slice} ->
    match printCExpr env t with (env, t) in
    match printCExpr env slice with (env, slice) in
    (env, join ["tensorSliceExn(", t, ", ", slice, ")"])
  | CETensorSubExn {t = t, ofs = ofs, len = len} ->
    match printCExpr env t with (env, t) in
    match printCExpr env ofs with (env, ofs) in
    match printCExpr env len with (env, len) in
    (env, join ["tensorSubExn(", t, ", ", ofs, ", ", len, ")"])
  | CEThreadIdx {dim = dim} -> (env, concat "threadIdx." (_printCudaDim dim))
  | CEBlockIdx {dim = dim} -> (env, concat "blockIdx." (_printCudaDim dim))
  | CEBlockDim {dim = dim} -> (env, concat "blockDim." (_printCudaDim dim))
  | CEGridDim {dim = dim} -> (env, concat "gridDim." (_printCudaDim dim))
  | CEMapKernel {f = f, s = s, opsPerThread = opsPerThread} ->
    match printCExpr env f with (env, f) in
    match printCExpr env s with (env, s) in
    let ops = int2string opsPerThread in
    (env, join ["CEMapKernel(", f, ", ", s, ")[opsPerThread=", ops, "]"])
  | CELoopKernel {n = n, f = f, opsPerThread = opsPerThread} ->
    match printCExpr env n with (env, n) in
    match printCExpr env f with (env, f) in
    let ops = int2string opsPerThread in
    (env, join ["CELoopKernel(", n, ", ", f, ")[opsPerThread=", ops, "]"])
  | CEKernelApp t ->
    match cPprintEnvGetStr env t.fun with (env, fun) in
    match mapAccumL printCExpr env t.args with (env, args) in
    match printCExpr env t.gridSize with (env, gridSize) in
    match printCExpr env t.blockSize with (env, blockSize) in
    (env, join [fun, "<<<", gridSize, ", ", blockSize, ">>>(",
                strJoin ", " args, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCStmt" kind="sem">

```mc
sem printCStmt : Int -> PprintEnv -> CStmtAst_CStmt -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCStmt (indent : Int) (env : PprintEnv) =
  | CSIfMacro {cond = cond, thn = thn, els = els} ->
    let i = indent in
    match printCExpr env cond with (env, cond) in
    match printCStmts i env thn with (env, thn) in
    match printCStmts i env els with (env, els) in
    (env, join [
      "#if (", cond, ")", pprintNewline i, thn, pprintNewline i,
      "#else", pprintNewline i, els, pprintNewline i, "#endif"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCudaAttribute" kind="sem">

```mc
sem printCudaAttribute : PprintEnv -> CudaAst_CudaAttribute -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCudaAttribute (env : PprintEnv) =
  | CuAHost _ -> (env, "__host__")
  | CuADevice _ -> (env, "__device__")
  | CuAGlobal _ -> (env, "__global__")
  | CuAExternC _ -> (env, "extern \"C\"")
  | CuAManaged _ -> (env, "__managed__")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCudaTop" kind="sem">

```mc
sem printCudaTop : Int -> PprintEnv -> CudaAst_CuTop -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem printCudaTop (indent : Int) (env : PprintEnv) =
  | CuTTop {attrs = attrs, top = top} ->
    match mapAccumL printCudaAttribute env attrs with (env, attrs) in
    let attrs = if null attrs then "" else concat (strJoin " " attrs) " " in
    match printCTop indent env top with (env, top) in
    (env, join [attrs, top])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="printCudaProg" kind="sem">

```mc
sem printCudaProg : [Name] -> CudaAst_CudaProg -> String
```



<ToggleWrapper text="Code..">
```mc
sem printCudaProg (nameInit : [Name]) =
  | CuPProg {includes = includes, tops = tops} ->
    let indent = 0 in
    let includes = map (lam inc. join ["#include ", inc]) includes in
    let addName = lam env. lam name.
      match pprintAddStr env name with Some env then env
      else error (join ["Duplicate name in printCProg: ", nameGetStr name]) in
    let env = foldl addName pprintEnvEmpty (map nameNoSym cudaKeywords) in
    let env = foldl addName env nameInit in
    match mapAccumL (printCudaTop indent) env tops with (env, tops) in
    strJoin (pprintNewline indent) (join [includes, tops])
```
</ToggleWrapper>
</DocBlock>

