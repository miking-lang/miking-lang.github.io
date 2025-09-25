import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpFloatCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | CEqf _ -> graph
  | CLtf _ -> graph
  | CLeqf _ -> graph
  | CGtf _ -> graph
  | CGeqf _ -> graph
  | CNeqf _ -> graph
```
</ToggleWrapper>
</DocBlock>

