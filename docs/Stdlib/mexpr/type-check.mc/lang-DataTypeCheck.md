import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="_makeConstructorType" kind="sem">

```mc
sem _makeConstructorType : Info -> Bool -> Name -> Ast_Type -> (Name, Set Name, Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _makeConstructorType info disableConstructorTypes ident =
  | ty ->
    let msg = lam. join [
      "* Invalid type of constructor: ", nameGetStr ident, "\n",
      "* The constructor should have a function type, where the\n",
      "* right-hand side should refer to a constructor type.\n",
      "* When type checking the expression\n"
    ] in
    match inspectType ty with TyArrow {to = to} then
      match getTypeArgs to with (TyCon target, _) then
        if disableConstructorTypes then (target.ident, setOfSeq nameCmp [target.ident], ty)
        else
          recursive let substituteData = lam v. lam acc. lam x.
            switch x
            case TyCon t then
              (setInsert t.ident acc, TyCon { t with data = v })
            case TyAlias t then
              match substituteData v acc t.content with (acc, content) in
              (acc, TyAlias { t with content = content })
            case _ then
              smapAccumL_Type_Type (substituteData v) acc x
            end
          in
          let x = nameSym "x" in
          match substituteData (TyVar {info = info, ident = x}) (setEmpty nameCmp) ty
          with (tydeps, newTy) in
          let data =
            Data { types = mapFromSeq nameCmp [ ( target.ident
                                                , { lower = setEmpty nameCmp
                                                  , upper = None () }) ] } in
          (target.ident,
           tydeps,
           TyAll { info = info
                 , ident = x
                 , kind = data
                 , ty = newTy })
      else errorSingle [info] (msg ())
    else errorSingle [info] (msg ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckDecl" kind="sem">

```mc
sem typeCheckDecl : TCEnv -> Ast_Decl -> (TCEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckDecl env =
  | DeclConDef t ->
    let tyIdent = resolveType t.info env false t.tyIdent in
    let tyIdent = substituteNewReprs env tyIdent in
    match _makeConstructorType t.info env.disableConstructorTypes t.ident tyIdent
    with (target, tydeps, tyIdent) in

    -- printLn (type2str tyIdent);

    let tydeps =
      mapInsert target tydeps
        (setFold (lam m. lam t. mapInsert t (setOfSeq nameCmp [target]) m)
                 (mapEmpty nameCmp) tydeps) in
    let newLvl = addi 1 env.currentLvl in
    ( { env with currentLvl = newLvl
      , conEnv = mapInsert t.ident (newLvl, tyIdent) env.conEnv
      , typeDeps = mapUnionWith setUnion tydeps env.typeDeps
      , conDeps  = mapInsertWith setUnion target (setOfSeq nameCmp [t.ident]) env.conDeps
      }
    , DeclConDef {t with tyIdent = tyIdent}
    )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmConApp t ->
    let body = typeCheckExpr env t.body in
    match mapLookup t.ident env.conEnv with Some (_, lty) then
      let lty =
        if env.disableConstructorTypes then
          lty
        else
          match lty with TyAll (r & {kind = Data d}) then
            let types = mapMap (lam ks. {ks with lower = setInsert t.ident ks.lower}) d.types in
            TyAll {r with kind = Data {d with types = types}}
          else
            errorSingle [t.info] "Invalid constructor type in typeCheckExpr!"
      in
      match inst t.info env.currentLvl lty with TyArrow {from = from, to = to} then
        unify env [infoTm body] from (tyTm body);
        TmConApp {t with body = body, ty = to}
      else
        errorSingle [t.info] "Invalid constructor type in typeCheckExpr!"
    else
      let msg = join [
        "* Encountered an unbound constructor: ",
        nameGetStr t.ident, "\n",
        "* When type checking the expression\n"
      ] in
      errorSingle [t.info] msg
```
</ToggleWrapper>
</DocBlock>

