import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : KCFA_CFAGraph -> (IName, KCFA_Ctx) -> (Ast_Pat, CFABase_AbsVal) -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint graph id =
  | (PatRecord { bindings = pbindings }, AVRec { bindings = abindings }) ->
    -- Check if record pattern is compatible with abstract value record
    let compatible = mapAllWithKey (lam k. lam. mapMem k abindings) pbindings in
    if compatible then
      mapFoldWithKey (lam graph: CFAGraph. lam k. lam pb: Pat.
        let ab: (IName,Ctx) = mapFindExn k abindings in
        let cstrs = foldl (lam acc. lam f. concat (f id ab pb) acc)
          [] graph.mcgfs in
        foldl initConstraint graph cstrs
      ) graph pbindings
    else graph -- Nothing to be done
```
</ToggleWrapper>
</DocBlock>

