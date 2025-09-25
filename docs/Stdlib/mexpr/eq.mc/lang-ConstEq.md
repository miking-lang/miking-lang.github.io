import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option EqEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmConst {val = v2} ->
    match lhs with TmConst {val = v1} then
      if eqConst v1 v2 then Some free else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

