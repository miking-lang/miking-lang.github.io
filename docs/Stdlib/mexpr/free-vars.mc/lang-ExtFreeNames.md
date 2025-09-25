import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtFreeNames  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeNamesExpr" kind="sem">

```mc
sem freeNamesExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeNamesExpr free =
  | TmDecl {decl = DeclExt x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = setRemove x.ident free in
    let free = freeNamesType free x.tyIdent in
    free
```
</ToggleWrapper>
</DocBlock>

