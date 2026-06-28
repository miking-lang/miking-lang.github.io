import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpConstH" kind="sem">

```mc
sem cmpConstH : (ConstAst_Const, ConstAst_Const) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstH =
  | (CChar l, CChar r) -> subi (char2int l.val) (char2int r.val)
```
</ToggleWrapper>
</DocBlock>

