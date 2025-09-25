import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option EqEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmVar r ->
    match lhs with TmVar l then
      match (env,free) with ({varEnv = varEnv},{varEnv = freeVarEnv}) in
      match _eqCheck l.ident r.ident varEnv freeVarEnv with Some freeVarEnv then
        Some {free with varEnv = freeVarEnv}
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

