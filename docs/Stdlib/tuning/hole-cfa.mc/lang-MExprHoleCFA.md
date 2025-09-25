import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprHoleCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  | AVDHole { id : IName, contexts : Set Int }
  | AVEHole { id : IName, contexts : Set Int }
  | AVConstHole { const : Const, args : [IName] }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GraphData" kind="syn">

```mc
syn GraphData
```



<ToggleWrapper text="Code..">
```mc
syn GraphData =
  | HoleCtxEnv { env: CallCtxEnv }
  | HoleCtxInfo { contextMap : Map IName (Set Int),
                  prefixMap : Map IName (Map IName (Set Int)) }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
    -- {dhole} ⊆ lhs ⇒ {dhole} ⊆ rhs
  | CstrHoleDirectData { lhs: IName, rhs: IName }
    -- {dhole} ⊆ lhs ⇒ {ehole} ⊆ rhs
  | CstrHoleDirectExe { lhs: IName, rhs: IName }
    -- {dhole} ⊆ lhs ⇒ ({dhole} ⊆ res) AND ({ehole} ⊆ res)
  | CstrHoleApp { lhs: IName, res: IName }
    -- ({const with args = args} ⊆ lhs AND |args| = arity(const)-1
    --    ⇒ ∀(a,i): (a,i) in ({args} ∪ {rhs} ⨯ [1,...,arity(const)]):
    --        if const is data dep on position i AND {dhole} ⊆ a ⇒ {dhole} ⊆ res
    --        AND
    --        if const is exe dep on position i AND {dhole} ⊆ a ⇒ {ehole} ⊆ res)
    -- AND
    -- ({const with args = args} ⊆ lhs AND |args| < arity(const)-1
    --    ⇒ {const with args = snoc args rhs } ⊆ res)
  | CstrHoleConstApp { lhs: IName, rhs : IName, res: IName }
    -- {dhole} ⊆ lhs ⇒ {ehole} ⊆ res
  | CstrHoleMatch { lhs: IName, res: IName }
    -- {dhole} ⊆ lhs ⇒ {dhole} ⊄ rhs
    -- lhs \ {dhole : dhole ∈ rhs} ⊆ res
  | CstrHoleIndependent { lhs: IName, rhs: IName, res: IName }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="absValToStringH" kind="sem">

```mc
sem absValToStringH : CFABase_AbsVal -> String
```



<ToggleWrapper text="Code..">
```mc
sem absValToStringH =
  | AVDHole _ -> "d"
  | AVEHole _ -> "e"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absValToString" kind="sem">

```mc
sem absValToString : Index_IndexMap -> PprintEnv -> CFABase_AbsVal -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem absValToString im (env : PprintEnv) =
  | ( AVDHole {id = id, contexts = contexts}
    | AVEHole {id = id, contexts = contexts} ) & av ->
    match pprintVarIName im env id with (env,id) in
    (env, join [
        absValToStringH av, "hole", "(", id, ",{",
        strJoin "," (map int2string (setToSeq contexts)), "}", ")"
      ])
  | AVConstHole { const = const, args = args } ->
    let const = getConstStringCode 0 const in
    match mapAccumL (pprintVarIName im) env args with (env, args) in
    (env, join [const, "(", strJoin ", " args, ")"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isDirect" kind="sem">

```mc
sem isDirect : CFABase_AbsVal -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isDirect =
  | AVEHole _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="directTransition" kind="sem">

```mc
sem directTransition : CFA_CFAGraph -> IName -> CFABase_AbsVal -> CFABase_AbsVal
```



<ToggleWrapper text="Code..">
```mc
sem directTransition (graph: CFAGraph) (rhs: Int) =
  | AVDHole ({id = id, contexts = contexts} & av) ->
    match graph with {graphData = graphData} in
    match graphData with Some (HoleCtxInfo c) then
      let labelMap = mapFindExn id c.prefixMap in
      match mapLookup rhs labelMap with Some ids then
        let newContexts = setIntersect contexts ids in
        AVDHole {av with contexts = newContexts}
      else AVDHole av
    else error "Expected context information in CFA graph"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpAbsValH" kind="sem">

```mc
sem cmpAbsValH : (CFABase_AbsVal, CFABase_AbsVal) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpAbsValH =
  | ( (AVDHole {id = id1, contexts = ctxs1},
       AVDHole {id = id2, contexts = ctxs2})
    | (AVEHole {id = id1, contexts = ctxs1},
       AVEHole {id = id2, contexts = ctxs2}) ) ->
    let ncmp = subi id1 id2 in
    if eqi 0 ncmp then setCmp ctxs1 ctxs2 else ncmp
  | (AVConstHole lhs, AVConstHole rhs) ->
    use ConstCmp in
    let cmp = cmpConst lhs.const rhs.const in
    if eqi 0 cmp then seqCmp subi lhs.args rhs.args
    else cmp
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConstraintH" kind="sem">

```mc
sem cmpConstraintH : (CFABase_Constraint, CFABase_Constraint) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstraintH =
  | (CstrHoleDirectData l, CstrHoleDirectData r) ->
    let d = subi l.lhs r.lhs in
    if eqi d 0 then subi l.rhs r.rhs
    else d
  | (CstrHoleDirectExe l, CstrHoleDirectExe r) ->
    let d = subi l.lhs r.lhs in
    if eqi d 0 then subi l.rhs r.rhs
    else d
  | (CstrHoleApp l, CstrHoleApp r) ->
    let d = subi l.res r.res in
    if eqi d 0 then subi l.lhs r.lhs
    else d
  | (CstrHoleConstApp l, CstrHoleConstApp r) ->
    let d = subi l.res r.res in
    if eqi d 0 then
      let d = subi l.lhs r.lhs in
      if eqi d 0 then subi l.rhs r.rhs
      else d
    else d
  | (CstrHoleMatch l, CstrHoleMatch r) ->
    let d = subi l.res r.res in
    if eqi d 0 then subi l.lhs r.lhs
    else d
  | (CstrHoleIndependent l, CstrHoleIndependent r) ->
    let d = subi l.res r.res in
    if eqi d 0 then
      let d = subi l.lhs r.lhs in
      if eqi d 0 then subi l.rhs r.rhs
      else d
    else d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraint" kind="sem">

```mc
sem initConstraint : CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem initConstraint (graph : CFAGraph) =
  | CstrHoleApp r & cstr -> initConstraintName r.lhs graph cstr
  | CstrHoleDirectData r & cstr -> initConstraintName r.lhs graph cstr
  | CstrHoleDirectExe r & cstr -> initConstraintName r.lhs graph cstr
  | CstrHoleConstApp r & cstr -> initConstraintName r.lhs graph cstr
  | CstrHoleMatch r & cstr -> initConstraintName r.lhs graph cstr
  | CstrHoleIndependent r & cstr -> initConstraintName r.lhs graph cstr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, CFABase_AbsVal) -> CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint (update : (IName, AbsVal)) (graph : CFAGraph) =
  | CstrHoleDirectData { lhs = lhs, rhs = rhs } ->
    match update.1 with AVDHole _ & av then addData graph av rhs else graph
  | CstrHoleDirectExe { lhs = lhs, rhs = rhs } ->
    match update.1 with AVDHole a then addData graph (AVEHole a) rhs else graph
  | CstrHoleApp { lhs = lhs, res = res } ->
    match update.1 with AVDHole {id = id, contexts = contexts} & av then
      let graph = addData graph av res in
      addData graph (AVEHole {id = id, contexts = contexts}) res
    else graph
  | CstrHoleMatch { lhs = lhs, res = res } ->
    match update.1 with AVDHole {id = id, contexts = contexts}
    then addData graph (AVEHole {id = id, contexts = contexts}) res
    else graph
  -- OPT(Linnea,20222-05-10): Hook in to propagateConstraint for CstrConstApp in
  -- cfa.mc.
  | CstrHoleConstApp { lhs = lhs, rhs = rhs, res = res } ->
    use MExprConstDep in
    match update.1 with AVConstHole ({ const = const, args = args } & avc) then
      let arity = constArity const in
      let args = snoc args rhs in
      if eqi arity (length args) then
        -- Last application, analyse data and execution time
        let cdeps = constDep const in
        let graph = foldl (lam graph. lam argDep : (IName, (Bool, Bool)).
          let arg = argDep.0 in
          let dep = argDep.1 in
          let isDataDep = dep.0 in
          let isExeDep = dep.1 in
          -- Add data dependencies to the result
          let graph =
            if isDataDep then
              initConstraint graph (CstrHoleDirectData {lhs = arg, rhs = res})
            else graph
          in
          -- Add execution time dependencies the result
          let graph =
            if isExeDep then
              initConstraint graph (CstrHoleDirectExe {lhs = arg, rhs = res})
            else graph
          in
          graph) graph (zip args cdeps) in
        graph
      else
        -- Curried application, just add the new argument
        addData graph (AVConstHole { avc with args = args }) res
    else graph
  | CstrHoleIndependent { lhs = lhs, rhs = rhs, res = res } ->
    match update.1 with AVDHole _ & av then
      -- Only add the dependency if it is not part of rhs
      let d = dataLookup rhs graph in
      if setMem av d then graph
      else propagateDirectConstraint res graph av
    else propagateDirectConstraint res graph update.1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateHoleConstraints" kind="sem">

```mc
sem generateHoleConstraints : CFA_GenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateHoleConstraints (graph: CFAGraphInit) =
  | _ -> graph
    -- Holes
  | TmDecl {decl = DeclLet { ident = ident, body = TmHole _, info = info}} ->
    match graph with {graphData = graphData} in
    match graphData with Some (HoleCtxInfo {contextMap = contextMap}) then
      let ident = name2intAcc graph.ia info ident in
      let av = AVDHole {
        id = ident,
        contexts = mapFindExn ident contextMap
      } in
      let cstr = CstrInit {lhs = av, rhs = ident } in
      { graph with cstrs = cons cstr graph.cstrs }
    else errorSingle [info] "Expected context information"
  | TmDecl {decl = DeclLet { ident = ident, body = TmConst { val = c }, info = info }} ->
    let arity = constArity c in
    let cstrs =
      if eqi arity 0 then []
      else [ CstrInit {
               lhs = AVConstHole { const = c, args = [] },
               rhs = name2intAcc graph.ia info ident } ]
    in
    { graph with cstrs = concat cstrs graph.cstrs }
  | TmDecl {decl = DeclLet { ident = ident, body = TmApp app, info = info }} ->
    match app.lhs with TmVar l then
      match app.rhs with TmVar r then
        let lhs = name2intAcc graph.ia l.info l.ident in
        let rhs = name2intAcc graph.ia r.info r.ident in
        let ident = name2intAcc graph.ia info ident in
        let cstrs = [
          CstrHoleApp { lhs = lhs, res = ident},
          CstrHoleConstApp { lhs = lhs, rhs = rhs, res = ident }
        ] in
        { graph with cstrs = concat cstrs graph.cstrs }
      else errorSingle [infoTm app.rhs] "Not a TmVar in application"
    else errorSingle [infoTm app.lhs] "Not a TmVar in application"
  | TmDecl {decl = DeclLet { ident = ident, body = TmIndependent t, info = info}} ->
    match t.lhs with TmVar lhs then
      match t.rhs with TmVar rhs then
        let lhs = name2intAcc graph.ia lhs.info lhs.ident in
        let rhs = name2intAcc graph.ia rhs.info rhs.ident in
        let ident = name2intAcc graph.ia info ident in
        let cstr = CstrHoleIndependent {lhs = lhs, rhs = rhs, res = ident} in
        { graph with cstrs = cons cstr graph.cstrs }
      else errorSingle [infoTm t.rhs] "Not a TmVar in independent annotation"
    else errorSingle [infoTm t.lhs] "Not a TmVar in independent annotation"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constraintToString" kind="sem">

```mc
sem constraintToString : Index_IndexMap -> PprintEnv -> CFABase_Constraint -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem constraintToString im (env: PprintEnv) =
  | CstrHoleDirectData { lhs = lhs, rhs = rhs } ->
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env lhs with (env,lhs) in
    (env, join [ "{dhole} ⊆ ", lhs, " ⇒ {dhole} ⊆ ", rhs ])
  | CstrHoleDirectExe { lhs = lhs, rhs = rhs } ->
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env lhs with (env,lhs) in
    (env, join [ "{dhole} ⊆ ", lhs, " ⇒ {ehole} ⊆ ", rhs ])
  | CstrHoleApp { lhs = lhs, res = res } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [
      "{dhole} ⊆ ", lhs, " ⇒ {dhole} ⊆ ", res ])
  | CstrHoleMatch { lhs = lhs, res = res } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [
      "{dhole} ⊆ ", lhs, " ⇒ {ehole} ⊆ ", res ])
  | CstrHoleConstApp { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [
      "({const with args = args} ⊆ ", lhs, " AND |args| = arity(const)-1\n",
      "  ⇒ ∀(a,i): (a,i) in ({args} ∪ {", rhs, "} ⨯ [1,...,arity(const)]):\n",
      "    if const is data dep. on position i AND {dhole} ⊆ a ⇒ {dhole} ⊆ ", res, "\n",
      "    AND\n",
      "    if const is exe. dep. on position i AND {dhole} ⊆ a ⇒ {ehole} ⊆ ", res, ")\n",
      "AND\n",
      "({const with args = args} ⊆ ", lhs, " AND |args| < arity(const)-1\n",
      "  ⇒ {const with args = snoc args ", rhs, "} ⊆ ", res, ")"
    ])
  | CstrHoleIndependent { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [lhs, " \\ {dhole : dhole ∈ ", rhs, "} ⊆ ", res])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateHoleMatchResConstraints" kind="sem">

```mc
sem generateHoleMatchResConstraints : CFA_MatchGenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateHoleMatchResConstraints (id: Int) (target: Int) =
  | ( PatSeqTot _
    | PatSeqEdge _
    | PatCon _
    | PatInt _
    | PatChar _
    | PatBool _
    | PatRecord _
    ) & pat -> [
      CstrHoleDirectData { lhs = target, rhs = id },
      CstrHoleMatch { lhs = target, res = id }
    ]
  | PatAnd p ->
    let lres = generateHoleMatchResConstraints id target p.lpat in
    let rres = generateHoleMatchResConstraints id target p.rpat in
    concat lres rres
  | PatOr p ->
    let lres = generateHoleMatchResConstraints id target p.lpat in
    let rres = generateHoleMatchResConstraints id target p.rpat in
    concat lres rres
  | PatNot p  -> []
  | _ -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```

<Description>{`NOTE\(Linnea, 2021\-12\-17\): We need to handle references, since references  
are used in the graph coloring. By construction, these references  
operations are free from holes, so it is safe to assume no constraints.  
However, the analysis does not support references in the general case.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | CModRef _ -> graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateHoleMatchConstraints" kind="sem">

```mc
sem generateHoleMatchConstraints : Index_IndexAcc -> CFA_MatchGenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateHoleMatchConstraints (ia: IndexAcc) (id: Int) (target: Int) =
  | pat ->
    recursive let f = lam acc. lam pat.
      let acc =
        match pat with PatNamed { ident = PName name, info = info }
                     | PatSeqEdge { middle = PName name, info = info }
        then cons (name2intAcc ia info name) acc else acc in
      sfold_Pat_Pat f acc pat
    in
    let pnames = f [] pat in
    foldl (lam acc. lam name: IName.
      cons (CstrHoleDirectData { lhs = target, rhs = name }) acc
    ) [] pnames
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addHoleMatchConstraints" kind="sem">

```mc
sem addHoleMatchConstraints : CFA_CFAGraphInit -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem addHoleMatchConstraints =
  | graph ->
    -- Initialize match constraint generating functions
    { graph with mcgfs = concat [ generateHoleMatchConstraints graph.ia
                                , generateHoleMatchResConstraints
                                ]
                                graph.mcgfs }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addHoleConstraints" kind="sem">

```mc
sem addHoleConstraints : CFABase_GraphData -> CFA_CFAGraphInit -> Ast_Expr -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem addHoleConstraints (graphData: GraphData) (graph: CFAGraphInit) =
  | t ->
    -- Initialize graph data
    match graphData with (HoleCtxEnv {env = env}) in
    let graph = {graph with graphData = Some (graphDataFromEnv graph.ia env)} in

    -- Initialize constraint generating functions
    let cgfs = [ generateHoleConstraints ] in

    -- Recurse over program and generate constraints
    let graph = collectConstraints cgfs graph t in

    graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="holeCfa" kind="sem">

```mc
sem holeCfa : CFABase_GraphData -> Ast_Expr -> CFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem holeCfa gd =
  | t ->
    let graph = emptyCFAGraphInit t in
    let graph = addBaseMatchConstraints graph in
    let graph = addHoleMatchConstraints graph in
    let graph = addBaseConstraints graph t in
    let graph = addHoleConstraints gd graph t in
    solveCfa graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="holeCfaDebug" kind="sem">

```mc
sem holeCfaDebug : CFABase_GraphData -> PprintEnv -> Ast_Expr -> (PprintEnv, CFA_CFAGraph)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem holeCfaDebug gd pprintenv =
  | t ->
    let graph = emptyCFAGraphInit t in
    let graph = addBaseMatchConstraints graph in
    let graph = addHoleMatchConstraints graph in
    let graph = addBaseConstraints graph t in
    let graph = addHoleConstraints gd graph t in
    solveCfaDebug pprintenv graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="graphDataInit" kind="sem">

```mc
sem graphDataInit : CallCtxEnv -> CFABase_GraphData
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem graphDataInit =
  | env -> HoleCtxEnv {env = env}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="graphDataFromEnv" kind="sem">

```mc
sem graphDataFromEnv : Index_IndexAcc -> CallCtxEnv -> CFABase_GraphData
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem graphDataFromEnv ia =
  | env ->
    -- Converts a prefix tree for a hole to a mapping from a call site to the
    -- set of contexts that pass through the call site.
    let treeToCallSiteCtxUnion
    : PTree NameInfo -> Map IName (Set Int) = lam tree.
      match tree with Node {children = children} then
        recursive let work = lam acc: Map IName (Set Int). lam children.
          mapFoldWithKey (lam acc. lam root. lam subtree.
            -- NOTE(Linnea, 2022-06-20): If a name is not mapped by an index, it
            -- is not part of the program, but a sentinel in the prefix tree.
            -- Thus, we will never look it up during CFA, and it is safe to not
            -- insert it in the map.
            if mapMem (nameInfoGetName root) ia.map then
              let r = name2intAcc ia (nameInfoGetInfo root) (nameInfoGetName root) in
              let s: Set Int =
                match mapLookup r acc with Some s
                then s else setEmpty subi in
              switch subtree
              case Leaf id then mapInsert r (setInsert id s) acc
              case Node {ids = ids, children = children} then
                let acc = work acc children in
                mapInsert r (
                    foldl (lam acc. lam id. setInsert id acc) s ids
                  ) acc
              end
            else acc) acc children
        in work (mapEmpty subi) children
      else error "Missing sentinel node"
    in

    let env : CallCtxEnv = env in

    -- Maps a hole to its set of contexts.
    let contextMap : Map IName (Set Int) =
      mapFoldWithKey
        (lam acc : Map IName (Set Int). lam n: NameInfo.
         lam vals : Map [NameInfo] Int.
           let n = name2intAcc ia (nameInfoGetInfo n) (nameInfoGetName n) in
           mapInsert n (setOfSeq subi (mapValues vals)) acc
        ) (mapEmpty subi) env.hole2idx
    in
    -- Maps a hole to its call site map.
    let prefixMap : Map IName (Map IName (Set Int)) =
      mapFoldWithKey
        (lam acc : Map IName (Map IName (Set Int)).
         lam n : NameInfo.
         lam tree : PTree NameInfo.
           let n = name2intAcc ia (nameInfoGetInfo n) (nameInfoGetName n) in
           mapInsert n (treeToCallSiteCtxUnion tree) acc
        ) (mapEmpty subi) env.contexts
    in
    HoleCtxInfo { contextMap = contextMap, prefixMap = prefixMap }
```
</ToggleWrapper>
</DocBlock>

