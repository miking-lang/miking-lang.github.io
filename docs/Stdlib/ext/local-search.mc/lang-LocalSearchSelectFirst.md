import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchSelectFirst  
  

  
  
  
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
      match iteratorNext assignments with (_, Some a) then
        Some {assignment = a, cost = cost (Some searchState.inc) a}
      else None ()
    else never
```
</ToggleWrapper>
</DocBlock>

