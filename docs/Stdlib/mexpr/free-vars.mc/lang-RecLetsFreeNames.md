import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmDecl {decl = DeclRecLets x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let f = lam free. lam binding.
      let free = freeNamesExpr free binding.body in
      match stripTyAll binding.tyAnnot with (tyalls, tyAnnot) in
      let free = freeNamesType free tyAnnot in
      let free = foldl (lam free. lam pair. setRemove pair.0 free) free tyalls in
      free in
    let free = foldl f free x.bindings in
    let free = foldl (lam free. lam b. setRemove b.ident free) free x.bindings in
    free
```
</ToggleWrapper>
</DocBlock>

