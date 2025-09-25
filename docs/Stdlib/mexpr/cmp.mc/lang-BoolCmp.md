import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpConstH" kind="sem">

```mc
sem cmpConstH : (ConstAst_Const, ConstAst_Const) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstH =
  | (CBool l, CBool r) ->
    let lval = if l.val then 1 else 0 in
    let rval = if r.val then 1 else 0 in
    subi lval rval
```
</ToggleWrapper>
</DocBlock>

