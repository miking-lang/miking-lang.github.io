import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithIntArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CAddi _ -> 2
  | CSubi _ -> 2
  | CMuli _ -> 2
  | CDivi _ -> 2
  | CNegi _ -> 1
  | CModi _ -> 2
```
</ToggleWrapper>
</DocBlock>

