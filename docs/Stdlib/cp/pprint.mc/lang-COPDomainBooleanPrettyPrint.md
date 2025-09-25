import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPDomainBooleanPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPDomain" kind="sem">

```mc
sem pprintCOPDomain : PprintEnv -> COPAst_COPDomain -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDomain env =
  | COPDomainBoolean {} -> (env, "bool")
```
</ToggleWrapper>
</DocBlock>

