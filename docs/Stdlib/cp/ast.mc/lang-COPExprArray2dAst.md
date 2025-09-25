import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPExprArray2dAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPExpr" kind="syn">

```mc
syn COPExpr
```



<ToggleWrapper text="Code..">
```mc
syn COPExpr =
  | COPExprArray2d { array: [[COPExpr]] }
```
</ToggleWrapper>
</DocBlock>

