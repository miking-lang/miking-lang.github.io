import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmRecord t ->
    let bindings = mapMap (typeCheckExpr env) t.bindings in
    let bindingTypes = mapMap tyTm bindings in
    let ty = TyRecord {fields = bindingTypes, info = t.info} in
    TmRecord {t with bindings = bindings, ty = ty}
```
</ToggleWrapper>
</DocBlock>

