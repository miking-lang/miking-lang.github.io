import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppANFAll  
  

Version that lifts out each individual application

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmApp t ->
    normalizeName (lam l.
      normalizeName (lam r.
        k (TmApp {{t with lhs = l}
                     with rhs = r})
        )
      t.rhs)
    t.lhs
```
</ToggleWrapper>
</DocBlock>

