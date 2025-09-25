import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IOArity  
  

  
  
  
## Semantics  
  

          <DocBlock title="constArity" kind="sem">

```mc
sem constArity : ConstAst_Const -> Int
```



<ToggleWrapper text="Code..">
```mc
sem constArity =
  | CPrint _ -> 1
  | CPrintError _ -> 1
  | CDPrint _ -> 1
  | CFlushStdout _ -> 1
  | CFlushStderr _ -> 1
  | CReadLine _ -> 1
  | CReadBytesAsString _ -> 1
```
</ToggleWrapper>
</DocBlock>

