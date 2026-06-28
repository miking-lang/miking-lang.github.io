import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPAst  
  

  
  
  
## Types  
  

          <DocBlock title="COPModel" kind="type">

```mc
type COPModel : { decls: [COPDecl], objective: COPObjective }
```



<ToggleWrapper text="Code..">
```mc
type COPModel = {
    decls: [COPDecl],
    objective: COPObjective
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="COPDecl" kind="syn">

```mc
syn COPDecl
```



<ToggleWrapper text="Code..">
```mc
syn COPDecl =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPDomain" kind="syn">

```mc
syn COPDomain
```



<ToggleWrapper text="Code..">
```mc
syn COPDomain =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPExpr" kind="syn">

```mc
syn COPExpr
```



<ToggleWrapper text="Code..">
```mc
syn COPExpr =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPObjective" kind="syn">

```mc
syn COPObjective
```



<ToggleWrapper text="Code..">
```mc
syn COPObjective =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isOptimizationModel" kind="sem">

```mc
sem isOptimizationModel : COPAst_COPModel -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isOptimizationModel =
  | m -> isOptimization m.objective
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isOptimization" kind="sem">

```mc
sem isOptimization : COPAst_COPObjective -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem isOptimization =
  | _ -> false
```
</ToggleWrapper>
</DocBlock>

