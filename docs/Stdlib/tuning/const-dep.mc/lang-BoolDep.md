import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : all a. ConstAst_Const -> [a]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CBool _ -> []
```
</ToggleWrapper>
</DocBlock>

