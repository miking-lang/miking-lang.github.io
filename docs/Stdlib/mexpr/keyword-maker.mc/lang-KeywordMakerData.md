import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordMakerData  
  

Support for keywords starting with capital letter. Uses ConApp and ConDef

  
  
  
## Semantics  
  

          <DocBlock title="makeExprKeywords" kind="sem">

```mc
sem makeExprKeywords : [Ast_Expr] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem makeExprKeywords (args: [Expr]) =
  | TmConApp r ->
     let ident = nameGetStr r.ident in
     match matchKeywordString r.info ident with Some n then
       match n with (noArgs, f) then
         let args = cons r.body args in
         if eqi noArgs (length args) then f args
         else makeKeywordError r.info noArgs (length args) ident
       else never
     else TmConApp r
  | TmDecl (x & {decl = DeclConDef r}) ->
     let ident = nameGetStr r.ident in
     match matchKeywordString r.info ident with Some _ then
       errorSingle [r.info] (join ["Keyword '", ident,
       "' cannot be used in a constructor definition."])
     else TmDecl {x with inexpr = makeExprKeywords [] x.inexpr}
```
</ToggleWrapper>
</DocBlock>

