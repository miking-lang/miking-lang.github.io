import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatIntConversionCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | CFloorfi _ -> graph
  | CCeilfi _ -> graph
  | CRoundfi _ -> graph
  | CInt2float _ -> graph
```
</ToggleWrapper>
</DocBlock>

