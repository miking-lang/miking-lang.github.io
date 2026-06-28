import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : KCFA_CFAGraph -> (IName, KCFA_Ctx) -> (Ast_Pat, CFABase_AbsVal) -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint graph (id: (IName,Ctx)) =
  | (PatSeqEdge p, AVSeq { names = names } & av) ->
    let f = lam graph. lam pat: Pat. setFold (lam graph: CFAGraph. lam name.
        let cstrs = foldl (lam acc. lam f. concat (f id name pat) acc)
          [] graph.mcgfs in
        foldl initConstraint graph cstrs
      ) graph names in
    let graph = foldl f graph p.prefix in
    let graph = foldl f graph p.postfix in
    match p.middle with PName rhs
    then addData graph av (name2int graph.im p.info rhs, id.1)
    else graph
  | (PatSeqEdge p, av) ->
    match p.middle with PName rhs
    then addData graph av (name2int graph.im p.info rhs, id.1)
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patNames" kind="sem">

```mc
sem patNames : [Name] -> Ast_Pat -> [Name]
```



<ToggleWrapper text="Code..">
```mc
sem patNames acc =
  | PatSeqEdge { middle = PName n } & p ->
    sfold_Pat_Pat patNames (cons n acc) p
```
</ToggleWrapper>
</DocBlock>

