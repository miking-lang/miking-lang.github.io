import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatIntConversionPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CFloorfi _ -> "floorfi"
  | CCeilfi _ -> "ceilfi"
  | CRoundfi _ -> "roundfi"
  | CInt2float _ -> "int2float"
```
</ToggleWrapper>
</DocBlock>

