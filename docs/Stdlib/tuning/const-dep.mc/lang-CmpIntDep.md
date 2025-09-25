import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpIntDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CEqi _ -> [_constDepData, _constDepData]
  | CNeqi _ -> [_constDepData, _constDepData]
  | CLti _ -> [_constDepData, _constDepData]
  | CGti _ -> [_constDepData, _constDepData]
  | CLeqi _ -> [_constDepData, _constDepData]
  | CGeqi _ -> [_constDepData, _constDepData]
```
</ToggleWrapper>
</DocBlock>

