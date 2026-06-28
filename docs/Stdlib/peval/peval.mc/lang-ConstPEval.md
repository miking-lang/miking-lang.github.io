import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalReadbackH" kind="sem">

```mc
sem pevalReadbackH : PEvalCtx_PEvalCtx -> Ast_Expr -> (PEvalCtx_PEvalCtx, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem pevalReadbackH ctx =
  | TmConstApp r ->
    match mapAccumL pevalReadbackH ctx r.args with (ctx, args) in
    let b = astBuilder r.info in
    (ctx, b.appSeq (b.uconst r.const) args)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmConst _ -> false
  | TmConstApp _ -> false
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
  | t & (TmConst _ | TmConstApp _) -> k t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (const, args) ->
    if lti (length args) (constArity const) then
      -- Accumulate arguments if still not a complete application
      TmConstApp {const = const, args = args, info = info}
    else
      -- No available pattern, don't do any partial evaluation
      let b = astBuilder info in
      b.appSeq (b.uconst const) args
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
  | (TmConst r, arg) -> k (delta info (r.val, [arg]))
  | (TmConstApp r, arg) -> k (delta info (r.const, snoc r.args arg))
```
</ToggleWrapper>
</DocBlock>

