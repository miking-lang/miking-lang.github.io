import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# _testTspSimulatedAnnealing  
  

  
  
  
## Semantics  
  

          <DocBlock title="decay" kind="sem">

```mc
sem decay : LocalSearchBase_SearchState -> LocalSearchBase_MetaState -> LocalSearchBase_MetaState
```



<ToggleWrapper text="Code..">
```mc
sem decay (searchState : SearchState) =
  | SimulatedAnnealing ({temp = temp} & t) ->
    SimulatedAnnealing {t with temp = mulf 0.95 temp}
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
  | SimulatedAnnealing {temp = temp} ->
    print (join ["Temperature: ", float2string temp, "\n"])
```
</ToggleWrapper>
</DocBlock>

