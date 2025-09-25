import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordMakerLam  
  

Includes a check that a keyword cannot be used as a binding variable in a lambda

  
  
  
## Semantics  
  

          <DocBlock title="makeExprKeywords" kind="sem">

```mc
sem makeExprKeywords : [Ast_Expr] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem makeExprKeywords (args: [Expr]) =
  | TmLam r ->
     let ident = nameGetStr r.ident in
     match matchKeywordString r.info ident with Some _ then
       errorSingle [r.info] (join ["Keyword '", ident, "' cannot be used in a lambda expressions."])
     else TmLam {r with body = makeExprKeywords [] r.body}
```
</ToggleWrapper>
</DocBlock>

