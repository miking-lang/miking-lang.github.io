import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintTableReifPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPConstraint" kind="sem">

```mc
sem pprintCOPConstraint : PprintEnv -> COPConstraintDeclAst_COPConstraint -> (PprintEnv, Option String, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPConstraint env =
  | COPConstraintTableReif { vars = vars, tuples = tuples, b = b } ->
    match pprintCOPExpr env vars with (env, vars) in
    match pprintCOPExpr env tuples with (env, tuples) in
    match pprintCOPExpr env b with (env, b) in
    ( env, Some "table.mzn", join ["table(", vars, ",", tuples, ") <-> ", b] )
```
</ToggleWrapper>
</DocBlock>

