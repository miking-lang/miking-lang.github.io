import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPExprVarPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPExpr" kind="sem">

```mc
sem pprintCOPExpr : PprintEnv -> COPAst_COPExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPExpr env =
  | COPExprVar { id = id } -> pprintVarName env id
```
</ToggleWrapper>
</DocBlock>

