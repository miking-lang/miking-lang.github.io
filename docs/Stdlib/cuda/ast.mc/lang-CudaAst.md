import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="CudaDimension" kind="syn">

```mc
syn CudaDimension
```



<ToggleWrapper text="Code..">
```mc
syn CudaDimension =
  | CuDX ()
  | CuDY ()
  | CuDZ ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CudaAttribute" kind="syn">

```mc
syn CudaAttribute
```



<ToggleWrapper text="Code..">
```mc
syn CudaAttribute =
  | CuAHost ()
  | CuADevice ()
  | CuAGlobal ()
  | CuAExternC ()
  | CuAManaged ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CType" kind="syn">

```mc
syn CType
```



<ToggleWrapper text="Code..">
```mc
syn CType =
  | CTyConst {ty : CType}
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
  | CESeqMap {f : CExpr, s : CExpr, sTy : CType, ty : CType}
  | CESeqFoldl {f : CExpr, acc : CExpr, s : CExpr, sTy : CType,
                argTypes : [CType], ty : CType}
  | CESeqLoop {n : CExpr, f : CExpr, argTypes : [CType]}
  | CESeqLoopAcc {ne : CExpr, n : CExpr, f : CExpr, neTy : CType, argTypes : [CType]}
  | CETensorSliceExn {t : CExpr, slice : CExpr, ty : CType}
  | CETensorSubExn {t : CExpr, ofs : CExpr, len : CExpr, ty : CType}
  | CEThreadIdx {dim : CudaDimension}
  | CEBlockIdx {dim : CudaDimension}
  | CEBlockDim {dim : CudaDimension}
  | CEGridDim {dim : CudaDimension}
  | CEMapKernel {f : CExpr, s : CExpr, opsPerThread : Int, sTy : CType, ty : CType}
  | CELoopKernel {n : CExpr, f : CExpr, argTypes : [CType], opsPerThread : Int}
  | CEKernelApp {fun : Name, gridSize : CExpr, blockSize : CExpr,
                 args : [CExpr]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CStmt" kind="syn">

```mc
syn CStmt
```



<ToggleWrapper text="Code..">
```mc
syn CStmt =
  | CSIfMacro {cond : CExpr, thn : [CStmt], els : [CStmt]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CuTop" kind="syn">

```mc
syn CuTop
```



<ToggleWrapper text="Code..">
```mc
syn CuTop =
  | CuTTop {attrs : [CudaAttribute], top : CTop}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CudaProg" kind="syn">

```mc
syn CudaProg
```



<ToggleWrapper text="Code..">
```mc
syn CudaProg =
  | CuPProg {includes : [String], tops : [CuTop]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumLCTypeCType" kind="sem">

```mc
sem smapAccumLCTypeCType : all acc. (acc -> CExprTypeAst_CType -> (acc, CExprTypeAst_CType)) -> acc -> CExprTypeAst_CType -> (acc, CExprTypeAst_CType)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumLCTypeCType f acc =
  | CTyConst t ->
    match f acc t.ty with (acc, ty) in
    (acc, CTyConst {t with ty = ty})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumLCExprCExpr" kind="sem">

```mc
sem smapAccumLCExprCExpr : all acc. (acc -> CExprTypeAst_CExpr -> (acc, CExprTypeAst_CExpr)) -> acc -> CExprTypeAst_CExpr -> (acc, CExprTypeAst_CExpr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumLCExprCExpr f acc =
  | CESeqMap t ->
    match f acc t.f with (acc, tf) in
    match f acc t.s with (acc, s) in
    (acc, CESeqMap {{t with f = tf} with s = s})
  | CESeqFoldl t ->
    match f acc t.f with (acc, tf) in
    match f acc t.acc with (acc, tacc) in
    match f acc t.s with (acc, s) in
    (acc, CESeqFoldl {{{t with f = tf} with acc = tacc} with s = s})
  | CESeqLoop t ->
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, CESeqLoop {{t with n = n} with f = tf})
  | CESeqLoopAcc t ->
    match f acc t.ne with (acc, ne) in
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, CESeqLoopAcc {{{t with ne = ne} with n = n} with f = tf})
  | CEMapKernel t ->
    match f acc t.f with (acc, tf) in
    match f acc t.s with (acc, s) in
    (acc, CEMapKernel {{t with f = tf} with s = s})
  | CELoopKernel t ->
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, CELoopKernel {{t with n = n} with f = tf})
  | CEKernelApp t ->
    match f acc t.gridSize with (acc, gridSize) in
    match f acc t.blockSize with (acc, blockSize) in
    match mapAccumL f acc t.args with (acc, args) in
    (acc, CEKernelApp {{{t with gridSize = gridSize}
                           with blockSize = blockSize}
                           with args = args})
  | expr & (CEThreadIdx _ | CEBlockIdx _ | CEBlockDim _) -> (acc, expr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumLCStmtCStmt" kind="sem">

```mc
sem smapAccumLCStmtCStmt : all acc. (acc -> CStmtAst_CStmt -> (acc, CStmtAst_CStmt)) -> acc -> CStmtAst_CStmt -> (acc, CStmtAst_CStmt)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumLCStmtCStmt f acc =
  | CSIfMacro t ->
    match mapAccumL f acc t.thn with (acc, thn) in
    match mapAccumL f acc t.els with (acc, els) in
    (acc, CSIfMacro {{t with thn = thn} with els = els})
```
</ToggleWrapper>
</DocBlock>

