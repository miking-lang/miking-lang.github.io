import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchSimulatedAnnealing  
  

Simulated annealing

  
  
  
## Syntaxes  
  

          <DocBlock title="MetaState" kind="syn">

```mc
syn MetaState
```



<ToggleWrapper text="Code..">
```mc
syn MetaState =
  | SimulatedAnnealing {temp : Float}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="decay" kind="sem">

```mc
sem decay : LocalSearchBase_SearchState -> LocalSearchBase_MetaState -> LocalSearchBase_MetaState
```

<Description>{`Modifies the temperature in each iteration`}</Description>


<ToggleWrapper text="Code..">
```mc
sem decay : SearchState -> MetaState -> MetaState
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="step" kind="sem">

```mc
sem step : LocalSearchBase_SearchState -> LocalSearchBase_MetaState -> (Option LocalSearchBase_Solution, LocalSearchBase_MetaState)
```



<ToggleWrapper text="Code..">
```mc
sem step (searchState : SearchState) =
  | SimulatedAnnealing t ->
    let proposal = select (neighbourhood searchState) searchState in
    match proposal with None () then
      (None (), SimulatedAnnealing t)
    else match proposal with Some proposal then
      let proposal : Solution = proposal in
      let decayed = decay searchState (SimulatedAnnealing t) in
      let cur : Solution = searchState.cur in
      -- Metropolis condition
      if leqi (searchState.cmp proposal.cost cur.cost) 0 then
        -- Improving solution: accept.
        (Some proposal, decayed)
      else
        -- Worsening solution: accept with probability depending on temperature.
        let accept =
          let pAccept =
            exp (divf
              (int2float (searchState.cmp proposal.cost cur.cost)) t.temp) in
          let rnd = int2float (randIntU 0 100) in
          geqf (mulf pAccept 100.0) rnd
        in
        (Some (if accept then proposal else cur), decayed)
    else never
```
</ToggleWrapper>
</DocBlock>

