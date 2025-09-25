import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclLet ({ ident = ident, body = TmMatch m } & b), inexpr = inexpr}) & t ->
    if not (transform env ident) then
      TmDecl {x with decl = DeclLet { b with
        body = TmMatch { m with
          thn = exprCps env (None ()) m.thn,
          els = exprCps env (None ()) m.els
        }},
        inexpr = exprCps env k inexpr
      }
    else
      let opt = match k with Some k then tailCall t else false in
      if opt then
        -- Optimize tail call with available continuation
        TmMatch { m with thn = exprCps env k m.thn, els = exprCps env k m.els }
      else
        let inexpr = exprCps env k inexpr in
        let kName = nameSym "k" in
        let i = withInfo (infoTm t) in
        let k = i (nulam_ ident inexpr) in
        bind_
          (declWithInfo (infoTm t) (nulet_ kName k))
          (TmMatch { m with
            thn = exprCps env (Some (i (nvar_ kName))) m.thn,
            els = exprCps env (Some (i (nvar_ kName))) m.els
          })
```
</ToggleWrapper>
</DocBlock>

