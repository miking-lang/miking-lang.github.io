import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamNonExpansive  
  

  
  
  
## Semantics  
  

          <DocBlock title="nonExpansive" kind="sem">

```mc
sem nonExpansive : NonExpansive_Guarded -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem nonExpansive (guarded : Guarded) =
  | TmLam t -> true
```
</ToggleWrapper>
</DocBlock>

