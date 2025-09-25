import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefOpCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  -- Abstract representation of references
  | AVRef { contents: IName }
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
  -- ref(name) ∈ lhs ⇒ {name} ⊆ rhs
  | CstrRef {lhs : IName, rhs : IName}
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
  | (AVRef { contents = ilhs }, AVRef { contents = irhs }) -> subi ilhs irhs
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
  | AVRef { contents = contents } ->
    match pprintVarIName im env contents with (env,contents) in
    (env, join ["ref(", contents, ")"])
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
  | (CstrRef { lhs = lhs1, rhs = rhs1 },
     CstrRef { lhs = lhs2, rhs = rhs2 }) ->
     let d = subi lhs1 lhs2 in
     if eqi d 0 then subi rhs1 rhs2
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
  | CstrRef r & cstr -> initConstraintName r.lhs graph cstr
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
  | CstrRef { lhs = lhs, rhs = rhs } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    (env, join [ "ref(name) ∈ ", lhs, " ⇒ {name} ⊆ ", rhs ])
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
  | CstrRef { lhs = lhs, rhs = rhs } ->
    match update.1 with AVRef { contents = contents } then
      initConstraint graph (CstrDirect {lhs = contents, rhs = rhs})
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | (CRef _ | CDeRef _) & const ->
    addNewConst graph ident const
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraintConst" kind="sem">

```mc
sem propagateConstraintConst : CFA_ConstPropFun
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraintConst res args intermediates =
  | CRef _ ->
    utest length args with 1 in
    [CstrInit {lhs = AVRef { contents = head args }, rhs = res}]
  | CDeRef _ ->
    utest length args with 1 in
    [CstrRef {lhs = head args, rhs = res}]
```
</ToggleWrapper>
</DocBlock>

