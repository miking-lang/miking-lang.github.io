import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let bindings = map (lam b: DeclLetRecord. { b with body =
        match b.body with TmLam t then
          if not (or (transform env b.ident) (transform env t.ident)) then
            TmLam { t with body = exprCps env (None ()) t.body }
          else
            let kName = nameSym "k" in
            let i = withInfo t.info in
            i (nulam_ kName
                 (TmLam { t with body = exprCps env (Some (i (nvar_ kName))) t.body }))
        else errorSingle [infoTm b.body]
          "Error: Not a TmLam in TmRecLet binding in CPS transformation"
      }) t.bindings
    in TmDecl {x with decl = DeclRecLets { t with bindings = bindings}, inexpr = exprCps env k x.inexpr}
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
  | TmDecl {decl = DeclRecLets _} & e -> smap_Expr_Type (tyCps env) e
```
</ToggleWrapper>
</DocBlock>

