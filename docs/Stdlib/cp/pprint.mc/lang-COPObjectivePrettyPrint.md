import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPObjectivePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPObjectiveH" kind="sem">

```mc
sem pprintCOPObjectiveH : PprintEnv -> COPAst_COPObjective -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPObjectiveH: PprintEnv -> COPObjective -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCOPObjective" kind="sem">

```mc
sem pprintCOPObjective : PprintEnv -> COPAst_COPObjective -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPObjective env =
  | obj ->
    match pprintCOPObjectiveH env obj with (env, obj) in
    (env, join ["solve ", obj, ";"])
```
</ToggleWrapper>
</DocBlock>

