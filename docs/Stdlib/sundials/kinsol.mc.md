import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# kinsol.mc  
  

Interface to the Kinsol module in sundialsml  
https://inria\-parkas.github.io/sundialsml/Kinsol.html

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/sundials/sundials.mc"} style={S.link}>sundials/sundials.mc</a>  
  
## Types  
  

          <DocBlock title="KinsolDlsDense" kind="type">

```mc
type KinsolDlsDense
```



<ToggleWrapper text="Code..">
```mc
type KinsolDlsDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolDlsSolverSession" kind="type">

```mc
type KinsolDlsSolverSession
```



<ToggleWrapper text="Code..">
```mc
type KinsolDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolSession" kind="type">

```mc
type KinsolSession
```



<ToggleWrapper text="Code..">
```mc
type KinsolSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolError" kind="type">

```mc
type KinsolError
```



<ToggleWrapper text="Code..">
```mc
type KinsolError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolSolverResult" kind="type">

```mc
type KinsolSolverResult
```



<ToggleWrapper text="Code..">
```mc
type KinsolSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolStrategy" kind="type">

```mc
type KinsolStrategy
```



<ToggleWrapper text="Code..">
```mc
type KinsolStrategy
-- Basic Newton iteration.
external kinsolNewton : KinsolStrategy
-- Newton iteration with globalization.
external kinsolLineSearch : KinsolStrategy
-- Picard iteration with Anderson Acceleration.
external kinsolPicard : KinsolStrategy
-- Fixed-point iteration with Anderson Acceleration.
external kinsolFixedPoint : KinsolStrategy
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolResFn" kind="type">

```mc
type KinsolResFn : Tensor [Float] -> Tensor [Float] -> () external kinsolDlsDense !: NvectorSerial -> SundialsMatrixDense -> KinsolDlsDense
```



<ToggleWrapper text="Code..">
```mc
type KinsolResFn = Tensor[Float] -> Tensor[Float] -> ()

external kinsolDlsDense !
  : NvectorSerial -> SundialsMatrixDense -> KinsolDlsDense
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolInitArg" kind="type">

```mc
type KinsolInitArg : { lsolver: KinsolDlsSolverSession, resf: KinsolResFn, u: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type KinsolInitArg = {
  -- the linear solver to use (required for the Newton, LineSearch, and
  -- Picard strategies).
  lsolver : KinsolDlsSolverSession,

  -- The residual function.
  resf : KinsolResFn,

  -- A template to initialize the session (e.g., the initial guess vector).
  u : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolSolveArg" kind="type">

```mc
type KinsolSolveArg : { s: KinsolSession, u: NvectorSerial, strategy: KinsolStrategy, uScale: NvectorSerial, fScale: NvectorSerial }
```



<ToggleWrapper text="Code..">
```mc
type KinsolSolveArg = {
  -- A solver session.
  s : KinsolSession,

  -- An initial guess that is replaced with an approximate solution for
  -- F(u)=0.
  u : NvectorSerial,

  -- Strategy used to solve the nonlinear system.
  strategy : KinsolStrategy,

  -- The diagonal elements of the scaling matrix Du for vector u chosen so
  -- that all Duu all have roughly the same magnitude when u is close to a
  -- root of F(u).
  uScale : NvectorSerial,

  -- The diagonal elements of the scaling matrix D_f for F(u) chosen so that
  -- all D_fF(u) have roughtly the same magnitude when u is not near a root of
  -- F(u).
  fScale : NvectorSerial
}
```
</ToggleWrapper>
</DocBlock>

## Constructors  
  

          <DocBlock title="KinsolMissingLinearSolver" kind="con">

```mc
con KinsolMissingLinearSolver : {} -> KinsolError
```

<Description>{`A linear solver is required but was not given.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolMissingLinearSolver : {} -> KinsolError  
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolIllInput" kind="con">

```mc
con KinsolIllInput : {} -> KinsolError
```

<Description>{`Missing or illegal solver inputs.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolIllInput : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolLineSearchNonConvergence" kind="con">

```mc
con KinsolLineSearchNonConvergence : {} -> KinsolError
```

<Description>{`Line search could not find a suitable iterate.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolLineSearchNonConvergence : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolMaxIterationsReached" kind="con">

```mc
con KinsolMaxIterationsReached : {} -> KinsolError
```

<Description>{`The maximum number of nonlinear iterations was reached.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolMaxIterationsReached : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolMaxNewtonStepExceeded" kind="con">

```mc
con KinsolMaxNewtonStepExceeded : {} -> KinsolError
```

<Description>{`Five consecutive steps satisfied a scaled step length test.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolMaxNewtonStepExceeded : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolLineSearchBetaConditionFailure" kind="con">

```mc
con KinsolLineSearchBetaConditionFailure : {} -> KinsolError
```

<Description>{`Line search could not satisfy the beta\-condition.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolLineSearchBetaConditionFailure : {} -> KinsolError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolLinearSolverNoRecovery" kind="con">

```mc
con KinsolLinearSolverNoRecovery : {} -> KinsolError
```

<Description>{`The Kinsol.Spils.prec\_solve\_fn callback raised Sundials.RecoverableFailure  
but the preconditioner is already current.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolLinearSolverNoRecovery : {} -> KinsolError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolLinearSolverInitFailure" kind="con">

```mc
con KinsolLinearSolverInitFailure : {} -> KinsolError
```

<Description>{`Linear solver initialization failed.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolLinearSolverInitFailure : {} -> KinsolError
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolLinearSetupFailure" kind="con">

```mc
con KinsolLinearSetupFailure : {} -> KinsolError
```

<Description>{`Linear solver setup failed unrecoverably.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolLinearSetupFailure : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolLinearSolveFailure" kind="con">

```mc
con KinsolLinearSolveFailure : {} -> KinsolError
```

<Description>{`Linear solver solution failed unrecoverably.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolLinearSolveFailure : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolSystemFunctionFailure" kind="con">

```mc
con KinsolSystemFunctionFailure : {} -> KinsolError
```

<Description>{`The callback F\(u\) failed unrecoverably.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolSystemFunctionFailure : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolFirstSystemFunctionFailure" kind="con">

```mc
con KinsolFirstSystemFunctionFailure : {} -> KinsolError
```

<Description>{`The callback F\(u\) failed when first called.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolFirstSystemFunctionFailure : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolRepeatedSystemFunctionFailure" kind="con">

```mc
con KinsolRepeatedSystemFunctionFailure : {} -> KinsolError
```

<Description>{`The callback F\(u\) failed repeatedly.`}</Description>


<ToggleWrapper text="Code..">
```mc
con KinsolRepeatedSystemFunctionFailure : {} -> KinsolError 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolSuccess" kind="con">

```mc
con KinsolSuccess : {} -> KinsolSolverResult
```



<ToggleWrapper text="Code..">
```mc
con KinsolSuccess : {} -> KinsolSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolInitialGuessOK" kind="con">

```mc
con KinsolInitialGuessOK : {} -> KinsolSolverResult
```



<ToggleWrapper text="Code..">
```mc
con KinsolInitialGuessOK : {} -> KinsolSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolStoppedOnStepTol" kind="con">

```mc
con KinsolStoppedOnStepTol : {} -> KinsolSolverResult
```



<ToggleWrapper text="Code..">
```mc
con KinsolStoppedOnStepTol : {} -> KinsolSolverResult
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="KinsolError" kind="con">

```mc
con KinsolError : KinsolError -> KinsolSolverResult
```



<ToggleWrapper text="Code..">
```mc
con KinsolError : KinsolError -> KinsolSolverResult
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_kinsolErrorCodeToError" kind="let">

```mc
let _kinsolErrorCodeToError errorCode : Int -> KinsolError
```



<ToggleWrapper text="Code..">
```mc
let _kinsolErrorCodeToError = lam errorCode : Int.
  switch errorCode
    case 0 then KinsolMissingLinearSolver {}  
    case 1 then KinsolIllInput {} 
    case 2 then KinsolLineSearchNonConvergence {} 
    case 3 then KinsolMaxIterationsReached {} 
    case 4 then KinsolMaxNewtonStepExceeded {} 
    case 5 then KinsolLineSearchBetaConditionFailure {} 
    case 6 then KinsolLinearSolverNoRecovery {}
    case 7 then KinsolLinearSolverInitFailure {}
    case 8 then KinsolLinearSetupFailure {} 
    case 9 then KinsolLinearSolveFailure {} 
    case 10 then KinsolSystemFunctionFailure {} 
    case 11 then KinsolFirstSystemFunctionFailure {} 
    case 12 then KinsolRepeatedSystemFunctionFailure {} 
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_kinsolSolverCodeToSolverResult" kind="let">

```mc
let _kinsolSolverCodeToSolverResult solverCode : (Int, Int) -> KinsolSolverResult
```



<ToggleWrapper text="Code..">
```mc
let _kinsolSolverCodeToSolverResult = lam solverCode : (Int, Int).
  switch solverCode
    case (0, _) then KinsolSuccess {}
    case (1, _) then KinsolInitialGuessOK {}
    case (2, _) then KinsolStoppedOnStepTol {}
    case (3, ec) then KinsolError (_kinsolErrorCodeToError ec)
  end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kinsolDlsDense" kind="let">

```mc
let kinsolDlsDense u m : NvectorSerial -> SundialsMatrixDense -> KinsolDlsDense
```

<Description>{`\`kinsolDlsDense u m\` returns a linear solver associated with the data vector  
\`u\` and dense Jacobian iteration matrix \`m\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let kinsolDlsDense = lam u. lam m. kinsolDlsDense u m

external kinsolDlsSolver ! : KinsolDlsDense -> KinsolDlsSolverSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kinsolDlsSolver" kind="let">

```mc
let kinsolDlsSolver solver : KinsolDlsDense -> KinsolDlsSolverSession
```

<Description>{`\`kinsolDlsSolver solver\` initializes the solver \`solver\`. This solver will  
internally approximate the system Jacobian.`}</Description>


<ToggleWrapper text="Code..">
```mc
let kinsolDlsSolver = lam solver. kinsolDlsSolver solver

external kinsolInit !
: KinsolDlsSolverSession ->
  KinsolResFn ->
  NvectorSerial ->
  KinsolSession
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kinsolInit" kind="let">

```mc
let kinsolInit arg : KinsolInitArg -> KinsolSession
```

<Description>{`\`kinsolInit arg\` creates an Kinsol session given arguments \`arg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let kinsolInit = lam arg : KinsolInitArg. kinsolInit arg.lsolver arg.resf arg.u

external kinsolSolve ! 
  : KinsolSession ->
    NvectorSerial ->
    KinsolStrategy ->
    NvectorSerial ->
    NvectorSerial ->
    (Int, Int)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="kinsolSolve" kind="let">

```mc
let kinsolSolve arg : KinsolSolveArg -> KinsolSolverResult
```

<Description>{`\`kinsolSolve arg\` solves a problem given in arguments \`arg\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let kinsolSolve = lam arg : KinsolSolveArg.
  let r = kinsolSolve arg.s arg.u arg.strategy arg.uScale arg.fScale in
  _kinsolSolverCodeToSolverResult r
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

  let resf = lam u. lam r.
    let x = tget u 0 in
    let y = tget u 1 in
    tset r 0 (subf x y);
    tset r 1 (subf y 3.);
    ()
  in

  let runTest = lam mklsolver. lam u0.
    let u = nvectorSerialWrap u0 in
    let m = sundialsMatrixDense 2 in
    let lsolver = mklsolver (kinsolDlsDense u m) in
    let s = kinsolInit { lsolver = lsolver, resf = resf, u = u } in
    let uScale = nvectorSerialWrap (tcreate [2] (lam. 1.)) in
    let fScale = nvectorSerialWrap (tcreate [2] (lam. 1.)) in
    kinsolSolve {
      s = s, u = u, strategy = kinsolNewton, uScale = uScale, fScale = fScale
    }
  in

  let u0 = tcreate [2] (lam. 0.) in
  utest runTest kinsolDlsSolver u0 with KinsolSuccess {} in
  utest runTest kinsolDlsSolver u0 with KinsolInitialGuessOK {} in
  ()
with () in ()
```
</ToggleWrapper>
</DocBlock>

