import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintLTPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPConstraint" kind="sem">

```mc
sem pprintCOPConstraint : PprintEnv -> COPConstraintDeclAst_COPConstraint -> (PprintEnv, Option String, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPConstraint env =
  | COPConstraintLT { lhs = lhs, rhs = rhs } ->
    match pprintCOPExpr env lhs with (env, lhs) in
    match pprintCOPExpr env rhs with (env, rhs) in
    ( env, None (), join [lhs, " < ", rhs] )
```
</ToggleWrapper>
</DocBlock>

