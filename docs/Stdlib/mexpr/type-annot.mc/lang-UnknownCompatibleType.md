import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnknownCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv: Map Name Type) =
  | (TyUnknown _ & ty1, TyUnknown _) -> Some ty1
  | (TyUnknown _, ! TyUnknown _ & ty2) -> Some ty2
  | (! TyUnknown _ & ty1, TyUnknown _) -> Some ty1
```
</ToggleWrapper>
</DocBlock>

