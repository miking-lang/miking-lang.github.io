import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# _testTsp  
  

Problem\-specific definitions.

  
  
  
## Syntaxes  
  

          <DocBlock title="Assignment" kind="syn">

```mc
syn Assignment
```



<ToggleWrapper text="Code..">
```mc
syn Assignment =
  | TspTour {tour : [TspEdge]}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Cost" kind="syn">

```mc
syn Cost
```



<ToggleWrapper text="Code..">
```mc
syn Cost =
  | TspCost {cost : Int}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="neighbourhood" kind="sem">

```mc
sem neighbourhood : LocalSearchBase_SearchState -> Iterator [LocalSearchBase_Assignment] LocalSearchBase_Assignment
```



<ToggleWrapper text="Code..">
```mc
sem neighbourhood =
  | searchState ->
    let ns: [Assignment] =
      let searchState : SearchState = searchState in
      match searchState with {cur = {assignment = TspTour {tour = tour}}} then
        map (lam tour. TspTour {tour = tour})
            (_tspNeighbours _tspGraph tour)
      else never
    in
    iteratorFromSeq ns
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compare" kind="sem">

```mc
sem compare : _a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem compare =
  | (TspCost {cost = v1}, TspCost {cost = v2}) ->
    subi v1 v2
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="debugSearch" kind="sem">

```mc
sem debugSearch : LocalSearchBase_SearchState -> ()
```



<ToggleWrapper text="Code..">
```mc
sem debugSearch =
  | searchState ->
    let searchState : SearchState = searchState in
    match searchState with {iter = iter, inc = {cost = TspCost {cost = cost}}}
    then
      printLn (join ["Iter: ", int2string iter, "\n",
                     "Best cost: ", int2string cost])
    else never
```
</ToggleWrapper>
</DocBlock>

