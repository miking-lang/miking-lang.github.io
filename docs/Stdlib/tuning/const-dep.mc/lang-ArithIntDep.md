import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithIntDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CAddi _ -> [_constDepData, _constDepData]
  | CSubi _ -> [_constDepData, _constDepData]
  | CMuli _ -> [_constDepData, _constDepData]
  | CDivi _ -> [_constDepData, _constDepData]
  | CNegi _ -> [_constDepData]
  | CModi _ -> [_constDepData]
```
</ToggleWrapper>
</DocBlock>

