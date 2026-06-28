import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPExprVarAccessAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPExpr" kind="syn">

```mc
syn COPExpr
```



<ToggleWrapper text="Code..">
```mc
syn COPExpr =
  | COPExprVarAccess { id: Name, index: COPExpr }
```
</ToggleWrapper>
</DocBlock>

