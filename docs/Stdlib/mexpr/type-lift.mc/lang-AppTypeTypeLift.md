import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppTypeTypeLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftType" kind="sem">

```mc
sem typeLiftType : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftType (env : TypeLiftEnv) =
  | TyApp t -> typeLiftType env t.lhs
```
</ToggleWrapper>
</DocBlock>

