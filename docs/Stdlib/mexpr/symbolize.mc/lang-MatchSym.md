import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr (env : SymEnv) =
  | TmMatch t ->
    match symbolizePat env (mapEmpty cmpString) t.pat with (thnVarEnv, pat) in
    let thnPatEnv = symbolizeUpdateVarEnv env (mapUnion env.currentEnv.varEnv thnVarEnv) in
    TmMatch {t with target = symbolizeExpr env t.target,
                    pat = pat,
                    thn = symbolizeExpr thnPatEnv t.thn,
                    els = symbolizeExpr env t.els}
```
</ToggleWrapper>
</DocBlock>

