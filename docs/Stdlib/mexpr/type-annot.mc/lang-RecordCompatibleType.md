import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv : Map Name Type) =
  | (TyRecord t1, TyRecord t2) ->
    let f = lam acc. lam p.
      match p with (k, ty1) then
        match mapLookup k t2.fields with Some ty2 then
          match compatibleType tyEnv ty1 ty2 with Some ty then
            Some (mapInsert k ty acc)
          else None ()
        else None ()
      else never
    in
    match optionFoldlM f (mapEmpty cmpSID) (mapBindings t1.fields)
    with Some fields then Some (TyRecord {t1 with fields = fields})
    else None ()
```
</ToggleWrapper>
</DocBlock>

