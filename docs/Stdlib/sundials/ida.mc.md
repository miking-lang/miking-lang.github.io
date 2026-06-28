import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ida.mc  
  

Interface to the IDA module in sundialsml  
https://inria\-parkas.github.io/sundialsml/Ida.html

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/sundials/sundials.mc"} style={S.link}>sundials/sundials.mc</a>  
  
## Types  
  

          <DocBlock title="IdaDlsDense" kind="type">

```mc
type IdaDlsDense
```



<ToggleWrapper text="Code..">
```mc
type IdaDlsDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaDlsSolver" kind="type">

```mc
type IdaDlsSolver
```



<ToggleWrapper text="Code..">
```mc
type IdaDlsSolver
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaDlsSolverSession" kind="type">

```mc
type IdaDlsSolverSession
```



<ToggleWrapper text="Code..">
```mc
type IdaDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaTolerance" kind="type">

```mc
type IdaTolerance
```



<ToggleWrapper text="Code..">
```mc
type IdaTolerance
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSession" kind="type">

```mc
type IdaSession
```



<ToggleWrapper text="Code..">
```mc
type IdaSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSolverResultInternal" kind="type">

```mc
type IdaSolverResultInternal
```



<ToggleWrapper text="Code..">
```mc
type IdaSolverResultInternal
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaCalcICResult" kind="type">

```mc
type IdaCalcICResult
```



<ToggleWrapper text="Code..">
```mc
type IdaCalcICResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSolveError" kind="type">

```mc
type IdaSolveError
```



<ToggleWrapper text="Code..">
```mc
type IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSolverResult" kind="type">

```mc
type IdaSolverResult
```



<ToggleWrapper text="Code..">
```mc
type IdaSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaJacArgs" kind="type">

```mc
type IdaJacArgs : { t: Float, y: Tensor [Float], yp: Tensor [Float], res: Tensor [Float], c: Float, tmp: (Tensor [Float], Tensor [Float], Tensor [Float]) }
```



<ToggleWrapper text="Code..">
```mc
type IdaJacArgs = {
  -- The current time.
  t   : Float,

  -- The values of y.
  y   : Tensor[Float],

  -- The values of y'.
  yp  : Tensor[Float],

  -- The current value of the residual.
  res : Tensor[Float],

  -- The scaling coefficient c in dF/dy + c dF/dy'.
  c   : Float,

  -- workspace data
  tmp : (Tensor[Float], Tensor[Float], Tensor[Float])
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaJacFn" kind="type">

```mc
type IdaJacFn : IdaJacArgs -> SundialsMatrixDense -> ()
```

<Description>{`System Jacobian dF/dy \+ c dF/dy', where the matrix argument is in column  
major order.`}</Description>


<ToggleWrapper text="Code..">
```mc
type IdaJacFn = IdaJacArgs -> SundialsMatrixDense -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaResFn" kind="type">

```mc
type IdaResFn : Float -> Tensor [Float] -> Tensor [Float] -> Tensor [Float] -> ()
```



<ToggleWrapper text="Code..">
```mc
type IdaResFn = Float -> Tensor[Float] -> Tensor[Float] -> Tensor[Float] -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaRootFn" kind="type">

```mc
type IdaRootFn : IdaResFn
```



<ToggleWrapper text="Code..">
```mc
type IdaRootFn = IdaResFn
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaInitArg" kind="type">

```mc
type IdaInitArg : { tol: IdaTolerance, nlsolver: SundialsNonlinearSolver, lsolver: IdaDlsSolverSession, resf: IdaResFn, varid: NvectorSerial, roots: (Int, IdaRootFn), t: Float, y: NvectorSerial, yp: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type IdaInitArg = {
  -- The error tolerances.
  tol     : IdaTolerance,

  -- The linear solver to use when calculating consistent inital conditions and
  -- calculating integrations steps.
  nlsolver : SundialsNonlinearSolver,

  -- The linear solver.
  lsolver : IdaDlsSolverSession,

  -- The residual function.
  resf    : IdaResFn,

  -- A vector indicating algebraic and differential variables. See
  -- \\`idaVarIdAlgebraic\\` and \\`idaVarIdDifferential\\`.
  varid   : NvectorSerial,

  -- A tuple \\`(n, rootf)\\` where \\`n\\` is the number of roots and \\`rootf\\` id the
  -- root function.
  roots   : (Int, IdaRootFn),

  -- The initial time.
  t       : Float,

  -- The initial states.
  y       : NvectorSerial,

  -- The initial derivatives of the states.
  yp      : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaCalcICYaYdArg" kind="type">

```mc
type IdaCalcICYaYdArg : { tend: Float, y: NvectorSerial, yp: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type IdaCalcICYaYdArg = {
  -- The time where to end the consistent initial value search.
  tend  : Float,

  -- A vector where the consistent initial values y should be written to.
  y  : NvectorSerial,

  -- A vector where the consistent initial values y' should be written to.
  yp : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSolveNormalArg" kind="type">

```mc
type IdaSolveNormalArg : { tend: Float, y: NvectorSerial, yp: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type IdaSolveNormalArg = {
  tend : Float,         -- The time at which the solution is requested
  y    : NvectorSerial, -- The solution to y at \\`tend\\`.
  yp   : NvectorSerial  -- The solution to y' at \\`tend\\`.
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaReinitArg" kind="type">

```mc
type IdaReinitArg : { roots: (Int, IdaRootFn), t: Float, y: NvectorSerial, yp: NvectorSerial }
```

<Description>{`See \`IdaInitArg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
type IdaReinitArg = {
  roots : (Int, IdaRootFn),
  t     : Float,
  y     : NvectorSerial,
  yp    : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="IdaCalcICOK" kind="con">

```mc
con IdaCalcICOK : {} -> IdaCalcICResult
```

<Description>{`Initial values calculations returned without error.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaCalcICOK : {} -> IdaCalcICResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaVarIdNotSet" kind="con">

```mc
con IdaVarIdNotSet : {} -> IdaCalcICResult
```

<Description>{`Variable ids are required but not set.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaVarIdNotSet : {} -> IdaCalcICResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaCalcICError" kind="con">

```mc
con IdaCalcICError : {} -> IdaCalcICResult
```

<Description>{`Initial values calculations returned with error.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaCalcICError : {} -> IdaCalcICResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaIllInput" kind="con">

```mc
con IdaIllInput : {} -> IdaSolveError
```

<Description>{`Raised on missing or illegal solver inputs. Also raised if an element of the  
error weight vector becomes zero during time stepping, or the linear solver  
initialization function failed, or a root was found both at t and very near  
t.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaIllInput : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaTooMuchWork" kind="con">

```mc
con IdaTooMuchWork : {} -> IdaSolveError
```

<Description>{`The requested time could not be reached in mxstep internal steps.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaTooMuchWork : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaTooMuchAccuracy" kind="con">

```mc
con IdaTooMuchAccuracy : {} -> IdaSolveError
```

<Description>{`The requested accuracy could not be satisfied.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaTooMuchAccuracy : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaErrFailure" kind="con">

```mc
con IdaErrFailure : {} -> IdaSolveError
```

<Description>{`Too many error test failures within a step.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaErrFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaConvergenceFailure" kind="con">

```mc
con IdaConvergenceFailure : {} -> IdaSolveError
```

<Description>{`Too many convergence test failures within a step, or Newton convergence  
failed.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaConvergenceFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaLinearInitFailure" kind="con">

```mc
con IdaLinearInitFailure : {} -> IdaSolveError
```

<Description>{`Linear solver initialization failed.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaLinearInitFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaLinearSetupFailure" kind="con">

```mc
con IdaLinearSetupFailure : {} -> IdaSolveError
```

<Description>{`Linear solver setup failed in an unrecoverable manner.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaLinearSetupFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaLinearSolveFailure" kind="con">

```mc
con IdaLinearSolveFailure : {} -> IdaSolveError
```

<Description>{`Linear solver solution failed in an unrecoverable manner.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaLinearSolveFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaConstraintFailure" kind="con">

```mc
con IdaConstraintFailure : {} -> IdaSolveError
```

<Description>{`No solution satisfying the inequality constraints could be found.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaConstraintFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaFirstResFuncFailure" kind="con">

```mc
con IdaFirstResFuncFailure : {} -> IdaSolveError
```

<Description>{`The residual function had a recoverable error when first called.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaFirstResFuncFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaRepeatedResFuncFailure" kind="con">

```mc
con IdaRepeatedResFuncFailure : {} -> IdaSolveError
```

<Description>{`Too many convergence test failures, or unable to estimate the initial step  
size, due to repeated recoverable errors in the residual function.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaRepeatedResFuncFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaResFuncFailure" kind="con">

```mc
con IdaResFuncFailure : {} -> IdaSolveError
```

<Description>{`The residual function failed in an unrecoverable manner.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaResFuncFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaRootFuncFailure" kind="con">

```mc
con IdaRootFuncFailure : {} -> IdaSolveError
```

<Description>{`The rootfinding function failed.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaRootFuncFailure : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaErrUnspecified" kind="con">

```mc
con IdaErrUnspecified : {} -> IdaSolveError
```

<Description>{`Unspecified solver failure.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaErrUnspecified : {} -> IdaSolveError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSuccess" kind="con">

```mc
con IdaSuccess : {} -> IdaSolverResult
```

<Description>{`The solution was advanced.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaSuccess : {} -> IdaSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaStopTimeReached" kind="con">

```mc
con IdaStopTimeReached : {} -> IdaSolverResult
```

<Description>{`The stop time was reached.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaStopTimeReached : {} -> IdaSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaRootsFound" kind="con">

```mc
con IdaRootsFound : {} -> IdaSolverResult
```

<Description>{`A root was found.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaRootsFound : {} -> IdaSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="IdaSolveError" kind="con">

```mc
con IdaSolveError : IdaSolveError -> IdaSolverResult
```

<Description>{`Solver error.`}</Description>


<ToggleWrapper text="Code..">
```mc
con IdaSolveError : IdaSolveError -> IdaSolverResult
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_idaCalcICRetCodeToResult" kind="let">

```mc
let _idaCalcICRetCodeToResult rc : Int -> IdaCalcICResult
```



<ToggleWrapper text="Code..">
```mc
let _idaCalcICRetCodeToResult = lam rc.
  switch rc
  case 0 then IdaCalcICOK {}
  case 1 then IdaVarIdNotSet {}
  case _ then IdaCalcICError {}
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_idaErrorCodeToError" kind="let">

```mc
let _idaErrorCodeToError ec : Int -> IdaSolveError
```



<ToggleWrapper text="Code..">
```mc
let _idaErrorCodeToError : Int -> IdaSolveError
  = lam ec.
    switch ec
    case 0 then IdaIllInput {}
    case 1 then IdaTooMuchWork {}
    case 2 then IdaTooMuchAccuracy {}
    case 3 then IdaErrFailure {}
    case 4 then IdaConvergenceFailure {}
    case 5 then IdaLinearInitFailure {}
    case 6 then IdaLinearSetupFailure {}
    case 7 then IdaLinearSolveFailure {}
    case 8 then IdaConstraintFailure {}
    case 9 then IdaFirstResFuncFailure {}
    case 10 then IdaRepeatedResFuncFailure {}
    case 11 then IdaResFuncFailure {}
    case 12 then IdaRootFuncFailure {}
    case _ then IdaErrUnspecified {}
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_idaSolverCodeToSolverResult" kind="let">

```mc
let _idaSolverCodeToSolverResult rc : (Int, Int) -> IdaSolverResult
```



<ToggleWrapper text="Code..">
```mc
let _idaSolverCodeToSolverResult : (Int, Int) -> IdaSolverResult
  = lam rc.
    switch rc
    case (0, _) then IdaSuccess {}
    case (1, _) then IdaRootsFound {}
    case (2, _) then IdaStopTimeReached {}
    case (3, ec) then IdaSolveError (_idaErrorCodeToError ec)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaNoRoots" kind="let">

```mc
let idaNoRoots  : all a. all a1. all a2. all a3. all a4. (Int, a -> a1 -> a2 -> a3 -> a4)
```



<ToggleWrapper text="Code..">
```mc
let idaNoRoots = (0, lam. lam. lam. lam. error "not implemented")

external idaDlsDense ! : NvectorSerial -> SundialsMatrixDense -> IdaDlsDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaDlsDense" kind="let">

```mc
let idaDlsDense y m : NvectorSerial -> SundialsMatrixDense -> IdaDlsDense
```

<Description>{`\`idaDlsDense y m\` returns a linear solver associated with the state vector  
\`y\` and dense Jacobian iteration matrix \`m\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaDlsDense = lam y. lam m. idaDlsDense y m

external idaDlsSolver ! : IdaDlsDense -> IdaDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaDlsSolver" kind="let">

```mc
let idaDlsSolver solver : IdaDlsDense -> IdaDlsSolverSession
```

<Description>{`\`idaDlsSolver solver\` initializes the solver \`solver\`. This solver will  
internally approximate the system Jacobian.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaDlsSolver = lam solver. idaDlsSolver solver

external idaDlsSolverJacf ! : IdaJacFn -> IdaDlsDense -> IdaDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaDlsSolverJacf" kind="let">

```mc
let idaDlsSolverJacf jacf solver : IdaJacFn -> IdaDlsDense -> IdaDlsSolverSession
```

<Description>{`\`idaDlsSolver jacf solver\` initializes the solver \`solver\` with the system  
Jacobian \`jacf\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaDlsSolverJacf = lam jacf. lam solver. idaDlsSolverJacf jacf solver

external idaVarIdAlgebraic : Float    -- Indicates an algebraic variable
external idaVarIdDifferential : Float -- Indicates a differential variable

external idaSSTolerances : Float -> Float -> IdaTolerance
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaSSTolerances" kind="let">

```mc
let idaSSTolerances rtol atol : Float -> Float -> IdaTolerance
```

<Description>{`\`idaSSTolerances rtol atol\` constructs scalar error tolerances where \`rtol\`  
is the relative tolerance and \`atol\` the absolute tolerance.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaSSTolerances = lam rtol. lam atol. idaSSTolerances rtol atol

external idaInit !
  : IdaTolerance ->
    SundialsNonlinearSolver ->
    IdaDlsSolverSession ->
    IdaResFn ->
    NvectorSerial ->
    (Int, IdaRootFn) ->
    Float ->
    NvectorSerial ->
    NvectorSerial ->
    IdaSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaInit" kind="let">

```mc
let idaInit arg : IdaInitArg -> IdaSession
```

<Description>{`\`idaInit arg\` creates an IDA session given arguments \`arg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaInit = lam arg : IdaInitArg.
  match arg with {
    tol      = tol,
    nlsolver = nlsolver,
    lsolver  = lsolver,
    resf     = resf,
    varid    = varid,
    roots    = roots,
    t        = t,
    y        = y,
    yp       = yp
  } in
  idaInit tol nlsolver lsolver resf varid roots t y yp

external idaCalcICYaYd !
  : IdaSession -> Float -> NvectorSerial -> NvectorSerial -> Int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaCalcICYaYd" kind="let">

```mc
let idaCalcICYaYd s arg : IdaSession -> IdaCalcICYaYdArg -> IdaCalcICResult
```

<Description>{`\`idaCalcICYaYd s arg\` tries to find consistent initial values of session \`s\`  
with the argument \`arg\`. Will produce an error if the search fails.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaCalcICYaYd : IdaSession -> IdaCalcICYaYdArg -> IdaCalcICResult
  = lam s. lam arg : IdaCalcICYaYdArg.
    _idaCalcICRetCodeToResult (idaCalcICYaYd s arg.tend arg.y arg.yp)


external idaSolveNormal
 : IdaSession ->
   Float ->
   NvectorSerial ->
   NvectorSerial ->
   (Float, (Int, Int))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaSolveNormal" kind="let">

```mc
let idaSolveNormal s arg : IdaSession -> IdaSolveNormalArg -> (Float, IdaSolverResult)
```

<Description>{`\`idaSolveNormal s arg\` solves problem in session \`s\` given \`arg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaSolveNormal : IdaSession -> IdaSolveNormalArg -> (Float, IdaSolverResult)
  = lam s. lam arg.
  match (idaSolveNormal s arg.tend arg.y arg.yp) with (tend, rc) in
  (tend, _idaSolverCodeToSolverResult rc)

external idaReinit
  : IdaSession ->
    (Int, IdaRootFn) ->
    Float ->
    NvectorSerial ->
    NvectorSerial ->
    ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaReinit" kind="let">

```mc
let idaReinit s arg : IdaSession -> IdaReinitArg -> ()
```

<Description>{`\`idaReinit s arg\` reinitialize sessions s with arguments \`arg\`. Must be  
called after roots are found.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaReinit = lam s. lam arg : IdaReinitArg.
  match arg with { roots = roots, t = t, y = y, yp = yp } in
  idaReinit s roots t y yp

external idaSetStopTime : IdaSession -> Float -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idaSetStopTime" kind="let">

```mc
let idaSetStopTime s tend : IdaSession -> Float -> ()
```

<Description>{`\`idaSetStopTime s tend\` sets the stoptime \`tend\` for the solver session \`s\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let idaSetStopTime = lam s. lam tend. idaSetStopTime s tend
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
  let tget = tensorGetExn in
  let tset = tensorSetExn in
  let tcreate = tensorCreateCArrayFloat in
  let mset = sundialsMatrixDenseSet in

  let jacf = lam jacargs : IdaJacArgs. lam m : SundialsMatrixDense.
    -- let m = sundialsMatrixDenseUnwrap m in
    let x = tget jacargs.y [0] in
    let vx = tget jacargs.y [1] in
    let dx = tget jacargs.yp [0] in
    let dvx = tget jacargs.yp [1] in
    mset m 0 0 jacargs.c;
    mset m 0 1 (negf 1.);
    mset m 1 0 1.;
    mset m 1 1 (addf 1. jacargs.c);
    ()
  in

  let resf = lam y. lam yp.
    let x = get y 0 in
    let vx = get y 1 in
    let dx = get yp 0 in
    let dvx = get yp 1 in
    [subf dx vx, addf dvx (addf vx x)]
  in

  let resf = lam. lam y. lam yp. lam r.
    let x = tget y [0] in
    let vx = tget y [1] in
    let dx = tget yp [0] in
    let dvx = tget yp [1] in
    let y = create 2 (lam i. tget y [i]) in
    let yp = create 2 (lam i. tget yp [i]) in
    let rr = resf y yp in
    tset r [0] (get rr 0);
    tset r [1] (get rr 1);
    ()
  in

  let runTests = lam mknlsolver. lam mklsolver.
    let y = tcreate [2] (lam. 0.) in
    let yp = tcreate [2] (lam. 0.) in

    tset y [0] 1.;
    tset yp [1] (negf 1.);

    let v = nvectorSerialWrap y in
    let vp = nvectorSerialWrap yp in

    let m = sundialsMatrixDense 2 in

    let nlsolver = mknlsolver v in

    let lsolver = mklsolver (idaDlsDense v m) in
    let tol = idaSSTolerances 1.e-4 1.e-6 in

    let varid = nvectorSerialWrap (tcreate [2] (lam. idaVarIdDifferential)) in
    let t0 = 0. in

    let s = idaInit {
      tol      = tol,
      nlsolver = nlsolver,
      lsolver  = lsolver,
      resf     = resf,
      varid    = varid,
      roots    = idaNoRoots,
      t        = t0,
      y        = v,
      yp       = vp
    } in

    let tstop = 10000. in
    idaSetStopTime s tstop;
    utest idaCalcICYaYd s { tend = 1.e-4, y = v, yp = vp }
      with IdaCalcICOK {}
    in

    match idaSolveNormal s { tend = 2., y = v, yp = vp } with (tend, r) in
    utest r with IdaSuccess {} in
    utest tend with 2. using eqf in

    match idaSolveNormal s { tend = mulf 2. tstop, y = v, yp = vp } with (tend, r) in
    utest r with IdaStopTimeReached {} in
    utest tend with tstop using eqf in

    let y = nvectorSerialUnwrap v in
    let yp = nvectorSerialUnwrap vp in

    tset y [0] 1.;
    tset y [1] 0.;
    tset yp [0] 0.;
    tset yp [1] (negf 0.);
    idaReinit s { roots = idaNoRoots, t = t0, y = v, yp = vp };

    utest idaCalcICYaYd s { tend = 1.e-4, y = v, yp = vp }
      with IdaCalcICOK {}
    in

    match idaSolveNormal s { tend = 2., y = v, yp = vp } with (tend, r) in
    utest r with IdaSuccess {} in
    utest tend with 2. using eqf in
    ()
  in

  let nlnewton = sundialsNonlinearSolverNewtonMake in
  let nlfixedpoint = sundialsNonlinearSolverFixedPointMake 0 in

  runTests nlnewton (lam lsolver. idaDlsSolver lsolver);
  runTests nlnewton (lam lsolver. idaDlsSolverJacf jacf lsolver);

  -- runTests nlfixedpoint (lam lsolver. idaDlsSolver lsolver);
  -- runTests nlfixedpoint (lam lsolver. idaDlsSolverJacf jacf lsolver);

  ()
with () in ()
```
</ToggleWrapper>
</DocBlock>

