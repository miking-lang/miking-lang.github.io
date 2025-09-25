import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclLet ({ ident = ident, body = TmApp app} & b), inexpr = inexpr }) & t ->
    if not (transform env ident) then
      TmDecl {x with inexpr = exprCps env k inexpr}
    else
      let i = withInfo (infoTm t) in
      let opt =
        match k with Some k then
          if tailCall t then Some k
          else None ()
        else None () in
      match opt with Some k then
        -- Optimize tail call with available continuation
        i (appf2_ app.lhs k app.rhs)
      else
        let inexpr = exprCps env k inexpr in
        let kName = nameSym "k" in
        let k = i (nulam_ ident inexpr) in
        bind_
          (declWithInfo (infoTm t) (nulet_ kName k))
          (i (appf2_ app.lhs (i (nvar_ kName)) app.rhs))
```
</ToggleWrapper>
</DocBlock>

