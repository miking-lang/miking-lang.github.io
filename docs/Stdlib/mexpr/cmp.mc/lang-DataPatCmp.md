import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  | (PatCon l, PatCon r) ->
    let identDiff = nameCmp l.ident r.ident in
    if eqi identDiff 0 then
      cmpPat l.subpat r.subpat
    else identDiff
```
</ToggleWrapper>
</DocBlock>

