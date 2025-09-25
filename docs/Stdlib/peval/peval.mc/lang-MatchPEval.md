import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmMatch _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalEval" kind="sem">

```mc
sem pevalEval : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalEval ctx k =
  | TmMatch r ->
    pevalBind ctx
      (lam target.
        switch (target, tryMatch ctx.env target r.pat)
        case (TmNever r, _) then TmNever r
        case (_, Some env) then
          pevalBind { ctx with env = env } k r.thn
        case (!TmVar _, None _) then
          pevalBind ctx k r.els
        case _ then
          match freshPattern ctx.env r.pat with (env, pat) in
          let ctx = { ctx with recFlag = false } in
          k (TmMatch { r with
                       target = target,
                       pat = pat,
                       thn = pevalBind { ctx with env = env } (lam x. x) r.thn,
                       els = pevalBind ctx (lam x. x) r.els })
        end)
      r.target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="freshPattern" kind="sem">

```mc
sem freshPattern : Eval_EvalEnv -> Ast_Pat -> (Eval_EvalEnv, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem freshPattern env =
  | PatNamed (r & {ident = PName name}) ->
    let newname = nameSetNewSym name in
    let newvar = TmVar {
      ident = newname,
      ty = r.ty,
      info = r.info,
      frozen = false
    } in
    (evalEnvInsert name newvar env,
     PatNamed { r with ident = PName newname })
  | p -> smapAccumL_Pat_Pat freshPattern env p
```
</ToggleWrapper>
</DocBlock>

