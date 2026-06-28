import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntCharConversionArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CInt2Char _ -> 1
  | CChar2Int _ -> 1
```
</ToggleWrapper>
</DocBlock>

