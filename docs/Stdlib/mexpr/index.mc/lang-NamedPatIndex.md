import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatIndex  
  

  
  
  
## Semantics  
  

          <DocBlock title="patIndexAdd" kind="sem">

```mc
sem patIndexAdd : Index_IndexAcc -> Ast_Pat -> Index_IndexAcc
```



<ToggleWrapper text="Code..">
```mc
sem patIndexAdd (acc: IndexAcc) =
  | PatNamed { ident = PName name } -> addKey name acc
```
</ToggleWrapper>
</DocBlock>

