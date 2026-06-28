import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesPat" kind="sem">

```mc
sem freeNamesPat : Set Name -> Ast_Pat -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesPat free =
  | PatNamed {ident = PName ident} -> setRemove ident free
```
</ToggleWrapper>
</DocBlock>

