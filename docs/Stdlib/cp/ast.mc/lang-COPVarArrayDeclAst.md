import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# COPVarArrayDeclAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="COPDecl" kind="syn">

```mc
syn COPDecl
```



<ToggleWrapper text="Code..">
```mc
syn COPDecl =
  | COPVarArrayDecl { id: Name,
                      domain: COPDomain,
                      length: COPExpr }
```
</ToggleWrapper>
</DocBlock>

