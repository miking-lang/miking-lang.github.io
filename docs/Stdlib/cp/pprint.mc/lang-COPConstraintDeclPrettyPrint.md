import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintDeclPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPConstraint" kind="sem">

```mc
sem pprintCOPConstraint : PprintEnv -> COPConstraintDeclAst_COPConstraint -> (PprintEnv, Option String, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPConstraint: PprintEnv -> COPConstraint ->
                           (PprintEnv, Option String, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCOPDecl" kind="sem">

```mc
sem pprintCOPDecl : PprintEnv -> COPAst_COPDecl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDecl env =
  | COPConstraintDecl { constraint = constraint } ->
    match pprintCOPConstraint env constraint with (env, incl, str) in
    ( env, join [optionMapOr "" (lam i. join ["include \"", i, "\";\n"]) incl,
                 "constraint ", str, ";"])
```
</ToggleWrapper>
</DocBlock>

