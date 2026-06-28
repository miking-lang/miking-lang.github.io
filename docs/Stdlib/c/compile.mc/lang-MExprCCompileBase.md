import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprCCompileBase  
  

  
  
  
## Types  
  

          <DocBlock title="CompileCEnv" kind="type">

```mc
type CompileCEnv : { options: CompileCOptions, ptrTypes: [Name], typeEnv: [(Name, Type)], externals: Map Name ExtInfo, allocs: [CStmt] }
```



<ToggleWrapper text="Code..">
```mc
type CompileCEnv = {

    -- C Compiler options
    options : CompileCOptions,

    -- Type names accessed through pointers
    ptrTypes: [Name],

    -- The initial type environment produced by type lifting
    typeEnv: [(Name,Type)],

    -- Map from MExpr external names to their C counterparts
    externals: Map Name ExtInfo,

    -- Accumulator for allocations in functions
    allocs: [CStmt]
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="defaultCompileCOptions" kind="sem">

```mc
sem defaultCompileCOptions : all a. a -> {use32BitInts: Bool, tensorMaxRank: Int, use32BitFloats: Bool}
```



<ToggleWrapper text="Code..">
```mc
sem defaultCompileCOptions =
  | _ -> {tensorMaxRank = 3, use32BitInts = false, use32BitFloats = false}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileCEnvEmpty" kind="sem">

```mc
sem compileCEnvEmpty : all a. all a1. all v. all a2. CompileCOptions -> {allocs: [a2], options: CompileCOptions, typeEnv: [a1], ptrTypes: [a], externals: Map Name v}
```

<Description>{`Empty environment`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileCEnvEmpty =
  | compileOptions ->
    let compileOptions : CompileCOptions = compileOptions in
    { options = compileOptions, ptrTypes = [], typeEnv = []
    , externals = mapEmpty nameCmp, allocs = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getCIntType" kind="sem">

```mc
sem getCIntType : MExprCCompileBase_CompileCEnv -> CExprTypeAst_CType
```

<Description>{`Compilation of constant types`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getCIntType =
  | env ->
    let env : CompileCEnv = env in
    let opts : CompileCOptions = env.options in
    if opts.use32BitInts then CTyInt32 () else CTyInt64 ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getCFloatType" kind="sem">

```mc
sem getCFloatType : MExprCCompileBase_CompileCEnv -> CExprTypeAst_CType
```



<ToggleWrapper text="Code..">
```mc
sem getCFloatType =
  | env ->
    let env : CompileCEnv = env in
    let opts : CompileCOptions = env.options in
    if opts.use32BitFloats then CTyFloat () else CTyDouble ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getCBoolType" kind="sem">

```mc
sem getCBoolType : all a. a -> CExprTypeAst_CType
```



<ToggleWrapper text="Code..">
```mc
sem getCBoolType =
  | env -> CTyChar ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getCCharType" kind="sem">

```mc
sem getCCharType : all a. a -> CExprTypeAst_CType
```



<ToggleWrapper text="Code..">
```mc
sem getCCharType =
  | env -> CTyChar ()
```
</ToggleWrapper>
</DocBlock>

