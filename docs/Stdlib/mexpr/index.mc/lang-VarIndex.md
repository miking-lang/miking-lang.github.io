import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarIndex  
  

  
  
  
## Semantics  
  

          <DocBlock title="indexAdd" kind="sem">

```mc
sem indexAdd : Index_IndexAcc -> Ast_Expr -> Index_IndexAcc
```



<ToggleWrapper text="Code..">
```mc
sem indexAdd (acc: IndexAcc) =
  | TmVar { ident = ident } -> addKey ident acc
```
</ToggleWrapper>
</DocBlock>

