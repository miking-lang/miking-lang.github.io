import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatIntConversionDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CFloorfi _ -> [_constDepData]
  | CCeilfi _ -> [_constDepData]
  | CRoundfi _ -> [_constDepData]
  | CInt2float _ -> [_constDepData]
```
</ToggleWrapper>
</DocBlock>

