import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaIntrinsic  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateCudaIntrinsicFunction" kind="sem">

```mc
sem generateCudaIntrinsicFunction : MExprCCompileBase_CompileCEnv -> CExprTypeAst_CExpr -> (Name, CudaAst_CuTop)
```



<ToggleWrapper text="Code..">
```mc
sem generateCudaIntrinsicFunction : CompileCEnv -> CExpr -> (Name, CuTop)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateCudaIntrinsicCall" kind="sem">

```mc
sem generateCudaIntrinsicCall : MExprCCompileBase_CompileCEnv -> [CudaAst_CuTop] -> CExprTypeAst_CExpr -> CExprTypeAst_CExpr -> ([CudaAst_CuTop], CStmtAst_CStmt)
```



<ToggleWrapper text="Code..">
```mc
sem generateCudaIntrinsicCall : CompileCEnv -> [CuTop] -> CExpr -> CExpr
                               -> ([CuTop], CStmt)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getSequenceElemType" kind="sem">

```mc
sem _getSequenceElemType : MExprCCompileBase_CompileCEnv -> Ast_Type -> CExprTypeAst_CType
```



<ToggleWrapper text="Code..">
```mc
sem _getSequenceElemType (env : CompileCEnv) =
  | ty ->
    -- TODO(larshum, 2022-02-08): Assumes 1d sequence
    match _unwrapType env.typeEnv ty with TySeq {ty = ty} then
      compileType env ty
    else errorSingle [infoTy ty] "Could not unwrap sequence type"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getStructDataElemType" kind="sem">

```mc
sem _getStructDataElemType : all a. MExprCCompileBase_CompileCEnv -> CExprTypeAst_CType -> a
```



<ToggleWrapper text="Code..">
```mc
sem _getStructDataElemType (env : CompileCEnv) =
  | cty ->
    recursive let findTypeId : CType -> Name = lam ty.
      match ty with CTyPtr t then findTypeId t.ty
      else match ty with CTyVar {id = id} then id
      else error "Expected struct type"
    in
    let typeId = findTypeId cty in
    never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getFunctionIdAndArgs" kind="sem">

```mc
sem _getFunctionIdAndArgs : CExprTypeAst_CExpr -> (Name, [CExprTypeAst_CExpr])
```



<ToggleWrapper text="Code..">
```mc
sem _getFunctionIdAndArgs =
  | CEVar {id = id} -> (id, [])
  | CEApp {fun = fun, args = args} -> (fun, args)
  | _ -> error "Unsupported function call"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getFunctionArgNames" kind="sem">

```mc
sem _getFunctionArgNames : CExprTypeAst_CExpr -> [Name]
```



<ToggleWrapper text="Code..">
```mc
sem _getFunctionArgNames =
  | CEVar {id = id} -> []
  | CEApp {fun = fun, args = args} ->
    let getArgName = lam arg : CExpr.
      match arg with CEVar {id = id} then id
      else error "Unsupported function call"
    in
    map getArgName args
  | _ -> error "Unsupported function call"
```
</ToggleWrapper>
</DocBlock>

