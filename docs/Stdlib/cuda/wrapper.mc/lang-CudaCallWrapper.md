import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaCallWrapper  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateCudaWrapperCall" kind="sem">

```mc
sem generateCudaWrapperCall : PMExprCWrapper_CWrapperEnv -> [CStmtAst_CStmt]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateCudaWrapperCall =
  | env ->
    match env.targetEnv with CudaTargetEnv cenv in
    let return : ArgData = env.return in
    let returnType = return.mexprType in
    let cudaType = getCudaType env.targetEnv returnType in
    let args : [CExpr] =
      map
        (lam arg : ArgData. CEVar {id = arg.gpuIdent})
        env.arguments in
    let cudaWrapperId =
      match mapLookup env.functionIdent cenv.wrapperMap with Some id then id
      else error "Internal compiler error: No function defined for wrapper map" in
    match return.cData with CudaRecordRepr {fields = []} then
      let wrapperCallStmt = CSExpr {expr = CEApp {
        fun = cudaWrapperId, args = args}} in
      [wrapperCallStmt]
    else
      let returnDecl = CSDef {
        ty = cudaType, id = Some return.gpuIdent, init = None ()} in
      let cudaWrapperCallStmt = CSExpr {expr = CEBinOp {
        op = COAssign (),
        lhs = CEVar {id = return.gpuIdent},
        rhs = CEApp {fun = cudaWrapperId, args = args}}} in
      [returnDecl, cudaWrapperCallStmt]
```
</ToggleWrapper>
</DocBlock>

