import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetFreeVars  
  

  
  
  
## Semantics  
  

          <DocBlock title="freeVarsExpr" kind="sem">

```mc
sem freeVarsExpr : Set Name -> Ast_Expr -> Set Name
```



<ToggleWrapper text="Code..">
```mc
sem freeVarsExpr acc =
  | TmDecl {decl = DeclLet r, inexpr = inexpr} ->
    setRemove r.ident (freeVarsExpr (freeVarsExpr acc r.body) inexpr)
```
</ToggleWrapper>
</DocBlock>

