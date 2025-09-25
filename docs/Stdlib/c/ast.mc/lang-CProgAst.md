import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CProgAst  
  

\-\-\-\-\-\-\-\-\-\-\-\-\-  
C PROGRAM \-\-  
\-\-\-\-\-\-\-\-\-\-\-\-\-

  
  
  
## Syntaxes  
  

          <DocBlock title="CProg" kind="syn">

```mc
syn CProg
```



<ToggleWrapper text="Code..">
```mc
syn CProg =
  | CPProg { includes: [String], tops: [CTop] }
```
</ToggleWrapper>
</DocBlock>

