import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmMatch t ->
    normalizeName
      (lam t2. k (TmMatch {{{t with target = t2}
                               with thn = normalizeTerm t.thn}
                               with els = normalizeTerm t.els}))
      t.target
```
</ToggleWrapper>
</DocBlock>

