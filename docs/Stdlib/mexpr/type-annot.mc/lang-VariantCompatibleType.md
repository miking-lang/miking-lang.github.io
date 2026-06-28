import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VariantCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv : Map Name Type) =
  | (TyVariant t1, TyVariant t2) ->
    let constrsOpt = mapFoldlOption (lam acc. lam ident. lam ty1.
      match mapLookup ident t2.constrs with Some ty2 then
        match compatibleType tyEnv ty1 ty2 with Some ty then
          Some (mapInsert ident ty acc)
        else None ()
      else None ()
    ) (mapEmpty (mapGetCmpFun t1.constrs)) t1.constrs
    in
    optionMap (lam constrs. TyVariant {t1 with constrs = constrs}) constrsOpt
```
</ToggleWrapper>
</DocBlock>

