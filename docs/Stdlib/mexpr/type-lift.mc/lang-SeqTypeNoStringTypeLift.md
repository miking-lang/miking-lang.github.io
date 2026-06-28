import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqTypeNoStringTypeLift  
  

Type lifting, but leave strings = \[char\] intact \(not added as default in MExprTypeLift\).

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftType" kind="sem">

```mc
sem typeLiftType : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftType (env : TypeLiftEnv) =
  | TySeq {info = _, ty = TyChar _} & ty -> (env,ty)
```
</ToggleWrapper>
</DocBlock>

