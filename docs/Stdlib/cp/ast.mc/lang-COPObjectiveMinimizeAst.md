import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPObjectiveMinimizeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPObjective" kind="syn">

```mc
syn COPObjective
```



<ToggleWrapper text="Code..">
```mc
syn COPObjective =
  | COPMinimize { expr: COPExpr }
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
  | COPMinimize _ -> true
```
</ToggleWrapper>
</DocBlock>

