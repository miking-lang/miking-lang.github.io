import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeSubstitute  
  

Substitutes type variables

  
  
  
## Semantics  
  

          <DocBlock title="substituteVars" kind="sem">

```mc
sem substituteVars : Info -> Map Name Ast_Type -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem substituteVars info subst =
  | TyVar t & ty ->
    match mapLookup t.ident subst with Some tyvar then tyvar
    else ty
  | ty ->
    smap_Type_Type (substituteVars info subst) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="substituteMetaVars" kind="sem">

```mc
sem substituteMetaVars : Map Name Ast_Type -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem substituteMetaVars (subst : Map Name Type) =
  | TyMetaVar t & ty ->
    switch deref t.contents
    case Unbound r then
      match mapLookup r.ident subst with Some tyvar
      then tyvar
      else smap_Type_Type (substituteMetaVars subst) ty
    case Link to then
      substituteMetaVars subst to
    end
  | ty ->
    smap_Type_Type (substituteMetaVars subst) ty
```
</ToggleWrapper>
</DocBlock>

