import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  | (TmDecl l, TmDecl r) ->
    let res = cmpDecl l.decl r.decl in
    if neqi res 0 then res else
    cmpExpr l.inexpr r.inexpr
```
</ToggleWrapper>
</DocBlock>

