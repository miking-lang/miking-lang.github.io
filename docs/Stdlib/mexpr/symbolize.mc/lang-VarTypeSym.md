import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyVar t ->
    let ident =
      getSymbol {kind = "type variable",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.tyVarEnv t.ident
    in
    TyVar {t with ident = ident}
```
</ToggleWrapper>
</DocBlock>

