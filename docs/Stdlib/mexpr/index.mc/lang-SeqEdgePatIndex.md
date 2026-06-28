import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatIndex  
  

  
  
  
## Semantics  
  

          <DocBlock title="patIndexAdd" kind="sem">

```mc
sem patIndexAdd : Index_IndexAcc -> Ast_Pat -> Index_IndexAcc
```



<ToggleWrapper text="Code..">
```mc
sem patIndexAdd (acc: IndexAcc) =
  | PatSeqEdge { middle = PName name } & p ->
    sfold_Pat_Pat patIndexAdd (addKey name acc) p
```
</ToggleWrapper>
</DocBlock>

