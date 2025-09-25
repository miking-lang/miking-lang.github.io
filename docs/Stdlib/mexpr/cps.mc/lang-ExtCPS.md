import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtCPS  
  

  
  
  
## Semantics  
  

          <DocBlock title="exprCps" kind="sem">

```mc
sem exprCps : CPSEnv -> Option Ast_Expr -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem exprCps env k =
  | TmDecl {decl = DeclExt t} ->
    errorSingle [t.info]
      "Error in CPS: Should not happen due to ANF transformation"
  | TmDecl (x &
    { decl = DeclExt t
    , inexpr = TmDecl (x2 &
      { decl = DeclLet (tl &
        { ident = ident
        , body = TmLam _ | TmVar _
        })
      , inexpr = inexpr
      })
    }) ->
    if not (transform env ident) then
      TmDecl {x with inexpr = TmDecl {x2 with inexpr = exprCps env k inexpr}}
    else
      -- We know that ANF adds a let that eta expands the external just after its
      -- definition. Here, we simply replace this eta expansion with its CPS
      -- equivalent
      let arity = arityFunType t.tyIdent in
      let i = withInfo t.info in
      TmDecl
      { x with decl = DeclExt t
      , inexpr = bind_
        (declWithInfo t.info (nulet_ t.ident (wrapDirect arity (i (nvar_ t.ident)))))
        (exprCps env k inexpr)
      }
```
</ToggleWrapper>
</DocBlock>

