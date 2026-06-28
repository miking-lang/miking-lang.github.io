import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv : Map Name Type) =
  | (TyInt _ & t1, TyInt _) -> Some t1
```
</ToggleWrapper>
</DocBlock>

