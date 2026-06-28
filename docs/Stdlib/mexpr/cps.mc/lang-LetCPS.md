import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprTyCps" kind="sem">

```mc
sem exprTyCps : CPSEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprTyCps env =
  | TmDecl {decl = DeclLet _} & e -> smap_Expr_Type (tyCps env) e
```
</ToggleWrapper>
</DocBlock>

