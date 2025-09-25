import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPConstraintDeclAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPConstraint" kind="syn">

```mc
syn COPConstraint
```



<ToggleWrapper text="Code..">
```mc
syn COPConstraint =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="COPDecl" kind="syn">

```mc
syn COPDecl
```



<ToggleWrapper text="Code..">
```mc
syn COPDecl =
  | COPConstraintDecl { constraint: COPConstraint }
```
</ToggleWrapper>
</DocBlock>

