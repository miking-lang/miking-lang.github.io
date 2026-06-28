import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TyUseSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyUse t ->
    match mapLookup (nameGetStr t.ident) env.langEnv with Some langEnv
      then
        symbolizeType (updateEnv env langEnv) t.inty
      else
        symLookupError
          env.langEnv
          {kind = "language", info = [t.info], allowFree = false}
          t.ident
```
</ToggleWrapper>
</DocBlock>

