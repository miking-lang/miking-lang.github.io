import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqNormPatMatch  
  

  
  
  
## Semantics  
  

          <DocBlock title="matchSNPat" kind="sem">

```mc
sem matchSNPat : (Ast_Expr, NormPat_SNPat) -> Option (Map Name NormPat_NormPat)
```



<ToggleWrapper text="Code..">
```mc
sem matchSNPat =
  | (TmSeq {tms = tms}, NPatSeqTot pats) ->
    if eqi (length tms) (length pats) then
      optionFoldlM
        (lam acc. lam m. optionMap (mapUnionWith normpatIntersect acc) m)
        (mapEmpty nameCmp)
        (zipWith (lam e. lam p. matchNPat (e, p)) tms pats)
    else None ()
  | (TmSeq {tms = tms},
     NPatSeqEdge { prefix = pre, disallowed = dis, postfix = post }) ->
    match (length pre, length post, length tms) with (preLen, postLen, tmsLen) in
    if setMem tmsLen dis then None () else
      if gti (addi preLen postLen) tmsLen then None ()
      else
        match splitAt tms preLen with (preTm, tms) in
        match splitAt tms (subi (length tms) postLen) with (tms, postTm) in
        optionFoldlM
          (lam acc. lam m. optionMap (mapUnionWith normpatIntersect acc) m)
          (mapEmpty nameCmp)
          (zipWith (lam e. lam p. matchNPat (e, p))
             (concat preTm postTm) (concat pre post))
```
</ToggleWrapper>
</DocBlock>

