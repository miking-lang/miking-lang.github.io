import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPVarDeclAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPDecl" kind="syn">

```mc
syn COPDecl
```



<ToggleWrapper text="Code..">
```mc
syn COPDecl =
  | COPVarDecl { id: Name,
                 domain: COPDomain }
```
</ToggleWrapper>
</DocBlock>

