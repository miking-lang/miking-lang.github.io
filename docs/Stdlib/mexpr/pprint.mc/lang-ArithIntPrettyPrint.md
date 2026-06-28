import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithIntPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CAddi _ -> "addi"
  | CSubi _ -> "subi"
  | CMuli _ -> "muli"
  | CModi _ -> "modi"
  | CDivi _ -> "divi"
  | CNegi _ -> "negi"
```
</ToggleWrapper>
</DocBlock>

