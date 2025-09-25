import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IOAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Const" kind="syn">

```mc
syn Const
```



<ToggleWrapper text="Code..">
```mc
syn Const =
  | CPrint {}
  | CPrintError {}
  | CDPrint {}
  | CFlushStdout {}
  | CFlushStderr {}
  | CReadLine {}
  | CReadBytesAsString {}
```
</ToggleWrapper>
</DocBlock>

