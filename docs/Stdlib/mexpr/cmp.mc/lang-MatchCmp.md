import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  | (TmMatch l, TmMatch r) ->
    let targetDiff = cmpExpr l.target r.target in
    if eqi targetDiff 0 then
      let patDiff = cmpPat l.pat r.pat in
      if eqi patDiff 0 then
        let thnDiff = cmpExpr l.thn r.thn in
        if eqi thnDiff 0 then cmpExpr l.els r.els
        else thnDiff
      else patDiff
    else targetDiff
```
</ToggleWrapper>
</DocBlock>

