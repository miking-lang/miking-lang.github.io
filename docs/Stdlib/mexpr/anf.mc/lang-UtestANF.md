import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmDecl (x & { decl = DeclUtest t, inexpr = inexpr }) ->
    let tusing = optionMap normalizeTerm t.tusing in
    normalizeName
      (lam test.
         normalizeName
           (lam expected.
             let inner = lam pair.
               match pair with (tusing, tonfail) in
               TmDecl
               { x with inexpr = normalize k inexpr
               , decl = DeclUtest
                 { t with test = test
                 , expected = expected
                 , tusing = tusing
                 , tonfail = tonfail
                 }
               }
              in
             switch (t.tusing, t.tonfail)
             case (Some tusing, Some tonfail) then
               normalizeName
                 (lam tusing.
                   normalizeName
                     (lam tonfail. inner (Some tusing, Some tonfail))
                     tonfail)
                 tusing
             case (Some tusing, None ()) then
               normalizeName (lam tusing. inner (Some tusing, None ())) tusing
             case (None (), Some tonfail) then
               normalizeName (lam tonfail. inner (None (), Some tonfail)) tonfail
             case (None (), None ()) then inner (None (), None())
             end)
           t.expected)
      t.test
```
</ToggleWrapper>
</DocBlock>

