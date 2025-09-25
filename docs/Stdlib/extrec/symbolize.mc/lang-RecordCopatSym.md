import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCopatSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeCopat" kind="sem">

```mc
sem symbolizeCopat : SymEnv -> CopatAst_Copat -> CopatAst_Copat
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeCopat env =
  | c & (RecordCopat _)  -> c
```
</ToggleWrapper>
</DocBlock>

