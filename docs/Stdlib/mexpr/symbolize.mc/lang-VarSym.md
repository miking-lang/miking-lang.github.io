import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr (env : SymEnv) =
  | TmVar t ->
    let ident =
      getSymbol {kind = "variable",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.varEnv t.ident
    in
    TmVar {t with ident = ident}
```
</ToggleWrapper>
</DocBlock>

