import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypeTypeLift  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeLiftType" kind="sem">

```mc
sem typeLiftType : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem typeLiftType (env : TypeLiftEnv) =
  | TyRecord ({fields = fields} & r) & ty ->
    if eqi (mapLength fields) 0 then
      (env, ty)
    else
      let f = lam env. lam. lam ty. typeLiftType env ty in
      match mapMapAccum f env fields with (env, fields) then
        addRecordToEnv env (TyRecord {r with fields = fields})
      else never
```
</ToggleWrapper>
</DocBlock>

