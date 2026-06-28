import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymbCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpConstH" kind="sem">

```mc
sem cmpConstH : (ConstAst_Const, ConstAst_Const) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstH =
  | (CSymb l, CSymb r) -> subi (sym2hash l.val) (sym2hash r.val)
```
</ToggleWrapper>
</DocBlock>

