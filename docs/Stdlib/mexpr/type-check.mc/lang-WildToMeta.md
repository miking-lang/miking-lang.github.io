import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# WildToMeta  
  

  
  
  
## Semantics  
  

          <DocBlock title="wildToMeta" kind="sem">

```mc
sem wildToMeta : Level -> Set Name -> Ast_Type -> (Set Name, Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem wildToMeta lvl newMetas =
  | TyWild x ->
    let ty = newvar lvl x.info in
    match ty with TyMetaVar x then
      match deref x.contents with Unbound x then
        (setInsert x.ident newMetas, ty)
      else error "Compiler error"
    else error "Compiler error"
  | TyAlias x ->
    match wildToMeta lvl newMetas x.content with (newMetas, content) in
    (newMetas, TyAlias {x with content = content})
  | ty -> smapAccumL_Type_Type (wildToMeta lvl) newMetas ty
```
</ToggleWrapper>
</DocBlock>

