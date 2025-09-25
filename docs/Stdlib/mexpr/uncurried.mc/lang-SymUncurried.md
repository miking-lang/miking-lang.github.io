import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymUncurried  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr env =
  | TmUncurriedLam x ->
    let f = lam varEnv. lam param.
      match setSymbol varEnv param.ident with (varEnv, ident) in
      (varEnv, {param with ident = ident, tyAnnot = symbolizeType env param.tyAnnot}) in
    match mapAccumL f env.currentEnv.varEnv x.positional with (varEnv, positional) in
    let env = symbolizeUpdateVarEnv env varEnv in
    TmUncurriedLam {x with positional = positional, body = symbolizeExpr env x.body}
```
</ToggleWrapper>
</DocBlock>

