import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LocalSearchSelectRandomBest  
  

Select a random best neighbour.

  
  
  
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
    match searchState with {cost = cost, cmp = cmp, inc = inc} then
      let assignments = iteratorToSeq assignments in
      match assignments with [] then None () else

      -- Find minimum and filter out other elements in one pass.
      recursive let filterMin : all a. a -> [a] -> (a -> a -> Int) -> [a] -> [a] =
        lam e. lam acc. lam cmp. lam xs.
        match xs with [] then acc
        else match xs with [x] ++ xs then
          let v = cmp e x in
          match v with 0 then
            filterMin e (cons x acc) cmp xs
          else if lti v 0 then
            filterMin e acc cmp xs
          else
            filterMin x [x] cmp xs
        else never
      in
      utest filterMin 1000 [] subi [42,1,1,3] with [1,1] in

      let sols = map (lam a. {assignment = a, cost = cost (Some searchState.inc) a}) assignments in
      let s = head sols in
      let minSols =
        filterMin s [s] (lam s1 : Solution. lam s2 : Solution.
                           cmp s1.cost s2.cost) sols in
      randElem minSols
    else never
```
</ToggleWrapper>
</DocBlock>

