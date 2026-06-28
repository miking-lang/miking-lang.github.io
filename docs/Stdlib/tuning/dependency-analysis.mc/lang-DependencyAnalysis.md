import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DependencyAnalysis  
  

  
  
  
## Semantics  
  

          <DocBlock title="analyzeDependency" kind="sem">

```mc
sem analyzeDependency : CallCtxEnv -> CFA_CFAGraph -> Ast_Expr -> DependencyGraph
```



<ToggleWrapper text="Code..">
```mc
sem analyzeDependency (env : CallCtxEnv) (cfaGraph : CFAGraph) =
  | t ->
    -- Start the indexing of measuring points from the number of
    -- context-sensitive holes, to guarantee no collision in indices (to be able
    -- to store both sets as vertices in a graph).
    let nHoles = length env.idx2hole in
    match
      buildDependencies callGraphTop env (cfaGraphData cfaGraph)
        (_dependencyGraphEmpty, nHoles) t
    with ((graph, _), _) in
    let graph : DependencyGraph = graph in
    let nMeas = mapFoldWithKey (
      lam acc: Int. lam. lam tree: PTree NameInfo.
        addi acc (length (prefixTreeGetIds tree []))
      ) 0 graph.measuringPoints
    in
    let alive = setOfSeq subi (map (addi nHoles) (create nMeas (lam i. i))) in
    { { { graph with offset = nHoles }
                with nbrMeas = nMeas }
                with alive = alive }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildDependencies" kind="sem">

```mc
sem buildDependencies : (Name, Info) -> CallCtxEnv -> Map Name (Set CFABase_AbsVal) -> ({alive: Set Int, graph: Digraph Int Int, offset: Int, nbrMeas: Int, meas2fun: Map Name Name, measuringPoints: Map Name (PTree NameInfo)}, Int) -> Ast_Expr -> (({alive: Set Int, graph: Digraph Int Int, offset: Int, nbrMeas: Int, meas2fun: Map Name Name, measuringPoints: Map Name (PTree NameInfo)}, Int), Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem buildDependencies (cur : NameInfo) (env : CallCtxEnv)
                        (data : Map Name (Set AbsVal))
                        (acc : (DependencyGraph, Int)) =
  | TmDecl (x & {decl = DeclLet ({ident = ident} & t)}) ->
    match acc with (graph, measCount) in
    let graph : DependencyGraph = graph in

    -- Function to keep the part of a path that happened before the current node
    -- in the call history
    recursive let shortenPath = lam path. lam acc.
      match path with [] then [] else
      match path with [(from,to,lbl)] ++ path in
        if nameInfoEq cur to then snoc acc (from,to,lbl)
        else shortenPath path (snoc acc (from,to,lbl))
    in

    -- Update 'cur' when recursing in body if defining a function that is part
    -- of the call graph.
    let curBody =
      match t.body with TmLam lm then
        if graphHasVertex (ident, t.info) env.callGraph then (ident, t.info)
        else cur
      else cur
    in

    -- Update dependency graph from CFA dependencies
    let acc =
      match mapLookup ident data with Some deps then
        match
          setFold (lam acc : (DependencyGraph, Map Int [NameInfo]). lam av.
            match av with AVEHole {id = id, contexts = contexts} then
              setFold (lam acc. lam c.
                match acc with (graph, shortContexts) in
                let graph : DependencyGraph = graph in

                -- Assert contexts are unique
                utest mapMem c shortContexts with false in

                -- The part of the context string that happened before the
                -- current node in the call graph.
                let shortPath : Path = shortenPath (mapFindExn c env.verbosePath) [] in
                let lblPath : [NameInfo] = map (lam e : Edge. e.2) shortPath in

                -- Insert base hole in the graph, and accumulate context
                ( graph,
                  mapInsert c lblPath shortContexts )
              ) acc contexts
            else acc
          ) (graph, mapEmpty subi) deps
        with (graph, shortContexts) in
        let graph : DependencyGraph = graph in

        -- Compute measuring contexts and dependency graph
        if mapIsEmpty shortContexts then (graph, measCount)
        else
          -- Build a prefix tree with measuring contexts
          match mapFoldWithKey (lam treeId. lam. lam path.
              match treeId with (tree,id) in
              switch prefixTreeMaybeInsert nameInfoCmp tree id (reverse path)
              case (true,tree) then (tree, addi id 1)
              case (false,_) then (tree, id)
              end
            ) ( prefixTreeEmpty nameInfoCmp (nameSym "", NoInfo ()),
                 measCount ) shortContexts
          with (tree, newMeasCount) in
          -- For each context-sensitive hole, add an edge to the set of
          -- measuring id's it affects
          let graphGraph = mapFoldWithKey (
            lam acc: Graph Int Int. lam id: Int. lam path: [NameInfo].
              -- Set of measuring points that this context string affects.
              let measPoints : [Int] = prefixTreeGetIds tree (reverse path) in
              -- Add context-expanded hole to dependency graph
              let acc = graphMaybeAddVertex id acc in
              -- Add corresponding edges to dependency graph
              foldl (lam acc : Graph Int Int. lam mp: Int.
                let acc = graphMaybeAddVertex mp acc in
                graphAddEdge id mp 0 acc
              ) acc measPoints
            ) graph.graph shortContexts
          in
          let measContexts = mapInsert ident tree graph.measuringPoints in
          ( { { { graph with measuringPoints = measContexts }
                        with graph = graphGraph }
                        with meas2fun = mapInsert ident (nameInfoGetName curBody) graph.meas2fun},
            newMeasCount )

      else (graph, measCount)
    in

    match buildDependencies curBody env data acc t.body with (acc, body) in
    match buildDependencies cur env data acc x.inexpr with (acc, inexpr) in
    (acc, TmDecl {x with decl = DeclLet {t with body = body}, inexpr = inexpr})

  -- Possibly update cur inside bodies of bindings
  | TmDecl (x & {decl = DeclRecLets ({ bindings = bindings } & t), inexpr = inexpr}) ->
    match
      mapAccumL (lam acc : (DependencyGraph, Int). lam bind : DeclLetRecord.
        let curBody =
          match bind with {body = TmLam lm, ident = ident} then
            if graphHasVertex (ident, t.info) env.callGraph then
              (ident, t.info)
            else cur
          else cur
        in
        match buildDependencies curBody env data acc bind.body
        with (acc, body) in
        (acc, { bind with body = body })
      ) acc bindings
    with (acc, newBinds) in
    match buildDependencies cur env data acc inexpr with (acc, inexpr) in
    ( acc,
      TmDecl { x with decl = DeclRecLets {t with bindings = newBinds}
             , inexpr = inexpr})

  | t ->
    smapAccumL_Expr_Expr (buildDependencies cur env data) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="assumeFullDependency" kind="sem">

```mc
sem assumeFullDependency : CallCtxEnv -> Ast_Expr -> ({alive: Set Int, graph: Digraph Int Int, offset: Int, nbrMeas: Int, meas2fun: Map Name Name, measuringPoints: Map Name (PTree NameInfo)}, Ast_Expr)
```

<Description>{`Compute the dependency graph as if all holes are dependent on each other,  
without actually analyzing dependency. The whole AST becomes one single  
measuring point, which is dependent on all holes. Returns both the graph  
and the modified AST.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem assumeFullDependency (env : CallCtxEnv) =
  | t ->
    -- Put the entire AST in the body of a let-expression: the measuring point
    let m = nameSym "m" in
    let t = nulet_ m t in
    let t = bind_ t (nvar_ m) in

    -- Build the dependency graph
    let dep = _dependencyGraphEmpty in
    let nHoles = length env.idx2hole in
    -- Identifier of measuring point
    let mId = nHoles in
    let holeIds = create nHoles (lam i. i) in
    -- Build bipartite graph
    let vertices = cons mId holeIds in
    let edges = map (lam h. (h,mId,0)) holeIds in
    let graphGraph = graphAddEdges edges (
      graphAddVertices vertices dep.graph)
    in
    -- Create empty context tree (measuring point has no context)
    let tree = prefixTreeEmpty nameInfoCmp (nameSym "", NoInfo ()) in
    let tree = prefixTreeInsert nameInfoCmp tree mId [] in
    let measuringPoints = mapInsert m tree dep.measuringPoints in
    -- Closest enclosing call graph function is top-level
    let meas2fun = mapInsert m (nameInfoGetName callGraphTop) dep.meas2fun in
    let dep = {{{{{{dep with graph = graphGraph}
                        with measuringPoints = measuringPoints}
                        with meas2fun = meas2fun}
                        with offset = nHoles}
                        with nbrMeas = 1}
                        with alive = setOfSeq subi [nHoles]} in
    (dep, t)
```
</ToggleWrapper>
</DocBlock>

