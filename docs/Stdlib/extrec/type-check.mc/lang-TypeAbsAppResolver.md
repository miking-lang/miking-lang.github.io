import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeAbsAppResolver  
  

  
  
  
## Semantics  
  

          <DocBlock title="_subst" kind="sem">

```mc
sem _subst : Name -> Ast_Type -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _subst name replacement =
  | (TyVar t) & ty  ->
    if nameEq t.ident name then
      replacement
    else
      ty
  | ty ->
    smap_Type_Type (_subst name replacement) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resolveAll" kind="sem">

```mc
sem resolveAll : Ast_Type -> [Ast_Type] -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem resolveAll ty =
  | args ->
    foldl
      (lam ty. lam mv. resolveTyAbsApp (TyAbsApp {lhs = ty, rhs = mv}))
      ty
      args
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="newParamMetaVars" kind="sem">

```mc
sem newParamMetaVars : _a -> _a1 -> [Ast_Type]
```



<ToggleWrapper text="Code..">
```mc
sem newParamMetaVars env =
  | ident ->
    match mapLookup ident env.tyConEnv with Some (_, params, _) in

    -- Remove param for recursion var
    let params = tail params in

    map
      (lam p. newnmetavar (concat "_" (nameGetStr p)) (Mono ()) env.currentLvl (NoInfo ()))
      params
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resolveTyAbsApp" kind="sem">

```mc
sem resolveTyAbsApp : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem resolveTyAbsApp =
  | TyAbsApp {lhs = TyAbs tyAbs, rhs = rhs} ->
    _subst tyAbs.ident rhs tyAbs.body
  | ty ->
    errorSingle [] (join [
      " * Attempting to resolve a type where the lhs is not a TyAbs, but:\n",
      " * ",
      type2str ty
    ])
```
</ToggleWrapper>
</DocBlock>

