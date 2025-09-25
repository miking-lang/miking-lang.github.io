import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpExprH" kind="sem">

```mc
sem cmpExprH : (Ast_Expr, Ast_Expr) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpExprH =
  | (TmConApp l, TmConApp r) ->
    let identDiff = nameCmp l.ident r.ident in
    if eqi identDiff 0 then cmpExpr l.body r.body
    else identDiff
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpDeclH" kind="sem">

```mc
sem cmpDeclH : (Ast_Decl, Ast_Decl) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpDeclH =
  | (DeclConDef l, DeclConDef r) ->
    let identDiff = nameCmp l.ident r.ident in
    if eqi identDiff 0 then
      cmpType l.tyIdent r.tyIdent
    else identDiff
```
</ToggleWrapper>
</DocBlock>

