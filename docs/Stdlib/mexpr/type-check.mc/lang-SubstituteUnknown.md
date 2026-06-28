import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SubstituteUnknown  
  

  
  
  
## Semantics  
  

          <DocBlock title="substituteUnknown" kind="sem">

```mc
sem substituteUnknown : Info -> TCEnv -> Ast_Kind -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem substituteUnknown (info : Info) (env : TCEnv) (kind : Kind) =
  | TyUnknown _ ->
    newmetavar kind env.currentLvl info
  | TyAlias t ->
    TyAlias {t with content = substituteUnknown info env kind t.content}
  | TyCon _ & ty ->
    if env.disableConstructorTypes then ty
    else smap_Type_Type (substituteUnknown info env kind) ty
  | ty ->
    smap_Type_Type (substituteUnknown info env kind) ty
```
</ToggleWrapper>
</DocBlock>

