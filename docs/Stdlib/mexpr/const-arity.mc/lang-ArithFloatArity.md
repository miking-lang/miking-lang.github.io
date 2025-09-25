import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithFloatArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CAddf _ -> 2
  | CSubf _ -> 2
  | CMulf _ -> 2
  | CDivf _ -> 2
  | CNegf _ -> 1
```
</ToggleWrapper>
</DocBlock>

