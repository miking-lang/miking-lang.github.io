import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NestedMeasuringPoints  
  

  
  
  
## Semantics  
  

          <DocBlock title="analyzeNested" kind="sem">

```mc
sem analyzeNested : CallCtxEnv -> CFA_CFAGraph -> Ast_Expr -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem analyzeNested (env: CallCtxEnv) (cfaGraph : CFAGraph) =
  | t ->
    -- Convert from direct style map
    let cfaData = cfaGraphData cfaGraph in

    -- Collect all lambda abstract values
    let avLams : Set Name = mapFoldWithKey (
      lam acc: Set Name. lam. lam v: Set AbsVal.
        setFold (lam acc: Set Name. lam abs: AbsVal.
          match abs with AVLam {ident = ident} then
            setInsert (int2name cfaGraph.im ident) acc
          else acc) acc v
      ) (setEmpty nameCmp) cfaData
    in

    -- Build call graph from flow information
    let top = nameSym "top" in
    let callGraph = buildCallGraph cfaGraph.im avLams top cfaData t in

    -- Compute the set of eholes for each measuring point
    let eholes : Map Name [AbsVal] = mapFoldWithKey (
      lam acc. lam ident. lam avs.
        let eholes = setFold (lam acc. lam av.
          match av with AVEHole _ then cons av acc
          else acc
        ) [] avs
        in
        if null eholes then acc
        else mapInsert ident eholes acc
    ) (mapEmpty nameCmp) cfaData
    in

    let identDepsEnclosing : [(Name, [AbsVal], Name)] =
      _measEnclosingLam eholes avLams top [] t
    in

    -- Maps a measuring point to its enclosing lambda, and its dependencies
    let measEnclosingMap : Map Name (Name, [AbsVal]) = foldl (
      lam acc. lam x : (Name, [AbsVal], Name).
        mapInsert x.0 (x.2, x.1) acc
      ) (mapEmpty nameCmp) identDepsEnclosing
    in

    -- Maps a lambda to the set of measuring points that it contains
    let measInLam : Map Name (Set Name) = foldl (
      lam acc. lam x : (Name, [AbsVal], Name).
        match x with (meas, _, encLam) in
        let measSet =
          match mapLookup encLam acc with Some set then
            setInsert meas set
          else setOfSeq nameCmp [meas]
        in
        mapInsert encLam measSet acc
      ) (mapEmpty nameCmp) identDepsEnclosing
    in

    -- The set of measuring point names
    let measSet = setOfSeq nameCmp (mapKeys measInLam) in

    -- Collect augmented dependencies
    let deps : [(Name, [AbsVal])] =
      augmentDependencies
       cfaGraph.im env measEnclosingMap measInLam measSet cfaData eholes callGraph [] t
    in

    -- Collect syntactically scoped measuring points
    let synScoped : [Name] = collectSyntacticallyScoped eholes [] t in

    -- Remove the syntactically scoped measuring points to the CFA result
    let data : Map Name (Set AbsVal) = foldl (lam acc. lam ident.
        mapRemove ident acc
      ) cfaData synScoped
    in

    -- Add the augmented dependencies to the CFA result
    let data : Map Name (Set AbsVal) = foldl (
      lam acc. lam identAvs : (Name, [AbsVal]).
        match identAvs with (ident, avs) in
        match mapLookup ident acc with Some oldAvs then
          let newAvs = setUnion oldAvs (setOfSeq cmpAbsVal avs) in
          mapInsert ident newAvs acc
        else
          -- No dependencies, cannot spawn new ones
          acc
      ) data deps
    in

    -- Convert back to direct style map
    tensorIteri (lam i. lam.
      let d =
        match mapLookup (int2name cfaGraph.im (get i 0)) data with Some s then s
        else setEmpty cmpAbsVal
      in
      tensorSetExn cfaGraph.data i d) cfaGraph.data;

    cfaGraph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildCallGraph" kind="sem">

```mc
sem buildCallGraph : Index_IndexMap -> Set Name -> Name -> Map Name (Set CFABase_AbsVal) -> Ast_Expr -> Digraph Name Symbol
```



<ToggleWrapper text="Code..">
```mc
sem buildCallGraph (im: IndexMap) (avLams : Set Name) (top : Name)
                     (data : Map Name (Set AbsVal)) =
  | t ->
    -- The nodes are the AVLams recorded in the data flow
    let g = digraphEmpty nameCmp eqsym in
    let g = digraphAddVertices (cons top (setToSeq avLams)) g in
    -- The edges are applications
    let edges = _callGraphEdges im data avLams top [] t in
    let g = digraphAddEdges edges g in
    g
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_callGraphEdges" kind="sem">

```mc
sem _callGraphEdges : Index_IndexMap -> Map Name (Set CFABase_AbsVal) -> Set Name -> Name -> [(Name, Name, Symbol)] -> Ast_Expr -> [DigraphEdge Name Symbol]
```



<ToggleWrapper text="Code..">
```mc
sem _callGraphEdges (im: IndexMap) (data: Map Name (Set AbsVal))
                      (avLams: Set Name) (cur : Name)
                      (acc : [(Name,Name,Symbol)]) =
  | TmLam t ->
    if setMem t.ident avLams then
      _callGraphEdges im data avLams t.ident acc t.body
    else
      -- Lambda expression not reachable, we are done.
      acc

  | TmApp t ->
    match t.lhs with TmVar v then
      let res =
        match mapLookup v.ident data with Some avs then
          let avLamsLhs = setFold (lam acc. lam av.
            match av with AVLam {ident = ident} then
              setInsert (int2name im ident) acc
            else acc) (setEmpty nameCmp) avs
          in
          -- Add an edge for each lam that flows to lhs
          map (lam l. (cur,l,gensym ())) (setToSeq avLamsLhs)
        else []
      in concat res acc
    else errorSingle [infoTm t.lhs] "Not a TmVar in application"

  | TmDecl {decl = DeclExt t} -> acc

  | t ->
    sfold_Expr_Expr (_callGraphEdges im data avLams cur) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_measEnclosingLam" kind="sem">

```mc
sem _measEnclosingLam : Map Name [CFABase_AbsVal] -> Set Name -> Name -> [(Name, [CFABase_AbsVal], Name)] -> Ast_Expr -> [(Name, [CFABase_AbsVal], Name)]
```

<Description>{`Find the closest enclosing lambda for each measuring point`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _measEnclosingLam (data : Map Name [AbsVal]) (avLams : Set Name)
                        (cur : Name) (acc : [(Name,[AbsVal],Name)]) =
  | TmLam t ->
    if setMem t.ident avLams then
      _measEnclosingLam data avLams t.ident acc t.body
    else
      -- Lambda expression not reachable, we are done.
      acc

  | TmDecl (x & {decl = DeclLet { ident = ident, body = TmApp app }}) ->
    let resInexpr = _measEnclosingLam data avLams cur acc x.inexpr in
    match mapLookup ident data with Some eholes then
      concat [(ident, eholes, cur)] resInexpr
    else resInexpr

  | TmDecl (x & {decl = DeclLet { ident = ident, body = TmMatch m }}) ->
    let resInexpr = _measEnclosingLam data avLams cur acc x.inexpr in
    let resMatch = sfold_Expr_Expr (_measEnclosingLam data avLams cur) [] (TmMatch m) in
    match mapLookup ident data with Some eholes then
      join [[(ident, eholes, cur)], resInexpr, resMatch]
    else concat resInexpr resMatch

  | t ->
    sfold_Expr_Expr (_measEnclosingLam data avLams cur) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="augmentDependencies" kind="sem">

```mc
sem augmentDependencies : Index_IndexMap -> CallCtxEnv -> Map Name (Name, [CFABase_AbsVal]) -> Map Name (Set Name) -> Set Name -> Map Name (Set CFABase_AbsVal) -> Map Name [CFABase_AbsVal] -> Digraph Name Symbol -> [(Name, [CFABase_AbsVal])] -> Ast_Expr -> [(Name, [CFABase_AbsVal])]
```

<Description>{`Augment dependencies for nested measuring points.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem augmentDependencies (im: IndexMap)
                          (env: CallCtxEnv)
                          (enclosingLam : Map Name (Name, [AbsVal]))
                          (measInLam : Map Name (Set Name))
                          (measSet : Set Name)
                          (data : Map Name (Set AbsVal))
                          (dataEholes : Map Name [AbsVal])
                          (callGraph : Digraph Name Symbol)
                          (acc: [(Name, [AbsVal])]) =
  -- A match is the only type of measuring point that can have a nested
  -- measuring point, since it is the only one that consists of several
  -- subexpressions.
  | TmDecl (x & {decl = DeclLet ({ ident = ident, body = TmMatch m } & t)}) ->
    let resInexpr =
      augmentDependencies
        im env enclosingLam measInLam measSet data dataEholes callGraph acc x.inexpr
    in
    let resMatch = sfold_Expr_Expr (
        augmentDependencies im env enclosingLam measInLam measSet data dataEholes callGraph)
        [] (TmMatch m)
    in
    match mapLookup ident enclosingLam with Some (encLam, _) then
      -- Check what measuring points that are reachable from the branches
      let depThn =
        augmentDependenciesH
          ident im env enclosingLam measInLam measSet data dataEholes callGraph [] m.thn in
      let depEls =
        augmentDependenciesH
          ident im env enclosingLam measInLam measSet data dataEholes callGraph [] m.els in
      let deps = (ident, concat depThn depEls) in
      join [resInexpr, resMatch, [deps]]
    else concat resInexpr resMatch

  | t ->
    sfold_Expr_Expr
      (augmentDependencies im env enclosingLam measInLam measSet data dataEholes callGraph)
      acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eholesOf" kind="sem">

```mc
sem eholesOf : Info -> CallCtxEnv -> Name -> [CFABase_AbsVal] -> [CFABase_AbsVal]
```



<ToggleWrapper text="Code..">
```mc
sem eholesOf (info : Info) (env: CallCtxEnv) (ident: Name) =
  | avs ->
    let avs : [AbsVal] = avs in
    recursive let passesThrough = lam path.
      match path with [] then false
      else match path with [(from,to,lbl)] ++ path in
        if nameEq (nameInfoGetName lbl) ident then true
        else passesThrough path
    in
    foldl (lam acc. lam av.
        match av with AVEHole r then
          let contexts = setToSeq r.contexts in
          match contexts with [_] then cons (AVEHole r) acc
          else
            let idPaths = map (lam c. (c, mapFindExn c env.verbosePath)) contexts in
            let keep = filter (lam t: (Int, Path). passesThrough t.1) idPaths in
            let keepIds = map (lam t: (Int, Path). t.0) keep in
            utest gti (length keepIds) 0 with true in
            cons (AVEHole {r with contexts = setOfSeq subi keepIds}) acc
        else acc
      ) [] avs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="augmentDependenciesH" kind="sem">

```mc
sem augmentDependenciesH : Name -> Index_IndexMap -> CallCtxEnv -> Map Name (Name, [CFABase_AbsVal]) -> Map Name (Set Name) -> Set Name -> Map Name (Set CFABase_AbsVal) -> Map Name [CFABase_AbsVal] -> Digraph Name Symbol -> [CFABase_AbsVal] -> Ast_Expr -> [CFABase_AbsVal]
```

<Description>{`Collect all dependencies reachable from an expression, either from function  
applications or from one of the subexpressions themselves.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem augmentDependenciesH (ident: Name) -- The enclosing measuring point
                           (im: IndexMap)
                           (env: CallCtxEnv)
                           (enclosingLam : Map Name (Name, [AbsVal]))
                           (measInLam : Map Name (Set Name))
                           (measSet : Set Name)
                           (data : Map Name (Set AbsVal))
                           (dataEholes : Map Name [AbsVal])
                           (callGraph : Digraph Name Symbol)
                           (acc : [AbsVal]) =
  | TmDecl (x & {decl = DeclLet ({body = TmApp app} & t)}) ->
    let resBody =
      match app.lhs with TmVar v then
        match mapLookup v.ident data with Some avs then
          -- What lambdas can flow to lhs?
          let avLamsLhs = setFold (lam acc. lam av.
            match av with AVLam {ident = ident} then
              setInsert (int2name im ident) acc
            else acc) (setEmpty nameCmp) avs
          in
          -- What measuring points are reachable from these lambdas?
          let reachable : [AbsVal] = setFold (
            lam acc. lam lamIdent.
              let reachNodes =
                setOfSeq nameCmp (mapKeys (digraphBFS lamIdent callGraph))
              in
              -- Reachable nodes that contain measuring points
              let reachMeasNodes = setIntersect reachNodes measSet in
              -- Collect dependencies of the reachable measuring points
              setFold (lam acc : [AbsVal]. lam node : Name.
                match mapLookup node measInLam with Some set then
                  setFold (lam acc. lam measIdent.
                    match mapLookup measIdent enclosingLam with Some (_, deps)
                    then eholesOf (infoTm (TmApp app)) env t.ident deps
                    else error "impossible"
                  ) [] set
                else error "impossible"
              ) acc reachMeasNodes
            ) [] avLamsLhs
          in reachable
        else []
      else errorSingle [infoTm app.lhs] "Not a TmVar in application"
    in
    let resLet = optionGetOr [] (mapLookup t.ident dataEholes) in
    let resInexpr = sfold_Expr_Expr
      (augmentDependenciesH ident im env enclosingLam measInLam measSet data dataEholes callGraph)
      acc x.inexpr
    in join [resBody, resLet, resInexpr]

  | tm & TmDecl {decl = DeclLet t} ->
    let resLet = optionGetOr [] (mapLookup t.ident dataEholes) in
    let resRest = sfold_Expr_Expr
        (augmentDependenciesH ident im env enclosingLam measInLam measSet data dataEholes callGraph)
        acc tm
    in concat resLet resRest

  | t ->
    sfold_Expr_Expr
      (augmentDependenciesH ident im env enclosingLam measInLam measSet data dataEholes callGraph)
      acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectSyntacticallyScoped" kind="sem">

```mc
sem collectSyntacticallyScoped : Map Name [CFABase_AbsVal] -> [Name] -> Ast_Expr -> [Name]
```

<Description>{`Collect measuring points that are syntactically scoped within another  
measuring point. They are not needed, because their dependencies have  
already been added to the enclosing measuring point, and will always be  
executed within the enclosing measuring point.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectSyntacticallyScoped (eholes : Map Name [AbsVal]) (acc : [Name]) =
  -- Need only consider match expressions, by same logic as for
  -- 'augmentDependencies'
  | TmDecl (x & {decl = DeclLet ({ ident = ident, body = TmMatch m } & t)}) ->
    -- Recurse inexpr and body
    let resInexpr = collectSyntacticallyScoped eholes acc x.inexpr in
    let resMatch = sfold_Expr_Expr (collectSyntacticallyScoped eholes)
        [] (TmMatch m)
    in
    -- Are we in a measuring point?
    if mapMem ident eholes then
      -- Collect syntactically scoped measuring points
      let scopedThn = collectSyntacticallyScopedH eholes [] m.thn in
      let scopedEls = collectSyntacticallyScopedH eholes [] m.els in
      join [resInexpr, resMatch, scopedThn, scopedEls]
    else concat resInexpr resMatch

  | t ->
    sfold_Expr_Expr (collectSyntacticallyScoped eholes) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectSyntacticallyScopedH" kind="sem">

```mc
sem collectSyntacticallyScopedH : Map Name [CFABase_AbsVal] -> [Name] -> Ast_Expr -> [Name]
```

<Description>{`Return the measuring points syntactically scoped in an expression`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectSyntacticallyScopedH (eholes : Map Name [AbsVal]) (acc: [Name]) =
  | tm & TmDecl {decl = DeclLet t} ->
    let resLet = if mapMem t.ident eholes then [t.ident] else [] in
    let resRest = sfold_Expr_Expr (collectSyntacticallyScopedH eholes)
        acc tm
    in concat resLet resRest

  | t ->
    sfold_Expr_Expr (collectSyntacticallyScopedH eholes) acc t
```
</ToggleWrapper>
</DocBlock>

