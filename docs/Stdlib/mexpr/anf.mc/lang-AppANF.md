import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppANF  
  

Version that simplifies multiple\-argument applications by not binding every  
intermediate closure to a variable.

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmApp t -> normalizeNames k (TmApp t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalizeNames" kind="sem">

```mc
sem normalizeNames : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalizeNames (k : Expr -> Expr) =
  | TmApp t ->
    normalizeNames
      (lam l. normalizeName (lam r. k (TmApp {{t with lhs = l}
                                                 with rhs = r})) t.rhs)
      t.lhs
  | t -> normalizeName k t
```
</ToggleWrapper>
</DocBlock>

