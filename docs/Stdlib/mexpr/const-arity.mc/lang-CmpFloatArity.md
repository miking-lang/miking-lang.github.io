import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpFloatArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CEqf _ -> 2
  | CLtf _ -> 2
  | CLeqf _ -> 2
  | CGtf _ -> 2
  | CGeqf _ -> 2
  | CNeqf _ -> 2
```
</ToggleWrapper>
</DocBlock>

