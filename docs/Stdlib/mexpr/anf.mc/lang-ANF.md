import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="liftANF" kind="sem">

```mc
sem liftANF : Ast_Expr -> Bool
```

<Description>{`By default, everything is lifted \(except variables\)`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftANF =
  | TmVar _ -> false
  | t /- : Expr -/ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalizeTerm" kind="sem">

```mc
sem normalizeTerm : all a. all a1. a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem normalizeTerm =
  | m -> normalizeName (lam x. x) m
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : all a. all a1. (Ast_Expr -> Ast_Expr) -> a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="bind" kind="sem">

```mc
sem bind : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem bind (k : Expr -> Expr) =
  | n ->
    let ident = nameSym "t" in
    let var = TmVar {
      ident = ident,
      ty = tyTm n,
      info = infoTm n,
      frozen = false
    } in
    let inexpr = k var in
    TmDecl
    { decl = DeclLet
      { ident = ident
      , tyAnnot = TyUnknown {info = infoTm n}
      , tyBody = tyTm n
      , body = n
      , info = infoTm n
      }
    , inexpr = inexpr
    , ty = tyTm inexpr
    , info = infoTm n
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalizeName" kind="sem">

```mc
sem normalizeName : all a. all a1. (Ast_Expr -> Ast_Expr) -> a -> a1
```



<ToggleWrapper text="Code..">
```mc
sem normalizeName (k : Expr -> Expr) =
  | m -> normalize (lam n. if (liftANF n) then bind k n else k n) m
```
</ToggleWrapper>
</DocBlock>

