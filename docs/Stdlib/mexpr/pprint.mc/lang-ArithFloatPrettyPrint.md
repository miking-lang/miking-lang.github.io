import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithFloatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CAddf _ -> "addf"
  | CSubf _ -> "subf"
  | CMulf _ -> "mulf"
  | CDivf _ -> "divf"
  | CNegf _ -> "negf"
```
</ToggleWrapper>
</DocBlock>

