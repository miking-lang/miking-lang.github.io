import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ResolveType  
  

resolveType resolves type aliases and checks that they are fully applied.  
NOTE\(aathn, 2023\-05\-10\): In the future, this should be replaced  
with something which also performs a proper kind check.

  
  
  
## Semantics  
  

          <DocBlock title="resolveType" kind="sem">

```mc
sem resolveType : Info -> TCEnv -> Bool -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resolveType info env closeDatas =
  | (TyCon _ | TyApp _) & ty ->
    match getTypeArgs ty with (constr, args) in
    let args = map (resolveType info env closeDatas) args in
    match constr with (TyCon t) & conTy then
      match mapLookup t.ident env.tyConEnv with Some (_, params, def) then
        match def with !TyVariant _ then  -- It's an alias
          match (length params, length args) with (paramLen, argLen) in
          if eqi paramLen argLen then
            let subst = foldl2 (lam s. lam v. lam t. mapInsert v t s)
                               (mapEmpty nameCmp) params args
            in
            -- We assume def has already been resolved before being put into tycons
            TyAlias {display = mkTypeApp conTy args, content = substituteVars (infoTy ty) subst def}
          else
            errorSingle [infoTy ty] (join [
              "* Encountered a misformed type constructor or alias.\n",
              "* Type ", nameGetStr t.ident, " is declared to have ",
              int2string paramLen, " parameters.\n",
              "* Found ", int2string argLen, " arguments.\n",
              "* When checking the annotation"
            ])
        else
          if env.disableConstructorTypes then mkTypeApp conTy args
          else
            switch t.data
            case TyData d then
              let universe = _computeUniverse env t.ident in
              mkTypeApp (TyCon {t with data = TyData {d with universe = universe}}) args
            case TyUnknown _ then
              if closeDatas then
                let universe = _computeUniverse env t.ident in
                let data = TyData { info = t.info
                                  , universe = universe
                                  , positive = false
                                  , cons = setEmpty nameCmp } in
                mkTypeApp (TyCon {t with data = data}) args
              else mkTypeApp conTy args
            case _ then
              mkTypeApp conTy args
            end
      else
        errorSingle [t.info] (join [
          "* Encountered an unknown type constructor: ", nameGetStr t.ident, "\n",
          "* When checking the annotation"
        ])
    else
      mkTypeApp (resolveType info env closeDatas constr) args

  -- If we encounter a TyAlias, it means that the type was already processed by
  -- a previous call to typeCheck.
  | TyAlias t -> TyAlias t
  | TyQualifiedName t & ty ->
    errorSingle [t.info] (join [
      " * Encountered a qualified name during type checking.\n",
      " * These types should have been resolved before type checking!"
    ])
  | ty ->
    smap_Type_Type (resolveType info env closeDatas) ty
```
</ToggleWrapper>
</DocBlock>

