import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IOCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : CFA_CFAGraphInit -> Info -> IName -> ConstAst_Const -> CFA_CFAGraphInit
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst graph info ident =
  | CPrint _ -> graph
  | CPrintError _ -> graph
  | CDPrint _ -> graph
  | CFlushStdout _ -> graph
  | CFlushStderr _ -> graph
  | CReadLine _ -> graph
  | CReadBytesAsString _ -> graph
```
</ToggleWrapper>
</DocBlock>

