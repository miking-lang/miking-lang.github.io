import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsFreeVars  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeVarsExpr" kind="sem">

```mc
sem freeVarsExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeVarsExpr acc =
  | TmDecl {decl = DeclRecLets r, inexpr = inexpr} ->
    let acc = foldl (lam acc. lam b.
      freeVarsExpr acc b.body) (freeVarsExpr acc inexpr) r.bindings in
    foldl (lam acc. lam b. setRemove b.ident acc) acc r.bindings
```
</ToggleWrapper>
</DocBlock>

