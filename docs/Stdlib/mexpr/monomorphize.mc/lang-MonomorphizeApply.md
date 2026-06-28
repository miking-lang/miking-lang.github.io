import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MonomorphizeApply  
  

  
  
  
## Semantics  
  

          <DocBlock title="applyMonomorphization" kind="sem">

```mc
sem applyMonomorphization : Monomorphize_MonoEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`Replaces polymorphic constructs with their monomorphic bindings  
based on the provided monomorphization environment \(bottom\-up\).No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyMonomorphization env =
  | ast -> applyMonomorphizationExpr env ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyMonomorphizationExpr" kind="sem">

```mc
sem applyMonomorphizationExpr : Monomorphize_MonoEnv -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyMonomorphizationExpr env =
  | TmVar t ->
    let ident =
      match mapLookup t.ident env.funEnv with Some instEntry then
        let varInst = findTypeInstantiation instEntry.polyType t.ty in
        match mapLookup varInst instEntry.map with Some newId then
          newId
        else
          monoError [t.info] "Variable instantiation not found\nThis error may be caused by polymorphic recursion, which is not supported by the monomorphization pass."
      else t.ident
    in
    TmVar {t with ident = ident,
                  ty = applyMonomorphizationTypeLabel env t.ty}
  | TmDecl (x & {decl = DeclLet t}) ->
    let inexpr = applyMonomorphizationExpr env x.inexpr in
    match mapLookup t.ident env.funEnv with Some instEntry then
      -- NOTE(larshum, 2023-08-03): The let-binding is a polymorphic function.
      -- We create once instance for each instantiation stored the entry.
      mapFoldWithKey
        (lam acc. lam inst. lam newId.
          let body = monomorphizeBody env inst t.body in
          let tyAnnot = monomorphizeType env inst t.tyAnnot in
          let tyBody = monomorphizeTypeLabel env inst t.tyBody in
          let ty = monomorphizeTypeLabel env inst x.ty in
          TmDecl
          {x with decl = DeclLet
            {t with ident = newId
            , tyAnnot = tyAnnot
            , tyBody = tyBody
            , body = body
            }
          , inexpr = acc
          , ty = tyTm acc
          })
        inexpr instEntry.map
    else
      -- NOTE(larshum, 2023-08-03): The let-binding is already monomorphic, so
      -- we recurse directly into its body.
      TmDecl
      {x with decl = DeclLet
        {t with tyAnnot = applyMonomorphizationType env t.tyAnnot
        , tyBody = applyMonomorphizationType env t.tyBody
        , body = applyMonomorphization env t.body
        }
      , inexpr = inexpr
      , ty = applyMonomorphizationType env x.ty
      }
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let applyMonomorphizationBinding = lam env. lam acc. lam bind.
      match mapLookup bind.ident env.funEnv with Some instEntry then
        mapFoldWithKey
          (lam acc. lam inst. lam newId.
            let body = monomorphizeBody env inst bind.body in
            let tyAnnot = monomorphizeType env inst bind.tyAnnot in
            let tyBody = monomorphizeTypeLabel env inst bind.tyBody in
            let bind = {
              bind with ident = newId,
                        tyAnnot = tyAnnot,
                        tyBody = tyBody,
                        body = body
            } in
            snoc acc bind)
          acc instEntry.map
      else
        snoc acc bind
    in
    let inexpr = applyMonomorphizationExpr env x.inexpr in
    let bindings = foldl (applyMonomorphizationBinding env) [] t.bindings in
    TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr}
  | TmDecl (x & {decl = DeclType t}) ->
    let inexpr = applyMonomorphizationExpr env x.inexpr in
    match mapLookup t.ident env.typeEnv with Some instEntry then
      mapFoldWithKey
        (lam acc. lam inst. lam newId.
          let tyIdent = monomorphizeType env inst t.tyIdent in
          let ty = monomorphizeType env inst x.ty in
          TmDecl
          {x with decl = DeclType
            {t with ident = newId
            , params = []
            , tyIdent = tyIdent
            }
          , inexpr = acc
          , ty = ty
          })
        inexpr instEntry.map
    else
      TmDecl
      {x with decl = DeclType {t with tyIdent = applyMonomorphizationType env t.tyIdent}
      , inexpr = inexpr
      , ty = applyMonomorphizationTypeLabel env x.ty
      }
  | TmDecl (x & {decl = DeclConDef t}) ->
    let inexpr = applyMonomorphizationExpr env x.inexpr in
    match mapLookup t.ident env.conEnv with Some instEntry then
      mapFoldWithKey
        (lam acc. lam inst. lam newId.
          let tyIdent = monomorphizeType env inst t.tyIdent in
          let ty = monomorphizeType env inst x.ty in
          TmDecl
          {x with decl = DeclConDef
            {t with ident = newId
            , tyIdent = tyIdent
            }
          , inexpr = acc
          , ty = ty
          })
        inexpr instEntry.map
    else
      TmDecl
      {x with decl = DeclConDef {t with tyIdent = applyMonomorphizationType env t.tyIdent}
      , inexpr = inexpr
      , ty = applyMonomorphizationTypeLabel env x.ty
      }
  | TmConApp t ->
    let ident =
      match mapLookup t.ident env.conEnv with Some instEntry then
        let conTy = tyarrow_ (tyTm t.body) t.ty in
        let conInst = findTypeInstantiation instEntry.polyType conTy in
        match mapLookup conInst instEntry.map with Some newId then
          newId
        else
          monoError [t.info] "Constructor instantiation not found"
      else t.ident
    in
    TmConApp {t with ident = ident,
                     ty = applyMonomorphizationTypeLabel env t.ty}
  | ast ->
    let ast = smap_Expr_Expr (applyMonomorphizationExpr env) ast in
    let ast = smap_Expr_Pat (applyMonomorphizationPat env) ast in
    let ast = smap_Expr_Type (applyMonomorphizationType env) ast in
    let ast = smap_Expr_TypeLabel (applyMonomorphizationTypeLabel env) ast in
    withType (applyMonomorphizationTypeLabel env (tyTm ast)) ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyMonomorphizationPat" kind="sem">

```mc
sem applyMonomorphizationPat : Monomorphize_MonoEnv -> Ast_Pat -> Ast_Pat
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyMonomorphizationPat env =
  | PatCon t ->
    let subpat = applyMonomorphizationPat env t.subpat in
    match mapLookup t.ident env.conEnv with Some instEntry then
      let conType = TyArrow {from = tyPat t.subpat, to = t.ty, info = t.info} in
      let inst = findTypeInstantiation instEntry.polyType conType in
      match mapLookup inst instEntry.map with Some newId then
        PatCon {t with ident = newId, subpat = subpat}
      else
        monoError [t.info] "Invalid pattern constructor instantiation"
    else
      PatCon {t with subpat = subpat}
  | p ->
    let p = smap_Pat_Pat (applyMonomorphizationPat env) p in
    withTypePat (applyMonomorphizationType env (tyPat p)) p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyMonomorphizationType" kind="sem">

```mc
sem applyMonomorphizationType : Monomorphize_MonoEnv -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyMonomorphizationType env =
  | ty -> applyMonomorphizationTypeH env false ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyMonomorphizationTypeLabel" kind="sem">

```mc
sem applyMonomorphizationTypeLabel : Monomorphize_MonoEnv -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyMonomorphizationTypeLabel env =
  | ty -> applyMonomorphizationTypeH env true ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="applyMonomorphizationTypeH" kind="sem">

```mc
sem applyMonomorphizationTypeH : Monomorphize_MonoEnv -> Bool -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem applyMonomorphizationTypeH env replaceUnknown =
  | (TyApp _) & ty ->
    match getTypeArgs ty with (TyCon t, ![]) then
      match mapLookup t.ident env.typeEnv with Some instEntry then
        let typeInst = findTypeInstantiation instEntry.polyType ty in
        match mapLookup typeInst instEntry.map with Some newId then
          TyCon {t with ident = newId, info = infoTy ty}
        else
          monoError [t.info]
            (concat "Invalid type constructor instantiation for constructor "
               (nameGetStr t.ident))
      else
        monoError [t.info] "Polymorphic constructor not found"
    else
      smap_Type_Type (applyMonomorphizationTypeH env replaceUnknown) ty
  | TyUnknown t ->
    -- NOTE(larshum, 2023-08-08): If we find an unknown type inside a type
    -- label (type annotation from the type-checker), we can safely replace it
    -- by any type. We choose to replace it with the empty record type.
    if replaceUnknown then TyRecord {fields = mapEmpty cmpSID, info = t.info}
    else TyUnknown t
  | ty -> smap_Type_Type (applyMonomorphizationTypeH env replaceUnknown) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="monomorphizeBody" kind="sem">

```mc
sem monomorphizeBody : Monomorphize_MonoEnv -> Monomorphize_Instantiation -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem monomorphizeBody env instantiation =
  | body ->
    let body = instantiatePolymorphicExpr instantiation body in
    let body = applyMonomorphizationExpr env body in
    resymbolizeBindings body
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="monomorphizeType" kind="sem">

```mc
sem monomorphizeType : Monomorphize_MonoEnv -> Monomorphize_Instantiation -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem monomorphizeType env instantiation =
  | ty ->
    let ty = instantiatePolymorphicType instantiation ty in
    applyMonomorphizationType env ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="monomorphizeTypeLabel" kind="sem">

```mc
sem monomorphizeTypeLabel : Monomorphize_MonoEnv -> Monomorphize_Instantiation -> Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem monomorphizeTypeLabel env instantiation =
  | ty ->
    let ty = instantiatePolymorphicType instantiation ty in
    applyMonomorphizationTypeLabel env ty
```
</ToggleWrapper>
</DocBlock>

