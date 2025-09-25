import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr (env : SymEnv) =
  | TmLam t ->
    match setSymbol env.currentEnv.varEnv t.ident with (varEnv, ident) in
    TmLam {t with ident = ident,
                  tyAnnot = symbolizeType env t.tyAnnot,
                  body = symbolizeExpr (symbolizeUpdateVarEnv env varEnv) t.body}
```
</ToggleWrapper>
</DocBlock>

