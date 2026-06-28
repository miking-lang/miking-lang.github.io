import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatStringConversionDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  -- NOTE(Linnea,2021-11-19): technically, the execution times of these
  -- conversions depend on the length of the strings, but we ignore that for
  -- now.
  | CStringIsFloat _ -> [_constDepData]
  | CString2float _ -> [_constDepData]
  | CFloat2string _ -> [_constDepData]
```
</ToggleWrapper>
</DocBlock>

