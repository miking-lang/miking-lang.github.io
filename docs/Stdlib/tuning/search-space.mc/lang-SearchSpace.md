import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SearchSpace  
  

  
  
  
## Semantics  
  

          <DocBlock title="searchSpaceSize" kind="sem">

```mc
sem searchSpaceSize : Int -> CallCtxEnv -> DependencyGraph -> {sizeTotal: Float, sizeReduced: Float, measuringPoints: Map Int Float, connectedComponents: [([Int], Float)]}
```



<ToggleWrapper text="Code..">
```mc
sem searchSpaceSize (stepSize : Int) (env : CallCtxEnv) =
  | dep ->
    let dep : DependencyGraph = dep in
    let holeDomainSizes = map (domainSize stepSize) env.idx2hole in
    let holeDomainSizes: [Float] = map int2float holeDomainSizes in
    let mps = setToSeq dep.alive in
    if null mps then
      { measuringPoints = mapEmpty subi, connectedComponents = [],
        sizeTotal = 0., sizeReduced = 0. }
    else
      let sizeMps: Map Int Float = searchSpaceSizeMeasuringPoint mps dep.graph holeDomainSizes in
      let sizeCC: [([Int], Float)] = searchSpaceSizeConnectedComponent sizeMps dep.graph holeDomainSizes in
      let sizeTotal: Float = foldl mulf 1. holeDomainSizes in
      let sizeReduced: Float = optionGetOrElse (lam. error "Empty search space")
        (max (cmpfApprox 0.) (map (lam c : ([Int], Float). c.1) sizeCC))
      in
      { measuringPoints = sizeMps, connectedComponents = sizeCC,
        sizeTotal = sizeTotal, sizeReduced = sizeReduced }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="searchSpaceExhaustive" kind="sem">

```mc
sem searchSpaceExhaustive : Int -> CallCtxEnv -> DependencyGraph -> DataFrame (Option Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem searchSpaceExhaustive (stepSize : Int) (env : CallCtxEnv) =
  | dep ->
    let dep : DependencyGraph = dep in
    let domains : [[Expr]] = map (domain stepSize) env.idx2hole in
    let mps = setToSeq dep.alive in
    searchSpaceExhaustiveH mps dep.graph domains
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="searchSpaceExhaustiveMeasPoints" kind="sem">

```mc
sem searchSpaceExhaustiveMeasPoints : [Int] -> Graph Int Int -> [[Ast_Expr]] -> [([Int], [[Ast_Expr]])]
```



<ToggleWrapper text="Code..">
```mc
sem searchSpaceExhaustiveMeasPoints (mp : [Int]) (graph : Graph Int Int) =
  | domains ->
    let domains : [[Expr]] = domains in
    -- Generate exhaustive tables for each measuring point
    let tables = map (lam m.
      let holes = graphNeighbors m graph in
      let doms = map (get domains) holes in
      let prod = searchSpaceProduct doms in
      (holes, prod)
    ) mp
    in tables
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="searchSpaceExhaustiveH" kind="sem">

```mc
sem searchSpaceExhaustiveH : [Int] -> Graph Int Int -> [[Ast_Expr]] -> DataFrame (Option Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem searchSpaceExhaustiveH (mp : [Int]) (graph : Graph Int Int) =
  | domains ->
    let tables = searchSpaceExhaustiveMeasPoints mp graph domains in

    -- The longest table is the initial base table
    match
      foldl (lam acc. lam table: ([Int],[[Expr]]).
        match acc with (cur, longest, t) in
        if gti (length table.1) (length t) then (addi cur 1, cur, table.1)
        else (addi cur 1, longest, t)
      ) (0, subi 0 1, []) tables
    with (_, longestIdx, longestTable) in

    utest geqi longestIdx 0 with true in

    -- Create a data frame from the base table
    let ncols = if null longestTable then 0 else length (head longestTable) in
    let df = dataFrameFromSeq longestTable ncols in
    let df = dataFrameMap (lam x. Some x) df in

    -- Extend columns of base table to include all holes, add empty slots for
    -- unknown values
    let ncols = length domains in
    let idxs =
      let t : ([Int],[[Expr]]) = get tables longestIdx in
      t.0
    in
    let df =
      -- No need to extend if already fully sized
      if eqi ncols df.ncols then df
      else dataFrameExtendCols ncols idxs (None ()) df
    in

    -- Equality function: handle None () as a match.
    -- OPT(Linnea,2022-02-02): Check fuzzy vs. exact match
    let eq = lam e1. lam e2.
      use MExprEq in
      switch (e1, e2)
      case ((None (), _) | (_, None ())) then true
      case (Some v1, Some v2) then eqExpr v1 v2
      end
    in

    -- For each row in each table: find first matching row in data frame, add
    -- the row there.
    match
      -- For each table
      foldl (lam acc. lam t : ([Int],[[Expr]]).
        match acc with (i, df) in
        -- Skip the original base table (already in the data frame)
        if eqi i longestIdx then (addi i 1, df) else

        match t with (idxs, table) in
        -- For each row in the table
        let df =
          foldl (lam df. lam row.
            let row = map (lam x. Some x) row in
            -- By construction, there has to be a matching row
            match dataFrameHasRowSlice eq idxs row df with Some i then
              dataFrameSetRowSlice i idxs row df
            else error "Impossible: no match in data frame"
            ) df table
        in (addi i 1, df)
      ) (0, df) tables
    with (_, df) in
    df
```
</ToggleWrapper>
</DocBlock>

