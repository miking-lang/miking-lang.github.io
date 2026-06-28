import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmDecl (x & { decl = DeclLet t, inexpr = inexpr }) ->
    normalize
      (lam n1. TmDecl {x with decl = DeclLet {t with body = n1}, inexpr = normalizeName k inexpr})
      t.body
```
</ToggleWrapper>
</DocBlock>

