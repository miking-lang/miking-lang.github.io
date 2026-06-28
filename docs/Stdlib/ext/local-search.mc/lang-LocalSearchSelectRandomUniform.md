import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchSelectRandomUniform  
  

Select a solution among the neighbours uniformly at random.

  
  
  
## Semantics  
  

          <DocBlock title="select" kind="sem">

```mc
sem select : Iterator [LocalSearchBase_Assignment] LocalSearchBase_Assignment -> LocalSearchBase_SearchState -> Option LocalSearchBase_Solution
```



<ToggleWrapper text="Code..">
```mc
sem select assignments =
  | searchState ->
    let searchState : SearchState = searchState in
    match searchState with {cost = cost, inc = inc} then
      let as: [Assignment] = (iteratorToSeq assignments) in
      match randElem as with Some a then
        Some { assignment = a, cost = cost (Some searchState.inc) a }
      else
        None ()
    else never
```
</ToggleWrapper>
</DocBlock>

