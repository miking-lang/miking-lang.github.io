import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPExprVarAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPExpr" kind="syn">

```mc
syn COPExpr
```



<ToggleWrapper text="Code..">
```mc
syn COPExpr =
  | COPExprVar { id: Name }
```
</ToggleWrapper>
</DocBlock>

