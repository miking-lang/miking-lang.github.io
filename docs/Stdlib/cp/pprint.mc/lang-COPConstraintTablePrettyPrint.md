import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintTablePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPConstraint" kind="sem">

```mc
sem pprintCOPConstraint : PprintEnv -> COPConstraintDeclAst_COPConstraint -> (PprintEnv, Option String, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPConstraint env =
  | COPConstraintTable { vars = vars, tuples = tuples } ->
    match pprintCOPExpr env vars with (env, vars) in
    match pprintCOPExpr env tuples with (env, tuples) in
    ( env, Some "table.mzn", join ["table(", vars, ",", tuples, ")"] )
```
</ToggleWrapper>
</DocBlock>

