import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PEvalApply  
  

  
  
  
## Semantics  
  

          <DocBlock title="pevalApply" kind="sem">

```mc
sem pevalApply : Info -> PEvalCtx_PEvalCtx -> (Ast_Expr -> Ast_Expr) -> (Ast_Expr, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem pevalApply : Info -> PEvalCtx -> (Expr -> Expr) -> (Expr, Expr) -> Expr
```
</ToggleWrapper>
</DocBlock>

