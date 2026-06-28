import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : all a. (Ast_Expr -> Ast_Expr) -> Ast_Expr -> a
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmConApp t ->
    normalizeName
      (lam b. k (TmConApp {t with body = b})) t.body
```
</ToggleWrapper>
</DocBlock>

