import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintLEAst  
  

Constrain 'lhs' to be smaller or equal to 'rhs'

  
  
  
## Syntaxes  
  

          <DocBlock title="COPConstraint" kind="syn">

```mc
syn COPConstraint
```



<ToggleWrapper text="Code..">
```mc
syn COPConstraint =
  | COPConstraintLE { lhs: COPExpr, rhs: COPExpr }
```
</ToggleWrapper>
</DocBlock>

