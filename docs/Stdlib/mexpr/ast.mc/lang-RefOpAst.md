import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RefOpAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Const" kind="syn">

```mc
syn Const
```



<ToggleWrapper text="Code..">
```mc
syn Const =
  | CRef {}
  | CModRef {}
  | CDeRef {}
```
</ToggleWrapper>
</DocBlock>

