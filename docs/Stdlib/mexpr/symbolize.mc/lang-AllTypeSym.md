import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllTypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeType" kind="sem">

```mc
sem symbolizeType : SymEnv -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeType env =
  | TyAll t ->
    let kind = symbolizeKind t.info env t.kind in
    match setSymbol env.currentEnv.tyVarEnv t.ident with (tyVarEnv, ident) in
    TyAll {t with ident = ident,
                  ty = symbolizeType (symbolizeUpdateTyVarEnv env tyVarEnv) t.ty,
                  kind = kind}
```
</ToggleWrapper>
</DocBlock>

