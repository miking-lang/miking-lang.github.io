import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmDecl {decl = DeclRecLets _} -> true
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
  | TmDecl (x & {decl = DeclRecLets r}) ->
    recursive let envPrime : Int -> Lazy EvalEnv = lam n. lam.
      let wraplambda = lam bind.
        if geqi n ctx.maxRecDepth then TmVar {
          ident = bind.ident,
          info = bind.info,
          ty = bind.tyBody,
          frozen = false
        }
        else
          match bind.body with TmLam r then TmClosP {
            cls = {
              ident = r.ident,
              body = r.body,
              env = envPrime (succ n),
              info = r.info
            },
            ident = Some bind.ident,
            isRecursive = true
          }
          else
            errorSingle [infoTm bind.body]
              "Right-hand side of recursive let must be a lambda"
      in
      foldl
        (lam env. lam bind.
          evalEnvInsert bind.ident (wraplambda bind) env)
        ctx.env r.bindings
    in
    let bindings =
      map
        (lam bind. { bind with body = pevalBind ctx (lam x. x) bind.body })
        r.bindings
    in
    TmDecl {x with decl = DeclRecLets {r with bindings = bindings}
      , inexpr = pevalBindTop { ctx with env = envPrime 0 () } k x.inexpr
      }
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
  | TmDecl {decl = DeclRecLets _} ->
    error
      "Partial evaluation of non-top-level recursive let bindings is not safe"
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
  | TmDecl (x & {decl = DeclRecLets r}) ->
    let fv = setOfSeq nameCmp (map (lam bind. bind.ident) r.bindings) in
    match pevalReadbackH ctx x.inexpr with (inexprCtx, inexpr) in
    if
      forAll (lam bind. not (setMem bind.ident inexprCtx.freeVar)) r.bindings
    then
      (inexprCtx, inexpr)
    else
      let ctx = { inexprCtx with freeVar = setUnion inexprCtx.freeVar fv } in
    match
      mapAccumL
        (lam ctx. lam bind.
          match pevalReadbackH ctx bind.body with (bodyCtx, body) in
          (bodyCtx, { bind with body = body }))
        ctx
        r.bindings
      with (ctx, bindings)
    in
    (ctx, TmDecl {x with decl = DeclRecLets { r with bindings = bindings }, inexpr = inexpr })
```
</ToggleWrapper>
</DocBlock>

