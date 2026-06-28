import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecMonomorphise  
  

  
  
  
## Semantics  
  

          <DocBlock title="monomorhpisePat" kind="sem">

```mc
sem monomorhpisePat : ExtRecEnvType -> Ast_Pat -> Ast_Pat
```



<ToggleWrapper text="Code..">
```mc
sem monomorhpisePat env =
  | PatExtRecord p ->
    let bindings = mapMap (monomorhpisePat env) p.bindings in
    PatRecord {bindings = bindings,
               info = p.info,
               ty = p.ty}
  | p ->
    smap_Pat_Pat (monomorhpisePat env) p
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="monomorphiseExpr" kind="sem">

```mc
sem monomorphiseExpr : ExtRecEnvType -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem monomorphiseExpr env =
  | TmDecl (x & {decl = DeclRecType t}) ->
    match mapLookup t.ident env.defs with Some labelToType in

    let fields = mapFoldWithKey
      (lam acc. lam label. lam pair.
        match pair with (_, TyAbs {body = ty}) in
        recursive let work = lam ty.
          match ty with TyAbs t then work t.body else ty in
        let ty = work ty in
        let ty = removeExtRecTypes_Type env ty in
        mapInsert (stringToSid label) ty acc)
      (mapEmpty cmpSID)
      labelToType
    in
    TmDecl
    { x with decl = DeclType
      { tyIdent = TyRecord {info = NoInfo (), fields = fields}
      , ident = t.ident
      , params = t.params
      , info = t.info
      }
    , inexpr = monomorphiseExpr env x.inexpr
    }
  | TmDecl (x & {decl = DeclRecField _}) -> monomorphiseExpr env x.inexpr
  | TmExtRecord t ->
    match mapLookup t.ident env.defs with Some labelToType in

    let allLabels = mapKeys labelToType in
    let presentLabels = setOfKeys t.bindings in

    let f = lam label.
      if setMem label presentLabels then
        match mapLookup label t.bindings with Some e in
        (stringToSid label, e)
      else
        (stringToSid label, placeholder_)
    in

    let bindings = map f allLabels in
    let bindings = mapFromSeq cmpSID bindings in

    let bindings = mapMap (monomorphiseExpr env) bindings in

    TmRecord {bindings = bindings,
              ty = tyunknown_,
              info = t.info}
  | TmExtExtend t ->
    let work = lam acc. lam label. lam expr.
      TmRecordUpdate {rec = acc,
                      key = stringToSid label,
                      value = expr,
                      ty = tyunknown_,
                      info = t.info} in
    mapFoldWithKey work t.e t.bindings
  | expr ->
    let expr = smap_Expr_Pat (monomorhpisePat env) expr in
    smap_Expr_Expr (monomorphiseExpr env) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_inspectTyWithinAlias2" kind="sem">

```mc
sem _inspectTyWithinAlias2 : Ast_Type -> Ast_Type
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _inspectTyWithinAlias2 =
  | TyAlias {content = content} -> _inspectTyWithinAlias2 content
  | TyApp t -> _inspectTyWithinAlias2 t.rhs
  | ty -> ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeExtRecTypes_Expr" kind="sem">

```mc
sem removeExtRecTypes_Expr : ExtRecEnvType -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem removeExtRecTypes_Expr env =
  | TmDecl (x & {decl = DeclType t}) ->
    -- We need to remove the first parameter from TmTypes representing
    -- open sum types or payloads. Type aliases should remain unaffected.
    if or (setMem t.ident env.sumTypeNames) (setMem t.ident env.payloadNames) then
      TmDecl {x with decl = DeclType {t with params = tail t.params,
                    tyIdent = removeExtRecTypes_Type env t.tyIdent},
                    ty = removeExtRecTypes_Type env x.ty,
                    inexpr = removeExtRecTypes_Expr env x.inexpr}
    else
      TmDecl {x with decl = DeclType {t with tyIdent = removeExtRecTypes_Type env t.tyIdent},
                     ty = removeExtRecTypes_Type env x.ty,
                     inexpr = removeExtRecTypes_Expr env x.inexpr}
  | expr ->
    let expr = smap_Expr_Type (removeExtRecTypes_Type env) expr in
    let expr = smap_Expr_TypeLabel (removeExtRecTypes_Type env) expr in
    smap_Expr_Expr (removeExtRecTypes_Expr env) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeExtRecTypes_Type" kind="sem">

```mc
sem removeExtRecTypes_Type : ExtRecEnvType -> Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem removeExtRecTypes_Type env =
  | TyQualifiedName t ->
    TyCon {ident = t.rhs, info = t.info, data = tyunknown_}
  | TyCon t ->
    TyCon {t with data = tyunknown_}
  | TyAll t & ty ->
    match t.kind with Data _ then
      removeExtRecTypes_Type env t.ty
    else if eqString (nameGetStr t.ident) "M" then
      removeExtRecTypes_Type env t.ty
    else
      TyAll {t with ty = removeExtRecTypes_Type env t.ty,
                    kind = removeExtRecTypes_Kind env t.kind}
  | ty ->
    smap_Type_Type (removeExtRecTypes_Type env) ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="removeExtRecTypes_Kind" kind="sem">

```mc
sem removeExtRecTypes_Kind : ExtRecEnvType -> Ast_Kind -> Ast_Kind
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem removeExtRecTypes_Kind =
  | Data k & kind ->
    Poly ()
  | kind ->
    smap_Kind_Type (removeExtRecTypes_Type env) kind
```
</ToggleWrapper>
</DocBlock>

