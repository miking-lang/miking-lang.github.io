import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmDecl {decl = DeclUtest _} -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalEval" kind="sem">

```mc
sem pevalEval : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalEval ctx k =
  | TmDecl (x & {decl = DeclUtest t}) ->
    pevalBind ctx
      (lam test.
         pevalBind ctx
           (lam expected.
             let inner = lam pair.
               match pair with (tusing, tonfail) in
               TmDecl
               {x with decl = DeclUtest
                 { t with test = test
                 , expected = expected
                 , tusing = tusing
                 , tonfail = tonfail
                 }
               , inexpr = pevalBind ctx k x.inexpr
               } in
             switch (t.tusing, t.tonfail)
             case (Some tusing, Some tonfail) then
               pevalBind ctx
                 (lam tusing.
                   pevalBind ctx
                     (lam tonfail. inner (Some tusing, Some tonfail))
                     tonfail)
                 tusing
             case (Some tusing, None ()) then
               pevalBind ctx (lam tusing. inner (Some tusing, None ())) tusing
             case (None (), Some tonfail) then
               pevalBind ctx (lam tonfail. inner (None (), Some tonfail)) tonfail
             case (None (), None ()) then inner (None (), None ())
             end)
           t.expected)
      t.test
```
</ToggleWrapper>
</DocBlock>

