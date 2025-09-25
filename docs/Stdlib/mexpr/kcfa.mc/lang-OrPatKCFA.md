import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OrPatKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : KCFA_CFAGraph -> (IName, KCFA_Ctx) -> (Ast_Pat, CFABase_AbsVal) -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint graph id =
  | (PatOr p, av) ->
    let graph = propagateMatchConstraint graph id (p.lpat, av) in
    propagateMatchConstraint graph id (p.rpat, av)
```
</ToggleWrapper>
</DocBlock>

