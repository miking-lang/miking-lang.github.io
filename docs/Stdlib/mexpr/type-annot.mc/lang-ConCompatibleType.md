import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConCompatibleType  
  

  
  
  
## Semantics  
  

          <DocBlock title="compatibleTypeBase" kind="sem">

```mc
sem compatibleTypeBase : Map Name Ast_Type -> (Ast_Type, Ast_Type) -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem compatibleTypeBase (tyEnv : Map Name Type) =
  | (TyCon t1 & ty1, TyCon t2) ->
    if nameEq t1.ident t2.ident then Some ty1 else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="reduceType" kind="sem">

```mc
sem reduceType : Map Name Ast_Type -> Ast_Type -> Option Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem reduceType (tyEnv : Map Name Type) =
  | TyCon {info = info, ident = id} ->
    match mapLookup id tyEnv with Some ty then Some ty else
      errorSingle [info] (concat "Unbound TyCon in reduceType: " (nameGetStr id))
```
</ToggleWrapper>
</DocBlock>

