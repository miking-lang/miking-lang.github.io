import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchSelectFirstImproving  
  

Select the first improving neighbour.

  
  
  
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
    match searchState with {cur = cur, cost = cost, cmp = cmp, inc = inc} then
      let cur : Solution = cur in
      let curCost = cur.cost in
      recursive let firstImproving = lam as.
        match iteratorNext as with (as, Some a) then
          let acost = cost (Some searchState.inc) a in
          if lti (cmp acost curCost) 0 then
            Some {assignment = a, cost = acost}
          else firstImproving as
        else None ()
      in
      firstImproving assignments
    else never
```
</ToggleWrapper>
</DocBlock>

