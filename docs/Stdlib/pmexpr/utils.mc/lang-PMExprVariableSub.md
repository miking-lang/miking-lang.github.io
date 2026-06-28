import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprVariableSub  
  

Substitutes all variables of the given expression with the expressions their  
names have been mapped to.

  
  
  
## Semantics  
  

          <DocBlock title="substituteVariables" kind="sem">

```mc
sem substituteVariables : Map Name (Info -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteVariables subMap =
  | TmVar t ->
    match mapLookup t.ident subMap with Some exprFn then
      exprFn t.info
    else TmVar t
  | t -> smap_Expr_Expr (substituteVariables subMap) t
```
</ToggleWrapper>
</DocBlock>

