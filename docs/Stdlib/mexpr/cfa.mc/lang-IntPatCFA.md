import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntPatCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : CFA_CFAGraph -> IName -> (Ast_Pat, CFABase_AbsVal) -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint (graph: CFAGraph) (id: IName) =
  | (PatInt p, _) -> graph
```
</ToggleWrapper>
</DocBlock>

