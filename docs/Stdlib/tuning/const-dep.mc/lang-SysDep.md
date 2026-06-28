import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SysDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CExit _ -> [_constDepNone]
  | CError _ -> [_constDepNone]
  | CArgv _ -> []
  | CCommand _ -> [_constDepBoth]
```
</ToggleWrapper>
</DocBlock>

