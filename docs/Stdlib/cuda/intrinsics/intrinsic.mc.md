import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# intrinsic.mc  
  

Defines a base language fragment containing functions shared between  
multiple intrinsics.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/cuda/ast.mc"} style={S.link}>cuda/ast.mc</a>, <a href={"/docs/Stdlib/cuda/compile.mc"} style={S.link}>cuda/compile.mc</a>  
  
## Languages  
  

          <DocBlock title="CudaIntrinsic" kind="lang" link="/docs/Stdlib/cuda/intrinsics/intrinsic.mc/lang-CudaIntrinsic">

```mc
lang CudaIntrinsic
```



<ToggleWrapper text="Code..">
```mc
lang CudaIntrinsic = CudaAst + CudaCompile
  sem generateCudaIntrinsicFunction : CompileCEnv -> CExpr -> (Name, CuTop)

  sem generateCudaIntrinsicCall : CompileCEnv -> [CuTop] -> CExpr -> CExpr
                               -> ([CuTop], CStmt)

  sem _getSequenceElemType (env : CompileCEnv) =
  | ty ->
    -- TODO(larshum, 2022-02-08): Assumes 1d sequence
    match _unwrapType env.typeEnv ty with TySeq {ty = ty} then
      compileType env ty
    else errorSingle [infoTy ty] "Could not unwrap sequence type"

  sem _getStructDataElemType (env : CompileCEnv) =
  | cty ->
    recursive let findTypeId : CType -> Name = lam ty.
      match ty with CTyPtr t then findTypeId t.ty
      else match ty with CTyVar {id = id} then id
      else error "Expected struct type"
    in
    let typeId = findTypeId cty in
    never

  sem _getFunctionIdAndArgs =
  | CEVar {id = id} -> (id, [])
  | CEApp {fun = fun, args = args} -> (fun, args)
  | _ -> error "Unsupported function call"

  sem _getFunctionArgNames =
  | CEVar {id = id} -> []
  | CEApp {fun = fun, args = args} ->
    let getArgName = lam arg : CExpr.
      match arg with CEVar {id = id} then id
      else error "Unsupported function call"
    in
    map getArgName args
  | _ -> error "Unsupported function call"
end
```
</ToggleWrapper>
</DocBlock>

