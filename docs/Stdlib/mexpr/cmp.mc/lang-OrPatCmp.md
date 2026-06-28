import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OrPatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  | (PatOr l, PatOr r) ->
    let lpatDiff = cmpPat l.lpat r.lpat in
    if eqi lpatDiff 0 then cmpPat l.rpat r.rpat
    else lpatDiff
```
</ToggleWrapper>
</DocBlock>

