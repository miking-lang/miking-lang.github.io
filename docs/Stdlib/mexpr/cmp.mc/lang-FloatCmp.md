import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpConstH" kind="sem">

```mc
sem cmpConstH : (ConstAst_Const, ConstAst_Const) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstH =
  | (CFloat l, CFloat r) ->
    let x = subf l.val r.val in
    if gtf x 0.0 then 1
    else if ltf x 0.0 then negi 1
    else 0
```
</ToggleWrapper>
</DocBlock>

