import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : CFA_CFAGraph -> IName -> (Ast_Pat, CFABase_AbsVal) -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint (graph: CFAGraph) (id: IName) =
  | (PatSeqEdge p, AVSet { names = names } & av) ->
    let f = lam graph. lam pat: Pat. setFold (lam graph: CFAGraph. lam name.
        let cstrs = foldl (lam acc. lam f. concat (f id name pat) acc)
          [] graph.mcgfs in
        foldl initConstraint graph cstrs
      ) graph names in
    let graph = foldl f graph p.prefix in
    let graph = foldl f graph p.postfix in
    match p.middle with PName rhs
    then addData graph av (name2int graph.im p.info rhs)
    else graph
  | (PatSeqEdge p, av) ->
    match p.middle with PName rhs
    then addData graph av (name2int graph.im p.info rhs)
    else graph
```
</ToggleWrapper>
</DocBlock>

