import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="apply" kind="sem">

```mc
sem apply : Eval_EvalCtx -> Info -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem apply ctx info =
  | (_, _) -> errorSingle [info] "Bad application"
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
  | TmApp r -> apply ctx r.info (eval ctx r.lhs, eval ctx r.rhs)
```
</ToggleWrapper>
</DocBlock>

