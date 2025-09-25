import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="reduceType" kind="sem">

```mc
sem reduceType : Map Name Ast_Type -> Ast_Type -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem reduceType (tyEnv : Map Name Type) =
  | TyAll t -> Some t.ty
```
</ToggleWrapper>
</DocBlock>

