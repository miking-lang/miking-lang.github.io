import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemotePrintFloat  
  

  
  
  
## Semantics  
  

          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | TmPrintFloat t ->
    let tyuk = TyUnknown {info = t.info} in
    TmApp {
      lhs = TmConst {val = CPrint (), ty = tyuk, info = t.info},
      rhs = TmApp {
        lhs = TmConst {val = CFloat2string (), ty = tyuk, info = t.info},
        rhs = t.e, ty = tyuk, info = t.info},
      ty = tyuk, info = t.info}
```
</ToggleWrapper>
</DocBlock>

