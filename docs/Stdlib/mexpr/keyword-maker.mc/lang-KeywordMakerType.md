import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordMakerType  
  

  
  
  
## Semantics  
  

          <DocBlock title="makeExprKeywords" kind="sem">

```mc
sem makeExprKeywords : [Ast_Expr] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem makeExprKeywords (args: [Expr]) =
  | TmDecl (x & {decl = DeclType r}) ->
     let ident = nameGetStr r.ident in
     match matchTypeKeywordString r.info ident with Some _ then
       errorSingle [r.info] (join ["Type keyword '", ident,
       "' cannot be used in a type definition."])
     else TmDecl {x with inexpr = makeExprKeywords [] x.inexpr}
```
</ToggleWrapper>
</DocBlock>

