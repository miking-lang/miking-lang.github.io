import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# constant-app.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/cuda/pmexpr-ast.mc"} style={S.link}>cuda/pmexpr-ast.mc</a>, <a href={"/docs/Stdlib/pmexpr/utils.mc"} style={S.link}>pmexpr/utils.mc</a>  
  
## Languages  
  

          <DocBlock title="CudaConstantApp" kind="lang" link="/docs/Stdlib/cuda/constant-app.mc/lang-CudaConstantApp">

```mc
lang CudaConstantApp
```

<Description>{`Translates constant applications to an expression node which contains the  
applied arguments.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang CudaConstantApp = CudaPMExprAst
  -- NOTE(larshum, 2022-08-10): Passing the wrong number of arguments should be
  -- caught by the well-formedness check. However, we double-check this here to
  -- provide a somewhat readable error message.
  sem toConstantExpr : Info -> [Expr] -> Const -> Option Expr
  sem toConstantExpr info args =
  | CMap _ ->
    _assertLength info args 2;
    Some (seqMap_ (get args 0) (get args 1))
  | CFoldl _ ->
    _assertLength info args 3;
    Some (seqFoldl_ (get args 0) (get args 1) (get args 2))
  | CTensorSliceExn _ ->
    _assertLength info args 2;
    Some (tensorSliceExn_ (get args 0) (get args 1))
  | CTensorSubExn _ ->
    _assertLength info args 3;
    Some (tensorSubExn_ (get args 0) (get args 1) (get args 2))
  | _ -> None ()

  sem constantAppToExpr =
  | TmApp t ->
    match collectAppArguments (TmApp t) with (TmConst {val = c}, args) then
      let args = map constantAppToExpr args in
      match toConstantExpr t.info args c with Some expr then
        withInfo t.info (withType t.ty expr)
      else smap_Expr_Expr constantAppToExpr (TmApp t)
    else smap_Expr_Expr constantAppToExpr (TmApp t)
  | t -> smap_Expr_Expr constantAppToExpr t

  sem _assertLength : Info -> [Expr] -> Int -> ()
  sem _assertLength info args =
  | expectedLength ->
    if eqi (length args) expectedLength then ()
    else
      errorSingle [info] "Cannot accelerate partially applied constant function"
end
```
</ToggleWrapper>
</DocBlock>

