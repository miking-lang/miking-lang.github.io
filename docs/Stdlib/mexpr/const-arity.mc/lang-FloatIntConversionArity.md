import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatIntConversionArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CFloorfi _ -> 1
  | CCeilfi _ -> 1
  | CRoundfi _ -> 1
  | CInt2float _ -> 1
```
</ToggleWrapper>
</DocBlock>

