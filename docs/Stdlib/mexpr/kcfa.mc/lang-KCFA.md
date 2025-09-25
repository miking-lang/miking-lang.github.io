import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KCFA  
  

  
  
  
## Types  
  

          <DocBlock title="Ctx" kind="type">

```mc
type Ctx : [IName]
```



<ToggleWrapper text="Code..">
```mc
type Ctx = [IName]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CtxEnv" kind="type">

```mc
type CtxEnv : Map IName Ctx
```



<ToggleWrapper text="Code..">
```mc
type CtxEnv = Map IName Ctx
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenFunAcc" kind="type">

```mc
type GenFunAcc : (CtxEnv, [Constraint])
```



<ToggleWrapper text="Code..">
```mc
type GenFunAcc = (CtxEnv, [Constraint])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenFun" kind="type">

```mc
type GenFun : Ctx -> CtxEnv -> Expr -> GenFunAcc
```



<ToggleWrapper text="Code..">
```mc
type GenFun = Ctx -> CtxEnv -> Expr -> GenFunAcc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchGenFun" kind="type">

```mc
type MatchGenFun : (IName, Ctx) -> (IName, Ctx) -> Pat -> [Constraint]
```



<ToggleWrapper text="Code..">
```mc
type MatchGenFun = (IName,Ctx) -> (IName,Ctx) -> Pat -> [Constraint]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CFAGraph" kind="type">

```mc
type CFAGraph : { worklist: [(IName, Ctx, AbsVal)], data: Tensor [Map Ctx (Set AbsVal)], edges: Tensor [Map Ctx (Set Constraint)], im: IndexMap, k: Int, cgfs: [GenFun], mcgfs: [MatchGenFun], graphData: Option GraphData }
```



<ToggleWrapper text="Code..">
```mc
type CFAGraph = {

    -- Contains updates that needs to be processed in the main CFA loop
    worklist: [(IName,Ctx,AbsVal)],

    -- Contains abstract values currently associated with each name in the program.
    data: Tensor[Map Ctx (Set AbsVal)],

    -- For each name in the program, gives constraints which needs to be
    -- repropagated upon updates to the abstract values for the name.
    edges: Tensor[Map Ctx (Set Constraint)],

    -- Bidirectional mapping between names and integers.
    im: IndexMap,

    -- The "k" in k-CFA.
    k: Int,

    -- Contains a list of functions used for generating constraints
    cgfs: [GenFun],

    -- Contains a list of functions used for generating match constraints
    -- TODO(dlunde,2021-11-17): Should be added as a product extension
    -- in the MatchCFA fragment instead, when possible.
    mcgfs: [MatchGenFun],

    -- NOTE(dlunde,2021-11-18): Data needed for analyses based on this framework
    -- must be put below directly, since we do not yet have product extensions.

    -- Used to store any custom data in the graph
    graphData: Option GraphData

  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="emptyCFAGraph" kind="sem">

```mc
sem emptyCFAGraph : Int -> Ast_Expr -> KCFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyCFAGraph k =
  | t ->
    -- NOTE(Linnea,2022-06-22): Experiments have shown that lists are better
    -- than ropes for 'worklist' and 'edges', especially for 'worklist'
    let im = indexGen t in
    let shape = tensorShape im.int2name in
    { worklist = toList [],
      data = tensorCreateDense shape (lam. mapEmpty cmpCtx),
      edges = tensorCreateDense shape (lam. mapEmpty cmpCtx),
      im = im,
      k = k,
      cgfs = [],
      mcgfs = [],
      graphData = None () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfaGraphData" kind="sem">

```mc
sem cfaGraphData : _a -> Map Name (Set CFABase_AbsVal)
```

<Description>{`This function converts the data\-flow result into a map, which might be more  
convenient to operate on for later analysis steps.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfaGraphData =
  | graph ->
    tensorFoldi (lam acc. lam i: [Int]. lam vals: Set AbsVal.
        mapInsert (int2name graph.im (head i)) vals acc
      ) (mapEmpty nameCmp) graph.data
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="solveCfa" kind="sem">

```mc
sem solveCfa : KCFA_CFAGraph -> KCFA_CFAGraph
```

<Description>{`Main algorithmNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem solveCfa =
  | graph ->
    -- Iteration
    recursive let iter = lam graph: CFAGraph.
      if null graph.worklist then graph
      else
        match head graph.worklist with (q,c,d) & h in
        let graph = { graph with worklist = tail graph.worklist } in
        match edgesLookup (q,c) graph with cc in
        let graph = setFold (propagateConstraint h) graph cc in
        iter graph
    in
    iter graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="solveCfaDebug" kind="sem">

```mc
sem solveCfaDebug : PprintEnv -> KCFA_CFAGraph -> (PprintEnv, KCFA_CFAGraph)
```

<Description>{`Main algorithm \(debug version\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem solveCfaDebug pprintenv =
  | graph ->
    -- NOTE(Linnea,2022-06-22): Experiments have shown that using \\`cfaDebug\\` as
    -- the main entry point causes overhead when no printing takes place, as we
    -- have to match on the pprintenv in every iteration. Therefore, some code
    -- duplication takes place here.
    let printGraph = lam pprintenv. lam graph. lam str.
      match cfaGraphToString pprintenv graph with (pprintenv, graph) in
      printLn (join ["\n--- ", str, " ---"]);
      printLn graph;
      pprintenv
    in

    -- Iteration
    recursive let iter = lam i. lam pprintenv: PprintEnv. lam graph: CFAGraph.
      if null graph.worklist then (pprintenv,graph)
      else
        let header = concat "INTERMEDIATE CFA GRAPH " (int2string i) in
        let pprintenv = printGraph pprintenv graph header in
        match head graph.worklist with (q,c,d) & h in
        let graph = { graph with worklist = tail graph.worklist } in
        match edgesLookup (q,c) graph with cc in
        let graph = setFold (propagateConstraint h) graph cc in
        iter (addi i 1) pprintenv graph
    in
    iter 1 pprintenv graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : Index_IndexMap -> KCFA_Ctx -> KCFA_CtxEnv -> Ast_Expr -> KCFA_GenFunAcc
```

<Description>{`Base constraint generation function \(must still be included manually in  
constraintGenFuns\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraints im ctx env =
  | t -> (env,[])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectConstraints" kind="sem">

```mc
sem collectConstraints : KCFA_Ctx -> [KCFA_GenFun] -> KCFA_GenFunAcc -> Ast_Expr -> KCFA_GenFunAcc
```

<Description>{`Call a set of constraint generation functions on each term in program.  
Useful when defining values of type CFAGraph.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectConstraints ctx cgfs acc =
  | t ->
    let acc = foldl (lam acc. lam f: GenFun.
        match acc with (env, cstrs) in
        match f ctx env t with (env, fcstrs) in
        (env, concat fcstrs cstrs)
      ) acc cgfs
    in
    sfold_Expr_Expr (collectConstraints ctx cgfs) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraint" kind="sem">

```mc
sem initConstraint : KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem initConstraint: CFAGraph -> Constraint -> CFAGraph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraints" kind="sem">

```mc
sem initConstraints : KCFA_Ctx -> KCFA_CtxEnv -> KCFA_CFAGraph -> Ast_Expr -> (KCFA_CtxEnv, KCFA_CFAGraph)
```

<Description>{`Function that initializes all constraints in a CFAGraph for a given context  
and context environmentNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initConstraints ctx env graph =
  | t ->
    -- Recurse over program and generate constraints
    match
      collectConstraints ctx graph.cgfs (env, []) t
    with (env, cstrs) in

    -- Initialize all collected constraints and return
    (env, foldl initConstraint graph cstrs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, KCFA_Ctx, CFABase_AbsVal) -> KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint
  : (IName,Ctx,AbsVal) -> CFAGraph -> Constraint -> CFAGraph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addEdge" kind="sem">

```mc
sem addEdge : KCFA_CFAGraph -> (IName, KCFA_Ctx) -> CFABase_Constraint -> (KCFA_CFAGraph, Bool)
```

<Description>{`Returns both the new graph, and a Boolean that is true iff the new edge was  
added to the graph.  
NOTE\(Linnea, 2022\-06\-21\): Updates the graph by a side effectNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addEdge (graph: CFAGraph) (qc: (IName,Ctx)) =
  | cstr ->
    match qc with (q,c) in
    let cstrsq = edgesLookup qc graph in
    if setMem cstr cstrsq then (graph, false)
    else
      let m = mapInsert c (setInsert cstr cstrsq) (
        tensorLinearGetExn graph.edges q) in
      tensorLinearSetExn graph.edges q m;
      (graph, true)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraintName" kind="sem">

```mc
sem initConstraintName : (IName, KCFA_Ctx) -> KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```

<Description>{`Helper function for initializing a constraint for a given name \(mainly  
used for convenience in initConstraint\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initConstraintName name graph =
  | cstr ->
    match addEdge graph name cstr with (graph, new) in
    if new then
      let avs = dataLookup name graph in
      setFold (lam graph. lam av.
        propagateConstraint (name.0,name.1,av) graph cstr)
      graph avs
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataLookup" kind="sem">

```mc
sem dataLookup : (IName, KCFA_Ctx) -> KCFA_CFAGraph -> Set CFABase_AbsVal
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem dataLookup key =
  | graph ->
    let m = tensorLinearGetExn graph.data key.0 in
    mapLookupOrElse (lam. setEmpty cmpAbsVal) key.1 m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="edgesLookup" kind="sem">

```mc
sem edgesLookup : (IName, KCFA_Ctx) -> KCFA_CFAGraph -> Set CFABase_Constraint
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem edgesLookup (key: (IName,Ctx)) =
  | graph ->
    let m = tensorLinearGetExn graph.edges key.0 in
    mapLookupOrElse (lam. setEmpty cmpConstraint) key.1 m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addData" kind="sem">

```mc
sem addData : KCFA_CFAGraph -> CFABase_AbsVal -> (IName, KCFA_Ctx) -> KCFA_CFAGraph
```

<Description>{`Updates the graph by a side effectNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addData (graph: CFAGraph) (d: AbsVal) =
  | (q,c) ->
    let dq = dataLookup (q,c) graph in
    if setMem d dq then graph else
      let m = mapInsert c (setInsert d dq) (tensorLinearGetExn graph.data q) in
      tensorLinearSetExn graph.data q m;
      { graph with worklist = cons (q,c,d) graph.worklist }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxEmpty" kind="sem">

```mc
sem ctxEmpty : () -> KCFA_Ctx
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxEmpty =
  | _ -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxAdd" kind="sem">

```mc
sem ctxAdd : Int -> IName -> KCFA_Ctx -> KCFA_Ctx
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxAdd k n =
  | ctx ->
    let ctx = snoc ctx n in
    if leqi (length ctx) k then ctx else tail ctx
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpCtx" kind="sem">

```mc
sem cmpCtx : KCFA_Ctx -> KCFA_Ctx -> Int
```

<Description>{`Needed for \`Map Ctx \(Set AbsVal\)\`No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpCtx ctx1 =
  | ctx2 -> seqCmp subi ctx1 ctx2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpINameCtx" kind="sem">

```mc
sem cmpINameCtx : (IName, KCFA_Ctx) -> (IName, KCFA_Ctx) -> Int
```

<Description>{`Needed for \`Set \(IName,Ctx\)\`No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpINameCtx t1 =
  | t2 ->
    let ndiff = subi t1.0 t2.0 in
    if eqi ndiff 0 then cmpCtx t1.1 t2.1
    else ndiff
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxToString" kind="sem">

```mc
sem ctxToString : Index_IndexMap -> PprintEnv -> KCFA_Ctx -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxToString im env =
  | ctx ->
    match mapAccumL (pprintVarIName im) env ctx with (env,ctx) in
    (env, join ["<", strJoin "," ctx, ">"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxEnvEmpty" kind="sem">

```mc
sem ctxEnvEmpty : () -> KCFA_CtxEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxEnvEmpty =
  | _ -> mapEmpty subi
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxEnvAdd" kind="sem">

```mc
sem ctxEnvAdd : IName -> KCFA_Ctx -> KCFA_CtxEnv -> KCFA_CtxEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxEnvAdd n c =
  | env ->
    mapInsert n c env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxEnvLookup" kind="sem">

```mc
sem ctxEnvLookup : Index_IndexMap -> Info -> IName -> KCFA_CtxEnv -> KCFA_Ctx
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxEnvLookup im info n =
  | env ->
    mapLookupOrElse (lam.
        let name = int2name im n in
        errorSingle [info] (concat "ctxEnvLookup failed: " (nameGetStr name))
      ) n env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ctxEnvFilterFree" kind="sem">

```mc
sem ctxEnvFilterFree : Index_IndexMap -> Ast_Expr -> KCFA_CtxEnv -> KCFA_CtxEnv
```

<Description>{`Keep names that appear free in a given expression.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem ctxEnvFilterFree im e =
  | env ->
    let free: Set Name = freeVars e in
    mapFoldWithKey (lam acc. lam n. lam ctx.
        if setMem (int2name im n) free then mapInsert n ctx acc
        else acc
      ) (mapEmpty subi) env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpCtxEnv" kind="sem">

```mc
sem cmpCtxEnv : KCFA_CtxEnv -> KCFA_CtxEnv -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpCtxEnv env1 =
  | env2 -> mapCmp cmpCtx env1 env2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintVarINameCtx" kind="sem">

```mc
sem pprintVarINameCtx : Index_IndexMap -> PprintEnv -> (IName, KCFA_Ctx) -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintVarINameCtx im env =
  | (n,ctx) ->
    match pprintVarIName im env n with (env,n) in
    match ctxToString im env ctx with (env,ctx) in
    (env, join [n, ctx])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintConINameCtx" kind="sem">

```mc
sem pprintConINameCtx : Index_IndexMap -> PprintEnv -> (IName, KCFA_Ctx) -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintConINameCtx im env =
  | (n,ctx) ->
    match pprintConIName im env n with (env,n) in
    match ctxToString im env ctx with (env,ctx) in
    (env, join [n, ctx])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfaGraphToString" kind="sem">

```mc
sem cfaGraphToString : PprintEnv -> KCFA_CFAGraph -> (PprintEnv, String)
```

<Description>{`Prints a CFA graph`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfaGraphToString (env: PprintEnv) =
  | graph ->
    let graph: CFAGraph = graph in
    let f = lam env. lam e: (IName,Ctx,AbsVal).
      match pprintVarINameCtx graph.im env (e.0,e.1) with (env,n) in
      match absValToString graph.im env e.2 with (env,av) in
      (env,join ["(", n, ", ", av, ")"]) in
    match mapAccumL f env graph.worklist with (env,worklist) in
    match mapAccumL (lam env: PprintEnv. lam b:(IName,Map Ctx (Set AbsVal)).
        match pprintVarIName graph.im env b.0 with (env,b0) in
        let printAbsVals = lam env. lam s: Set AbsVal.
          mapAccumL (absValToString graph.im) env (setToSeq s)
        in
        match mapAccumL (lam env: PprintEnv. lam b:(Ctx,Set AbsVal).
            match ctxToString graph.im env b.0 with (env, ctx) in
            match printAbsVals env b.1 with (env, avs) in
            (env, (ctx, avs))
          ) env (mapBindings b.1)
        with (env,b1)
        in (env,(b0,b1))
      ) env (mapi (lam i. lam x. (i,x)) (tensorToSeqExn graph.data))
    with (env, data) in
    match mapAccumL (lam env: PprintEnv. lam b:(IName,Map Ctx (Set Constraint)).
        match pprintVarIName graph.im env b.0 with (env,b0) in
        let printCstrs = lam env. lam cstrs: Set Constraint.
          mapAccumL (constraintToString graph.im) env (setToSeq cstrs)
        in
        match mapAccumL (lam env: PprintEnv. lam b:(Ctx,Set Constraint).
            match ctxToString graph.im env b.0 with (env, ctx) in
            match printCstrs env b.1 with (env, cstrs) in
            (env, (ctx, cstrs))
          ) env (mapBindings b.1)
        with (env,(b1))
        in (env,(b0,b1))
      ) env (mapi (lam i. lam x. (i, x)) (tensorToSeqExn graph.edges))
    with (env, edges) in

    let strJoinNonEmpty = lam delim: String. lam strs: [String].
      strJoin delim (filter (lam s. not (null s)) strs)
    in

    let str = join [
      "*** WORKLIST ***\n",
      "  [", strJoin ", " worklist, "]\n",
      "*** DATA ***\n",
      strJoinNonEmpty "\n" (map (lam b:(String,[(String, [String])]).
        match b with (n, ctxsAvs) in
        let f = lam avs.
          strJoin "\n" (map (concat "    ") avs)
        in
        let entries: [String] = map (lam ctxAvs: (String, [String]).
            match ctxAvs with (ctx, avs) in
            join ["  ", join [b.0, ctx], " =\n", f avs]
          ) ctxsAvs
        in strJoin "\n" entries
      ) data), "\n",
      "*** EDGES ***\n",
      strJoinNonEmpty "\n" (map (lam b:(String,[(String, [String])]).
        match b with (n, ctxCstrs) in
        let f = lam cstrs.
          strJoin "\n" (map (concat "    ") cstrs)
        in
        let entries: [String] = map (lam cc: (String, [String]).
            match cc with (ctx, cstrs) in
            join ["  ", join [b.0, ctx], " =\n", f cstrs]
          ) ctxCstrs
        in strJoin "\n" entries
      ) edges), "\n"

    ] in

    (env, str)
```
</ToggleWrapper>
</DocBlock>

