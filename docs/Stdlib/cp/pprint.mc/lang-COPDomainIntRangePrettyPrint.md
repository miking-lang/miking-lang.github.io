import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPDomainIntRangePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPDomain" kind="sem">

```mc
sem pprintCOPDomain : PprintEnv -> COPAst_COPDomain -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDomain env =
  | COPDomainIntRange {min = min, max = max} ->
    match pprintCOPExpr env min with (env, min) in
    match pprintCOPExpr env max with (env, max) in
    (env, join [min, "..", max])
```
</ToggleWrapper>
</DocBlock>

