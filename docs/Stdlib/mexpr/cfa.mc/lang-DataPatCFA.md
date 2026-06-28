import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : CFA_CFAGraph -> IName -> (Ast_Pat, CFABase_AbsVal) -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint (graph: CFAGraph) (id: IName) =
  | (PatCon p, AVCon { ident = ident, body = body }) ->
    if nameEq p.ident (int2name graph.im ident) then
      let cstrs = foldl (lam acc. lam f. concat (f id body p.subpat) acc)
        [] graph.mcgfs in
      foldl initConstraint graph cstrs
    else graph
```
</ToggleWrapper>
</DocBlock>

