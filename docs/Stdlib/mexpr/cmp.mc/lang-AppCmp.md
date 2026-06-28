import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  | (TmApp l, TmApp r) ->
    let lhsDiff = cmpExpr l.lhs r.lhs in
    if eqi lhsDiff 0 then cmpExpr l.rhs r.rhs
    else lhsDiff
```
</ToggleWrapper>
</DocBlock>

