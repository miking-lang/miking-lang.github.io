import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="tryMatch" kind="sem">

```mc
sem tryMatch : Eval_EvalEnv -> Ast_Expr -> Ast_Pat -> Option Eval_EvalEnv
```



<ToggleWrapper text="Code..">
```mc
sem tryMatch (env : EvalEnv) (t : Expr) =
  | PatRecord r ->
    match t with TmRecord {bindings = bs} then
      let f : Option Pat -> Option Expr -> Option (EvalEnv -> Option EvalEnv) =
        lam pat. lam val.
        match pat with Some p then
          match val with Some v then
            Some (lam env. tryMatch env v p)
          else None ()
        else None ()
      in
      mapFoldlOption
        (lam env. lam. lam f. f env)
        env
        (mapMerge f r.bindings bs)
    else None ()
```
</ToggleWrapper>
</DocBlock>

