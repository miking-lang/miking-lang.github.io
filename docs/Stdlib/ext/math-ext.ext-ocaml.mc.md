import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# math-ext.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="impl" kind="let">

```mc
let impl arg : all a. all a1. {ty: Ast_Type, expr: String} -> {ty: Ast_Type, expr: String, libraries: [a], cLibraries: [a1]}
```



<ToggleWrapper text="Code..">
```mc
let impl = lam arg : { expr : String, ty : use Ast in Type }.
  { expr = arg.expr, ty = arg.ty, libraries = [], cLibraries = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mathExtMap" kind="let">

```mc
let mathExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let mathExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString [
    ("externalExp", [
      impl { expr = "Float.exp", ty = tyarrow_ tyfloat_ tyfloat_ }
    ]),
    ("externalLog", [
      impl { expr = "Float.log", ty = tyarrow_ tyfloat_ tyfloat_ }
    ]),
    ("externalAtan", [
      impl { expr = "Float.atan", ty = tyarrow_ tyfloat_ tyfloat_ }
    ]),
    ("externalSin", [
      impl { expr = "Float.sin", ty = tyarrow_ tyfloat_ tyfloat_ }
    ]),
    ("externalCos", [
      impl { expr = "Float.cos", ty = tyarrow_ tyfloat_ tyfloat_ }
    ]),
    ("externalAtan2", [
      impl { expr = "Float.atan2", ty = tyarrows_ [tyfloat_, tyfloat_, tyfloat_] }
    ]),
    ("externalPow", [
      impl { expr = "Float.pow", ty = tyarrows_ [tyfloat_, tyfloat_, tyfloat_] }
    ]),
    ("externalSqrt", [
      impl { expr = "Float.sqrt", ty = tyarrow_ tyfloat_ tyfloat_ }
    ]),
    ("externalLogGamma", [
      { expr = "Owl_maths.loggamma ",
        ty = tyarrows_ [tyfloat_, tyfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ]),
    ("externalLogCombination", [
      { expr = "Owl_maths.log_combination ",
        ty = tyarrows_ [tyint_, tyint_, tyfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ])
  ]
```
</ToggleWrapper>
</DocBlock>

