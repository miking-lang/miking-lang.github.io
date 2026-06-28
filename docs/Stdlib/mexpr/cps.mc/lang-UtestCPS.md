import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestCPS  
  

Not much needs to be done here thanks to ANF

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclUtest t}) ->
    TmDecl {x with inexpr = exprCps env k x.inexpr}
```
</ToggleWrapper>
</DocBlock>

