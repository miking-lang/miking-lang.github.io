import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IODep  
  

  
  
  
## Semantics  
  

          <DocBlock title="constDep" kind="sem">

```mc
sem constDep : ConstAst_Const -> [(Bool, Bool)]
```



<ToggleWrapper text="Code..">
```mc
sem constDep =
  | CPrint _ -> [_constDepNone]
  | CPrintError _ -> [_constDepNone]
  | CDPrint _ -> [_constDepNone]
  | CFlushStdout _ -> [_constDepNone]
  | CFlushStderr _ -> [_constDepNone]
  | CReadLine _ -> [_constDepNone]
  | CReadBytesAsString _ -> [_constDepData]
```
</ToggleWrapper>
</DocBlock>

