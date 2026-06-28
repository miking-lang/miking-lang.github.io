import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchNonExpansive  
  

  
  
  
## Semantics  
  

          <DocBlock title="nonExpansive" kind="sem">

```mc
sem nonExpansive : NonExpansive_Guarded -> Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem nonExpansive (guarded : Guarded) =
  | TmMatch t ->
    if nonExpansive false t.target then
      if nonExpansive guarded t.thn then
        nonExpansive guarded t.els
      else false
    else false
```
</ToggleWrapper>
</DocBlock>

