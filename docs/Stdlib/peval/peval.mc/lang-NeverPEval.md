import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NeverPEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalBindThis" kind="sem">

```mc
sem pevalBindThis : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem pevalBindThis =
  | TmNever _ -> false
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
  | t & TmNever _ -> k t
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
  | (t & TmNever _, _) -> k t
```
</ToggleWrapper>
</DocBlock>

