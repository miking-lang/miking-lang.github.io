import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprEliminateDuplicateCode  
  

  
  
  
## Types  
  

          <DocBlock title="Definition" kind="type">

```mc
type Definition : (Info, String)
```

<Description>{`NOTE\(larshum, 2022\-09\-13\): For now, we need to consider both the info  
field AND the string of an identifier. This is because the MLang  
transformation may result in the same info field for multiple semantic  
functions. In the future, it may be sufficient to only look at the info  
field.`}</Description>


<ToggleWrapper text="Code..">
```mc
type Definition = (Info, String)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DuplicateCodeEnv" kind="type">

```mc
type DuplicateCodeEnv : { defIds: Map Definition Name, replace: Map Name Name }
```



<ToggleWrapper text="Code..">
```mc
type DuplicateCodeEnv = {
    -- Maps the representation of a definition (as defined above) to an
    -- identifier.
    defIds : Map Definition Name,

    -- Maps the identifier of a duplicated definition to the identifier of the
    -- first instance of that definition in the current scope.
    replace : Map Name Name
  }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpDefinition" kind="sem">

```mc
sem cmpDefinition : MExprEliminateDuplicateCode_Definition -> MExprEliminateDuplicateCode_Definition -> Int
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cmpDefinition lhs =
  | rhs ->
    let i = infoCmp lhs.0 rhs.0 in
    if eqi i 0 then cmpString lhs.1 rhs.1
    else i
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toDefinition" kind="sem">

```mc
sem toDefinition : Name -> Info -> MExprEliminateDuplicateCode_Definition
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toDefinition id =
  | info -> (info, nameGetStr id)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="emptyDuplicateCodeEnv" kind="sem">

```mc
sem emptyDuplicateCodeEnv : () -> MExprEliminateDuplicateCode_DuplicateCodeEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem emptyDuplicateCodeEnv =
  | () -> {defIds = mapEmpty cmpDefinition, replace = mapEmpty nameCmp}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lookupReplacement" kind="sem">

```mc
sem lookupReplacement : MExprEliminateDuplicateCode_DuplicateCodeEnv -> Map Name Name -> Name -> (Map Name Name, Name)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lookupReplacement env replaced =
  | oldId ->
    match mapLookup oldId env.replace with Some newId then
      (mapInsert oldId newId replaced, newId)
    else (replaced, oldId)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="lookupDefinition" kind="sem">

```mc
sem lookupDefinition : MExprEliminateDuplicateCode_DuplicateCodeEnv -> Map Name Name -> Name -> Info -> Ast_Expr -> (MExprEliminateDuplicateCode_DuplicateCodeEnv -> (Map Name Name, Ast_Expr)) -> (Map Name Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem lookupDefinition env replaced id info inexpr =
  | elsfn ->
    let definition = toDefinition id info in
    -- NOTE(larshum, 2022-10-28): All definitions containing NoInfo are
    -- considered not to be equal. This prevents eliminating code generated as
    -- part of the compilation.
    match info with NoInfo _ then elsfn env else
    match mapLookup definition env.defIds with Some prevId then
      let env = {env with replace = mapInsert id prevId env.replace} in
      let replaced = mapInsert id prevId replaced in
      eliminateDuplicateCodeExpr env replaced inexpr
    else
      let env = {env with defIds = mapInsert definition id env.defIds} in
      elsfn env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateCode" kind="sem">

```mc
sem eliminateDuplicateCode : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateCode =
  | ast ->
    match eliminateDuplicateCodeWithSummary ast with (_, ast) in
    ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateCodeWithSummary" kind="sem">

```mc
sem eliminateDuplicateCodeWithSummary : Ast_Expr -> (Map Name Name, Ast_Expr)
```

<Description>{`Performs the elimination of duplicate code, and includes a map from old to  
new identifiers that were updated in the resulting AST.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateCodeWithSummary =
  | ast ->
    eliminateDuplicateCodeExpr (emptyDuplicateCodeEnv ()) (mapEmpty nameCmp) ast
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateCodeExpr" kind="sem">

```mc
sem eliminateDuplicateCodeExpr : MExprEliminateDuplicateCode_DuplicateCodeEnv -> Map Name Name -> Ast_Expr -> (Map Name Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateCodeExpr env replaced =
  | TmVar t ->
    match lookupReplacement env replaced t.ident with (replaced, ident) in
    match eliminateDuplicateCodeType env replaced t.ty with (replaced, ty) in
    (replaced, TmVar {t with ident = ident, ty = ty})
  | TmConApp t ->
    match lookupReplacement env replaced t.ident with (replaced, ident) in
    match eliminateDuplicateCodeExpr env replaced t.body with (replaced, body) in
    match eliminateDuplicateCodeType env replaced t.ty with (replaced, ty) in
    (replaced, TmConApp {t with ident = ident, body = body, ty = ty})
  | TmDecl (x & {decl = DeclLet t}) ->
    lookupDefinition
      env replaced t.ident t.info x.inexpr
      (lam env.
        match eliminateDuplicateCodeType env replaced t.tyAnnot with (replaced, tyAnnot) in
        match eliminateDuplicateCodeType env replaced t.tyBody with (replaced, tyBody) in
        match eliminateDuplicateCodeExpr env replaced t.body with (replaced, body) in
        match eliminateDuplicateCodeExpr env replaced x.inexpr with (replaced, inexpr) in
        match eliminateDuplicateCodeType env replaced x.ty with (replaced, ty) in
        ( replaced
        , TmDecl {x with decl = DeclLet {t with body = body, tyAnnot = tyAnnot, tyBody = tyBody}, inexpr = inexpr, ty = ty} ))
  | TmDecl (x & {decl = DeclType t}) ->
    lookupDefinition
      env replaced t.ident t.info x.inexpr
      (lam env.
        match eliminateDuplicateCodeType env replaced t.tyIdent with (replaced, tyIdent) in
        match eliminateDuplicateCodeExpr env replaced x.inexpr with (replaced, inexpr) in
        match eliminateDuplicateCodeType env replaced x.ty with (replaced, ty) in
        ( replaced
        , TmDecl {x with decl = DeclType {t with tyIdent = tyIdent}, inexpr = inexpr, ty = ty} ))
  | TmDecl (x & {decl = DeclConDef t}) ->
    lookupDefinition
      env replaced t.ident t.info x.inexpr
      (lam env.
        match eliminateDuplicateCodeType env replaced t.tyIdent with (replaced, tyIdent) in
        match eliminateDuplicateCodeExpr env replaced x.inexpr with (replaced, inexpr) in
        match eliminateDuplicateCodeType env replaced x.ty with (replaced, ty) in
        ( replaced
        , TmDecl {x with decl = DeclConDef {t with tyIdent = tyIdent}, inexpr = inexpr, ty = ty} ))
  | TmDecl (x & {decl = DeclExt t}) ->
    lookupDefinition
      env replaced t.ident t.info x.inexpr
      (lam env.
        match eliminateDuplicateCodeType env replaced t.tyIdent with (replaced, tyIdent) in
        match eliminateDuplicateCodeExpr env replaced x.inexpr with (replaced, inexpr) in
        match eliminateDuplicateCodeType env replaced x.ty with (replaced, ty) in
        ( replaced
        , TmDecl {x with decl = DeclExt {t with tyIdent = tyIdent}, inexpr = inexpr, ty = ty} ))
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let eliminateDuplicateBinding = lam acc. lam binding.
      match acc with (replaced, env) in
      let defn = (binding.info, nameGetStr binding.ident) in
      match binding.info with NoInfo _ then ((replaced, env), Some binding) else
      match mapLookup defn env.defIds with Some id then
        let env = {env with replace = mapInsert binding.ident id env.replace} in
        let replaced = mapInsert binding.ident id replaced in
        ((replaced, env), None ())
      else
        let env = {env with defIds = mapInsert defn binding.ident env.defIds} in
        ((replaced, env), Some binding)
    in
    let eliminateDuplicateBody = lam env. lam replaced. lam binding.
      match eliminateDuplicateCodeType env replaced binding.tyAnnot with (replaced, tyAnnot) in
      match eliminateDuplicateCodeType env replaced binding.tyBody with (replaced, tyBody) in
      match eliminateDuplicateCodeExpr env replaced binding.body with (replaced, body) in
      (replaced, {binding with body = body, tyAnnot = tyAnnot, tyBody = tyBody})
    in
    match mapAccumL eliminateDuplicateBinding (replaced, env) (reverse t.bindings)
    with ((replaced, env), optBindings) in
    let bindings = filterOption optBindings in
    match mapAccumL (eliminateDuplicateBody env) replaced bindings with (replaced, bindings) in
    match eliminateDuplicateCodeExpr env replaced x.inexpr with (replaced, inexpr) in
    match eliminateDuplicateCodeType env replaced x.ty with (replaced, ty) in
    ( replaced
    , TmDecl {x with decl = DeclRecLets {t with bindings = reverse bindings}, inexpr = inexpr, ty = ty} )
  | t ->
    match smapAccumL_Expr_Expr (eliminateDuplicateCodeExpr env) replaced t with (replaced, t) in
    match smapAccumL_Expr_Type (eliminateDuplicateCodeType env) replaced t with (replaced, t) in
    match smapAccumL_Expr_TypeLabel (eliminateDuplicateCodeType env) replaced t with (replaced, t) in
    match smapAccumL_Expr_Pat (eliminateDuplicateCodePat env) replaced t with (replaced, t) in
    match eliminateDuplicateCodeType env replaced (tyTm t) with (replaced, tmTy) in
    (replaced, withType tmTy t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateCodeType" kind="sem">

```mc
sem eliminateDuplicateCodeType : MExprEliminateDuplicateCode_DuplicateCodeEnv -> Map Name Name -> Ast_Type -> (Map Name Name, Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateCodeType env replaced =
  | TyCon t ->
    match lookupReplacement env replaced t.ident with (replaced, ident) in
    (replaced, TyCon {t with ident = ident})
  | TyVar t ->
    match lookupReplacement env replaced t.ident with (replaced, ident) in
    (replaced, TyVar {t with ident = ident})
  | ty -> smapAccumL_Type_Type (eliminateDuplicateCodeType env) replaced ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateCodePat" kind="sem">

```mc
sem eliminateDuplicateCodePat : MExprEliminateDuplicateCode_DuplicateCodeEnv -> Map Name Name -> Ast_Pat -> (Map Name Name, Ast_Pat)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateCodePat env replaced =
  | PatCon t ->
    match lookupReplacement env replaced t.ident with (replaced, ident) in
    match eliminateDuplicateCodePat env replaced t.subpat with (replaced, subpat) in
    (replaced, PatCon {t with ident = ident, subpat = subpat})
  | p ->
    match smapAccumL_Pat_Pat (eliminateDuplicateCodePat env) replaced p with (replaced, p) in
    match eliminateDuplicateCodeType env replaced (tyPat p) with (replaced, patTy) in
    (replaced, withTypePat patTy p)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateExternalsWithSummary" kind="sem">

```mc
sem eliminateDuplicateExternalsWithSummary : Ast_Expr -> (Map Name Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateExternalsWithSummary =| tm ->
    eliminateDuplicateExternalsExpr (mapEmpty cmpString) (mapEmpty nameCmp) tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateExternals" kind="sem">

```mc
sem eliminateDuplicateExternals : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateExternals =| tm ->
    (eliminateDuplicateExternalsWithSummary tm).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDuplicateExternalsExpr" kind="sem">

```mc
sem eliminateDuplicateExternalsExpr : Map String Name -> Map Name Name -> Ast_Expr -> (Map Name Name, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDuplicateExternalsExpr externals replaced =
  | TmDecl (x & {decl = DeclExt r}) ->
    let identStr = nameGetStr r.ident in
    optionMapOrElse
      (lam.
        let externals = mapInsert identStr r.ident externals in
        match eliminateDuplicateExternalsExpr externals replaced x.inexpr
          with (replaced, inexpr)
        in
        (replaced, TmDecl {x with inexpr = inexpr }))
      (lam ident.
        eliminateDuplicateExternalsExpr
          externals
          (mapInsert r.ident ident replaced)
          x.inexpr)
      (mapLookup identStr externals)
  | TmVar r ->
    optionMapOr (replaced, TmVar r)
      (lam ident. (replaced, TmVar { r with ident = ident }))
      (mapLookup r.ident replaced)
  | tm ->
    smapAccumL_Expr_Expr (eliminateDuplicateExternalsExpr externals) replaced tm
```
</ToggleWrapper>
</DocBlock>

