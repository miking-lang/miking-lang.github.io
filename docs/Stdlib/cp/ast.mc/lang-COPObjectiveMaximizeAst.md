import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPObjectiveMaximizeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPObjective" kind="syn">

```mc
syn COPObjective
```



<ToggleWrapper text="Code..">
```mc
syn COPObjective =
  | COPMaximize { expr: COPExpr }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isOptimization" kind="sem">

```mc
sem isOptimization : COPAst_COPObjective -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isOptimization =
  | COPMaximize _ -> true
```
</ToggleWrapper>
</DocBlock>

