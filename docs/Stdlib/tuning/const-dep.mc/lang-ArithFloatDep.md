import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithFloatDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CAddf _ -> [_constDepData, _constDepData]
  | CSubf _ -> [_constDepData, _constDepData]
  | CMulf _ -> [_constDepData, _constDepData]
  | CDivf _ -> [_constDepData, _constDepData]
  | CNegf _ -> [_constDepData]
```
</ToggleWrapper>
</DocBlock>

