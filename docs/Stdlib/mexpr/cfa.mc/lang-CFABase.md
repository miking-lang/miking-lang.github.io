import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CFABase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="GraphData" kind="syn">

```mc
syn GraphData
```



<ToggleWrapper text="Code..">
```mc
syn GraphData =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="exprName" kind="sem">

```mc
sem exprName : Ast_Expr -> Name
```

<Description>{`For a given expression, returns the variable "labeling" that expression.  
The existence of such a label is guaranteed by ANF.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem exprName =
  | t -> errorSingle [infoTm t] "Error in exprName for CFA"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpAbsVal" kind="sem">

```mc
sem cmpAbsVal : CFABase_AbsVal -> CFABase_AbsVal -> Int
```

<Description>{`Required for the data type Set AbsValNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpAbsVal lhs =
  | rhs -> cmpAbsValH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpAbsValH" kind="sem">

```mc
sem cmpAbsValH : (CFABase_AbsVal, CFABase_AbsVal) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpAbsValH =
  | (lhs, rhs) ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      error
        "Missing case in cmpAbsValH for abstract values with same constructor."
    else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqAbsVal" kind="sem">

```mc
sem eqAbsVal : CFABase_AbsVal -> CFABase_AbsVal -> Bool
```

<Description>{`Required for the data type Set AbsVal`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eqAbsVal (lhs: AbsVal) =
  | rhs -> eqi (cmpAbsVal lhs rhs) 0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConstraint" kind="sem">

```mc
sem cmpConstraint : CFABase_Constraint -> CFABase_Constraint -> Int
```

<Description>{`Required for the data type Set ConstraintNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpConstraint lhs =
  | rhs -> cmpConstraintH (lhs, rhs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConstraintH" kind="sem">

```mc
sem cmpConstraintH : (CFABase_Constraint, CFABase_Constraint) -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpConstraintH =
  | (lhs, rhs) ->
    let res = subi (constructorTag lhs) (constructorTag rhs) in
    if eqi res 0 then
      error
        "Missing case in cmpConstraintH for constraints with same constructor."
    else res
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="name2intAcc" kind="sem">

```mc
sem name2intAcc : Index_IndexAcc -> Info -> Name -> IName
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem name2intAcc ia info =
  | name ->
    mapLookupOrElse (lam.
        errorSingle [info] (concat "name2intAcc failed: " (nameGetStr name))
      ) name ia.map
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="name2int" kind="sem">

```mc
sem name2int : Index_IndexMap -> Info -> Name -> IName
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem name2int im info =
  | name ->
    mapLookupOrElse (lam.
        errorSingle [info] (concat "name2int failed: " (nameGetStr name))
      ) name im.name2int
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="int2name" kind="sem">

```mc
sem int2name : Index_IndexMap -> IName -> Name
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem int2name im =
  | i -> tensorLinearGetExn im.int2name i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintVarIName" kind="sem">

```mc
sem pprintVarIName : Index_IndexMap -> PprintEnv -> IName -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintVarIName im env =
  | n -> pprintVarName env (int2name im n)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintConIName" kind="sem">

```mc
sem pprintConIName : Index_IndexMap -> PprintEnv -> IName -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintConIName im env =
  | n -> pprintConName env (int2name im n)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constraintToString" kind="sem">

```mc
sem constraintToString : Index_IndexMap -> PprintEnv -> CFABase_Constraint -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem constraintToString
  : IndexMap -> PprintEnv -> Constraint -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absValToString" kind="sem">

```mc
sem absValToString : Index_IndexMap -> PprintEnv -> CFABase_AbsVal -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem absValToString: IndexMap -> PprintEnv -> AbsVal -> (PprintEnv, String)
```
</ToggleWrapper>
</DocBlock>

