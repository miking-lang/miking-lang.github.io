import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsANFBase  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  -- We do not allow lifting things outside of reclets, since they might
  -- inductively depend on what is being defined.
  | TmDecl (x & { decl = DeclRecLets t, inexpr = inexpr }) ->
    let bindings = map (
      lam b: DeclLetRecord. { b with body =
        match b.body with TmLam _ & t then normalizeLams t
        else errorSingle [infoTm b.body]
          "Error: Not a TmLam in TmRecLet binding in ANF transformation"
      }
    )
    t.bindings in
    TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = normalize k inexpr}
```
</ToggleWrapper>
</DocBlock>

