import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmSeq {tms = ts2, ty = ty2} ->
    match lhs with TmSeq {tms = ts1, ty = ty1} then
      if eqi (length ts1) (length ts2) then
        let z = zipWith (lam t1. lam t2. (t1,t2)) ts1 ts2 in
        optionFoldlM (lam free. lam tp : (Expr, Expr). eqExprH env free tp.0 tp.1) free z
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

