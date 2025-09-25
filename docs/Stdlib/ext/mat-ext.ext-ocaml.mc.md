import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# mat-ext.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="impl" kind="let">

```mc
let impl arg : all a. {ty: Ast_Type, expr: String} -> {ty: Ast_Type, expr: String, libraries: [String], cLibraries: [a]}
```



<ToggleWrapper text="Code..">
```mc
let impl = lam arg : { expr : String, ty : use Ast in Type }.
  { expr = arg.expr, ty = arg.ty, libraries = ["owl"], cLibraries = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="owlDenseMatrixGenericInplaceUnop" kind="let">

```mc
let owlDenseMatrixGenericInplaceUnop name shape1 shape2 : String -> String -> String -> String
```



<ToggleWrapper text="Code..">
```mc
let owlDenseMatrixGenericInplaceUnop = lam name. lam shape1. lam shape2.
  join [
    "(fun m n a b -> Owl_dense_matrix.Generic.",
    name,
    " ~out:(Bigarray.genarray_of_array2 (Bigarray.reshape_2 (Bigarray.genarray_of_array1 b) ",
    shape2,
    ")) (Bigarray.genarray_of_array2 (Bigarray.reshape_2 (Bigarray.genarray_of_array1 a) ",
    shape1,
    ")))"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="owlDenseMatrixGenericInplaceUnopTy" kind="let">

```mc
let owlDenseMatrixGenericInplaceUnopTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let owlDenseMatrixGenericInplaceUnopTy = tyarrows_ [
  tyint_, tyint_, otyopaque_, otyopaque_, otyunit_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="owlDenseMatrixGenericInplaceBinop" kind="let">

```mc
let owlDenseMatrixGenericInplaceBinop name : String -> String
```



<ToggleWrapper text="Code..">
```mc
let owlDenseMatrixGenericInplaceBinop = lam name.
  join [
    "(fun m n a b c -> Owl_dense_matrix.Generic.",
    name,
    " ~out:(Bigarray.genarray_of_array2 (Bigarray.reshape_2 (Bigarray.genarray_of_array1 c) m n)) (Bigarray.genarray_of_array2 (Bigarray.reshape_2 (Bigarray.genarray_of_array1 a) m n)) (Bigarray.genarray_of_array2 (Bigarray.reshape_2 (Bigarray.genarray_of_array1 b) m n)))"]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="owlDenseMatrixGenericInplaceBinopTy" kind="let">

```mc
let owlDenseMatrixGenericInplaceBinopTy  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let owlDenseMatrixGenericInplaceBinopTy = tyarrows_ [
  tyint_, tyint_, otyopaque_, otyopaque_, otyopaque_, otyunit_]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matExtMap" kind="let">

```mc
let matExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let matExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString [
    ("externalMatTranspose", [
      impl {
        expr = owlDenseMatrixGenericInplaceUnop "transpose_" "m n" "n m",
        ty = owlDenseMatrixGenericInplaceUnopTy
      }
    ]),
    ("externalMatElemExp", [
      impl {
        expr = owlDenseMatrixGenericInplaceUnop "exp_" "m n" "m n",
        ty = owlDenseMatrixGenericInplaceUnopTy
      }
    ]),
    ("externalMatElemLog", [
      impl {
        expr = owlDenseMatrixGenericInplaceUnop "log_" "m n" "m n",
        ty = owlDenseMatrixGenericInplaceUnopTy
      }
    ]),
    ("externalMatElemMul", [
      impl {
        expr = owlDenseMatrixGenericInplaceBinop "mul_",
        ty = owlDenseMatrixGenericInplaceBinopTy
      }
    ]),
    ("externalMatExp", [
      impl {
        expr = "(fun m n a -> Bigarray.reshape_1 (Owl_linalg_generic.expm (Bigarray.genarray_of_array2 (Bigarray.reshape_2 (Bigarray.genarray_of_array1 a) m n))) (m * n))",
        ty = tyarrows_ [tyint_,  tyint_, otyopaque_, otyopaque_]
      }
    ])
  ]
```
</ToggleWrapper>
</DocBlock>

