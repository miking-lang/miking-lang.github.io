import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPPrettyPrintBase  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintCOPModel" kind="sem">

```mc
sem pprintCOPModel : COPAst_COPModel -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintCOPModel =
  | {decls = decls, objective = objective} ->
    match mapAccumL (lam env. lam d. pprintCOPDecl env d) pprintEnvEmpty decls
    with (env, decls) in
    match pprintCOPObjective env objective
    with (env, objective) in
    (env, strJoin "\n" (snoc decls objective))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCOPDecl" kind="sem">

```mc
sem pprintCOPDecl : PprintEnv -> COPAst_COPDecl -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDecl: PprintEnv -> COPDecl -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCOPDomain" kind="sem">

```mc
sem pprintCOPDomain : PprintEnv -> COPAst_COPDomain -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPDomain: PprintEnv -> COPDomain -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCOPExpr" kind="sem">

```mc
sem pprintCOPExpr : PprintEnv -> COPAst_COPExpr -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPExpr: PprintEnv -> COPExpr -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintCOPObjective" kind="sem">

```mc
sem pprintCOPObjective : PprintEnv -> COPAst_COPObjective -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem pprintCOPObjective: PprintEnv -> COPObjective -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintVarName" kind="sem">

```mc
sem pprintVarName : PprintEnv -> Name -> (PprintEnv, String)
```

<Description>{`NOTE\(Linnea, 2023\-02\-08\): Assumes that the base string of the name is a  
valid MiniZinc identifier \(not a MiniZinc keyword, etc.\).No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintVarName env =
  | name ->
    pprintEnvGetStr env name
```
</ToggleWrapper>
</DocBlock>

