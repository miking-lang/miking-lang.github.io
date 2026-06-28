import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPExprVarAccessPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPExpr" kind="sem">

```mc
sem pprintCOPExpr : PprintEnv -> COPAst_COPExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPExpr env =
  | COPExprVarAccess { id = id, index = index } ->
    match pprintVarName env id with (env, id) in
    match pprintCOPExpr env index with (env, index) in
    (env, join [id, "[", index, "]"])
```
</ToggleWrapper>
</DocBlock>

