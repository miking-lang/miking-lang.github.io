import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PropagateArrowLambda  
  

  
  
  
## Semantics  
  

          <DocBlock title="propagateExpectedType" kind="sem">

```mc
sem propagateExpectedType : Map Name Ast_Type -> (Ast_Type, Ast_Expr) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem propagateExpectedType (tyEnv : Map Name Type) =
  | (TyArrow {from = from, to = to}, TmLam t) ->
    match compatibleType tyEnv from t.tyParam with Some ty then
      TmLam {t with tyParam = ty,
                    body = propagateExpectedType tyEnv (to, t.body)}
    else
      let msg = join [
        "Inconsistent type annotation of let-expression and lambda\n",
        "Type from let: ", _pprintType from, "\n",
        "Type from lambda: ", _pprintType t.tyParam
      ] in
      errorSingle [t.info] msg
```
</ToggleWrapper>
</DocBlock>

