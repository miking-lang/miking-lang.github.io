import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmMatch x ->
    let free = freeNamesExpr free x.thn in
    -- NOTE(vipa, 2025-03-19): This will remove whatever the pattern
    -- itself binds from free, hence the weird order
    let free = freeNamesPat free x.pat in
    let free = freeNamesExpr free x.target in
    let free = freeNamesExpr free x.els in
    free
```
</ToggleWrapper>
</DocBlock>

