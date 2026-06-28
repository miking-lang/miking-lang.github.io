import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpIntArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CEqi _ -> 2
  | CNeqi _ -> 2
  | CLti _ -> 2
  | CGti _ -> 2
  | CLeqi _ -> 2
  | CGeqi _ -> 2
```
</ToggleWrapper>
</DocBlock>

