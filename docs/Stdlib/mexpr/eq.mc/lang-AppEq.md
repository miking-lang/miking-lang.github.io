import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmApp r ->
    match lhs with TmApp l then
      match eqExprH env free l.lhs r.lhs with Some free then
        eqExprH env free l.rhs r.rhs
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

