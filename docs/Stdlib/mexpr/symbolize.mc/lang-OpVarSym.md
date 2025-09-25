import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OpVarSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr env =
  | TmOpVar x ->
    let ident = getSymbol
      { kind = "variable"
      , info = [x.info]
      , allowFree = env.allowFree
      }
      env.currentEnv.varEnv
      x.ident in
    TmOpVar {x with ident = ident}
```
</ToggleWrapper>
</DocBlock>

