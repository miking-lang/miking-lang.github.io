import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmLam x ->
    let free = freeNamesExpr free x.body in
    let free = setRemove x.ident free in
    let free = freeNamesType free x.tyAnnot in
    free
```
</ToggleWrapper>
</DocBlock>

