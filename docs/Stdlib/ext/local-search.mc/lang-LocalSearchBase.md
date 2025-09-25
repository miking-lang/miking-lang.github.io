import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchBase  
  

  
  
  
## Types  
  

          <DocBlock title="Solution" kind="type">

```mc
type Solution : { assignment: Assignment, cost: Cost }
```

<Description>{`A local search solution: an assignment with a cost.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Solution = {assignment : Assignment, cost : Cost}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SearchState" kind="type">

```mc
type SearchState : { cur: Solution, inc: Solution, iter: Int, stuck: Bool, cost: Option Solution -> Assignment -> Cost, cmp: Cost -> Cost -> Int, data: Option LSData }
```

<Description>{`Search state`}</Description>


<ToggleWrapper text="Code..">
```mc
type SearchState = {
    cur : Solution,                               -- current solution
    inc : Solution,                               -- incumbent (best solution thus far)
    iter : Int,                                   -- number of iterations thus far
    stuck : Bool,                                 -- whether the search is stuck
    -- (no local moves possible)
    cost : Option Solution -> Assignment -> Cost, -- cost of an assignment
    cmp : Cost -> Cost -> Int,                    -- comparison of costs
    data : Option LSData                          -- any custom data
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="MetaState" kind="syn">

```mc
syn MetaState
```

<Description>{`Maintains meta\-information between search iterations.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn MetaState =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Assignment" kind="syn">

```mc
syn Assignment
```

<Description>{`An assignment of variables to values.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Assignment =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Cost" kind="syn">

```mc
syn Cost
```

<Description>{`Cost of an assignment.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Cost =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LSData" kind="syn">

```mc
syn LSData
```

<Description>{`Custom data to carry around in the search state`}</Description>


<ToggleWrapper text="Code..">
```mc
syn LSData =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="initSearchState" kind="sem">

```mc
sem initSearchState : all a. all a1. (Option LocalSearchBase_Solution -> LocalSearchBase_Assignment -> LocalSearchBase_Cost) -> (LocalSearchBase_Cost -> LocalSearchBase_Cost -> Int) -> a -> {cmp: LocalSearchBase_Cost -> LocalSearchBase_Cost -> Int, cur: a, inc: a, cost: Option LocalSearchBase_Solution -> LocalSearchBase_Assignment -> LocalSearchBase_Cost, data: Option a1, iter: Int, stuck: Bool}
```

<Description>{`Initialize the search state from an initial solution.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initSearchState (cost : Option Solution -> Assignment -> Cost)
                      (cmp : Cost -> Cost -> Int) =
  | sol ->
    { cur = sol, inc = sol, iter = 0, stuck = false, cost = cost, cmp = cmp,
      data = None () }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initSearchStateData" kind="sem">

```mc
sem initSearchStateData : all a. (Option LocalSearchBase_Solution -> LocalSearchBase_Assignment -> LocalSearchBase_Cost) -> (LocalSearchBase_Cost -> LocalSearchBase_Cost -> Int) -> LocalSearchBase_LSData -> a -> {cmp: LocalSearchBase_Cost -> LocalSearchBase_Cost -> Int, cur: a, inc: a, cost: Option LocalSearchBase_Solution -> LocalSearchBase_Assignment -> LocalSearchBase_Cost, data: Option LocalSearchBase_LSData, iter: Int, stuck: Bool}
```

<Description>{`Initialize the search state from data and solution.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem initSearchStateData (cost : Option Solution -> Assignment -> Cost)
                          (cmp : Cost -> Cost -> Int) (data : LSData) =
  | sol ->
    { cur = sol, inc = sol, iter = 0, stuck = false, cost = cost, cmp = cmp,
      data = Some data }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="neighbourhood" kind="sem">

```mc
sem neighbourhood : LocalSearchBase_SearchState -> Iterator [LocalSearchBase_Assignment] LocalSearchBase_Assignment
```

<Description>{`The neighbouring assignments from a search state.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem neighbourhood : SearchState -> Iterator [Assignment] Assignment
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="select" kind="sem">

```mc
sem select : Iterator [LocalSearchBase_Assignment] LocalSearchBase_Assignment -> LocalSearchBase_SearchState -> Option LocalSearchBase_Solution
```

<Description>{`Select a solution among the neighbours.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem select : Iterator [Assignment] Assignment -> SearchState -> Option Solution
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="step" kind="sem">

```mc
sem step : LocalSearchBase_SearchState -> LocalSearchBase_MetaState -> (Option LocalSearchBase_Solution, LocalSearchBase_MetaState)
```

<Description>{`Take one step, return both the next solution \(if there is one\), and the  
resulting meta state.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem step : SearchState -> MetaState -> (Option Solution, MetaState)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="minimize" kind="sem">

```mc
sem minimize : LocalSearchBase_SearchState -> LocalSearchBase_MetaState -> (LocalSearchBase_SearchState, LocalSearchBase_MetaState)
```

<Description>{`Take one step and update search state accordingly, return both the  
resulting search state and meta state.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem minimize (searchState : SearchState) =
  | metaState ->
    match searchState with {stuck = true} then
      (searchState, metaState)
    else match searchState with {inc = inc, cmp = cmp} in
    let searchState = {searchState with iter = addi searchState.iter 1} in
    let next = step searchState metaState in
    match next with (None (), _) then
      ({searchState with stuck = true}, metaState)
    else match next with (Some cur, metaState) in
      let cur : Solution = cur in
      let inc : Solution = inc in
      let inc = if lti (cmp cur.cost inc.cost) 0 then cur else inc in
      let searchState = {{searchState with cur = cur} with inc = inc} in
      (searchState, metaState)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="debugMeta" kind="sem">

```mc
sem debugMeta : LocalSearchBase_MetaState -> ()
```

<Description>{`Debug a meta state.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem debugMeta =
  | meta -> ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="debugSearch" kind="sem">

```mc
sem debugSearch : LocalSearchBase_SearchState -> ()
```

<Description>{`Debug a search state.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem debugSearch : SearchState -> ()
```
</ToggleWrapper>
</DocBlock>

