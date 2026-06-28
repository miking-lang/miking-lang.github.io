import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpFloatDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CEqf _ -> [_constDepData, _constDepData]
  | CLtf _ -> [_constDepData, _constDepData]
  | CLeqf _ -> [_constDepData, _constDepData]
  | CGtf _ -> [_constDepData, _constDepData]
  | CGeqf _ -> [_constDepData, _constDepData]
  | CNeqf _ -> [_constDepData, _constDepData]
```
</ToggleWrapper>
</DocBlock>

