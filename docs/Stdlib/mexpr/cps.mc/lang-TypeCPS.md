import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclType _}) ->
    TmDecl {x with inexpr = exprCps env k x.inexpr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprTyCps" kind="sem">

```mc
sem exprTyCps : CPSEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprTyCps env =
  | TmDecl {decl = DeclType _} & e -> smap_Expr_Type (tyCps env) e
```
</ToggleWrapper>
</DocBlock>

