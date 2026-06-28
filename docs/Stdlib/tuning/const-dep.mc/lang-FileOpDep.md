import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FileOpDep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CFileRead _ -> [_constDepBoth]
  | CFileWrite _ -> [_constDepNone, _constDepExe]
  | CFileExists _ -> [_constDepData]
  | CFileDelete _ -> [_constDepNone]
```
</ToggleWrapper>
</DocBlock>

