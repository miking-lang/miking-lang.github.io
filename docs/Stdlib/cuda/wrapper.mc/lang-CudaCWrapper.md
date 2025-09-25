import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaCWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateInitWrapperEnv" kind="sem">

```mc
sem generateInitWrapperEnv : Map Name Name -> MExprCCompileBase_CompileCEnv -> Int -> PMExprCWrapper_CWrapperEnv
```

<Description>{`Generates the initial wrapper environmentNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateInitWrapperEnv wrapperMap compileCEnv =
  | tensorMaxRank ->
    let compileCEnv : CompileCEnv = compileCEnv in
    let tupleSwap = lam t : (Name, Type). match t with (x, y) in (y, x) in
    let revTypeEnv = mapFromSeq cmpType (map tupleSwap compileCEnv.typeEnv) in
    let targetEnv = CudaTargetEnv {
      wrapperMap = wrapperMap, compileCEnv = compileCEnv,
      revTypeEnv = revTypeEnv, tensorMaxRank = tensorMaxRank} in
    let env : CWrapperEnv = _emptyWrapperEnv () in
    {env with targetEnv = targetEnv}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateMarshallingCode" kind="sem">

```mc
sem generateMarshallingCode : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```



<ToggleWrapper text="Code..">
```mc
sem generateMarshallingCode =
  | env ->
    let stmt1 = generateTensorIntervalStmts env in
    let stmt2 = generateIntervalSort env in
    let stmt3 = generateTopTensorConstruction env in
    let stmt4 = generateTensorCudaAlloc env in
    let stmt5 = generateOCamlToCudaWrapper env in
    let stmt6 = generateCudaWrapperCall env in
    let stmt7 = generateCudaToOCamlWrapper env in
    let stmt8 = generateTensorCudaDealloc env in
    join [stmt1, stmt2, stmt3, stmt4, stmt5, stmt6, stmt7, stmt8]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateWrapperCode" kind="sem">

```mc
sem generateWrapperCode : Map Name PMExprExtractAccelerate_AccelerateData -> Map Name Name -> Int -> MExprCCompileBase_CompileCEnv -> CudaAst_CudaProg
```

<Description>{`Defines the target\-specific generation of wrapper code.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateWrapperCode accelerated wrapperMap tensorMaxRank =
  | compileCEnv ->
    let env = generateInitWrapperEnv wrapperMap compileCEnv tensorMaxRank in
    let tensorTops = generateGlobalTensorTops compileCEnv in
    match generateWrapperCodeH env accelerated with (env, entryPointWrappers) in
    let entryPointTops =
      map
        (lam top : CTop. CuTTop {attrs = [CuAExternC ()], top = top})
        entryPointWrappers in
    CuPProg {
      includes = [
        "<stddef.h>",
        "<stdlib.h>",
        "<stdio.h>",
        "\"caml/alloc.h\"",
        "\"caml/bigarray.h\"",
        "\"caml/memory.h\"",
        "\"caml/mlvalues.h\"",
        "\"cuda-utils.cuh\""
      ],
      tops = concat tensorTops entryPointTops}
```
</ToggleWrapper>
</DocBlock>

