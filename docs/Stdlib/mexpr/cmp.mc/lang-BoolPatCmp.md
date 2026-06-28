import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolPatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  | (PatBool l, PatBool r) ->
    let lval = if l.val then 1 else 0 in
    let rval = if r.val then 1 else 0 in
    subi lval rval
```
</ToggleWrapper>
</DocBlock>

