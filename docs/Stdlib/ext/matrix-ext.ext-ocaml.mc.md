import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# matrix-ext.ext-ocaml.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/ocaml/ast.mc"} style={S.link}>ocaml/ast.mc</a>  
  
## Variables  
  

          <DocBlock title="matrixExtMap" kind="let">

```mc
let matrixExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let matrixExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [
    ("externalMatrixExponential", [
      { expr = "Owl_linalg_generic.expm",
        ty = tyarrows_ [otygenarrayclayoutfloat_, otygenarrayclayoutfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ]),
    ("externalMatrixTranspose", [
      { expr = "Owl_dense.Matrix.D.transpose",
        ty = tyarrows_ [otygenarrayclayoutfloat_, otygenarrayclayoutfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ]),
    ("externalMatrixMulFloat", [
      { expr = "Owl_dense.Matrix.D.( $* )",
        ty = tyarrows_ [tyfloat_, otygenarrayclayoutfloat_, otygenarrayclayoutfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ]),
    ("externalMatrixMul", [
      { expr = "Owl_dense.Matrix.D.( *@ )",
        ty = tyarrows_ [otygenarrayclayoutfloat_, otygenarrayclayoutfloat_, otygenarrayclayoutfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ]),
    ("externalMatrixElemMul", [
      { expr = "Owl_dense.Matrix.D.( * )",
        ty = tyarrows_ [otygenarrayclayoutfloat_, otygenarrayclayoutfloat_, otygenarrayclayoutfloat_],
        libraries = ["owl"],
        cLibraries = []
      }
    ]),
    ("externalMatrixElemAdd", [
    { expr = "Owl_dense.Matrix.D.( + )",
      ty = tyarrows_ [otygenarrayclayoutfloat_, otygenarrayclayoutfloat_, otygenarrayclayoutfloat_],
      libraries = ["owl"],
      cLibraries = []
    }
  ])
  ]
```
</ToggleWrapper>
</DocBlock>

