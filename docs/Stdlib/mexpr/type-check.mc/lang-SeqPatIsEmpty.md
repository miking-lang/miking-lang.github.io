import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqPatIsEmpty  
  

  
  
  
## Semantics  
  

          <DocBlock title="snpatIsEmpty" kind="sem">

```mc
sem snpatIsEmpty : TCEnv -> (Ast_Type, NormPat_SNPat) -> [IsEmpty_Bounds]
```



<ToggleWrapper text="Code..">
```mc
sem snpatIsEmpty env =
  | (TySeq { ty = ty }, NPatSeqTot pats) ->
    foldl (lam ms. lam p. concat ms (npatIsEmpty env (ty, p))) [] pats
  | (TySeq { ty = ty }, NPatSeqEdge { prefix = pre, postfix = post }) ->
    let pats = concat pre post in
    foldl (lam ms. lam p. concat ms (npatIsEmpty env (ty, p))) [] pats
```
</ToggleWrapper>
</DocBlock>

