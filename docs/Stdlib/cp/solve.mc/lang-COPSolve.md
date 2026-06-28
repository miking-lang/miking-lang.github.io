import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPSolve  
  

  
  
  
## Types  
  

          <DocBlock title="COPSolution" kind="type">

```mc
type COPSolution : { solution: Map Name COPVarValue, objective: Option COPVarValue }
```



<ToggleWrapper text="Code..">
```mc
type COPSolution = {
    solution: Map Name COPVarValue,
    objective: Option COPVarValue
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPSolverResult" kind="type">

```mc
type COPSolverResult : (COPSolverStatus, [COPSolution])
```



<ToggleWrapper text="Code..">
```mc
type COPSolverResult = (COPSolverStatus, [COPSolution])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPSolverResultRaw" kind="type">

```mc
type COPSolverResultRaw : (COPSolverStatus, [Map String COPVarValue])
```



<ToggleWrapper text="Code..">
```mc
type COPSolverResultRaw = (COPSolverStatus, [Map String COPVarValue])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPSolverOptions" kind="type">

```mc
type COPSolverOptions : { solver: String, timeoutMs: Int, allSolutions: Bool, solverFlags: [String] }
```



<ToggleWrapper text="Code..">
```mc
type COPSolverOptions = {
    solver: String,
    timeoutMs: Int,
    allSolutions: Bool,
    solverFlags: [String]
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="COPVarValue" kind="syn">

```mc
syn COPVarValue
```



<ToggleWrapper text="Code..">
```mc
syn COPVarValue =
  | COPInt {val: Int}
  | COPBool {val: Bool}
  | COPArray {vals: [COPVarValue]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPSolverStatus" kind="syn">

```mc
syn COPSolverStatus
```



<ToggleWrapper text="Code..">
```mc
syn COPSolverStatus =
  | COPError {}
  | COPUnknown {}
  | COPUnbounded {}
  | COPUnsatisfiable {}
  | COPSatisfied {}
  | COPAllSolutions {}
  | COPOptimalSolution {}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="solverOptionsDefault" kind="sem">

```mc
sem solverOptionsDefault : all a. () -> {solver: String, timeoutMs: Int, solverFlags: [a], allSolutions: Bool}
```



<ToggleWrapper text="Code..">
```mc
sem solverOptionsDefault =
  | {} -> {
    solver = "gecode",
    timeoutMs = 0,
    allSolutions = false,
    solverFlags = []}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="solve" kind="sem">

```mc
sem solve : COPAst_COPModel -> COPSolve_COPSolverResult
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem solve =
  | model -> never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="solveOptions" kind="sem">

```mc
sem solveOptions : COPSolve_COPSolverOptions -> COPAst_COPModel -> COPSolve_COPSolverResult
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem solveOptions options =
  | model ->
    let isOpt = isOptimizationModel model in
    match pprintCOPModel model with (env, model) in
    _solveString isOpt options env.nameMap model
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_solveString" kind="sem">

```mc
sem _solveString : Bool -> COPSolve_COPSolverOptions -> Map Name String -> String -> COPSolve_COPSolverResult
```

<Description>{`Takes a string instead of a model, to simplify testing.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _solveString isOpt options env =
  | model ->
    -- Output the model to a temporary file
    let tempDir = sysTempDirMake () in
    let modelFile = sysJoinPath tempDir "model.mzn" in
    let outputFile = sysJoinPath tempDir "result.json" in
    writeFile modelFile model;
    -- Solve the model
    match _runSolver options modelFile outputFile with
    (_, {stdout = stdout}) in
    -- Parse the result
    match _parseAll isOpt stdout outputFile
    with (status, solutions) in
    let getSolution = lam s. _validateObjective isOpt (_solutionFromRaw env s) in
    let res = (status, map getSolution solutions) in
    -- Remove temporary directory and return
    sysTempDirDelete tempDir ();
    res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_runSolver" kind="sem">

```mc
sem _runSolver : COPSolve_COPSolverOptions -> String -> String -> (Float, ExecResult)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _runSolver options inputFile =
  | outputFile ->
    let flags = concat
      ["--output-mode", "json",
       "-o", outputFile,
       "--output-objective",
       "--solver", options.solver,
       if options.allSolutions then "--all-solutions" else "",
       "--time-limit", int2string options.timeoutMs]
      options.solverFlags
    in
    sysRunCommandWithTiming (join [["minizinc"], flags, [inputFile]]) "" ""
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_json2COPVarValue" kind="sem">

```mc
sem _json2COPVarValue : JsonValue -> Option COPSolve_COPVarValue
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _json2COPVarValue =
  | v ->
    switch v
    case JsonInt i then Some (COPInt {val = i})
    case JsonBool b then Some (COPBool {val = b})
    case JsonArray a then
      let vals =
        foldl (lam acc. lam x.
          match acc with Some vals then
            match _json2COPVarValue x with Some val then Some (snoc vals val)
            else None ()
          else None ()
        ) (Some []) a
      in
      match vals with Some vals then
        Some (COPArray {vals = vals})
      else None ()
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_parseAll" kind="sem">

```mc
sem _parseAll : Bool -> String -> String -> COPSolve_COPSolverResultRaw
```

<Description>{`Parse all solutions from the solver output.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _parseAll isOpt stdout =
  | jsonFile ->
    if fileExists jsonFile then
      let str = readFile jsonFile in
      let split = strSplit "----------" str in
      switch length split
      case 1 then
        let status = _parseSolverStatus isOpt (strTrim (head split)) in
        (status, [])
      case n then
        match splitAt split (subi n 1) with (solutionsStr, [statusStr]) in
        let status = _parseSolverStatus isOpt (strTrim statusStr) in
        let solutions = map _parseOne solutionsStr in
        (status, solutions)
      end
    else
      -- If no output file, check for solver status in stdout
      let status = _parseSolverStatus isOpt (strTrim stdout) in
      (status, [])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_parseOne" kind="sem">

```mc
sem _parseOne : String -> Map String COPSolve_COPVarValue
```

<Description>{`Parse one solution.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _parseOne =
  | str ->
    switch jsonParse str
    case Left (JsonObject m) then
      mapFoldWithKey (lam acc. lam k. lam v.
          match _json2COPVarValue v with Some v2 then
            mapInsert k v2 acc
          else error (concat "Unknown json value: " (json2string v))
        ) (mapEmpty cmpString) m
    case _ then
      error (concat "Cannot parse solution: " str)
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_parseSolverStatus" kind="sem">

```mc
sem _parseSolverStatus : Bool -> String -> COPSolve_COPSolverStatus
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _parseSolverStatus isOpt =
  | "=====ERROR=====" -> COPError {}
  | "=====UNKNOWN=====" -> COPUnknown {}
  | "=====UNSATISFIABLE=====" -> COPUnsatisfiable {}
  | "=====UNSATorUNBOUNDED=====" -> COPUnbounded {}
  | "=====UNBOUNDED=====" -> COPUnbounded {}
  | "==========" -> if isOpt then COPOptimalSolution {} else COPAllSolutions {}
  | "" -> COPSatisfied {}
  | str ->
    error (concat "Unknown solver status string: " str)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_solutionFromRaw" kind="sem">

```mc
sem _solutionFromRaw : Map Name String -> Map String COPSolve_COPVarValue -> COPSolve_COPSolution
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _solutionFromRaw env =
  | resMap ->
    let m: Map Name COPVarValue =
      mapFoldWithKey (lam acc. lam n. lam s.
        match mapLookup s resMap with Some v then mapInsert n v acc
        else error (concat "Variable not found: " s)
      ) (mapEmpty nameCmp) env in
    {solution = m, objective = mapLookup "_objective" resMap}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_validateObjective" kind="sem">

```mc
sem _validateObjective : Bool -> COPSolve_COPSolution -> COPSolve_COPSolution
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _validateObjective isOpt =
  | sols ->
    switch (isOpt, sols.objective)
    case (true, Some _) then sols
    case (false, None _) then sols
    case (true, _) then
      error "Impossible: no objective value found for optimization model"
    case (false, _) then
      error "Impossible: objective value found for satisfaction model"
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqCOPSolverResult" kind="sem">

```mc
sem eqCOPSolverResult : COPSolve_COPSolverResult -> COPSolve_COPSolverResult -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqCOPSolverResult r1 =
  | r2 ->
    if eqCOPSolverStatus r1.0 r2.0 then
      eqSeq eqCOPSolution r1.1 r2.1
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqCOPSolverStatus" kind="sem">

```mc
sem eqCOPSolverStatus : COPSolve_COPSolverStatus -> COPSolve_COPSolverStatus -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqCOPSolverStatus s1 =
  | s2 -> _eqCOPSolverStatusH (s1, s2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqCOPSolverStatusH" kind="sem">

```mc
sem _eqCOPSolverStatusH : (COPSolve_COPSolverStatus, COPSolve_COPSolverStatus) -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem _eqCOPSolverStatusH =
  | (COPError {}, COPError {}) -> true
  | (COPUnknown {}, COPUnknown {}) -> true
  | (COPUnbounded {}, COPUnbounded {}) -> true
  | (COPUnsatisfiable {}, COPUnsatisfiable {}) -> true
  | (COPSatisfied {}, COPSatisfied {}) -> true
  | (COPAllSolutions {}, COPAllSolutions {}) -> true
  | (COPOptimalSolution {}, COPOptimalSolution {}) -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqCOPSolution" kind="sem">

```mc
sem eqCOPSolution : COPSolve_COPSolution -> COPSolve_COPSolution -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqCOPSolution s1 =
  | s2 ->
    if mapEq eqCOPVarValue s1.solution s2.solution then
      optionEq eqCOPVarValue s1.objective s2.objective
    else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqCOPVarValue" kind="sem">

```mc
sem eqCOPVarValue : COPSolve_COPVarValue -> COPSolve_COPVarValue -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqCOPVarValue v1 =
  | v2 -> _eqCOPVarValueH (v1, v2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_eqCOPVarValueH" kind="sem">

```mc
sem _eqCOPVarValueH : (COPSolve_COPVarValue, COPSolve_COPVarValue) -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem _eqCOPVarValueH =
  | (COPInt v1, COPInt v2) -> eqi v1.val v2.val
  | (COPBool v1, COPBool v2) -> eqBool v1.val v2.val
  | (COPArray v1, COPArray v2) ->
    forAll (lam x. x) (zipWith eqCOPVarValue v1.vals v2.vals)
```
</ToggleWrapper>
</DocBlock>

