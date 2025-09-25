import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ida.ext-ocaml.mc  
  

  
  
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


          <DocBlock title="tyidatriple" kind="let">

```mc
let tyidatriple  : [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyidatriple = otyvarext_ "Ida.triple"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyidajacobianarg" kind="let">

```mc
let tyidajacobianarg  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyidajacobianarg =
  otyvarext_ "Ida.jacobian_arg" [tyidatriple [tyrealarray], tyrealarray]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyidajacf" kind="let">

```mc
let tyidajacf  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyidajacf =
  tyarrows_ [
    otyrecordext_
      tyidajacobianarg
      [
        { label = "jac_t", asLabel = "t", ty = tyfloat_ },
        { label = "jac_y", asLabel = "y", ty = otybaarrayclayoutfloat_ 1 },
        { label = "jac_y'", asLabel = "yp", ty = otybaarrayclayoutfloat_ 1 },
        { label = "jac_res", asLabel = "res", ty = otybaarrayclayoutfloat_ 1 },
        { label = "jac_coef", asLabel = "c", ty = tyfloat_ },
        { label = "jac_tmp", asLabel = "tmp",
          ty = otytuple_ [
            otybaarrayclayoutfloat_ 1,
            otybaarrayclayoutfloat_ 1,
            otybaarrayclayoutfloat_ 1
        ] }
      ],
    otyopaque_,
    otyunit_
]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyidaresf" kind="let">

```mc
let tyidaresf  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyidaresf =
  tyarrows_ [
    tyfloat_,
    otybaarrayclayoutfloat_ 1,
    otybaarrayclayoutfloat_ 1,
    otybaarrayclayoutfloat_ 1,
    otyunit_
]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyidarootf" kind="let">

```mc
let tyidarootf  : Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let tyidarootf = tyidaresf
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaExtMap" kind="let">

```mc
let idaExtMap  : Map String [{ty: Ast_Type, expr: String, libraries: [String], cLibraries: [String]}]
```



<ToggleWrapper text="Code..">
```mc
let idaExtMap =
  use OCamlTypeAst in
  mapFromSeq cmpString
  [
    ("idaDlsDense", [
      impl {
        expr = "Ida.Dls.dense",
        ty = tyarrows_ [otyopaque_, otyopaque_, otyopaque_]
      }
    ]),
    ("idaDlsSolverJacf", [
      impl {
        expr = "Ida.Dls.solver",
        ty =
          tyarrows_ [
            otylabel_ "jac" tyidajacf,
            otyopaque_,
            otyopaque_
          ]
      }
    ]),
    ("idaDlsSolver", [
      impl {
        expr = "Ida.Dls.solver",
        ty =
          tyarrows_ [
            otyopaque_,
            otyopaque_
          ]
      }
    ]),
    ("idaVarIdAlgebraic", [
      impl { expr = "Ida.VarId.algebraic", ty = tyfloat_ }
    ]),
    ("idaVarIdDifferential", [
      impl { expr = "Ida.VarId.differential", ty = tyfloat_ }
    ]),
    ("idaSSTolerances", [
      impl {
        expr = "fun rtol atol -> Ida.SStolerances (rtol, atol)",
        ty = tyarrows_ [tyfloat_, tyfloat_, otyopaque_]
      }
    ]),
    ("idaRetcode", [
      impl {
        expr =
"function
  | Ida.Success ->
      0
  | Ida.StopTimeReached ->
      1
  | Ida.RootsFound ->
      2",
        ty = tyarrow_ otyopaque_ tyint_
      }
    ]),
    ("idaInit", [
      impl {
        expr = "Ida.init",
        ty = tyarrows_ [
          otyopaque_,
          otylabel_ "nlsolver" otyopaque_,
          otylabel_ "lsolver" otyopaque_,
          tyidaresf,
          otylabel_ "varid" otyopaque_,
          otylabel_ "roots" (otytuple_ [tyint_, tyidarootf]),
          tyfloat_,
          otyopaque_,
          otyopaque_,
          otyopaque_
        ]
      }
    ]),
    ("idaCalcICYaYd", [
      impl {
        expr = "
begin
 let calc_ic_ya_yd' s t y y' =
   try Ida.calc_ic_ya_yd' s t ~y:y ~y':y'; 0 with
   | Ida.IdNotSet -> 1
   | _ -> 2
 in calc_ic_ya_yd'
end
",
        ty = tyarrows_ [
               otyopaque_,
               tyfloat_,
               otyopaque_,
               otyopaque_,
               tyint_
        ]
      }
    ]),
    ("idaSolveNormal", [
      impl {
        expr = "
begin
  let solve_normal s tend y y' =
    try
      match Ida.solve_normal s tend y y' with
      | (tend, Ida.Success) -> (tend, (0, -1))
      | (tend, Ida.RootsFound) -> (tend, (1, -1))
      | (tend, Ida.StopTimeReached ) -> (tend, (2, -1))
    with
    | Ida.IllInput -> (tend, (3, 0))
    | Ida.TooMuchWork -> (tend, (3, 1))
    | Ida.TooMuchAccuracy -> (tend, (3, 2))
    | Ida.ErrFailure -> (tend, (3, 3))
    | Ida.ConvergenceFailure -> (tend, (3, 4))
    | Ida.LinearInitFailure -> (tend, (3, 5))
    | Ida.LinearSetupFailure _ -> (tend, (3, 6))
    | Ida.LinearSolveFailure _ -> (tend, (3, 7))
    | Ida.ConstraintFailure -> (tend, (3, 8))
    | Ida.FirstResFuncFailure -> (tend, (3, 9))
    | Ida.RepeatedResFuncFailure -> (tend, (3, 10))
    | Ida.ResFuncFailure -> (tend, (3, 11))
    | Ida.RootFuncFailure -> (tend, (3, 12))
    | _ -> (tend, (3, -1))
  in solve_normal
end
",
        ty = tyarrows_ [
               otyopaque_,
               tyfloat_,
               otyopaque_,
               otyopaque_,
               otytuple_ [tyfloat_, otytuple_ [tyint_, tyint_]]
        ]
      }
    ]),
    ("idaReinit", [
      impl {
        expr = "Ida.reinit",
        ty = tyarrows_ [
          otyopaque_,
          otylabel_ "roots" (otytuple_ [tyint_, tyidarootf]),
          tyfloat_,
          otyopaque_,
          otyopaque_,
          otyunit_
        ]
      }
    ]),
    ("idaSetStopTime", [
      impl {
        expr = "Ida.set_stop_time",
        ty = tyarrows_ [
          otyopaque_,
          tyfloat_,
          otyunit_
        ]
      }
    ])
  ]
```
</ToggleWrapper>
</DocBlock>

