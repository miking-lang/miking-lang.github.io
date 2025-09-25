import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintLTAst  
  

Constrain 'lhs' to be smaller than 'rhs'

  
  
  
## Syntaxes  
  

          <DocBlock title="COPConstraint" kind="syn">

```mc
syn COPConstraint
```



<ToggleWrapper text="Code..">
```mc
syn COPConstraint =
  | COPConstraintLT { lhs: COPExpr, rhs: COPExpr }
```
</ToggleWrapper>
</DocBlock>

