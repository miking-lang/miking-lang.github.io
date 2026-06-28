import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstEvalNoDefault  
  

  
  
  
## Semantics  
  

          <DocBlock title="apply" kind="sem">

```mc
sem apply : Eval_EvalCtx -> Info -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem apply ctx info =
  | (TmConst r, arg) -> delta info (r.val, [arg])
  | (TmConstApp r, arg) -> delta info (r.const, snoc r.args arg)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval ctx =
  | TmConst {val = CArgv {}, info = info} ->
    TmSeq {tms = map str_ argv, ty = tyunknown_, info = info}
  | TmConst c -> TmConst c
```
</ToggleWrapper>
</DocBlock>

