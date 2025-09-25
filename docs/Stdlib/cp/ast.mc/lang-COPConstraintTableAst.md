import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintTableAst  
  

Table constraint

  
  
  
## Syntaxes  
  

          <DocBlock title="COPConstraint" kind="syn">

```mc
syn COPConstraint
```



<ToggleWrapper text="Code..">
```mc
syn COPConstraint =
  | COPConstraintTable { vars: COPExpr, tuples: COPExpr }
```
</ToggleWrapper>
</DocBlock>

