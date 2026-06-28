import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolPatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="tryMatch" kind="sem">

```mc
sem tryMatch : Eval_EvalEnv -> Ast_Expr -> Ast_Pat -> Option Eval_EvalEnv
```



<ToggleWrapper text="Code..">
```mc
sem tryMatch (env : EvalEnv) (t : Expr) =
  | PatBool b ->
    let xnor = lam x. lam y. or (and x y) (and (not x) (not y)) in
    match t with TmConst c then
      match c.val with CBool b2 then
        if xnor b.val b2.val then Some env else None ()
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

