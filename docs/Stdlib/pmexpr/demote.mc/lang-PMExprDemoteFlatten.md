import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemoteFlatten  
  

  
  
  
## Semantics  
  

          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | TmFlatten t ->
    let tyuk = TyUnknown {info = t.info} in
    TmApp {
      lhs = TmApp {
        lhs = TmApp {
          lhs = TmConst {val = CFoldl (), ty = tyuk, info = t.info},
          rhs = TmConst {val = CConcat (), ty = tyuk, info = t.info},
          ty = tyuk, info = t.info},
        rhs = TmSeq {tms = [], ty = TySeq {ty = tyuk, info = t.info},
                     info = t.info},
        ty = tyuk, info = t.info},
      rhs = demoteParallel t.e,
      ty = tyuk, info = t.info}
```
</ToggleWrapper>
</DocBlock>

