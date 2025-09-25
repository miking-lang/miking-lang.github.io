import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ast.mc  
  

AST representation of a constraint optimization or satisfaction problem  
\(COP/CSP\).

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>  
  
## Languages  
  

          <DocBlock title="COPAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPAst">

```mc
lang COPAst
```



<ToggleWrapper text="Code..">
```mc
lang COPAst
  type COPModel = {
    decls: [COPDecl],
    objective: COPObjective
  }

  syn COPDecl =
  syn COPDomain =
  syn COPExpr =
  syn COPObjective =

  sem isOptimizationModel: COPModel -> Bool
  sem isOptimizationModel =
  | m -> isOptimization m.objective

  sem isOptimization: COPObjective -> Bool
  sem isOptimization =
  | _ -> false
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPDomainIntRangeAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPDomainIntRangeAst">

```mc
lang COPDomainIntRangeAst
```



<ToggleWrapper text="Code..">
```mc
lang COPDomainIntRangeAst = COPAst
  syn COPDomain =
  | COPDomainIntRange { min: COPExpr, max: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPDomainBooleanAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPDomainBooleanAst">

```mc
lang COPDomainBooleanAst
```



<ToggleWrapper text="Code..">
```mc
lang COPDomainBooleanAst = COPAst
  syn COPDomain =
  | COPDomainBoolean {}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPVarDeclAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPVarDeclAst">

```mc
lang COPVarDeclAst
```



<ToggleWrapper text="Code..">
```mc
lang COPVarDeclAst = COPAst
  syn COPDecl =
  | COPVarDecl { id: Name,
                 domain: COPDomain }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPVarArrayDeclAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPVarArrayDeclAst">

```mc
lang COPVarArrayDeclAst
```



<ToggleWrapper text="Code..">
```mc
lang COPVarArrayDeclAst = COPAst
  syn COPDecl =
  | COPVarArrayDecl { id: Name,
                      domain: COPDomain,
                      length: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintDeclAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPConstraintDeclAst">

```mc
lang COPConstraintDeclAst
```



<ToggleWrapper text="Code..">
```mc
lang COPConstraintDeclAst = COPAst
  syn COPConstraint =
  syn COPDecl =
  | COPConstraintDecl { constraint: COPConstraint }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintTableAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPConstraintTableAst">

```mc
lang COPConstraintTableAst
```

<Description>{`Table constraint`}</Description>


<ToggleWrapper text="Code..">
```mc
lang COPConstraintTableAst = COPConstraintDeclAst
  syn COPConstraint =
  | COPConstraintTable { vars: COPExpr, tuples: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintTableReifAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPConstraintTableReifAst">

```mc
lang COPConstraintTableReifAst
```

<Description>{`Reified table constraint: table\('vars', 'tuples'\) \<=\> 'b'`}</Description>


<ToggleWrapper text="Code..">
```mc
lang COPConstraintTableReifAst = COPConstraintDeclAst
  syn COPConstraint =
  | COPConstraintTableReif { vars: COPExpr, tuples: COPExpr, b: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintLEAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPConstraintLEAst">

```mc
lang COPConstraintLEAst
```

<Description>{`Constrain 'lhs' to be smaller or equal to 'rhs'`}</Description>


<ToggleWrapper text="Code..">
```mc
lang COPConstraintLEAst = COPConstraintDeclAst
  syn COPConstraint =
  | COPConstraintLE { lhs: COPExpr, rhs: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPConstraintLTAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPConstraintLTAst">

```mc
lang COPConstraintLTAst
```

<Description>{`Constrain 'lhs' to be smaller than 'rhs'`}</Description>


<ToggleWrapper text="Code..">
```mc
lang COPConstraintLTAst = COPConstraintDeclAst
  syn COPConstraint =
  | COPConstraintLT { lhs: COPExpr, rhs: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectiveMinimizeAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPObjectiveMinimizeAst">

```mc
lang COPObjectiveMinimizeAst
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectiveMinimizeAst = COPAst
  syn COPObjective =
  | COPMinimize { expr: COPExpr }

  sem isOptimization =
  | COPMinimize _ -> true
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectiveMaximizeAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPObjectiveMaximizeAst">

```mc
lang COPObjectiveMaximizeAst
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectiveMaximizeAst = COPAst
  syn COPObjective =
  | COPMaximize { expr: COPExpr }

  sem isOptimization =
  | COPMaximize _ -> true
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjectiveSatisfyAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPObjectiveSatisfyAst">

```mc
lang COPObjectiveSatisfyAst
```



<ToggleWrapper text="Code..">
```mc
lang COPObjectiveSatisfyAst = COPAst
  syn COPObjective =
  | COPSatisfy {}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprSumAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPExprSumAst">

```mc
lang COPExprSumAst
```



<ToggleWrapper text="Code..">
```mc
lang COPExprSumAst = COPAst
  syn COPExpr =
  | COPExprSum { expr: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprVarAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPExprVarAst">

```mc
lang COPExprVarAst
```



<ToggleWrapper text="Code..">
```mc
lang COPExprVarAst = COPAst
  syn COPExpr =
  | COPExprVar { id: Name }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprVarAccessAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPExprVarAccessAst">

```mc
lang COPExprVarAccessAst
```



<ToggleWrapper text="Code..">
```mc
lang COPExprVarAccessAst = COPAst
  syn COPExpr =
  | COPExprVarAccess { id: Name, index: COPExpr }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprIntAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPExprIntAst">

```mc
lang COPExprIntAst
```



<ToggleWrapper text="Code..">
```mc
lang COPExprIntAst = COPAst
  syn COPExpr =
  | COPExprInt { value: Int }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprArrayAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPExprArrayAst">

```mc
lang COPExprArrayAst
```



<ToggleWrapper text="Code..">
```mc
lang COPExprArrayAst = COPAst
  syn COPExpr =
  | COPExprArray { array: [COPExpr] }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExprArray2dAst" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COPExprArray2dAst">

```mc
lang COPExprArray2dAst
```



<ToggleWrapper text="Code..">
```mc
lang COPExprArray2dAst = COPAst
  syn COPExpr =
  | COPExprArray2d { array: [[COPExpr]] }
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COP" kind="lang" link="/docs/Stdlib/cp/ast.mc/lang-COP">

```mc
lang COP
```



<ToggleWrapper text="Code..">
```mc
lang COP =
  -- Domains --
  COPDomainIntRangeAst + COPDomainBooleanAst +
  -- Variables --
  COPVarDeclAst + COPVarArrayDeclAst +
  -- Constraints --
  COPConstraintDeclAst + COPConstraintTableAst + COPConstraintTableReifAst +
  COPConstraintLEAst + COPConstraintLTAst +
  -- Objectives --
  COPObjectiveMinimizeAst + COPObjectiveMaximizeAst + COPObjectiveSatisfyAst +
  -- Expressions --
  COPExprSumAst + COPExprVarAst + COPExprVarAccessAst + COPExprIntAst +
  COPExprArrayAst + COPExprArray2dAst
end
```
</ToggleWrapper>
</DocBlock>

