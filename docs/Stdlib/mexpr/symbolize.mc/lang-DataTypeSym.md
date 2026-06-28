import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyData t ->
    let cons =
      setFold (lam ks. lam k.
        setInsert
          (getSymbol {kind = "constructor",
                      info = [t.info],
                      allowFree = env.allowFree}
             env.currentEnv.conEnv k) ks)
        (setEmpty nameCmp) t.cons
    in TyData {t with cons = cons}
```
</ToggleWrapper>
</DocBlock>

