import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorTypeTypeLift  
  

Optional type lifting of tensors \(not added to MExprTypeLift by default\)

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftType" kind="sem">

```mc
sem typeLiftType : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftType (env : TypeLiftEnv) =
  | TyTensor ({info = info, ty = innerTy} & r) ->
    match typeLiftType env innerTy with (env, innerTy) in
    addTensorToEnv env (TyTensor {r with ty = innerTy})
```
</ToggleWrapper>
</DocBlock>

