import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SetCFA  
  

Abstract values representing sets/collections.

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  | AVSet { names: Set IName }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =

  -- [{names}] ∈ lhs ⇒ ∀n ∈ names: {n} ⊆ rhs
  | CstrSet {lhs : IName, rhs : IName}

  -- [{names}] ∈ lhs ⇒ [{names} ∪ {rhs}] ⊆ res
  | CstrSetUnion {lhs : IName, rhs : IName, res : IName}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpAbsValH" kind="sem">

```mc
sem cmpAbsValH : (CFABase_AbsVal, CFABase_AbsVal) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpAbsValH =
  | (AVSet { names = lhs }, AVSet { names = rhs }) -> setCmp lhs rhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absValToString" kind="sem">

```mc
sem absValToString : Index_IndexMap -> PprintEnv -> CFABase_AbsVal -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem absValToString im (env: PprintEnv) =
  | AVSet { names = names } ->
    match mapAccumL (pprintVarIName im) env (setToSeq names)
    with (env,names) in
    let names = strJoin ", " names in
    (env, join ["[{", names, "}]"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConstraintH" kind="sem">

```mc
sem cmpConstraintH : (CFABase_Constraint, CFABase_Constraint) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstraintH =
  | (CstrSet { lhs = lhs1, rhs = rhs1 },
     CstrSet { lhs = lhs2, rhs = rhs2 }) ->
     let d = subi lhs1 lhs2 in
     if eqi d 0 then subi rhs1 rhs2
     else d
  | (CstrSetUnion { lhs = lhs1, rhs = rhs1, res = res1 },
     CstrSetUnion { lhs = lhs2, rhs = rhs2, res = res2 }) ->
     let d = subi res1 res2 in
     if eqi d 0 then
       let d = subi lhs1 lhs2 in
       if eqi d 0 then subi rhs1 rhs2
       else d
     else d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraint" kind="sem">

```mc
sem initConstraint : CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem initConstraint (graph: CFAGraph) =
  | CstrSet r & cstr -> initConstraintName r.lhs graph cstr
  | CstrSetUnion r & cstr -> initConstraintName r.lhs graph cstr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constraintToString" kind="sem">

```mc
sem constraintToString : Index_IndexMap -> PprintEnv -> CFABase_Constraint -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem constraintToString im (env: PprintEnv) =
  | CstrSet { lhs = lhs, rhs = rhs } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    (env, join [ "[{names}] ∈ ", lhs, " ⇒ ∀n ∈ names: {n} ⊆ ", rhs ])
  | CstrSetUnion { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [
        "[{names}] ∈ ", lhs, " ⇒ [{names} ∪ { ", rhs," }] ⊆ ", res
      ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, CFABase_AbsVal) -> CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint (update: (IName,AbsVal)) (graph: CFAGraph) =
  | CstrSet { lhs = lhs, rhs = rhs } ->
    match update.1 with AVSet { names = names } then
      setFold (lam graph. lam name.
          initConstraint graph (CstrDirect {lhs = name, rhs = rhs})
        ) graph names
    else graph
  | CstrSetUnion { lhs = lhs, rhs = rhs, res = res } ->
    match update.1 with AVSet { names = names } then
      addData graph (AVSet {names = setInsert rhs names}) res
    else graph
```
</ToggleWrapper>
</DocBlock>

