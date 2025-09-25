import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprANF  
  

The default ANF transformation for MExpr. Only lifts non\-values, and does  
not lift individual terms in sequences of lambdas or applications.

  
  
  
## Semantics  
  

          <DocBlock title="liftANF" kind="sem">

```mc
sem liftANF : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem liftANF =
  | TmLam _ -> false
  | TmConst _ -> false
  | TmNever _ -> false
  | TmRecord r ->
    if mapIsEmpty r.bindings then false
    else true
```
</ToggleWrapper>
</DocBlock>

