import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmVar t -> k (TmVar t)
```
</ToggleWrapper>
</DocBlock>

