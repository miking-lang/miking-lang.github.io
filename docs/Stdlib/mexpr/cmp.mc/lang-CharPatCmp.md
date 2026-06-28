import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharPatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  | (PatChar l, PatChar r) -> subi (char2int l.val) (char2int r.val)
```
</ToggleWrapper>
</DocBlock>

