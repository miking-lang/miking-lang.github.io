import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamANF  
  

Version analogous to AppANF, where each individual lambda is not name\-bound.

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmLam _ & t -> k (normalizeLams t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalizeLams" kind="sem">

```mc
sem normalizeLams : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalizeLams =
  | TmLam t -> TmLam { t with body = normalizeLams t.body }
  | t -> normalizeTerm t
```
</ToggleWrapper>
</DocBlock>

