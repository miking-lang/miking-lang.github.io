import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CFA  
  

  
  
  
## Types  
  

          <DocBlock title="MatchGenFun" kind="type">

```mc
type MatchGenFun : IName -> IName -> Pat -> [Constraint]
```



<ToggleWrapper text="Code..">
```mc
type MatchGenFun = IName -> IName -> Pat -> [Constraint]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConstPropFun" kind="type">

```mc
type ConstPropFun : IName -> [IName] -> [IName] -> Const -> [Constraint]
```



<ToggleWrapper text="Code..">
```mc
type ConstPropFun = IName -> [IName] -> [IName] -> Const -> [Constraint]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CFAGraph" kind="type">

```mc
type CFAGraph : { worklist: [(IName, AbsVal)], data: Tensor [Set AbsVal], edges: Tensor [Set Constraint], mcgfs: [MatchGenFun], cpfs: [ConstPropFun], im: IndexMap, graphData: Option GraphData }
```



<ToggleWrapper text="Code..">
```mc
type CFAGraph = {

    -- Contains updates that needs to be processed in the main CFA loop
    worklist: [(IName,AbsVal)],

    -- Contains abstract values currently associated with each name in the program.
    data: Tensor[Set AbsVal],

    -- For each name in the program, gives constraints which needs to be
    -- repropagated upon updates to the abstract values for the name.
    edges: Tensor[Set Constraint],

    -- Contains a list of functions used for generating match constraints
    -- TODO(dlunde,2021-11-17): Should be added as a product extension
    -- in the MatchCFA fragment instead, when possible.
    mcgfs: [MatchGenFun],

    -- Constant propagation functions
    -- TODO(dlunde,2023-07-10): Should be added as a product extension
    -- in the MatchCFA fragment instead, when possible.
    cpfs: [ConstPropFun],

    -- Bidirectional mapping between names and integers.
    im: IndexMap,

    -- NOTE(dlunde,2021-11-18): Data needed for analyses based on this framework
    -- must be put below directly, since we do not yet have product extensions.

    -- Used to store any custom data in the graph
    graphData: Option GraphData

  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CFAGraphInit" kind="type">

```mc
type CFAGraphInit : { mcgfs: [MatchGenFun], cpfs: [ConstPropFun], cstrs: [Constraint], ia: IndexAcc, graphData: Option GraphData }
```

<Description>{`Used during CFAGraph construction`}</Description>


<ToggleWrapper text="Code..">
```mc
type CFAGraphInit = {
    mcgfs: [MatchGenFun],
    cpfs: [ConstPropFun],
    cstrs: [Constraint],
    ia: IndexAcc,
    graphData: Option GraphData
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GenFun" kind="type">

```mc
type GenFun : CFAGraphInit -> Expr -> CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
type GenFun = CFAGraphInit -> Expr -> CFAGraphInit
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="emptyCFAGraphInit" kind="sem">

```mc
sem emptyCFAGraphInit : Ast_Expr -> CFA_CFAGraphInit
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyCFAGraphInit =
  | t -> { mcgfs = [], cpfs = [], cstrs = [], ia = indexAccGen t,
           graphData = None () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="finalizeCFAGraphInit" kind="sem">

```mc
sem finalizeCFAGraphInit : CFA_CFAGraphInit -> CFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem finalizeCFAGraphInit =
  | t ->
    -- NOTE(Linnea,2022-06-22): Experiments have shown that lists are better
    -- than ropes for 'worklist' and 'edges', especially for 'worklist'
    let im = indexClose t.ia in
    let shape = tensorShape im.int2name in
    let elist = toList [] in
    let graph = { worklist = elist,
      data = tensorCreateDense shape (lam. setEmpty cmpAbsVal),
      edges = tensorCreateDense shape (lam. setEmpty cmpConstraint),
      mcgfs = t.mcgfs,
      cpfs = t.cpfs,
      im = im,
      graphData = t.graphData } in
    let graph = foldl initConstraint graph t.cstrs in
    graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfaGraphData" kind="sem">

```mc
sem cfaGraphData : CFA_CFAGraph -> Map Name (Set CFABase_AbsVal)
```

<Description>{`This function converts the data\-flow result into a map, which might be more  
convenient to operate on for later analysis steps.No documentation available here.`}</Description>


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
sem solveCfa : CFA_CFAGraphInit -> CFA_CFAGraph
```

<Description>{`Main algorithmNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem solveCfa =
  | graph ->
    -- Finalize graph
    let graph = finalizeCFAGraphInit graph in

    -- Iteration
    recursive let iter = lam graph: CFAGraph.
      if null graph.worklist then graph
      else
        match head graph.worklist with (q,d) & h in
        let graph = { graph with worklist = tail graph.worklist } in
        match edgesLookup q graph with cc in
        let graph = setFold (propagateConstraint h) graph cc in
        iter graph
    in
    iter graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="solveCfaDebug" kind="sem">

```mc
sem solveCfaDebug : PprintEnv -> CFA_CFAGraphInit -> (PprintEnv, CFA_CFAGraph)
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

    -- Finalize graph
    let graph = finalizeCFAGraphInit graph in

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
        match head graph.worklist with (q,d) & h in
        let graph = { graph with worklist = tail graph.worklist } in
        match edgesLookup q graph with cc in
        let graph = setFold (propagateConstraint h) graph cc in
        iter (addi i 1) pprintenv graph
    in
    iter 1 pprintenv graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : CFA_GenFun
```

<Description>{`Base constraint generation function \(must still be included manually in  
constraintGenFuns\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraints graph =
  | t -> graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectConstraints" kind="sem">

```mc
sem collectConstraints : [CFA_GenFun] -> CFA_CFAGraphInit -> Ast_Expr -> CFA_CFAGraphInit
```

<Description>{`Call a set of constraint generation functions on each term in program.  
Useful when defining values of type CFAGraph.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectConstraints (cgfs: [GenFun]) (graph: CFAGraphInit) =
  | t ->
    let graph = foldl (lam graph. lam f. f graph t) graph cgfs in
    sfold_Expr_Expr (collectConstraints cgfs) graph t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraint" kind="sem">

```mc
sem initConstraint : CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem initConstraint: CFAGraph -> Constraint -> CFAGraph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, CFABase_AbsVal) -> CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint: (IName,AbsVal) -> CFAGraph -> Constraint -> CFAGraph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraintConst" kind="sem">

```mc
sem propagateConstraintConst : CFA_ConstPropFun
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraintConst: ConstPropFun
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addEdge" kind="sem">

```mc
sem addEdge : CFA_CFAGraph -> IName -> CFABase_Constraint -> (CFA_CFAGraph, Bool)
```

<Description>{`Returns both the new graph, and a Boolean that is true iff the new edge was  
added to the graph.  
NOTE\(Linnea, 2022\-06\-21\): Updates the graph by a side effectNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addEdge (graph: CFAGraph) (q: IName) =
  | cstr ->
    let cstrsq = edgesLookup q graph in
    if setMem cstr cstrsq then (graph, false)
    else
      tensorLinearSetExn graph.edges q (setInsert cstr cstrsq);
      (graph, true)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraintName" kind="sem">

```mc
sem initConstraintName : IName -> CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```

<Description>{`Helper function for initializing a constraint for a given name \(mainly  
used for convenience in initConstraint\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initConstraintName (name: IName) (graph: CFAGraph) =
  | cstr ->
    match addEdge graph name cstr with (graph, new) in
    if new then
      let avs = dataLookup name graph in
      setFold (lam graph. lam av. propagateConstraint (name,av) graph cstr)
        graph avs
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraintNames" kind="sem">

```mc
sem initConstraintNames : [IName] -> CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```

<Description>{`Helper function for initializing a constraint for a given name \(mainly  
used for convenience in initConstraint\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initConstraintNames (names: [IName]) (graph: CFAGraph) =
  | cstr ->
    foldl (lam graph. lam name. initConstraintName name graph cstr) graph names
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="dataLookup" kind="sem">

```mc
sem dataLookup : IName -> CFA_CFAGraph -> Set CFABase_AbsVal
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem dataLookup (key: IName) =
  | graph -> tensorLinearGetExn graph.data key
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="edgesLookup" kind="sem">

```mc
sem edgesLookup : IName -> CFA_CFAGraph -> Set CFABase_Constraint
```



<ToggleWrapper text="Code..">
```mc
sem edgesLookup (key: IName) =
  | graph -> tensorLinearGetExn graph.edges key
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addData" kind="sem">

```mc
sem addData : CFA_CFAGraph -> CFABase_AbsVal -> IName -> CFA_CFAGraph
```

<Description>{`NOTE\(Linnea, 2022\-06\-21\): Updates the graph by a side effectNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addData (graph: CFAGraph) (d: AbsVal) =
  | q ->
    let dq = dataLookup q graph in
    if setMem d dq then graph else
      tensorLinearSetExn graph.data q (setInsert d dq);
      { graph with worklist = cons (q,d) graph.worklist }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cfaGraphToString" kind="sem">

```mc
sem cfaGraphToString : PprintEnv -> CFA_CFAGraph -> (PprintEnv, String)
```

<Description>{`Prints a CFA graph`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cfaGraphToString (env: PprintEnv) =
  | graph ->
    let graph: CFAGraph = graph in
    let f = lam env. lam e: (IName,AbsVal).
      match pprintVarIName graph.im env e.0 with (env,n) in
      match absValToString graph.im env e.1 with (env,av) in
      (env,join ["(", n, ", ", av, ")"]) in
    match mapAccumL f env graph.worklist with (env,worklist) in
    match mapAccumL (lam env: PprintEnv. lam b:(IName,Set AbsVal).
        match pprintVarIName graph.im env b.0 with (env,b0) in
        match mapAccumL (absValToString graph.im) env (setToSeq b.1) with (env,b1)
        in (env,(b0,b1))
      ) env (mapi (lam i. lam x. (i,x)) (tensorToSeqExn graph.data))
    with (env, data) in
    match mapAccumL (lam env: PprintEnv. lam b:(IName,[Constraint]).
        match pprintVarIName graph.im env b.0 with (env,b0) in
        match mapAccumL (constraintToString graph.im) env b.1 with (env,b1) in
        (env,(b0,b1))
      ) env (mapi (lam i. lam x. (i, setToSeq x)) (tensorToSeqExn graph.edges))
    with (env, edges) in

    let str = join [
      "*** WORKLIST ***\n",
      "  [", strJoin ", " worklist, "]\n",
      "*** DATA ***\n",
      strJoin "\n" (map (lam b:(String,[String]).
        let avs = strJoin "\n" (map (concat "    ") b.1) in
        join ["  ", b.0, " =\n", avs]
      ) data), "\n",
      "*** EDGES ***\n",
      strJoin "\n" (map (lam b:(String,[String]).
        let cstrs = strJoin "\n" (map (concat "    ") b.1) in
        join ["  ", b.0, " =\n", cstrs]
      ) edges), "\n"
    ] in

    (env, str)
```
</ToggleWrapper>
</DocBlock>

