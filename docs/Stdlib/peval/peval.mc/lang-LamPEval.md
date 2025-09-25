import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmClosP _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalApply" kind="sem">

```mc
sem pevalApply : Info -> PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalApply info ctx k =
  | (TmClosP r, arg) ->
    if and (and (not ctx.recFlag) r.isRecursive) (optionIsSome r.ident) then
      let ident = optionGetOrElse (lam. error "impossible") r.ident in
      let b = astBuilder r.cls.info in k (b.app (b.var ident) arg)
    else
      let env = evalEnvInsert r.cls.ident arg (r.cls.env ()) in
      pevalEval { ctx with env = env } k r.cls.body
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
  | TmLam r ->
    let cls =
      { ident = r.ident, body = r.body, env = lam. ctx.env, info = r.info }
    in
    k (TmClosP {
      cls = cls, ident = None (), isRecursive = false
    })
  | TmClosP r -> k (TmClosP r)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalReadbackH" kind="sem">

```mc
sem pevalReadbackH : PEvalCtx_PEvalCtx -> Ast_Expr -> (PEvalCtx_PEvalCtx, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem pevalReadbackH ctx =
  | TmClosP r ->
    let b = astBuilder r.cls.info in
    match r.ident with Some ident then
      ({ ctx with freeVar = setInsert ident ctx.freeVar }, b.var ident)
    else
      let newident = nameSetNewSym r.cls.ident in
      let env = evalEnvInsert r.cls.ident (b.var newident) (r.cls.env ()) in
      match
        pevalReadbackH ctx
          (pevalBind { ctx with env = env } (lam x. x) r.cls.body)
        with (ctx, body)
      in
      (ctx, b.nulam newident body)
```
</ToggleWrapper>
</DocBlock>

