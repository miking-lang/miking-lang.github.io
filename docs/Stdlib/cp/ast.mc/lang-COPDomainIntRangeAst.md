import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPDomainIntRangeAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPDomain" kind="syn">

```mc
syn COPDomain
```



<ToggleWrapper text="Code..">
```mc
syn COPDomain =
  | COPDomainIntRange { min: COPExpr, max: COPExpr }
```
</ToggleWrapper>
</DocBlock>

