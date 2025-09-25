import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchTabuSearch  
  

Tabu search

  
  
  
## Syntaxes  
  

          <DocBlock title="TabuSet" kind="syn">

```mc
syn TabuSet
```



<ToggleWrapper text="Code..">
```mc
syn TabuSet =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MetaState" kind="syn">

```mc
syn MetaState
```



<ToggleWrapper text="Code..">
```mc
syn MetaState =
  | TabuSearch {tabu : TabuSet}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isTabu" kind="sem">

```mc
sem isTabu : (LocalSearchBase_Assignment, LocalSearchTabuSearch_TabuSet) -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isTabu : (Assignment, TabuSet) -> Bool
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tabuUpdate" kind="sem">

```mc
sem tabuUpdate : (LocalSearchBase_Assignment, LocalSearchTabuSearch_TabuSet) -> LocalSearchTabuSearch_TabuSet
```

<Description>{`Update the tabu set`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tabuUpdate : (Assignment, TabuSet) -> TabuSet
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
  | TabuSearch ({tabu = tabu} & t) ->
    let nonTabus =
      iteratorFilter (lam n. not (isTabu (n, tabu))) (neighbourhood searchState)
    in
    match select nonTabus searchState with Some choice then
      let choice : Solution = choice in
      (Some choice, TabuSearch {t with tabu = tabuUpdate (choice.assignment, tabu)})
    else
      (None (), TabuSearch t)
```
</ToggleWrapper>
</DocBlock>

