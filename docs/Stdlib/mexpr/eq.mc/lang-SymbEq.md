import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymbEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqConstH" kind="sem">

```mc
sem eqConstH : (ConstAst_Const, ConstAst_Const) -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem eqConstH =
  | (CSymb l, CSymb r) -> eqsym l.val r.val
```
</ToggleWrapper>
</DocBlock>

