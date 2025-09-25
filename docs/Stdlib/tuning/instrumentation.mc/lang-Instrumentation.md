import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# Instrumentation  
  

  
  
  
## Types  
  

          <DocBlock title="InstrumentationProfile" kind="type">

```mc
type InstrumentationProfile : { ids: [Int], nbrRuns: [Int], totalMs: [Float] }
```

<Description>{`Reads the profiled result after the instrumented program has been run.`}</Description>


<ToggleWrapper text="Code..">
```mc
type InstrumentationProfile = {ids: [Int], nbrRuns: [Int], totalMs: [Float]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="tailPositionBaseCase" kind="sem">

```mc
sem tailPositionBaseCase : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem tailPositionBaseCase =
  | TmHole _ -> true
  | TmIndependent t ->
    tailPositionBaseCase t.lhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrument" kind="sem">

```mc
sem instrument : all a. CallCtxEnv -> DependencyGraph -> Ast_Expr -> ({cleanup: a -> (), fileName: String}, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem instrument (env : CallCtxEnv) (graph : DependencyGraph) =
  | t ->
    -- Create header
    match instrumentHeader (graph.nbrMeas, graph.offset)
    with (header, str2name) in
    -- Create footer
    let tempDir = sysTempDirMake () in
    let fileName = sysJoinPath tempDir ".profile" in
    match instrumentFooter fileName str2name graph.offset with (footer, dumpToFile) in
    -- Instrument the program
    let expr = instrumentH env graph str2name t in

    -- Put together the final AST
    let ast = foldr oldBindSemi_
      (appf2_ (nvar_ dumpToFile) (nvar_ (str2name "log")) (nvar_ (str2name "lock")))
      [header, expr, footer]
    in
    let res = {fileName = fileName, cleanup = lam. sysTempDirDelete tempDir (); ()} in
    (res, ast)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="idExpr" kind="sem">

```mc
sem idExpr : Info -> Name -> DependencyGraph -> CallCtxEnv -> PTree NameInfo -> [Int] -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem idExpr (info: Info) (ident: Name) (graph: DependencyGraph) (env: CallCtxEnv) (tree: PTree NameInfo) =
  | ids ->
    match ids with [id] then int_ id
    else match ids with [_] ++ _ then
      let incVarName = mapFindExn (mapFindExn ident graph.meas2fun) env.fun2inc in
      let lookup = lam i. int_ i in
      contextExpansionLookupCallCtx lookup tree incVarName env
    else errorSingle [info] "Measuring point without id"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentH" kind="sem">

```mc
sem instrumentH : CallCtxEnv -> DependencyGraph -> (String -> Name) -> Ast_Expr -> Ast_Expr
```

<Description>{`Recursive helper for instrument`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instrumentH (env : CallCtxEnv) (graph : DependencyGraph) (str2name : String -> Name) =
  | tm & TmDecl (x & {decl = DeclRecLets r}) ->
    let lets : [Name] = map (lam b: DeclLetRecord. b.ident) r.bindings in
    match lets with [] then instrumentH env graph str2name x.inexpr
    else
      -- Identify a reclet by the ident of its first binding
      let reclet = head lets in
      -- Find the set of measuring points with a tail call within a reclet
      let acc: [Int] = [] in
      let ids: [Int] = [] in
      let baseCase = lam acc. lam ids. lam expr. expr in
      let tailCall = lam acc. lam ids. lam expr.
        if not (null ids) then
          -- Found a tail call within a measuring point
          (concat ids acc, expr)
        else (acc, expr)
      in
      let letexpr = lam ids. lam expr.
        -- Check if a let expression is a measuring point
        let ids =
          if not (null ids) then ids
          else
            match expr with TmDecl {decl = DeclLet t} in
            match mapLookup t.ident graph.measuringPoints with Some tree then
              prefixTreeGetIds tree []
            else []
        in
        (ids, lam x. x)
      in
      match tailPositionsReclet baseCase tailCall letexpr ids acc tm with
      (tailCalls, _) in
      let tailCallsSet = setOfSeq subi tailCalls in
      let tailCalls = setToSeq tailCallsSet in

      -- Instrument the reclet
      let acc = () in
      let ids = [] in
      let baseCase = lam. lam. lam expr.
        instrumentBaseCase tailCalls str2name expr
      in
      let tailCall = lam acc. lam ids. lam expr.
        -- Instrument a tail call: do nothing!
        (acc, expr)
      in
      let acquireLock = str2name "acquireLock" in
      let releaseLock = str2name "releaseLock" in
      let letexpr = lam ids. lam expr.
        -- Check if a let expression is a measuring point
        if not (null ids) then (ids, lam x. x) else
        match expr with TmDecl {decl = DeclLet t} in
        match mapLookup t.ident graph.measuringPoints with Some tree then
          -- Found measuring point
          let ids = prefixTreeGetIds tree [] in
          let id = idExpr (infoTm expr) t.ident graph env tree ids in
          -- Contains a tail call?
          if setMem (head ids) tailCallsSet then
            -- Yes, acquire lock. The lock is released in a base case.
            (ids, lam e. semi_ (app_ (nvar_ acquireLock) id) e)
          else
            -- No, acquire and release lock directly after.
            let f = lam e.
              match e with TmDecl (x & {decl = decl & DeclLet _}) in
              let i = nameSym "iid" in
              let semi = nameSym "" in
              bindall_
              [ nulet_ i id
              , nulet_ semi (app_ (nvar_ acquireLock) (nvar_ i))
              , decl
              , nulet_ semi (app_ (nvar_ releaseLock) (nvar_ i))]
              x.inexpr
            in (ids, f)
        else ([], lam x. x)
      in
      match tailPositionsReclet baseCase tailCall letexpr ids acc (TmDecl {x with decl = DeclRecLets r})
      with (_, TmDecl (x & {decl = DeclRecLets r})) in
      TmDecl {x with inexpr = instrumentH env graph str2name x.inexpr}

  | tm & TmDecl (x & {decl = decl & DeclLet t}) ->
    match mapLookup t.ident graph.measuringPoints with Some tree then
      let ids = prefixTreeGetIds tree [] in
      let id = idExpr t.info t.ident graph env tree ids in
      instrumentPoint env graph str2name decl x.inexpr id
    else smap_Expr_Expr (instrumentH env graph str2name) tm
  | t -> smap_Expr_Expr (instrumentH env graph str2name) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentBaseCase" kind="sem">

```mc
sem instrumentBaseCase : [Int] -> (String -> Name) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem instrumentBaseCase (ids: [Int]) (str2name: String -> Name) =
  | TmDecl (x & {decl = decl & DeclLet t}) ->
    -- Instrument a base case: Release locks of _all_ measuring points that
    -- have tail-recursive calls.
    let releaseExpr =
      if null ids then uunit_ else
      let releaseLock = str2name "releaseLock" in
      foldr1 semi_ (map (lam id. app_ (nvar_ releaseLock) (int_ id)) ids)
    in
    let semi = nameSym "" in
    bindall_
    [ decl
    , nulet_ semi releaseExpr]
    x.inexpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentPoint" kind="sem">

```mc
sem instrumentPoint : CallCtxEnv -> DependencyGraph -> (String -> Name) -> Ast_Decl -> Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`Insert instrumentation code around a measuring point. Assumes that the  
point does not contain any tail calls.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instrumentPoint (env : CallCtxEnv) (graph : DependencyGraph)
        (str2name : String -> Name) (decl : Decl) (inexpr : Expr) =
  | id ->
    let i = nameSym "iid" in
    let semi = nameSym "" in
    bindall_
    [ nulet_ i id
    , nulet_ semi (app_ (nvar_ (str2name "acquireLock")) (nvar_ i))
    , decl
    , nulet_ semi (app_ (nvar_ (str2name "releaseLock")) (nvar_ i))]
    (instrumentH env graph str2name inexpr)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentHeader" kind="sem">

```mc
sem instrumentHeader : (Int, Int) -> (Ast_Expr, String -> Name)
```



<ToggleWrapper text="Code..">
```mc
sem instrumentHeader =
  | (size, offset) ->
    let str = join
    [ "let log = tensorCreateDense [", int2string size, "] (lam is. (0, 0.0)) in\n"
    , "let s = tensorCreateDense [", int2string size, "] (lam is. 0.0) in\n"
    , "let lock = ref 0 in\n"
    , "let recordTime = lam id. lam s. lam e.
         let idx = subi id ", int2string offset, " in
         match tensorGetExn log [idx] with (nbrRuns, totalMs) in
         let res = (addi nbrRuns 1, addf totalMs (subf e s)) in
         tensorSetExn log [idx] res
       in\n"
    , "let acquireLock = lam id.
         if eqi (deref lock) 0 then
           let idx = subi id ", int2string offset, "in
           tensorSetExn s [idx] (wallTimeMs ());
           modref lock id
         else ()
       in\n"
    , "let releaseLock = lam id.
         if eqi (deref lock) id then
           let idx = subi id ", int2string offset, "in
           recordTime id (tensorGetExn s [idx]) (wallTimeMs ());
           modref lock 0
         else ()
       in\n"
    , "()\n"
    ] in
    let ex = use BootParser in parseMExprStringKeywordsExn [] str in
    let str2name = lam str.
      use MExprFindSym in
      match findName str ex with Some n then n
      else error (concat str " not found in instrumentation header")
    in
    let nameMap : Map String Name = mapFromSeq cmpString
      (map (lam str. (str, str2name str))
        [ "log"
        , "acquireLock"
        , "releaseLock"
        , "lock"
        ])
    in
    let lookupFun : String -> Name = lam str.
      match mapLookup str nameMap with Some n then n
      else error (concat str " not found in instrumentation header")
    in
    (ex, lookupFun)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="instrumentFooter" kind="sem">

```mc
sem instrumentFooter : String -> (String -> Name) -> Int -> (Ast_Expr, Name)
```

<Description>{`Write to file`}</Description>


<ToggleWrapper text="Code..">
```mc
sem instrumentFooter (fileName : String) (str2name : String -> Name) =
  | offset ->
    let str = join
    [ "
      -- For displaying profiling data
      let int2string = lam n.
        recursive
        let int2string_rechelper = lam n.
          if lti n 10
          then [int2char (addi n (char2int '0'))]
          else
            let d = [int2char (addi (modi n 10) (char2int '0'))] in
            concat (int2string_rechelper (divi n 10)) d
        in
        if lti n 0
        then cons '-' (int2string_rechelper (negi n))
        else int2string_rechelper n
      in

      -- Join
      let join = lam seqs. foldl concat [] seqs in

      -- Tensor operations
      let _prod = foldl muli 1 in

      let linearToCartesianIndex = lam shape. lam k.
        let f = lam d. lam kidx.
          match kidx with (k, idx) then
            (divi k d, cons (modi k d) idx)
          else never
        in
        let r : (Int, [Int]) = foldr f (k, []) shape in
        r.1
      in

      let tensorSize : all a. Tensor[a] -> Int =
        lam t. _prod (tensorShape t)
      in

      let tensorFoldliSlice
        : all a. all b. (b -> Int -> Tensor[a] -> b) -> b -> Tensor[a] -> b =
        lam f. lam acc. lam t1.
        let accr = ref acc in
        tensorIterSlice
          (lam i. lam t.
            let acc = f (deref accr) i t in
            modref accr acc)
          t1;
        deref accr
      in

      let tensorFoldi : all a. all b. (b -> [Int] -> a -> b) -> b -> Tensor[a] -> b =
        lam f. lam acc. lam t.
        let shape = tensorShape t in
        let t = tensorReshapeExn t [tensorSize t] in
        tensorFoldliSlice
          (lam acc. lam i. lam t.
            f acc (linearToCartesianIndex shape i) (tensorGetExn t []))
          acc t
      in"
    , "-- Dump the log to file
      let dumpLog = lam log. lam lock.
        let str = \"", _instrumentationHeader, "\\n\" in
        let offset = ", int2string offset, " in\n"
    , " let str =
        tensorFoldi (lam acc. lam i. lam x.
          match x with (nbrRuns, totalMs) in
          match i with [i] in
          let acc = concat acc (join
            [ int2string (addi offset i), \",\"
            , int2string nbrRuns, \",\"
            , float2string totalMs, \",\"
            ])
          in
          concat acc \"\\n\"
        ) str log
        in
        -- Check that the 'lock' variable is freed
        (if neqi (deref lock) 0 then error (concat (\"WARN: lock is not free \") (int2string (deref lock)))
         else ());
        writeFile \"", fileName, "\" (concat str \"\\n\")
      in"
    , "()\n"
    ] in
    let ex = use BootParser in parseMExprStringKeywordsExn [] str in
    let fun = use MExprFindSym in
      match findName "dumpLog" ex with Some n then n else error "impossible" in
    (ex, fun)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readProfile" kind="sem">

```mc
sem readProfile : String -> {ids: [Int], nbrRuns: [Int], totalMs: [Float]}
```



<ToggleWrapper text="Code..">
```mc
sem readProfile =
  | str ->
    let rows = strSplit "\n" (strTrim str) in
    let header = head rows in
    if eqString header _instrumentationHeader then
      let df = foldl (lam acc. lam r.
        let r = strSplit "," r in
        dataFrameAddRow r acc
      ) (dataFrameFromSeq [] 4) (tail rows)
      in
      { ids = map (lam x. string2int (head x)) (dataFrameSlice [0] df)
      , nbrRuns = map (lam x. string2int (head x)) (dataFrameSlice [1] df)
      , totalMs = map (lam x. string2float (head x)) (dataFrameSlice [2] df)
      }
    else error (join [ "Mismatch in expected and actual header of profile: \n"
                     , "got ", header
                     , "expected ", _instrumentationHeader
                     ])
```
</ToggleWrapper>
</DocBlock>

