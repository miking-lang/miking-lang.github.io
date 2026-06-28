import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpConstH" kind="sem">

```mc
sem cmpConstH : (ConstAst_Const, ConstAst_Const) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstH =
  | (CInt l, CInt r) -> subi l.val r.val
```
</ToggleWrapper>
</DocBlock>

