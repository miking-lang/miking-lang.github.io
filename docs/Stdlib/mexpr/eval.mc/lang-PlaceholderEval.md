import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PlaceholderEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="eval" kind="sem">

```mc
sem eval : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eval env =
  | TmPlaceholder {} ->
    TmConst {val = CInt {val = 0}, ty = TyInt {info = NoInfo ()}, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>

