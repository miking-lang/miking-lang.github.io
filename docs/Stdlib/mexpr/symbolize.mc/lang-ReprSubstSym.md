import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ReprSubstSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TySubst x ->
    let arg = symbolizeType env x.arg in
    let subst = getSymbol
      { kind = "repr"
      , info = [x.info]
      , allowFree = env.allowFree
      }
      env.currentEnv.reprEnv
      x.subst in
    TySubst {x with arg = arg, subst = subst}
```
</ToggleWrapper>
</DocBlock>

