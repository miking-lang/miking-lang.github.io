import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# cvode.mc  
  

Interface to the CVODE module in sundialsml  
https://inria\-parkas.github.io/sundialsml/Cvode.html

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/sundials/sundials.mc"} style={S.link}>sundials/sundials.mc</a>  
  
## Types  
  

          <DocBlock title="CVODEDlsDense" kind="type">

```mc
type CVODEDlsDense
```



<ToggleWrapper text="Code..">
```mc
type CVODEDlsDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEDlsSolverSession" kind="type">

```mc
type CVODEDlsSolverSession
```



<ToggleWrapper text="Code..">
```mc
type CVODEDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODETolerance" kind="type">

```mc
type CVODETolerance
```



<ToggleWrapper text="Code..">
```mc
type CVODETolerance
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODELinearMultistepMethod" kind="type">

```mc
type CVODELinearMultistepMethod
```



<ToggleWrapper text="Code..">
```mc
type CVODELinearMultistepMethod
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODESession" kind="type">

```mc
type CVODESession
```



<ToggleWrapper text="Code..">
```mc
type CVODESession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODESolveError" kind="type">

```mc
type CVODESolveError
```



<ToggleWrapper text="Code..">
```mc
type CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODESolverResult" kind="type">

```mc
type CVODESolverResult
```



<ToggleWrapper text="Code..">
```mc
type CVODESolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODERHS" kind="type">

```mc
type CVODERHS : Float -> Tensor [Float] -> Tensor [Float] -> () external cvodeDlsDense !: NvectorSerial -> SundialsMatrixDense -> CVODEDlsDense
```

<Description>{`Right\-hand side functions for calculating ODE derivatives. They are passed  
three arguments:  
\- t, the value of the independent variable, i.e., the simulation time,  
\- y, the vector of dependent\-variable values, i.e., y\(t\), and,  
\- y', a vector for storing the value of f\(t,y\).`}</Description>


<ToggleWrapper text="Code..">
```mc
type CVODERHS = Float -> Tensor[Float] -> Tensor[Float] -> ()

external cvodeDlsDense !
  : NvectorSerial -> SundialsMatrixDense -> CVODEDlsDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEInitArg" kind="type">

```mc
type CVODEInitArg : { lmm: CVODELinearMultistepMethod, tol: CVODETolerance, lsolver: CVODEDlsSolverSession, rhs: CVODERHS, t0: Float, y0: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type CVODEInitArg = {
  -- The linear multistep method.
  lmm : CVODELinearMultistepMethod,

  -- The integration tolerances.
  tol : CVODETolerance,

  -- Used by non-linear solver based on Newton interations.
  lsolver : CVODEDlsSolverSession,

  -- The ODE right-hand-side function.
  rhs : CVODERHS,

  -- The initial value of the independent variable.
  t0 : Float,

  --  Initial state values that also determines the number of equations.
  y0 : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODESolveNormalArg" kind="type">

```mc
type CVODESolveNormalArg : { s: CVODESession, tend: Float, y: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type CVODESolveNormalArg = {
  -- A solver session.
  s : CVODESession,

  -- The next time at which a solution is desired.
  tend : Float,

  -- A vector to store the computed solution.
  y : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="CVODEIllInput" kind="con">

```mc
con CVODEIllInput : {} -> CVODESolveError
```

<Description>{`Missing or illegal solver inputs.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEIllInput : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODETooClose" kind="con">

```mc
con CVODETooClose : {} -> CVODESolveError
```

<Description>{`The initial and final times are too close to each other and not initial step  
size was specified.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODETooClose : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODETooMuchWork" kind="con">

```mc
con CVODETooMuchWork : {} -> CVODESolveError
```

<Description>{`The requested time could not be reached in mxstep internal steps.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODETooMuchWork : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODETooMuchAccuracy" kind="con">

```mc
con CVODETooMuchAccuracy : {} -> CVODESolveError
```

<Description>{`The requested accuracy could not be satisfied.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODETooMuchAccuracy : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEErrFailure" kind="con">

```mc
con CVODEErrFailure : {} -> CVODESolveError
```

<Description>{`Too many error test failures within a step or at the minimum step size.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEErrFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEConvergenceFailure" kind="con">

```mc
con CVODEConvergenceFailure : {} -> CVODESolveError
```

<Description>{`Too many convergence test failures within a step or at the minimum step size.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEConvergenceFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODELinearInitFailure" kind="con">

```mc
con CVODELinearInitFailure : {} -> CVODESolveError
```

<Description>{`Linear solver initialization failed.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODELinearInitFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODELinearSetupFailure" kind="con">

```mc
con CVODELinearSetupFailure : {} -> CVODESolveError
```

<Description>{`Linear solver setup failed unrecoverably.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODELinearSetupFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODELinearSolveFailure" kind="con">

```mc
con CVODELinearSolveFailure : {} -> CVODESolveError
```

<Description>{`Linear solver solution failed unrecoverably.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODELinearSolveFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODERhsFuncFailure" kind="con">

```mc
con CVODERhsFuncFailure : {} -> CVODESolveError
```

<Description>{`Unrecoverable failure in the RHS function f.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODERhsFuncFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEFirstRhsFuncFailure" kind="con">

```mc
con CVODEFirstRhsFuncFailure : {} -> CVODESolveError
```

<Description>{`Initial unrecoverable failure in the RHS function f.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEFirstRhsFuncFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODERepeatedRhsFuncFailure" kind="con">

```mc
con CVODERepeatedRhsFuncFailure : {} -> CVODESolveError
```

<Description>{`Too many convergence test failures, or unable to estimate the initial step  
size, due to repeated recoverable errors in the right\-hand side function.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODERepeatedRhsFuncFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEUnrecoverableRhsFuncFailure" kind="con">

```mc
con CVODEUnrecoverableRhsFuncFailure : {} -> CVODESolveError
```

<Description>{`The right\-hand side function had a recoverable error, but no recovery was  
possible. This error can only occur after an error test failure at order one.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEUnrecoverableRhsFuncFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODERootFuncFailure" kind="con">

```mc
con CVODERootFuncFailure : {} -> CVODESolveError
```

<Description>{`Failure in the rootfinding function g.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODERootFuncFailure : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEErrUnspecified" kind="con">

```mc
con CVODEErrUnspecified : {} -> CVODESolveError
```

<Description>{`Unspecified solver failure.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEErrUnspecified : {} -> CVODESolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODESuccess" kind="con">

```mc
con CVODESuccess : {} -> CVODESolverResult
```

<Description>{`The solution was advanced.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODESuccess : {} -> CVODESolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODERootsFound" kind="con">

```mc
con CVODERootsFound : {} -> CVODESolverResult
```

<Description>{`A root was found.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODERootsFound : {} -> CVODESolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODEStopTimeReached" kind="con">

```mc
con CVODEStopTimeReached : {} -> CVODESolverResult
```

<Description>{`The stop time was reached.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODEStopTimeReached : {} -> CVODESolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CVODESolveError" kind="con">

```mc
con CVODESolveError : CVODESolveError -> CVODESolverResult
```

<Description>{`Solver error.`}</Description>


<ToggleWrapper text="Code..">
```mc
con CVODESolveError : CVODESolveError -> CVODESolverResult
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_cvodeErrorCodeToError" kind="let">

```mc
let _cvodeErrorCodeToError ec : Int -> CVODESolveError
```



<ToggleWrapper text="Code..">
```mc
let _cvodeErrorCodeToError : Int -> CVODESolveError
  = lam ec.
  switch ec
    case 0 then CVODEIllInput {}
    case 1 then CVODETooClose {}
    case 2 then CVODETooMuchWork {}
    case 3 then CVODETooMuchAccuracy {}
    case 4 then CVODEErrFailure {}
    case 5 then CVODEConvergenceFailure {}
    case 6 then CVODELinearInitFailure {}
    case 7 then CVODELinearSetupFailure {}
    case 8 then CVODELinearSolveFailure {}
    case 9 then CVODERhsFuncFailure {}
    case 10 then CVODEFirstRhsFuncFailure {}
    case 11 then CVODERepeatedRhsFuncFailure {}
    case 12 then CVODEUnrecoverableRhsFuncFailure {}
    case 13 then CVODERootFuncFailure {}
    case _ then CVODEErrUnspecified {}
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_cvodeSolverCodeToSolverResult" kind="let">

```mc
let _cvodeSolverCodeToSolverResult rc : (Int, Int) -> CVODESolverResult
```



<ToggleWrapper text="Code..">
```mc
let _cvodeSolverCodeToSolverResult : (Int, Int) -> CVODESolverResult
  = lam rc.
  switch rc
    case (0, _) then CVODESuccess {}
    case (1, _) then CVODERootsFound {}
    case (2, _) then CVODEStopTimeReached {}
    case (3, ec) then CVODESolveError (_cvodeErrorCodeToError ec)
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeDlsDense" kind="let">

```mc
let cvodeDlsDense y m : NvectorSerial -> SundialsMatrixDense -> CVODEDlsDense
```

<Description>{`\`cvodeDlsDense y m\` returns a linear solver associated with the state vector  
\`y\` and dense Jacobian iteration matrix \`m\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cvodeDlsDense = lam y. lam m. cvodeDlsDense y m

external cvodeDlsSolver ! : CVODEDlsDense -> CVODEDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeDlsSolver" kind="let">

```mc
let cvodeDlsSolver solver : CVODEDlsDense -> CVODEDlsSolverSession
```

<Description>{`\`cvodeDlsSolver solver\` initializes the solver \`solver\`. This solver will  
internally approximate the system Jacobian.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cvodeDlsSolver = lam solver. cvodeDlsSolver solver

external cvodeSSTolerances : Float -> Float -> CVODETolerance
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeSSTolerances" kind="let">

```mc
let cvodeSSTolerances rtol atol : Float -> Float -> CVODETolerance
```

<Description>{`\`cvodeSSTolerances rtol atol\` constructs scalar error tolerances where \`rtol\`  
is the relative tolerance and \`atol\` the absolute tolerance.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cvodeSSTolerances = lam rtol. lam atol. cvodeSSTolerances rtol atol
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeDefaultTolerances" kind="let">

```mc
let cvodeDefaultTolerances  : CVODETolerance
```



<ToggleWrapper text="Code..">
```mc
let cvodeDefaultTolerances = cvodeSSTolerances 1.e-4 1.e-8

-- Adams-Moulton formulas (non-stiff systems).
external cvodeLMMAdams : CVODELinearMultistepMethod
-- Backward Differentiation Formulas (stiff systems).
external cvodeLMMBDF : CVODELinearMultistepMethod

external cvodeInit !
  : CVODELinearMultistepMethod ->
    CVODETolerance ->
    CVODEDlsSolverSession ->
    CVODERHS ->
    Float ->
    NvectorSerial ->
    CVODESession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeInit" kind="let">

```mc
let cvodeInit arg : CVODEInitArg -> CVODESession
```

<Description>{`\`cvodeInit arg\` creates an CVODE session given arguments \`arg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cvodeInit = lam arg : CVODEInitArg.
  cvodeInit arg.lmm arg.tol arg.lsolver arg.rhs arg.t0 arg.y0

external cvodeSolveNormal !
  : CVODESession ->
    Float ->
    NvectorSerial ->
    (Float, (Int, Int))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeSolveNormal" kind="let">

```mc
let cvodeSolveNormal arg : CVODESolveNormalArg -> (Float, CVODESolverResult)
```

<Description>{`\`cvodeSolveNormal s arg\` solves problem in session \`s\` given \`arg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cvodeSolveNormal = lam arg : CVODESolveNormalArg.
  match cvodeSolveNormal arg.s arg.tend arg.y with (tend, rc) in
  (tend, _cvodeSolverCodeToSolverResult rc)

external cvodeSetStopTime ! : CVODESession -> Float -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cvodeSetStopTime" kind="let">

```mc
let cvodeSetStopTime s tend : CVODESession -> Float -> ()
```

<Description>{`Limits the value of the independent variable t when solving. By default no  
stop time is imposed.`}</Description>


<ToggleWrapper text="Code..">
```mc
let cvodeSetStopTime = lam s : CVODESession. lam tend : Float.
  cvodeSetStopTime s tend
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

utest
  let tget = tensorLinearGetExn in
  let tset = tensorLinearSetExn in
  let tcreate = tensorCreateCArrayFloat in

  let rhs = lam. lam y. lam dy.
    let x = tget y 0 in
    let vx = tget y 1 in
    tset dy 0 vx;
    tset dy 1 (negf (addf vx x));
    ()
  in

  let runTests = lam.
    let y = tcreate [2] (lam. 0.) in
    tset y 0 1.;
    let v = nvectorSerialWrap y in

    let m = sundialsMatrixDense 2 in
    let lsolver = cvodeDlsSolver (cvodeDlsDense v m) in

    let t0 = 0. in

    let s = cvodeInit {
      lmm      = cvodeLMMBDF,
      tol      = cvodeDefaultTolerances,
      lsolver  = lsolver,
      rhs      = rhs,
      t0       = t0,
      y0       = v
    } in

    cvodeSetStopTime s 10.;

    recursive let recur = lam t.
      switch cvodeSolveNormal { s = s, tend = addf t 0.1, y = v }
        case (tend, CVODEStopTimeReached _) then (tend, true)
        case (tend, CVODESuccess _) then recur tend
        case _ then (t, false)
      end
    in
    utest recur 0. with (10., true) in
    ()
  in
  runTests ();
  ()
with () in ()
```
</ToggleWrapper>
</DocBlock>

