import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatStringConversionCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | CStringIsFloat _ -> graph
  | CString2float _ -> graph
  | CFloat2string _ -> graph
```
</ToggleWrapper>
</DocBlock>

