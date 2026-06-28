import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmApp _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pevalApply" kind="sem">

```mc
sem pevalApply : Info -> PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pevalApply info ctx k =
  | (f, arg) -> k (app_ f arg)
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
  | TmApp r ->
    pevalBind ctx
      (lam lhs.
        pevalBind ctx
          (lam rhs. pevalApply r.info ctx k (lhs, rhs))
          r.rhs)
      r.lhs
```
</ToggleWrapper>
</DocBlock>

