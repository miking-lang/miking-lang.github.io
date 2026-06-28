import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesPat" kind="sem">

```mc
sem freeNamesPat : Set Name -> Ast_Pat -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesPat free =
  | PatSeqEdge (x & {middle = PName ident}) ->
    let free = setRemove ident free in
    let free = foldl freeNamesPat free x.prefix in
    let free = foldl freeNamesPat free x.postfix in
    free
```
</ToggleWrapper>
</DocBlock>

