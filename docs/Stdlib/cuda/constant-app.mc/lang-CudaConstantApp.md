import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaConstantApp  
  

Translates constant applications to an expression node which contains the  
applied arguments.

  
  
  
## Semantics  
  

          <DocBlock title="toConstantExpr" kind="sem">

```mc
sem toConstantExpr : Info -> [Ast_Expr] -> ConstAst_Const -> Option Ast_Expr
```

<Description>{`NOTE\(larshum, 2022\-08\-10\): Passing the wrong number of arguments should be  
caught by the well\-formedness check. However, we double\-check this here to  
provide a somewhat readable error message.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantAppToExpr" kind="sem">

```mc
sem constantAppToExpr : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantAppToExpr =
  | TmApp t ->
    match collectAppArguments (TmApp t) with (TmConst {val = c}, args) then
      let args = map constantAppToExpr args in
      match toConstantExpr t.info args c with Some expr then
        withInfo t.info (withType t.ty expr)
      else smap_Expr_Expr constantAppToExpr (TmApp t)
    else smap_Expr_Expr constantAppToExpr (TmApp t)
  | t -> smap_Expr_Expr constantAppToExpr t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_assertLength" kind="sem">

```mc
sem _assertLength : Info -> [Ast_Expr] -> Int -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _assertLength info args =
  | expectedLength ->
    if eqi (length args) expectedLength then ()
    else
      errorSingle [info] "Cannot accelerate partially applied constant function"
```
</ToggleWrapper>
</DocBlock>

