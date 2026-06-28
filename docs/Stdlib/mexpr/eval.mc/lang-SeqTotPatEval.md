import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTotPatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="tryMatch" kind="sem">

```mc
sem tryMatch : Eval_EvalEnv -> Ast_Expr -> Ast_Pat -> Option Eval_EvalEnv
```



<ToggleWrapper text="Code..">
```mc
sem tryMatch (env : EvalEnv) (t : Expr) =
  | PatSeqTot {pats = pats} ->
    match t with TmSeq {tms = tms} then
      if eqi (length tms) (length pats) then
        optionFoldlM
          (lam env. lam pair : (Expr,Pat). tryMatch env pair.0 pair.1)
          env
          (zipWith (lam a. lam b. (a, b)) tms pats)
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

