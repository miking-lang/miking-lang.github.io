import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTotPatCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : CFA_CFAGraph -> IName -> (Ast_Pat, CFABase_AbsVal) -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint (graph: CFAGraph) (id: IName) =
  | (PatSeqTot p, AVSet { names = names }) ->
    let f = lam graph. lam pat: Pat. setFold (lam graph: CFAGraph. lam name.
        let cstrs =
          foldl (lam acc. lam f. concat (f id name pat) acc) [] graph.mcgfs
        in
        foldl initConstraint graph cstrs
      ) graph names in
    foldl f graph p.pats
```
</ToggleWrapper>
</DocBlock>

