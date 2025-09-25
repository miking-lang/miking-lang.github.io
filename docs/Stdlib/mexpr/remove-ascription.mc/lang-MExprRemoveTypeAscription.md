import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprRemoveTypeAscription  
  

  
  
  
## Semantics  
  

          <DocBlock title="removeTypeAscription" kind="sem">

```mc
sem removeTypeAscription : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem removeTypeAscription =
  | (TmDecl {decl = DeclLet {ident = idLet, body = body}, inexpr = TmVar {ident = idExpr}}) & letexpr ->
    if nameEq idLet idExpr then
      removeTypeAscription body
    else smap_Expr_Expr removeTypeAscription letexpr
  | expr -> smap_Expr_Expr removeTypeAscription expr
```
</ToggleWrapper>
</DocBlock>

