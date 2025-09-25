import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeLiftAddRecordToEnv  
  

  
  
  
## Semantics  
  

          <DocBlock title="addRecordToEnv" kind="sem">

```mc
sem addRecordToEnv : TypeLiftBase_TypeLiftEnv -> Ast_Type -> (TypeLiftBase_TypeLiftEnv, Ast_Type)
```



<ToggleWrapper text="Code..">
```mc
sem addRecordToEnv (env : TypeLiftEnv) =
  | TyRecord {fields = fields, info = info} & ty ->
    switch mapLookup fields env.records
    case Some name then
      let tycon = nitycon_ name info in
      (env, tycon)
    case None _ then
      let name = nameSym "Rec" in
      let tycon = nitycon_ name info in
      let env = {{env
                  with records = mapInsert fields name env.records}
                  with typeEnv = assocSeqInsert name ty env.typeEnv}
      in
      (env, tycon)
    end
```
</ToggleWrapper>
</DocBlock>

