import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPObjectiveSatisfyPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPObjectiveH" kind="sem">

```mc
sem pprintCOPObjectiveH : PprintEnv -> COPAst_COPObjective -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPObjectiveH env =
  | COPSatisfy {} -> (env, "satisfy")
```
</ToggleWrapper>
</DocBlock>

