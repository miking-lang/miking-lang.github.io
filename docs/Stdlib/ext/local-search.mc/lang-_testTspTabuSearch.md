import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# _testTspTabuSearch  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="TabuSet" kind="syn">

```mc
syn TabuSet
```



<ToggleWrapper text="Code..">
```mc
syn TabuSet =
  | TabuList {list : [[TspEdge]]}
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
sem isTabu =
  | (TspTour {tour = tour}, TabuList {list = list}) ->
    any (_toursEq tour) list
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tabuUpdate" kind="sem">

```mc
sem tabuUpdate : (LocalSearchBase_Assignment, LocalSearchTabuSearch_TabuSet) -> LocalSearchTabuSearch_TabuSet
```



<ToggleWrapper text="Code..">
```mc
sem tabuUpdate =
  | (TspTour {tour = tour}, TabuList {list = list}) ->
    TabuList {list = cons tour list}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="debugMeta" kind="sem">

```mc
sem debugMeta : LocalSearchBase_MetaState -> ()
```



<ToggleWrapper text="Code..">
```mc
sem debugMeta =
  | TabuSearch {tabu = TabuList {list = list}} ->
    print (join ["Tabu length: ", int2string (length list), "\n"])
```
</ToggleWrapper>
</DocBlock>

