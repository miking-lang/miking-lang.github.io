import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmDecl {decl = DeclLet x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = setRemove x.ident free in
    let free = freeNamesExpr free x.body in
    match stripTyAll x.tyAnnot with (tyalls, tyAnnot) in
    let free = freeNamesType free tyAnnot in
    -- NOTE(vipa, 2025-03-19): This also handles removing type
    -- variables from \\`.body\\`, not just \\`.tyAnnot\\`.
    let free = foldl (lam free. lam pair. setRemove pair.0 free) free tyalls in
    free
```
</ToggleWrapper>
</DocBlock>

