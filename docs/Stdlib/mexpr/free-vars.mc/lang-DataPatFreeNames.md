import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesPat" kind="sem">

```mc
sem freeNamesPat : Set Name -> Ast_Pat -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesPat free =
  | PatCon x ->
    let free = freeNamesPat free x.subpat in
    let free = setInsert x.ident free in
    free
```
</ToggleWrapper>
</DocBlock>

