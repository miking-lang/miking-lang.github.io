import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IOPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getConstStringCode" kind="sem">

```mc
sem getConstStringCode : Int -> ConstAst_Const -> String
```



<ToggleWrapper text="Code..">
```mc
sem getConstStringCode (indent : Int) =
  | CPrint _ -> "print"
  | CPrintError _ -> "printError"
  | CDPrint _ -> "dprint"
  | CFlushStdout _ -> "flushStdout"
  | CFlushStderr _ -> "flushStderr"
  | CReadLine _ -> "readLine"
  | CReadBytesAsString _ -> "readBytesAsString"
```
</ToggleWrapper>
</DocBlock>

