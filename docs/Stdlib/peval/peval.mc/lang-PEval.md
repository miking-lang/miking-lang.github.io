import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="peval" kind="sem">

```mc
sem peval : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem peval =| t -> pevalExpr (pevalCtxEmpty ()) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalExpr" kind="sem">

```mc
sem pevalExpr : PEvalCtx_PEvalCtx -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalExpr ctx =| t -> pevalReadback (pevalBindTop ctx (lam x. x) t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalWithEnv" kind="sem">

```mc
sem pevalWithEnv : Eval_EvalEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalWithEnv env =
  | ast ->
    let ctx = {pevalCtxEmpty () with env = env} in
    pevalExpr ctx ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | t ->
    errorSingle [infoTm t] (join ["pevalBindThis: undefined for:\n", expr2str t])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalBindTop" kind="sem">

```mc
sem pevalBindTop : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`Entry point for top\-level expressions, the default case is that this  
function calls \`pevalBind\`No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalBindTop ctx k =| t -> pevalBind ctx k t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalBind" kind="sem">

```mc
sem pevalBind : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`Entry point for partial evaluation of non top\-level expressionsNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalBind ctx k =| t ->
    pevalEval ctx
      (lam t.
        if pevalBindThis t then
          let b = astBuilder (infoTm t) in
          let ident = nameSym "t" in
          bind_ (b.nulet ident t) (k (b.var ident))
        else
          k t)
      t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalEval" kind="sem">

```mc
sem pevalEval : PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalEval ctx k =
  | t -> errorSingle [infoTm t] (join ["peval: undefined for:\n", expr2str t])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalReadback" kind="sem">

```mc
sem pevalReadback : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalReadback =| t -> pevalReadbackExpr (pevalCtxEmpty ()) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalReadbackExpr" kind="sem">

```mc
sem pevalReadbackExpr : PEvalCtx_PEvalCtx -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalReadbackExpr ctx =| t -> (pevalReadbackH ctx t).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalReadbackH" kind="sem">

```mc
sem pevalReadbackH : PEvalCtx_PEvalCtx -> Ast_Expr -> (PEvalCtx_PEvalCtx, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalReadbackH ctx =| t -> smapAccumL_Expr_Expr pevalReadbackH ctx t
```
</ToggleWrapper>
</DocBlock>

