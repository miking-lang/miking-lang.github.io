import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : CFA_CFAGraph -> IName -> (Ast_Pat, CFABase_AbsVal) -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint (graph: CFAGraph) (id: IName) =
  | (PatNamed { ident = PName n, info = info }, av) ->
    propagateDirectConstraint (name2int graph.im info n) graph av
  | (PatNamed { ident = PWildcard _ }, _) -> graph
```
</ToggleWrapper>
</DocBlock>

