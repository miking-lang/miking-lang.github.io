import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="tryMatch" kind="sem">

```mc
sem tryMatch : Eval_EvalEnv -> Ast_Expr -> Ast_Pat -> Option Eval_EvalEnv
```



<ToggleWrapper text="Code..">
```mc
sem tryMatch (env : EvalEnv) (t : Expr) =
  | PatCon {ident = ident, subpat = subpat, info = info} ->
    match t with TmConApp cn then
      if nameEqSymUnsafe ident cn.ident then
        tryMatch env cn.body subpat
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

