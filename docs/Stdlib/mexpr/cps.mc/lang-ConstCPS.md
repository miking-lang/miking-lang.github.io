import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclLet ({ ident = ident, body = TmConst { val = c } & body} & t)}) ->
    if not (transform env ident) then
      TmDecl {x with inexpr = exprCps env k x.inexpr}
    else
      if isHigherOrderFunType (tyConst c) then
        -- TODO(dlunde,2022-09-19): Add support for higher-order constant
        -- functions. Not sure how though, as constant functions are opaque
        -- (i.e., we cannot force them to accept CPS functions as argument)
        errorSingle [infoTm body]
          "Higher-order constant functions not yet supported in CPS transformation"
      else
        -- Constants are not in CPS, so we must wrap them in CPS lambdas
        let body = wrapDirect (constArity c) body in
        TmDecl {x with decl = DeclLet { t with body = body}, inexpr = exprCps env k x.inexpr}
```
</ToggleWrapper>
</DocBlock>

