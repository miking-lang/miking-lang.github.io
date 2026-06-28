import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprUtestGenerate  
  

The main utest generation language fragment. Here, we define functions for  
replacing utest expressions with references to the utest runtime, as well as  
the insertion of recursive bindings for pretty\-print and equality functions  
into the original AST.

  
  
  
## Semantics  
  

          <DocBlock title="generatePrettyPrintBindings" kind="sem">

```mc
sem generatePrettyPrintBindings : Info -> UtestBase_UtestEnv -> [Ast_Type] -> Option Ast_Expr -> (UtestBase_UtestEnv, Option Ast_Decl)
```

<Description>{`Generates a recursive let\-expression containing pretty\-print binding  
definitions for each subtype required to support pretty\-printing all  
types in the provided sequence. If the user provided a custom on\-fail  
printing function, we do not generate any bindings.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBindings info env types =
  | Some _ -> (env, None ())
  | None _ ->
    let types = map unwrapAlias types in
    match mapAccumL (generatePrettyPrintBindingsH info) env types with (env, binds) in
    ( env
    , Some (DeclRecLets {bindings = join binds, info = _utestInfo})
    )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generatePrettyPrintBindingsH" kind="sem">

```mc
sem generatePrettyPrintBindingsH : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, [LetDeclAst_DeclLetRecord])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generatePrettyPrintBindingsH info env =
  | (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) & ty ->
    if setMem ty env.pprintDef then
      generatePrettyPrintBindingsH info env elemTy
    else
      match generatePrettyPrintBody info env ty with (id, body) in
      match generatePrettyPrintBindingsH info env elemTy with (env, binds) in
      let varId =
        match ty with TySeq _ then _ppSeqTyVarName
        else _ppTensorTyVarName
      in
      let ty =
        let elemTy = _varTy varId in
        switch ty
        case TySeq t then TySeq {t with ty = elemTy}
        case TyTensor t then TyTensor {t with ty = elemTy}
        end
      in
      let ppTy = _tyalls [varId] (_pprintTy ty) in
      (env, cons (_recbind id ppTy body) binds)
  | ty ->
    if setMem ty env.pprintDef then (env, [])
    else
      let env = {env with pprintDef = setInsert ty env.pprintDef} in
      let innerTys = shallowInnerTypes env ty in
      match mapAccumL (generatePrettyPrintBindingsH info) env innerTys with (env, binds) in
      match generatePrettyPrintBody info env ty with (id, body) in
      if nameEq id (defaultPrettyPrintName ()) then (env, join binds)
      else (env, cons (_recbind id (_pprintTy ty) body) (join binds))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBindings" kind="sem">

```mc
sem generateEqualityBindings : Info -> UtestBase_UtestEnv -> Ast_Type -> Option Ast_Expr -> (UtestBase_UtestEnv, Option Ast_Decl)
```

<Description>{`Conditionally generates a recursive let\-expression containing equality  
binding definitions for all subtypes required to support an equality  
operation on the provided type. If a user has provided a custom equality  
function \(i.e., the tusing field is Some\), we do not generate any  
bindings.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateEqualityBindings info env ty =
  | Some _ -> (env, None ())
  | None _ ->
    let ty = unwrapAlias ty in
    match generateEqualityBindingsH info env ty with (env, binds) in
    ( env
    , Some (DeclRecLets {bindings = binds, info = _utestInfo})
    )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateEqualityBindingsH" kind="sem">

```mc
sem generateEqualityBindingsH : Info -> UtestBase_UtestEnv -> Ast_Type -> (UtestBase_UtestEnv, [LetDeclAst_DeclLetRecord])
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateEqualityBindingsH info env =
  | (TySeq {ty = elemTy} | TyTensor {ty = elemTy}) & ty ->
    if setMem ty env.eqDef then
      generateEqualityBindingsH info env elemTy
    else
      match generateEqualityBody info env ty with (id, body) in
      match generateEqualityBindingsH info env elemTy with (env, binds) in
      let varId =
        match ty with TySeq _ then _eqSeqTyVarName
        else _eqTensorTyVarName
      in
      let ty =
        let elemTy = _varTy varId in
        switch ty
        case TySeq t then TySeq {t with ty = elemTy}
        case TyTensor t then TyTensor {t with ty = elemTy}
        end
      in
      let eqTy = _tyalls [varId] (_eqTy ty) in
      (env, cons (_recbind id eqTy body) binds)
  | ty ->
    if setMem ty env.eqDef then (env, [])
    else
      let env = {env with eqDef = setInsert ty env.eqDef} in
      let innerTys = shallowInnerTypes env ty in
      match mapAccumL (generateEqualityBindingsH info) env innerTys with (env, binds) in
      match generateEqualityBody info env ty with (id, body) in
      (env, cons (_recbind id (_eqTy ty) body) (join binds))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceUtests" kind="sem">

```mc
sem replaceUtests : UtestBase_UtestEnv -> Ast_Expr -> (UtestBase_UtestEnv, Ast_Expr)
```

<Description>{`Replaces all TmUtest expressions found in the provided AST, with support  
for nested utests.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem replaceUtests env =
  | TmDecl (x & {decl = DeclUtest t}) ->
    let info = _stringLit (info2str t.info) in
    let usingStr =
      _stringLit
        (match t.tusing with Some eqfn then
          concat "    Using: " (expr2str eqfn)
        else "")
    in
    let lty = tyTm t.test in
    let rty = tyTm t.expected in
    match
      match t.tonfail with Some ppfn then
        (env, ppfn)
      else
        match getPrettyPrintExpr t.info env lty with (env, lpp) in
        match getPrettyPrintExpr t.info env rty with (env, rpp) in
        let utestDefaultOnFailExpr =
          let ty =
            _tyarrows [
              _tyarrows [lty, _stringTy], _tyarrows [rty, _stringTy], lty, rty,
              _stringTy ]
          in
          _var (utestDefaultOnFailName ()) ty
        in
        (env, _apps utestDefaultOnFailExpr [lpp, rpp])
    with (env, ppfn) in
    match
      match t.tusing with Some eqfn then (env, eqfn)
      else
        -- NOTE(larshum, 2022-12-26): Both arguments to the utest must have the
        -- same type if no equality function was provided.
        getEqualityExpr t.info env lty
    with (env, eqfn) in
    let utestRunnerType =
      let infoTy = _stringTy in
      let usingStrTy = _stringTy in
      let ppTy = _tyarrows [lty, rty, _stringTy] in
      let eqTy = _tyarrows [lty, rty, _boolTy] in
      tyarrows_ [infoTy, usingStrTy, ppTy, eqTy, lty, rty, _unitTy]
    in
    let utestRunner = TmVar {
      ident = utestRunnerName (), ty = utestRunnerType,
      info = _utestInfo, frozen = false
    } in

    -- Insert definitions of equality and pretty-print functions that have not
    -- yet been declared.
    match generatePrettyPrintBindings t.info env [lty, rty] t.tonfail with (env, ppBinds) in
    match generateEqualityBindings t.info env lty t.tusing with (env, eqBinds) in

    match replaceUtests env t.test with (_, test) in
    match replaceUtests env t.expected with (_, expected) in
    match replaceUtests env x.inexpr with (env, next) in
    let testExpr =
      _apps utestRunner [info, usingStr, ppfn, eqfn, test, expected]
    in
    (env, bindall_ (filterOption [eqBinds, ppBinds]) (semi_ testExpr next))
  | TmDecl (x & {decl = DeclType t}) ->
    let env =
      match t.tyIdent with TyVariant _ then
        {env with variants = mapInsert t.ident (mapEmpty nameCmp) env.variants}
      else env
    in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with inexpr = inexpr})
  | TmDecl (x & {decl = DeclConDef t}) ->
    recursive let extractVariantType = lam ty.
      match ty with TyAll {ty = innerTy} then extractVariantType innerTy
      else match ty with TyArrow {to = to} then extractVariantType to
      else match ty with TyApp {lhs = lhs} then extractVariantType lhs
      else match ty with TyCon {ident = ident} then ident
      else errorSingle [t.info] "Invalid constructor definition"
    in
    let ident = extractVariantType t.tyIdent in
    let constrs = lookupVariant ident env t.info in
    let constrs = mapInsert t.ident t.tyIdent constrs in
    let env = {env with variants = mapInsert ident constrs env.variants} in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with inexpr = inexpr})
  | TmDecl (x & {decl = DeclLet t}) ->
    match replaceUtests env t.body with (_, body) in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with decl = DeclLet {t with body = body}, inexpr = inexpr})
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let replaceBinding = lam env. lam bind.
      match replaceUtests env bind.body with (env, body) in
      (env, {bind with body = body})
    in
    match mapAccumL replaceBinding env t.bindings with (_, bindings) in
    match replaceUtests env x.inexpr with (env, inexpr) in
    (env, TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr})
  | t -> smapAccumL_Expr_Expr replaceUtests env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="insertUtestTail" kind="sem">

```mc
sem insertUtestTail : Ast_Expr -> Ast_Expr
```

<Description>{`Inserts utest runtime code at the tail of the program. In case any test  
failed, this code ensures that the program exits with return code 1. The  
insertion is performed such that the final in\-expression is always  
evaluated, regardless of whether tests failed or not.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem insertUtestTail =
  | TmDecl x ->
    let inexpr = insertUtestTail x.inexpr in
    TmDecl {x with inexpr = inexpr, ty = tyTm inexpr}
  | t ->
    let exitOnFailure =
      _var (utestExitOnFailureName ()) (_tyarrows [tyTm t, tyTm t]) in
    _apps exitOnFailure [t]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="stripUtests" kind="sem">

```mc
sem stripUtests : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem stripUtests =
  | TmDecl (x & {decl = DeclUtest _}) -> stripUtests x.inexpr
  | t -> smap_Expr_Expr stripUtests t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateUtest" kind="sem">

```mc
sem generateUtest : Bool -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateUtest testsEnabled =
  | ast ->
    if testsEnabled then
      match replaceUtests (utestEnvEmpty ()) ast with (env, ast) in
      let ast = insertUtestTail ast in
      let ast = mergeWithHeader ast (loadUtestRuntime ()) in
      eliminateDuplicateCode ast
    else stripUtests ast
```
</ToggleWrapper>
</DocBlock>

