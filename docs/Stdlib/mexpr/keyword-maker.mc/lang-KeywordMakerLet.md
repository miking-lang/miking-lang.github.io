import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordMakerLet  
  

Includes a check that a keyword cannot be used as a binding variable in a let expression

  
  
  
## Semantics  
  

          <DocBlock title="makeExprKeywords" kind="sem">

```mc
sem makeExprKeywords : [Ast_Expr] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem makeExprKeywords (args: [Expr]) =
  | TmDecl (x & {decl = DeclLet r}) ->
     let ident = nameGetStr r.ident in
     match matchKeywordString r.info ident with Some _ then
       errorSingle [r.info] (join ["Keyword '", ident, "' cannot be used in a let expressions."])
     else
       TmDecl
       {x with decl = DeclLet {r with body = makeExprKeywords [] r.body}
       , inexpr = makeExprKeywords [] x.inexpr
       }
```
</ToggleWrapper>
</DocBlock>

