import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmDecl {decl = DeclType x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = freeNamesType free x.tyIdent in
    let free = foldr setRemove free x.params in
    let free = setRemove x.ident free in
    free
```
</ToggleWrapper>
</DocBlock>

