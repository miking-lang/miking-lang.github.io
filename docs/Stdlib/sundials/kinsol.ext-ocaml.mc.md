import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# kinsol.ext-ocaml.mc  
  

  
  
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
  { expr = arg.expr, ty = arg.ty, libraries = ["sundialsml"], cLibraries = [] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyrealarray" kind="let">

```mc
let tyrealarray  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyrealarray = otyvarext_ "Sundials.RealArray.t" []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tykinsolresf" kind="let">

```mc
let tykinsolresf  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tykinsolresf =
  tyarrows_ [
    otybaarrayclayoutfloat_ 1,
    otybaarrayclayoutfloat_ 1,
    otyunit_
  ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kinsolExtMap" kind="let">

```mc
let kinsolExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let kinsolExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [
    ("kinsolDlsDense", [
      impl {
        expr = "Kinsol.Dls.dense",
        ty = tyarrows_ [otyopaque_, otyopaque_, otyopaque_]
      }
    ]),
    ("kinsolDlsSolver", [
      impl {
        expr = "Kinsol.Dls.solver",
        ty =
          tyarrows_ [
            otyopaque_,
            otyopaque_
          ]
      }
    ]),
    ("cvodeSSTolerances", [
      impl {
        expr = "fun rtol atol -> Cvode.SStolerances (rtol, atol)",
        ty = tyarrows_ [tyfloat_, tyfloat_, otyopaque_]
      }
    ]),
    ("kinsolNewton", [
      impl {
        expr = "Kinsol.Newton",
        ty = otyopaque_
      }
    ]),
    ("kinsolLineSearch", [
      impl {
        expr = "Kinsol.LineSearch",
        ty = otyopaque_
      }
    ]),
    ("kinsolPicard", [
      impl {
        expr = "Kinsol.Picard",
        ty = otyopaque_
      }
    ]),
    ("kinsolFixedPoint", [
      impl {
        expr = "Kinsol.FixedPoint",
        ty = otyopaque_
      }
    ]),
    ("kinsolInit", [
      impl {
        expr = "Kinsol.init",
        ty = tyarrows_ [
          otylabel_ "lsolver" otyopaque_,
          tykinsolresf,
          otyopaque_,
          otyopaque_
        ]
      }
    ]),
    ("kinsolSolve", [
      impl {
        expr = "
begin
  let solve s u strategy u_scale f_scale =
    try
      match Kinsol.solve s u strategy u_scale f_scale with
      | Kinsol.Success -> (0, -1)
      | Kinsol.InitialGuessOK -> (1, -1)
      | Kinsol.StoppedOnStepTol -> (2, -1)
    with
    | Kinsol.MissingLinearSolver -> (3, 0)  
    | Kinsol.IllInput -> (3, 1) 
    | Kinsol.LineSearchNonConvergence -> (3, 2) 
    | Kinsol.MaxIterationsReached -> (3, 3) 
    | Kinsol.MaxNewtonStepExceeded -> (3, 4) 
    | Kinsol.LineSearchBetaConditionFailure -> (3, 5)
    | Kinsol.LinearSolverNoRecovery -> (3, 6)
    | Kinsol.LinearSolverInitFailure -> (3, 7)
    | Kinsol.LinearSetupFailure _ -> (3, 8) 
    | Kinsol.LinearSolveFailure _ -> (3, 9) 
    | Kinsol.SystemFunctionFailure -> (3, 10) 
    | Kinsol.FirstSystemFunctionFailure -> (3, 11) 
    | Kinsol.RepeatedSystemFunctionFailure -> (3, 12)     
  in solve
end
",
        ty = tyarrows_ [
                otyopaque_,
                otyopaque_,
                tyint_,
                otyopaque_,
                otyopaque_,
                otytuple_ [tyint_, tyint_]
        ]
      }
    ])
  ]
```
</ToggleWrapper>
</DocBlock>

