import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpPatH" kind="sem">

```mc
sem cmpPatH : (Ast_Pat, Ast_Pat) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpPatH =
  | (PatRecord l, PatRecord r) -> mapCmp cmpPat l.bindings r.bindings
```
</ToggleWrapper>
</DocBlock>

