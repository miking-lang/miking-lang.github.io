import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintTableReifAst  
  

Reified table constraint: table\('vars', 'tuples'\) \<=\> 'b'

  
  
  
## Syntaxes  
  

          <DocBlock title="COPConstraint" kind="syn">

```mc
syn COPConstraint
```



<ToggleWrapper text="Code..">
```mc
syn COPConstraint =
  | COPConstraintTableReif { vars: COPExpr, tuples: COPExpr, b: COPExpr }
```
</ToggleWrapper>
</DocBlock>

