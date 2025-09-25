import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemoteReduce  
  

  
  
  
## Semantics  
  

          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | TmParallelReduce t ->
    let tyuk = TyUnknown {info = t.info} in
    TmApp {
      lhs = TmApp {
        lhs = TmApp {
          lhs = TmConst {val = CFoldl (), ty = tyuk, info = t.info},
          rhs = demoteParallel t.f, ty = tyuk, info = t.info},
        rhs = demoteParallel t.ne, ty = tyuk, info = t.info},
      rhs = demoteParallel t.as, ty = tyuk, info = t.info}
```
</ToggleWrapper>
</DocBlock>

