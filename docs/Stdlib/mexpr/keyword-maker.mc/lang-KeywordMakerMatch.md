import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordMakerMatch  
  

Includes a check that a keyword cannot be used inside a pattern \(inside match\)

  
  
  
## Semantics  
  

          <DocBlock title="matchKeywordPat" kind="sem">

```mc
sem matchKeywordPat : Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem matchKeywordPat =
  | PatNamed r ->
      match r.ident with PName name then
        let ident = nameGetStr name in
        match matchKeywordString r.info ident with Some _ then
          errorSingle [r.info] (join ["Keyword '", ident, "' cannot be used inside a pattern."])
        else PatNamed r
      else PatNamed r
  | pat -> smap_Pat_Pat matchKeywordPat pat
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="makeExprKeywords" kind="sem">

```mc
sem makeExprKeywords : [Ast_Expr] -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem makeExprKeywords (args: [Expr]) =
  | TmMatch r ->
      TmMatch {{{{r with target = makeExprKeywords [] r.target}
                    with pat = matchKeywordPat r.pat}
                    with thn = makeExprKeywords [] r.thn}
                    with els = makeExprKeywords [] r.els}
```
</ToggleWrapper>
</DocBlock>

