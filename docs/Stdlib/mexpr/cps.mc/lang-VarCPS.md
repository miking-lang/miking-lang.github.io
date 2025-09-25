import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmVar _ & t ->
    match k with Some k then withInfo (infoTm t) (app_ k t) else t
  | TmDecl (x & {decl = DeclLet ({ body = TmVar _ } & b)}) ->
    TmDecl {x with inexpr = exprCps env k x.inexpr}
```
</ToggleWrapper>
</DocBlock>

