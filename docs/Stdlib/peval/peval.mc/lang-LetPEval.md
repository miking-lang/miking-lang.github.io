import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmDecl {decl = DeclLet _} -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalBindTop" kind="sem">

```mc
sem pevalBindTop : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindTop ctx k =
  | TmDecl (x & {decl = DeclLet r}) ->
    pevalBind ctx
      (lam body.
        match body with TmClosP clspr then
          let ctx = {
            ctx with env =
              evalEnvInsert
                r.ident (TmClosP { clspr with ident = Some r.ident }) ctx.env
          } in
          TmDecl {x with decl = DeclLet { r with body = body }, inexpr = pevalBindTop ctx k x.inexpr }
        else
          if pevalBindThis body then
            TmDecl {x with decl = DeclLet { r with body = body }, inexpr = pevalBindTop ctx k x.inexpr }
          else
            pevalBindTop
              { ctx with env = evalEnvInsert r.ident body ctx.env } k x.inexpr)
      r.body
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
  | TmDecl (x & {decl = DeclLet r}) ->
    pevalBind ctx
      (lam body.
        if pevalBindThis body then
          TmDecl {x with decl = DeclLet { r with body = body }, inexpr = pevalBind ctx k x.inexpr }
        else
          pevalBind
            { ctx with env = evalEnvInsert r.ident body ctx.env } k x.inexpr)
      r.body
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
  | TmDecl (x & {decl = DeclLet r}) ->
    match pevalReadbackH ctx x.inexpr with (inexprCtx, inexpr) in
    match pevalReadbackH inexprCtx r.body with (ctx, body) in
    if setMem r.ident inexprCtx.freeVar then
      (ctx, TmDecl {x with decl = DeclLet { r with body = body }, inexpr = inexpr })
    else
      if exprHasSideEffect ctx.effectEnv body then
        (ctx, TmDecl {x with decl = DeclLet { r with body = body }, inexpr = inexpr })
      else
        (inexprCtx, inexpr)
```
</ToggleWrapper>
</DocBlock>

