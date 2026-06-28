import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="tryMatch" kind="sem">

```mc
sem tryMatch : Eval_EvalEnv -> Ast_Expr -> Ast_Pat -> Option Eval_EvalEnv
```



<ToggleWrapper text="Code..">
```mc
sem tryMatch (env : EvalEnv) (t : Expr) =
  | PatSeqEdge {prefix = pre, middle = middle, postfix = post} ->
    match t with TmSeq (r & {tms = tms}) then
      if geqi (length tms) (addi (length pre) (length post)) then
        match splitAt tms (length pre) with (preTm, tms) then
        match splitAt tms (subi (length tms) (length post)) with (tms, postTm)
        then
        let pair = lam a. lam b. (a, b) in
        let paired = zipWith pair (concat preTm postTm) (concat pre post) in
        let env =
          optionFoldlM
            (lam env. lam pair : (Expr,Pat). tryMatch env pair.0 pair.1)
            env
            paired
        in
        match middle with PName name then
          optionMap (evalEnvInsert name (TmSeq { r with tms = tms })) env
        else match middle with PWildcard () then
          env
        else never else never else never
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

