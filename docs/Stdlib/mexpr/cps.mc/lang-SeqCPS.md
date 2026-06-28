import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqCPS  
  

Thanks to ANF, we don't need to do anything at all when constructing data  
\(TmRecord, TmSeq, TmConApp, etc.\)

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclLet { body = TmSeq _ }}) ->
    TmDecl {x with inexpr = exprCps env k x.inexpr}
```
</ToggleWrapper>
</DocBlock>

