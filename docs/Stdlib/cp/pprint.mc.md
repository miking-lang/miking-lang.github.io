import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# pprint.mc  
  

Pretty printing of a COP/CSP as a MiniZinc model.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/cp/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>  
  
## Languages  
  

          <DocBlock title="COPPrettyPrintBase" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPPrettyPrintBase">

```mc
lang COPPrettyPrintBase
```



<ToggleWrapper text="Code..">
```mc
lang COPPrettyPrintBase = COPAst + IdentifierPrettyPrint
  sem pprintCOPModel: COPModel -> (PprintEnv, String)
  sem pprintCOPModel =
  | {decls = decls, objective = objective} ->
    match mapAccumL (lam env. lam d. pprintCOPDecl env d) pprintEnvEmpty decls
    with (env, decls) in
    match pprintCOPObjective env objective
    with (env, objective) in
    (env, strJoin "\n" (snoc decls objective))

  sem pprintCOPDecl: PprintEnv -> COPDecl -> (PprintEnv, String)
  sem pprintCOPDomain: PprintEnv -> COPDomain -> (PprintEnv, String)
  sem pprintCOPExpr: PprintEnv -> COPExpr -> (PprintEnv, String)
  sem pprintCOPObjective: PprintEnv -> COPObjective -> (PprintEnv, String)

  -- NOTE(Linnea, 2023-02-08): Assumes that the base string of the name is a
  -- valid MiniZinc identifier (not a MiniZinc keyword, etc.).
  sem pprintVarName : PprintEnv -> Name -> (PprintEnv, String)
  sem pprintVarName env =
  | name ->
    pprintEnvGetStr env name
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPDomainIntRangePrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPDomainIntRangePrettyPrint">

```mc
lang COPDomainIntRangePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPDomainIntRangePrettyPrint = COPPrettyPrintBase + COPDomainIntRangeAst
  sem pprintCOPDomain env =
  | COPDomainIntRange {min = min, max = max} ->
    match pprintCOPExpr env min with (env, min) in
    match pprintCOPExpr env max with (env, max) in
    (env, join [min, "..", max])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPDomainBooleanPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPDomainBooleanPrettyPrint">

```mc
lang COPDomainBooleanPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPDomainBooleanPrettyPrint = COPPrettyPrintBase + COPDomainBooleanAst
  sem pprintCOPDomain env =
  | COPDomainBoolean {} -> (env, "bool")
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPVarDeclPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPVarDeclPrettyPrint">

```mc
lang COPVarDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPVarDeclPrettyPrint = COPPrettyPrintBase + COPVarDeclAst
  sem pprintCOPDecl env =
  | COPVarDecl {id = id, domain = domain } ->
    match pprintVarName env id with (env, id) in
    match pprintCOPDomain env domain with (env, domain) in
    (env, join ["var ", domain, ": ", id, ";"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPVarArrayDeclPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPVarArrayDeclPrettyPrint">

```mc
lang COPVarArrayDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPVarArrayDeclPrettyPrint = COPPrettyPrintBase + COPVarArrayDeclAst
  sem pprintCOPDecl env =
  | COPVarArrayDecl {id = id, domain = domain, length = length} ->
    match pprintVarName env id with (env, id) in
    match pprintCOPExpr env length with (env, length) in
    match pprintCOPDomain env domain with (env, domain) in
    (env, join ["array [1..", length, "] of var ", domain, ": ", id, ";"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintDeclPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPConstraintDeclPrettyPrint">

```mc
lang COPConstraintDeclPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPConstraintDeclPrettyPrint = COPPrettyPrintBase + COPConstraintDeclAst
  sem pprintCOPConstraint: PprintEnv -> COPConstraint ->
                           (PprintEnv, Option String, String)
  sem pprintCOPDecl env =
  | COPConstraintDecl { constraint = constraint } ->
    match pprintCOPConstraint env constraint with (env, incl, str) in
    ( env, join [optionMapOr "" (lam i. join ["include \"", i, "\";\n"]) incl,
                 "constraint ", str, ";"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintTablePrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPConstraintTablePrettyPrint">

```mc
lang COPConstraintTablePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPConstraintTablePrettyPrint = COPConstraintDeclPrettyPrint + COPConstraintTableAst
  sem pprintCOPConstraint env =
  | COPConstraintTable { vars = vars, tuples = tuples } ->
    match pprintCOPExpr env vars with (env, vars) in
    match pprintCOPExpr env tuples with (env, tuples) in
    ( env, Some "table.mzn", join ["table(", vars, ",", tuples, ")"] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintTableReifPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPConstraintTableReifPrettyPrint">

```mc
lang COPConstraintTableReifPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPConstraintTableReifPrettyPrint = COPConstraintDeclPrettyPrint + COPConstraintTableReifAst
  sem pprintCOPConstraint env =
  | COPConstraintTableReif { vars = vars, tuples = tuples, b = b } ->
    match pprintCOPExpr env vars with (env, vars) in
    match pprintCOPExpr env tuples with (env, tuples) in
    match pprintCOPExpr env b with (env, b) in
    ( env, Some "table.mzn", join ["table(", vars, ",", tuples, ") <-> ", b] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintLEPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPConstraintLEPrettyPrint">

```mc
lang COPConstraintLEPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPConstraintLEPrettyPrint = COPConstraintDeclPrettyPrint + COPConstraintLEAst
  sem pprintCOPConstraint env =
  | COPConstraintLE { lhs = lhs, rhs = rhs } ->
    match pprintCOPExpr env lhs with (env, lhs) in
    match pprintCOPExpr env rhs with (env, rhs) in
    ( env, None (), join [lhs, " <= ", rhs] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintLTPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPConstraintLTPrettyPrint">

```mc
lang COPConstraintLTPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPConstraintLTPrettyPrint = COPConstraintDeclPrettyPrint + COPConstraintLTAst
  sem pprintCOPConstraint env =
  | COPConstraintLT { lhs = lhs, rhs = rhs } ->
    match pprintCOPExpr env lhs with (env, lhs) in
    match pprintCOPExpr env rhs with (env, rhs) in
    ( env, None (), join [lhs, " < ", rhs] )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectivePrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPObjectivePrettyPrint">

```mc
lang COPObjectivePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectivePrettyPrint = COPPrettyPrintBase
  sem pprintCOPObjectiveH: PprintEnv -> COPObjective -> (PprintEnv, String)
  sem pprintCOPObjective env =
  | obj ->
    match pprintCOPObjectiveH env obj with (env, obj) in
    (env, join ["solve ", obj, ";"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectiveMinimizePrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPObjectiveMinimizePrettyPrint">

```mc
lang COPObjectiveMinimizePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectiveMinimizePrettyPrint = COPObjectivePrettyPrint
                                     + COPObjectiveMinimizeAst
  sem pprintCOPObjectiveH env =
  | COPMinimize { expr = expr } ->
    match pprintCOPExpr env expr with (env, expr) in
    (env, concat "minimize " expr)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectiveMaximizePrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPObjectiveMaximizePrettyPrint">

```mc
lang COPObjectiveMaximizePrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectiveMaximizePrettyPrint = COPObjectivePrettyPrint
                                     + COPObjectiveMaximizeAst
  sem pprintCOPObjectiveH env =
  | COPMaximize { expr = expr } ->
    match pprintCOPExpr env expr with (env, expr) in
    (env, concat "maximize " expr)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectiveSatisfyPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPObjectiveSatisfyPrettyPrint">

```mc
lang COPObjectiveSatisfyPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectiveSatisfyPrettyPrint = COPObjectivePrettyPrint
                                    + COPObjectiveSatisfyAst
  sem pprintCOPObjectiveH env =
  | COPSatisfy {} -> (env, "satisfy")
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprSumPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPExprSumPrettyPrint">

```mc
lang COPExprSumPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPExprSumPrettyPrint = COPPrettyPrintBase + COPExprSumAst
  sem pprintCOPExpr env =
  | COPExprSum { expr = expr } ->
    match pprintCOPExpr env expr with (env, expr) in
    (env, join ["sum(", expr, ")"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprVarPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPExprVarPrettyPrint">

```mc
lang COPExprVarPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPExprVarPrettyPrint = COPPrettyPrintBase + COPExprVarAst
  sem pprintCOPExpr env =
  | COPExprVar { id = id } -> pprintVarName env id
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprVarAccessPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPExprVarAccessPrettyPrint">

```mc
lang COPExprVarAccessPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPExprVarAccessPrettyPrint = COPPrettyPrintBase + COPExprVarAccessAst
  sem pprintCOPExpr env =
  | COPExprVarAccess { id = id, index = index } ->
    match pprintVarName env id with (env, id) in
    match pprintCOPExpr env index with (env, index) in
    (env, join [id, "[", index, "]"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprIntPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPExprIntPrettyPrint">

```mc
lang COPExprIntPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPExprIntPrettyPrint = COPPrettyPrintBase + COPExprIntAst
  sem pprintCOPExpr env =
  | COPExprInt { value = value } -> (env, int2string value)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprArrayPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPExprArrayPrettyPrint">

```mc
lang COPExprArrayPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPExprArrayPrettyPrint = COPPrettyPrintBase + COPExprArrayAst
  sem pprintCOPExpr env =
  | COPExprArray { array = array } ->
    match mapAccumL (lam env. lam e. pprintCOPExpr env e) env array
    with (env, array) in
    (env, join ["[", strJoin "," array, "]"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprArray2dPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPExprArray2dPrettyPrint">

```mc
lang COPExprArray2dPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPExprArray2dPrettyPrint = COPPrettyPrintBase + COPExprArray2dAst
  sem pprintCOPExpr env =
  | COPExprArray2d { array = array } ->
    match mapAccumL (lam env. lam inner.
        match mapAccumL (lam env. lam e. pprintCOPExpr env e) env inner
        with (env, inner) in
        (env, strJoin "," inner)
      ) env array
    with (env, array) in
    (env, join ["[|", strJoin "|" array, "|]"])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPPrettyPrint" kind="lang" link="/docs/Stdlib/cp/pprint.mc/lang-COPPrettyPrint">

```mc
lang COPPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang COPPrettyPrint =
  -- Domains --
  COPDomainIntRangePrettyPrint + COPDomainBooleanPrettyPrint +
  -- Variables --
  COPVarDeclPrettyPrint + COPVarArrayDeclPrettyPrint +
  -- Constraints --
  COPConstraintDeclPrettyPrint + COPConstraintTablePrettyPrint +
  COPConstraintTableReifPrettyPrint + COPConstraintLEPrettyPrint +
  COPConstraintLTPrettyPrint +
  -- Objectives --
  COPObjectiveMinimizePrettyPrint + COPObjectiveMaximizePrettyPrint +
  COPObjectiveSatisfyPrettyPrint +
  -- Expressions --
  COPExprSumPrettyPrint + COPExprVarPrettyPrint + COPExprVarAccessPrettyPrint +
  COPExprIntPrettyPrint + COPExprArrayPrettyPrint + COPExprArray2dPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

use COPPrettyPrint in

-- Enable debug printing
let debug = false in

let cpInt_ = lam i. COPExprInt {value = i} in

let eqTest = lam lhs: COPModel. lam rhs: String.
  match pprintCOPModel lhs with (_, lhs) in
  let lhs = strTrim lhs in
  let rhs = strTrim rhs in
  (if debug then
     printLn "\n*** LHS ***";
     printLn lhs;
     printLn "\n*** RHS ***";
     printLn rhs
   else ());
  eqString lhs rhs
in


utest
  let x = nameSym "x" in
  let y = nameSym "y" in
  {
    decls = [
      COPVarArrayDecl {
         id = x,
         domain = COPDomainIntRange {min = cpInt_ 1, max = cpInt_ 10},
         length = cpInt_ 5
       },
       COPVarDecl {id = y, domain = COPDomainBoolean {}},
       COPConstraintDecl {constraint = COPConstraintLE {
         lhs = COPExprVarAccess {id = x, index = cpInt_ 1},
         rhs = COPExprVarAccess {id = x, index = cpInt_ 2}}}],

    objective = COPMinimize {
      expr = COPExprSum {expr = COPExprArray {
      array = [COPExprVarAccess {id = x, index = cpInt_ 1},
               COPExprVarAccess {id = x, index = cpInt_ 2},
               COPExprVar {id = y}]}}}
  }
with
"
array [1..5] of var 1..10: x;
var bool: y;
constraint x[1] <= x[2];
solve minimize sum([x[1],x[2],y]);
"
using eqTest in

utest
  let x = nameSym "x" in
  let y = nameSym "y" in
  let zero = cpInt_ 0 in
  let one = cpInt_ 1 in
  {
    decls = [
      COPVarArrayDecl {
        id = x,
        domain = COPDomainIntRange {min = cpInt_ 0, max = cpInt_ 1},
        length = cpInt_ 3},
      COPVarDecl {id = y, domain = COPDomainBoolean {}},
      COPConstraintDecl {constraint = COPConstraintTable {
        vars = COPExprVar {id = x},
        tuples = COPExprArray2d {array = [[zero,zero,one],[one,zero,one],[zero,zero,zero]]}
      }},
      COPConstraintDecl {constraint = COPConstraintTableReif {
        vars = COPExprVar {id = x},
        tuples = COPExprArray2d {array = [[zero,zero,one],[one,zero,one]]},
        b = COPExprVar {id = y}
      }}],
    objective = COPMinimize {expr = COPExprSum {expr = COPExprVar {id = x}}}
  }
with
"
array [1..3] of var 0..1: x;
var bool: y;
include \"table.mzn\";
constraint table(x,[|0,0,1|1,0,1|0,0,0|]);
include \"table.mzn\";
constraint table(x,[|0,0,1|1,0,1|]) <-> y;
solve minimize sum(x);
"
using eqTest in

utest
  let x = nameSym "x" in
  {
    decls = [COPVarDecl {id = x, domain = COPDomainBoolean {}}],
    objective = COPSatisfy {}
  }
with
"
var bool: x;
solve satisfy;
"
using eqTest in

()
```
</ToggleWrapper>
</DocBlock>

