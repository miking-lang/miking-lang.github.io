import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TensorCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv : Map Name Type) =
  | (TyTensor t1, TyTensor t2) ->
    match compatibleType tyEnv t1.ty t2.ty with Some t then
      Some (TyTensor {t1 with ty = t})
    else None ()
```
</ToggleWrapper>
</DocBlock>

