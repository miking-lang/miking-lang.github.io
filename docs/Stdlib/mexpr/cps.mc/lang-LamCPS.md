import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclLet ({ ident = ident, body = TmLam t } & r), inexpr = inexpr}) ->
    if not (or (transform env ident) (transform env t.ident)) then
      TmDecl
      {x with decl = DeclLet {r with body = TmLam { t with body = exprCps env (None ()) t.body }}
      , inexpr = exprCps env k inexpr
      }
    else
      let kName = nameSym "k" in
      let i = withInfo t.info in
      let body =
        i (nulam_ kName
             (TmLam {t with body = exprCps env (Some (i (nvar_ kName))) t.body}))
      in
      TmDecl {x with decl = DeclLet {r with body = body}, inexpr = exprCps env k inexpr }
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
  | TmLam _ & e -> smap_Expr_Type (tyCps env) e
```
</ToggleWrapper>
</DocBlock>

