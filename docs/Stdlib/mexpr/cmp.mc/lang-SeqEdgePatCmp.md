import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  | (PatSeqEdge l, PatSeqEdge r) ->
    let prefixDiff = seqCmp cmpPat l.prefix r.prefix in
    if eqi prefixDiff 0 then
      let middleDiff = cmpPatName (l.middle, r.middle) in
      if eqi middleDiff 0 then
        seqCmp cmpPat l.postfix r.postfix
      else middleDiff
    else prefixDiff
```
</ToggleWrapper>
</DocBlock>

