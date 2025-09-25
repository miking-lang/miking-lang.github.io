import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TuneStats  
  

  
  
  
## Semantics  
  

          <DocBlock title="tuneStatsMeasPoints" kind="sem">

```mc
sem tuneStatsMeasPoints : DependencyGraph -> SearchSpaceSize -> PprintEnv -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tuneStatsMeasPoints graph searchSpace =
  | env ->
    use MeasPointCSV in
    let idNameContext: [(Int,Name,[Name])] =
      mapFoldWithKey (lam acc. lam name: Name. lam tree: PTree NameInfo.
        let binds: [(Int,[NameInfo])] = prefixTreeBindings tree in
        let res = foldl (lam acc. lam b: (Int,[NameInfo]).
            if setMem b.0 graph.alive then
              cons (b.0, name, map nameInfoGetName b.1) acc
            else acc
          ) [] binds
        in
        concat acc res
      ) [] graph.measuringPoints
    in
    let idStrContext: [(Int,String,[String])] = map (lam t: (Int,Name,[Name]).
        match t with (id, name, context) in
        let getStr = lam n.
          optionGetOrElse (lam. error (concat "unknown name: " (nameGetStr n)))
            (pprintEnvLookup n env)
        in
        let str = getStr name in
        let context = map getStr context in
        (id, str, context)
      ) idNameContext
    in
    let ids = map (lam t: (Int,String,[String]). t.0) idStrContext in
    let idents = map (lam t: (Int,String,[String]). t.1) idStrContext in
    let contexts = map (lam t: (Int,String,[String]). t.2) idStrContext in
    let deps = map (lam id. graphNeighbors id graph.graph) ids in
    let sizes = map (lam id. mapFindExn id searchSpace.measuringPoints) ids in
    let ccs =
      let findCC = lam id.
        match
          foldl (lam acc. lam c: ([Int],Float).
              match acc with (Some _, _) then acc
              else
                match acc with (_, i) in
                match find (eqi id) c.0 with Some _ then (Some i, i)
                else (None (), addi i 1)
            ) (None (), 0) searchSpace.connectedComponents
        with (Some i, _) then i
        else error "impossible"
      in
      map findCC ids
    in
    recursive let mkRow =
      lam acc. lam ids. lam idents. lam contexts. lam deps. lam sizes. lam ccs.
      match ids with [] then acc
      else
        let acc = cons (MeasPoint {id = head ids,
                                   ident = head idents,
                                   context = head contexts,
                                   deps = head deps,
                                   searchSpace = head sizes,
                                   cc = head ccs}) acc in
        mkRow acc (tail ids) (tail idents) (tail contexts) (tail deps)
              (tail sizes) (tail ccs)
    in
    let rows = mkRow [] ids idents contexts deps sizes ccs in
    -- Sort the rows according to id
    let rows = sort (lam h1: CSVRow. lam h2: CSVRow.
        match (h1, h2) with (MeasPoint {id = id1}, MeasPoint {id = id2}) in
        subi id1 id2
      ) rows
    in
    csvWrite "," rows
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneStatsHoles" kind="sem">

```mc
sem tuneStatsHoles : DependencyGraph -> SearchSpaceSize -> TuneOptions -> CallCtxEnv -> PprintEnv -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tuneStatsHoles graph searchSpace options callCtx =
  | env ->
    use HoleCSV in
    let idNameContext: [(Int,Name,[Name])] =
      mapFoldWithKey (lam acc. lam name: NameInfo. lam tree: PTree NameInfo.
        let binds: [(Int,[NameInfo])] = prefixTreeBindings tree in
        concat acc
        (map (lam b: (Int,[NameInfo]).
            (b.0, nameInfoGetName name, map nameInfoGetName b.1)
          ) binds)
      ) [] callCtx.contexts
    in
    utest length idNameContext with length callCtx.idx2hole in
    let idStrContext: [(Int,String,[String])] = map (lam t: (Int,Name,[Name]).
        match t with (id, name, context) in
        let getStr = lam n.
          optionGetOrElse (lam. error (concat "unknown name: " (nameGetStr n)))
            (pprintEnvLookup n env)
        in
        let str = getStr name in
        let context = map getStr context in
        (id, str, context)
      ) idNameContext
    in
    let ids = map (lam t: (Int,String,[String]). t.0) idStrContext in
    let idents = map (lam t: (Int,String,[String]). t.1) idStrContext in
    let contexts = map (lam t: (Int,String,[String]). t.2) idStrContext in
    let deps = map (lam id.
        if graphHasVertex id graph.graph then
          graphNeighbors id graph.graph
        else []
      ) ids
    in
    let sizes = map (lam id.
        domainSize options.stepSize (get callCtx.idx2hole id)
      ) ids
    in
    let ccs =
      let findCC = lam id.
        match
          foldl (lam acc. lam c: ([Int],Float).
              match acc with (Some _, _) then acc
              else
                match acc with (_, i) in
                match find (eqi id) c.0 with Some _ then (Some i, i)
                else (None (), addi i 1)
            ) (None (), 0) searchSpace.connectedComponents
        with (Some i, _) then i
        else negi 1
      in
      map findCC ids
    in
    recursive let mkRow =
      lam acc. lam ids. lam idents. lam contexts. lam deps. lam sizes. lam ccs.
      match ids with [] then acc
      else
        let acc = cons (Hole {id = head ids,
                              ident = head idents,
                              context = head contexts,
                              deps = head deps,
                              domainSize = head sizes,
                              cc = head ccs}) acc in
        mkRow acc (tail ids) (tail idents) (tail contexts) (tail deps)
              (tail sizes) (tail ccs)
    in
    let rows = mkRow [] ids idents contexts deps sizes ccs in
    -- Sort the rows according to id
    let rows = sort (lam h1: CSVRow. lam h2: CSVRow.
        match (h1, h2) with (Hole {id = id1}, Hole {id = id2}) in
        subi id1 id2
      ) rows
    in
    csvWrite "," rows
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneStatsCC" kind="sem">

```mc
sem tuneStatsCC : SearchSpaceSize -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tuneStatsCC =
  | ss ->
    use ConnectedComponentCSV in
    let idIdsSize: [(Int,[Int],Float)] = mapi (lam i: Int. lam t:([Int],Float).
        match t with (ids, size) in
        (i,ids,size)
      ) ss.connectedComponents
    in
    let rows = map (lam t: (Int,[Int],Float).
        CC {id=t.0, deps=t.1, size=t.2}
      ) idIdsSize
    in
    csvWrite "," rows
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneStatsSize" kind="sem">

```mc
sem tuneStatsSize : SearchSpaceSize -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tuneStatsSize =
  | ss ->
    use SizeCSV in
    let rows = [Size {total = ss.sizeTotal, reduced = ss.sizeReduced}] in
    csvWrite "," rows
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneStats" kind="sem">

```mc
sem tuneStats : TuneOptions -> DependencyGraph -> SearchSpaceSize -> CallCtxEnv -> Ast_Expr -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tuneStats options graph searchSpace env =
  | ast ->
    -- Populate the pretty print environment
    match pprintCode 0 pprintEnvEmpty ast with (pprintEnv, _) in
    let measPoints: String = tuneStatsMeasPoints graph searchSpace pprintEnv in
    let holes: String = tuneStatsHoles graph searchSpace options env pprintEnv in
    let ccs: String = tuneStatsCC searchSpace in
    let size: String = tuneStatsSize searchSpace in
    strJoin "\n" [measPoints, holes, ccs, size]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tuneStatsTime" kind="sem">

```mc
sem tuneStatsTime : [(Int, Int, Float)] -> String
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tuneStatsTime =
  | res ->
    use RunCSV in
    let rows = map (lam t: (Int,Int,Float).
        Run {id= t.0, nbrRuns= t.1, time= t.2}
      ) res
    in
    csvWrite "," rows
```
</ToggleWrapper>
</DocBlock>

