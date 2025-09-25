import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BaseConstraint  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  -- {lhs} ⊆ rhs
  | CstrInit { lhs: AbsVal, rhs: IName }
  -- lhs ⊆ rhs
  | CstrDirect { lhs: IName, rhs: IName }
  -- {lhsav} ⊆ lhs ⇒ {rhsav} ⊆ rhs
  | CstrDirectAv { lhs: IName, lhsav: AbsVal, rhs: IName, rhsav: AbsVal }
  -- {lhsav} ⊆ lhs ⇒ [rhs]
  | CstrDirectAvCstrs { lhs: IName, lhsav: AbsVal, rhs: [Constraint] }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpConstraintH" kind="sem">

```mc
sem cmpConstraintH : (CFABase_Constraint, CFABase_Constraint) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstraintH =
  | (CstrInit { lhs = lhs1, rhs = rhs1 },
     CstrInit { lhs = lhs2, rhs = rhs2 }) ->
     let d = cmpAbsVal lhs1 lhs2 in
     if eqi d 0 then subi rhs1 rhs2
     else d
  | (CstrDirect { lhs = lhs1, rhs = rhs1 },
     CstrDirect { lhs = lhs2, rhs = rhs2 }) ->
     let d = subi lhs1 lhs2 in
     if eqi d 0 then subi rhs1 rhs2
     else d
  | (CstrDirectAv t1, CstrDirectAv t2) ->
     let d = subi t1.lhs t2.lhs in
     if eqi d 0 then
       let d = subi t1.rhs t2.rhs in
       if eqi d 0 then
         let d = cmpAbsVal t1.lhsav t2.lhsav in
         if eqi d 0 then cmpAbsVal t1.rhsav t2.rhsav
         else d
       else d
     else d
  | (CstrDirectAvCstrs t1, CstrDirectAvCstrs t2) ->
     let d = subi t1.lhs t2.lhs in
     if eqi d 0 then
       let d = cmpAbsVal t1.lhsav t2.lhsav in
       if eqi d 0 then seqCmp cmpConstraint t1.rhs t2.rhs
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
  | CstrInit r -> addData graph r.lhs r.rhs
  | CstrDirect r & cstr -> initConstraintName r.lhs graph cstr
  | CstrDirectAv r & cstr -> initConstraintName r.lhs graph cstr
  | CstrDirectAvCstrs r & cstr -> initConstraintName r.lhs graph cstr
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
  | CstrInit { lhs = lhs, rhs = rhs } ->
    match absValToString im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    (env, join ["{", lhs, "}", " ⊆ ", rhs])
  | CstrDirect { lhs = lhs, rhs = rhs } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    (env, join [lhs, " ⊆ ", rhs])
  | CstrDirectAv { lhs = lhs, lhsav = lhsav, rhs = rhs, rhsav = rhsav } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match absValToString im env lhsav with (env,lhsav) in
    match pprintVarIName im env rhs with (env,rhs) in
    match absValToString im env rhsav with (env,rhsav) in
    (env, join ["{", lhsav ,"} ⊆ ", lhs, " ⇒ {", rhsav ,"} ⊆ ", rhs])
  | CstrDirectAvCstrs { lhs = lhs, lhsav = lhsav, rhs = rhs } ->
    match mapAccumL (constraintToString im) env rhs with (env,rhs) in
    let rhs = strJoin " AND " rhs in
    match pprintVarIName im env lhs with (env,lhs) in
    match absValToString im env lhsav with (env,lhsav) in
    (env, join [ "{", lhsav, "} ⊆ ", lhs, " ⇒ (", rhs, ")" ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isDirect" kind="sem">

```mc
sem isDirect : CFABase_AbsVal -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isDirect =
  | _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="directTransition" kind="sem">

```mc
sem directTransition : CFA_CFAGraph -> IName -> CFABase_AbsVal -> CFABase_AbsVal
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem directTransition (graph: CFAGraph) (rhs: IName) =
  | av -> av
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
  | CstrDirect r -> propagateDirectConstraint r.rhs graph update.1
  | CstrDirectAv r ->
    if eqAbsVal update.1 r.lhsav then
      addData graph r.rhsav r.rhs
    else graph
  | CstrDirectAvCstrs r & cstr ->
    if eqAbsVal update.1 r.lhsav then
      foldl initConstraint graph r.rhs
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateDirectConstraint" kind="sem">

```mc
sem propagateDirectConstraint : IName -> CFA_CFAGraph -> CFABase_AbsVal -> CFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem propagateDirectConstraint (rhs: IName) (graph: CFAGraph) =
  | av ->
    if isDirect av then
      addData graph (directTransition graph rhs av) rhs
    else graph
```
</ToggleWrapper>
</DocBlock>

