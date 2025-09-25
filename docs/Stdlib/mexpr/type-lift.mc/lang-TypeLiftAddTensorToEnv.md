import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeLiftAddTensorToEnv  
  

  
  
  
## Semantics  
  

          <DocBlock title="addTensorToEnv" kind="sem">

```mc
sem addTensorToEnv : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem addTensorToEnv (env : TypeLiftEnv) =
  | TyTensor {info = info, ty = innerTy} & ty ->
    match mapLookup innerTy env.tensors with Some name then
      let tycon = nitycon_ name info in
      (env, tycon)
    else
      let name = nameSym "Tensor" in
      let tycon = nitycon_ name info in
      let env = {{env with tensors = mapInsert innerTy name env.tensors}
                      with typeEnv = assocSeqInsert name ty env.typeEnv}
      in
      (env, tycon)
```
</ToggleWrapper>
</DocBlock>

