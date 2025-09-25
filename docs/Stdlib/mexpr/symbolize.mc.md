import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# symbolize.mc  
  

Symbolization of the MExpr ast. Ignores already symbolized variables,  
constructors, and type variables.  
  
NOTE\(aathn, 2023\-05\-10\): Add support for symbolizing and returning the  
free variables of an expression \(similarly to eq.mc\)?

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/common.mc"} style={S.link}>common.mc</a>, <a href={"/docs/Stdlib/map.mc"} style={S.link}>map.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/builtin.mc"} style={S.link}>builtin.mc</a>, <a href={"/docs/Stdlib/mexpr/info.mc"} style={S.link}>info.mc</a>, <a href={"/docs/Stdlib/error.mc"} style={S.link}>error.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/repr-ast.mc"} style={S.link}>repr-ast.mc</a>  
  
## Types  
  

          <DocBlock title="NameEnv" kind="type">

```mc
type NameEnv : { varEnv: Map String Name, conEnv: Map String Name, tyVarEnv: Map String Name, tyConEnv: Map String Name, reprEnv: Map String Name, extensionEnv: Map Name (Set Name) }
```



<ToggleWrapper text="Code..">
```mc
type NameEnv = {
  varEnv : Map String Name,
  conEnv : Map String Name,
  tyVarEnv : Map String Name,
  tyConEnv : Map String Name,
  reprEnv : Map String Name,
  extensionEnv : Map Name (Set Name)
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SymEnv" kind="type">

```mc
type SymEnv : { allowFree: Bool, ignoreExternals: Bool, currentEnv: NameEnv, langEnv: Map String NameEnv, namespaceEnv: Map String Name }
```



<ToggleWrapper text="Code..">
```mc
type SymEnv = {
  allowFree : Bool,
  ignoreExternals : Bool,
  currentEnv : NameEnv,
  langEnv : Map String NameEnv,
  namespaceEnv : Map String Name
}
```
</ToggleWrapper>
</DocBlock>

## Languages  
  

          <DocBlock title="SymLookup" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-SymLookup">

```mc
lang SymLookup
```



<ToggleWrapper text="Code..">
```mc
lang SymLookup = IdentifierPrettyPrint
  type LookupParams = {kind : String, info : [Info], allowFree : Bool}

  sem symLookupError : all a. all n. Map String n -> LookupParams -> Name -> a
  sem symLookupError env lkup =| ident ->
    let identStr = nameGetStr ident in
    let f = lam acc : (Int, [String]). lam name. lam.
      if leqi (absi (subi (length identStr) (length name))) acc.0 then
        -- NOTE(vipa, 2025-01-14): We only compute the edit distance
        -- if it's even possible for it to be at least as good as the
        -- current best (length difference is a lower bound, and much
        -- faster to compute)
        let dist = levenshteinDistance identStr name in
        if lti dist acc.0 then (dist, [name]) else
        if eqi dist acc.0 then (acc.0, snoc acc.1 name)
        else acc
      else acc in
    let pprintVar = lam str.
      (pprintVarName pprintEnvEmpty (nameNoSym str)).1 in
    let oxfordList = lam strs. switch strs
      case [x] then x
      case [a, b] then join [a, " or ", b]
      case prev ++ [x] then strJoin ", " (snoc prev (concat "or " x))
      case [] then ""
      end in
    let suggestion = switch mapFoldWithKey f (symSuggestionMaxDistance, []) env
      case (_, []) then ""
      case (_, names) then join ["\n(did you mean ", oxfordList (map pprintVar names), "?)"]
      end in
    errorSingle lkup.info
      (join ["Unknown ", lkup.kind, " in symbolize: ", nameGetStr ident, suggestion])

  -- Get a symbol from the environment, or give an error if it is not there.
  sem getSymbol : LookupParams -> Map String Name -> Name -> Name
  sem getSymbol lkup env =| ident ->
    if nameHasSym ident then ident
    else
      optionGetOrElse
        (lam. if lkup.allowFree then ident
              else symLookupError env lkup ident)
        (mapLookup (nameGetStr ident) env)

  -- Insert a new symbol mapping into the environment, overriding if it exists.
  sem setSymbol : Map String Name -> Name -> (Map String Name, Name)
  sem setSymbol env =| ident ->
    if nameHasSym ident then (env, ident)
    else
      let ident = nameSetNewSym ident in
      (mapInsert (nameGetStr ident) ident env, ident)

  -- The general case, where we may have a richer return value than simply name or env.
  sem getSymbolWith
    : all a. all b.
      { hasSym  : () -> b,
        absent  : () -> b,
        present : a  -> b }
      -> Map String a
      -> Name
      -> b
  sem getSymbolWith cases env =| ident ->
    if nameHasSym ident then cases.hasSym ()
    else
      optionMapOrElse cases.absent cases.present
        (mapLookup (nameGetStr ident) env)

  -- The general case, where we may have a richer element type than simply name.
  sem setSymbolWith
    : all a. (Name -> a)
    -> Map String a
    -> Name
    -> (Map String a, Name)
  sem setSymbolWith newElem env =| ident ->
    if nameHasSym ident then (env, ident)
    else
      let ident = nameSetNewSym ident in
      (mapInsert (nameGetStr ident) (newElem ident) env, ident)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Sym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-Sym">

```mc
lang Sym
```



<ToggleWrapper text="Code..">
```mc
lang Sym = Ast + SymLookup
  -- Symbolize with an environment
  sem symbolizeExpr : SymEnv -> Expr -> Expr
  sem symbolizeExpr (env : SymEnv) =
  | t ->
    let t = smap_Expr_Expr (symbolizeExpr env) t in
    let t = smap_Expr_Type (symbolizeType env) t in
    t

  sem symbolizeDecl : SymEnv -> Decl -> (SymEnv, Decl)
  sem symbolizeDecl env =
  | d ->
    let d = smap_Decl_Expr (symbolizeExpr env) d in
    let d = smap_Decl_Type (symbolizeType env) d in
    (env, d)

  sem symbolizeType : SymEnv -> Type -> Type
  sem symbolizeType env =
  | t -> smap_Type_Type (symbolizeType env) t

  -- Same as symbolizeExpr, but also return an env with all names bound at the
  -- top-level
  sem symbolizeTopExpr (env : SymEnv) =
  | t ->
    let t = symbolizeExpr env t in
    addTopNames env t

  sem symbolizeKind : Info -> SymEnv -> Kind -> Kind
  sem symbolizeKind info env =
  | t -> smap_Kind_Type (symbolizeType env) t

  -- TODO(vipa, 2020-09-23): env is constant throughout symbolizePat,
  -- so it would be preferrable to pass it in some other way, a reader
  -- monad or something. patEnv on the other hand changes, it would be
  -- nice to pass via state monad or something.  env is the
  -- environment from the outside, plus the names added thus far in
  -- the pattern patEnv is only the newly added names
  sem symbolizePat : all ext. SymEnv -> Map String Name -> Pat -> (Map String Name, Pat)
  sem symbolizePat env patEnv =
  | t -> smapAccumL_Pat_Pat (symbolizePat env) patEnv t

  -- Symbolize with builtin environment
  sem symbolize =
  | expr ->
    let env = symEnvDefault in
    symbolizeExpr env expr

  -- Symbolize with builtin environment and ignore errors
  sem symbolizeAllowFree =
  | expr ->
    let env = { symEnvDefault with allowFree = true } in
    symbolizeExpr env expr

  -- Add top-level identifiers (along the spine of the program) in \\`t\\`
  -- to the given environment.
  sem addTopNames (env : SymEnv) =
  | _ -> env

  sem declAddDefinition : SymEnv -> Decl -> SymEnv
  sem declAddDefinition env =
  | _ -> env
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-VarSym">

```mc
lang VarSym
```



<ToggleWrapper text="Code..">
```mc
lang VarSym = Sym + VarAst
  sem symbolizeExpr (env : SymEnv) =
  | TmVar t ->
    let ident =
      getSymbol {kind = "variable",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.varEnv t.ident
    in
    TmVar {t with ident = ident}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LamSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-LamSym">

```mc
lang LamSym
```



<ToggleWrapper text="Code..">
```mc
lang LamSym = Sym + LamAst + VarSym
  sem symbolizeExpr (env : SymEnv) =
  | TmLam t ->
    match setSymbol env.currentEnv.varEnv t.ident with (varEnv, ident) in
    TmLam {t with ident = ident,
                  tyAnnot = symbolizeType env t.tyAnnot,
                  body = symbolizeExpr (symbolizeUpdateVarEnv env varEnv) t.body}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DeclSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-DeclSym">

```mc
lang DeclSym
```



<ToggleWrapper text="Code..">
```mc
lang DeclSym = Sym + DeclAst
  sem symbolizeExpr env =
  | TmDecl x ->
    match symbolizeDecl env x.decl with (env, decl) in
    let inexpr = symbolizeExpr env x.inexpr in
    TmDecl {x with decl = decl, inexpr = inexpr}

  sem addTopNames (env : SymEnv) =
  | TmDecl x ->
    let env = declAddDefinition env x.decl in
    addTopNames env x.inexpr
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LetSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-LetSym">

```mc
lang LetSym
```



<ToggleWrapper text="Code..">
```mc
lang LetSym = Sym + LetDeclAst + AllTypeAst
  sem symbolizeDecl (env : SymEnv) =
  | DeclLet t ->
    match symbolizeTyAnnot env t.tyAnnot with (tyVarEnv, tyAnnot) in
    match setSymbol env.currentEnv.varEnv t.ident with (varEnv, ident) in
    let decl = DeclLet
      {t with ident = ident
      , tyAnnot = tyAnnot
      , body = symbolizeExpr (symbolizeUpdateTyVarEnv env tyVarEnv) t.body
      } in
    (symbolizeUpdateVarEnv env varEnv, decl)

  sem symbolizeTyAnnot : SymEnv -> Type -> (Map String Name, Type)
  sem symbolizeTyAnnot env =
  | tyAnnot ->
    let symbolized = symbolizeType env tyAnnot in
    match stripTyAll symbolized with (vars, stripped) in
    (foldl (lam env. lam nk. mapInsert (nameGetStr nk.0) nk.0 env)
       env.currentEnv.tyVarEnv vars, symbolized)

  sem declAddDefinition env =
  | DeclLet t ->
    let varEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.varEnv in
    symbolizeUpdateVarEnv env varEnv
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecLetsSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-RecLetsSym">

```mc
lang RecLetsSym
```



<ToggleWrapper text="Code..">
```mc
lang RecLetsSym = Sym + RecLetsDeclAst + LetSym
  sem symbolizeDecl (env : SymEnv) =
  | DeclRecLets t ->
    -- Generate fresh symbols for all identifiers and add to the environment
    let setSymbolIdent = lam env. lam b.
      match setSymbol env b.ident with (env, ident) in
      (env, {b with ident = ident})
    in
    match mapAccumL setSymbolIdent env.currentEnv.varEnv t.bindings with (varEnv, bindings) in
    let newEnv = symbolizeUpdateVarEnv env varEnv in

    -- Symbolize all bodies with the new environment
    let bindings =
      map (lam b. match symbolizeTyAnnot env b.tyAnnot with (tyVarEnv, tyAnnot) in
                  {b with body = symbolizeExpr (symbolizeUpdateTyVarEnv newEnv tyVarEnv) b.body,
                          tyAnnot = tyAnnot})
        bindings in

    (newEnv, DeclRecLets {t with bindings = bindings})

  sem declAddDefinition env =
  | DeclRecLets t ->
    let varEnv =
      foldr (lam b. mapInsert (nameGetStr b.ident) b.ident) env.currentEnv.varEnv t.bindings in
    symbolizeUpdateVarEnv env varEnv
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-ExtSym">

```mc
lang ExtSym
```



<ToggleWrapper text="Code..">
```mc
lang ExtSym = Sym + ExtDeclAst
  sem symbolizeDecl (env : SymEnv) =
  | DeclExt t ->
    let setName = if env.ignoreExternals then lam x. lam y. (x, y) else setSymbol in
    match setName env.currentEnv.varEnv t.ident with (varEnv, ident) in
    ( symbolizeUpdateVarEnv env varEnv
    , DeclExt {t with ident = ident, tyIdent = symbolizeType env t.tyIdent}
    )

  sem declAddDefinition (env : SymEnv) =
  | DeclExt t ->
    let varEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.varEnv in
    symbolizeUpdateVarEnv env varEnv
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-TypeSym">

```mc
lang TypeSym
```



<ToggleWrapper text="Code..">
```mc
lang TypeSym = Sym + TypeDeclAst
  sem symbolizeDecl (env : SymEnv) =
  | DeclType t ->
    match setSymbol env.currentEnv.tyConEnv t.ident with (tyConEnv, ident) in
    match mapAccumL setSymbol env.currentEnv.tyVarEnv t.params with (tyVarEnv, params) in
    ( symbolizeUpdateTyConEnv env tyConEnv
    , DeclType
      {t with ident = ident
      , params = params
      , tyIdent = symbolizeType (symbolizeUpdateTyVarEnv env tyVarEnv) t.tyIdent
      }
    )

  sem declAddDefinition (env : SymEnv) =
  | DeclType t ->
    let tyConEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.tyConEnv in
    symbolizeUpdateTyConEnv env tyConEnv
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-DataSym">

```mc
lang DataSym
```



<ToggleWrapper text="Code..">
```mc
lang DataSym = Sym + DataAst + DataDeclAst
  sem symbolizeDecl (env : SymEnv) =
  | DeclConDef t ->
    match setSymbol env.currentEnv.conEnv t.ident with (conEnv, ident) in
    ( symbolizeUpdateConEnv env conEnv
    , DeclConDef {t with ident = ident, tyIdent = symbolizeType env t.tyIdent}
    )

  sem symbolizeExpr env =
  | TmConApp t ->
    let ident =
      getSymbol {kind = "constructor",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.conEnv t.ident
    in
    TmConApp {t with ident = ident,
                     body = symbolizeExpr env t.body}

  sem declAddDefinition (env : SymEnv) =
  | DeclConDef t ->
    let conEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.conEnv in
    symbolizeUpdateConEnv env conEnv
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-MatchSym">

```mc
lang MatchSym
```



<ToggleWrapper text="Code..">
```mc
lang MatchSym = Sym + MatchAst
  sem symbolizeExpr (env : SymEnv) =
  | TmMatch t ->
    match symbolizePat env (mapEmpty cmpString) t.pat with (thnVarEnv, pat) in
    let thnPatEnv = symbolizeUpdateVarEnv env (mapUnion env.currentEnv.varEnv thnVarEnv) in
    TmMatch {t with target = symbolizeExpr env t.target,
                    pat = pat,
                    thn = symbolizeExpr thnPatEnv t.thn,
                    els = symbolizeExpr env t.els}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OpImplSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-OpImplSym">

```mc
lang OpImplSym
```



<ToggleWrapper text="Code..">
```mc
lang OpImplSym = OpImplAst + Sym + LetSym
  sem symbolizeDecl env =
  | DeclOpImpl x ->
    let ident = getSymbol
      { kind = "variable"
      , info = [x.info]
      , allowFree = env.allowFree
      }
      env.currentEnv.varEnv
      x.ident in
    match symbolizeTyAnnot env x.specType with (tyVarEnv, specType) in
    let body = symbolizeExpr (symbolizeUpdateTyVarEnv env tyVarEnv) x.body in
    (env, DeclOpImpl {x with ident = ident, body = body, specType = specType})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OpDeclSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-OpDeclSym">

```mc
lang OpDeclSym
```



<ToggleWrapper text="Code..">
```mc
lang OpDeclSym = OpDeclAst + Sym + OpImplAst + ReprDeclAst + OpImplSym
  sem symbolizeDecl env =
  | DeclOp x ->
    let symbolizeReprDecl = lam reprEnv. lam binding.
      match mapAccumL setSymbol env.currentEnv.tyVarEnv binding.1 .vars with (tyVarEnv, vars) in
      let newEnv = (symbolizeUpdateTyVarEnv env tyVarEnv) in
      match setSymbol reprEnv binding.0 with (reprEnv, ident) in
      let res =
        { ident = ident
        , vars = vars
        , pat = symbolizeType newEnv binding.1 .pat
        , repr = symbolizeType newEnv binding.1 .repr
        }
      in (reprEnv, res) in

    match setSymbol env.currentEnv.varEnv x.ident with (varEnv, ident) in
    ( symbolizeUpdateVarEnv env varEnv
    , DeclOp
      { x with ident = ident
      , tyAnnot = symbolizeType env x.tyAnnot
      }
    )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprTypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-ReprTypeSym">

```mc
lang ReprTypeSym
```



<ToggleWrapper text="Code..">
```mc
lang ReprTypeSym = Sym + ReprDeclAst
  sem symbolizeDecl env =
  | DeclRepr x ->
    match setSymbol env.currentEnv.reprEnv x.ident with (reprEnv, ident) in
    match mapAccumL setSymbol env.currentEnv.tyVarEnv x.vars with (tyVarEnv, vars) in
    let rhsEnv = (symbolizeUpdateTyVarEnv env tyVarEnv) in
    let pat = symbolizeType rhsEnv x.pat in
    let repr = symbolizeType rhsEnv x.repr in
    ( symbolizeUpdateReprEnv env reprEnv
    , DeclRepr {x with ident = ident, pat = pat, repr = repr, vars = vars}
    )
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OpVarSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-OpVarSym">

```mc
lang OpVarSym
```



<ToggleWrapper text="Code..">
```mc
lang OpVarSym = OpVarAst + Sym
  sem symbolizeExpr env =
  | TmOpVar x ->
    let ident = getSymbol
      { kind = "variable"
      , info = [x.info]
      , allowFree = env.allowFree
      }
      env.currentEnv.varEnv
      x.ident in
    TmOpVar {x with ident = ident}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VariantTypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-VariantTypeSym">

```mc
lang VariantTypeSym
```



<ToggleWrapper text="Code..">
```mc
lang VariantTypeSym = Sym + VariantTypeAst
  sem symbolizeType env =
  | TyVariant t & ty ->
    if eqi (mapLength t.constrs) 0 then ty
    else errorSingle [t.info] "Symbolizing non-empty variant types not yet supported"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConTypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-ConTypeSym">

```mc
lang ConTypeSym
```



<ToggleWrapper text="Code..">
```mc
lang ConTypeSym = Sym + ConTypeAst
  sem symbolizeType env =
  | TyCon t ->
    let ident =
      getSymbol {kind = "type constructor",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.tyConEnv t.ident
    in
    TyCon {t with ident = ident, data = symbolizeType env t.data}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataTypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-DataTypeSym">

```mc
lang DataTypeSym
```



<ToggleWrapper text="Code..">
```mc
lang DataTypeSym = Sym + DataTypeAst
  sem symbolizeType env =
  | TyData t ->
    let cons =
      setFold (lam ks. lam k.
        setInsert
          (getSymbol {kind = "constructor",
                      info = [t.info],
                      allowFree = env.allowFree}
             env.currentEnv.conEnv k) ks)
        (setEmpty nameCmp) t.cons
    in TyData {t with cons = cons}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarTypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-VarTypeSym">

```mc
lang VarTypeSym
```



<ToggleWrapper text="Code..">
```mc
lang VarTypeSym = Sym + VarTypeAst + UnknownTypeAst
  sem symbolizeType env =
  | TyVar t ->
    let ident =
      getSymbol {kind = "type variable",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.tyVarEnv t.ident
    in
    TyVar {t with ident = ident}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AllTypeSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-AllTypeSym">

```mc
lang AllTypeSym
```



<ToggleWrapper text="Code..">
```mc
lang AllTypeSym = Sym + AllTypeAst
  sem symbolizeType env =
  | TyAll t ->
    let kind = symbolizeKind t.info env t.kind in
    match setSymbol env.currentEnv.tyVarEnv t.ident with (tyVarEnv, ident) in
    TyAll {t with ident = ident,
                  ty = symbolizeType (symbolizeUpdateTyVarEnv env tyVarEnv) t.ty,
                  kind = kind}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataKindSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-DataKindSym">

```mc
lang DataKindSym
```



<ToggleWrapper text="Code..">
```mc
lang DataKindSym = Sym + DataKindAst
  sem symbolizeKind info env =
  | Data t ->
    let symbolizeCons = lam cons.
      setFold
        (lam ks. lam k.
          let str = nameGetStr k in
          if isLowerAlpha (head str) then
            setInsert k ks
          else
            setInsert
            (getSymbol {kind = "constructor",
                        info = [info],
                        allowFree = env.allowFree}
               env.currentEnv.conEnv k) ks)
        (setEmpty nameCmp)
        cons
    in
    let types =
      foldl
        (lam m. lam b.
          match b with (t, r) in
          let t = getSymbol {kind = "type constructor",
                             info = [info],
                             allowFree = env.allowFree}
                    env.currentEnv.tyConEnv t
          in
          mapInsert t {r with lower = symbolizeCons r.lower,
                              upper = optionMap symbolizeCons r.upper} m)
        (mapEmpty nameCmp)
        (mapBindings t.types)
    in
    Data {t with types = types}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ReprSubstSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-ReprSubstSym">

```mc
lang ReprSubstSym
```



<ToggleWrapper text="Code..">
```mc
lang ReprSubstSym = Sym + ReprSubstAst
  sem symbolizeType env =
  | TySubst x ->
    let arg = symbolizeType env x.arg in
    let subst = getSymbol
      { kind = "repr"
      , info = [x.info]
      , allowFree = env.allowFree
      }
      env.currentEnv.reprEnv
      x.subst in
    TySubst {x with arg = arg, subst = subst}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NamedPatSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-NamedPatSym">

```mc
lang NamedPatSym
```



<ToggleWrapper text="Code..">
```mc
lang NamedPatSym = Sym + NamedPat
  sem symbolizePat env patEnv =
  | PatNamed p ->
    match _symbolizePatName patEnv p.ident with (patEnv, patname) in
    (patEnv, PatNamed {p with ident = patname})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqEdgePatSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-SeqEdgePatSym">

```mc
lang SeqEdgePatSym
```



<ToggleWrapper text="Code..">
```mc
lang SeqEdgePatSym = Sym + SeqEdgePat
  sem symbolizePat env patEnv =
  | PatSeqEdge p ->
    match mapAccumL (symbolizePat env) patEnv p.prefix with (patEnv, prefix) in
    match _symbolizePatName patEnv p.middle with (patEnv, middle) in
    match mapAccumL (symbolizePat env) patEnv p.postfix with (patEnv, postfix) in
    (patEnv, PatSeqEdge {p with prefix = prefix,
                                middle = middle,
                                postfix = postfix})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataPatSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-DataPatSym">

```mc
lang DataPatSym
```



<ToggleWrapper text="Code..">
```mc
lang DataPatSym = Sym + DataPat
  sem symbolizePat env patEnv =
  | PatCon r ->
    let ident =
      getSymbol {kind = "constructor",
                 info = [r.info],
                 allowFree = env.allowFree}
        env.currentEnv.conEnv r.ident
    in
    match symbolizePat env patEnv r.subpat with (patEnv, subpat) in
    (patEnv, PatCon {r with ident = ident,
                            subpat = subpat})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NotPatSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-NotPatSym">

```mc
lang NotPatSym
```



<ToggleWrapper text="Code..">
```mc
lang NotPatSym = Sym + NotPat
  sem symbolizePat env patEnv =
  | PatNot p ->
    -- NOTE(vipa, 2020-09-23): new names in a not-pattern do not
    -- matter since they will never bind (it should probably be an
    -- error to bind a name inside a not-pattern, but we're not doing
    -- that kind of static checks yet.  Note that we still need to run
    -- symbolizePat though, constructors must refer to the right symbol.
    match symbolizePat env patEnv p.subpat with (_, subpat) in
    (patEnv, PatNot {p with subpat = subpat})
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-MExprSym">

```mc
lang MExprSym
```



<ToggleWrapper text="Code..">
```mc
lang MExprSym =

  -- Default implementations (Terms)
  RecordAst + ConstAst + SeqAst + NeverAst + AppAst +

  -- Default implementations (Decls)
  UtestDeclAst +

  -- Default implementations (Types)
  UnknownTypeAst + BoolTypeAst + IntTypeAst + FloatTypeAst + CharTypeAst +
  FunTypeAst + SeqTypeAst + TensorTypeAst + RecordTypeAst + AppTypeAst +

  -- Default implementations (Kinds)
  PolyKindAst + MonoKindAst + RecordKindAst +

  -- Default implementations (Patterns)
  SeqTotPat + RecordPat + IntPat + CharPat + BoolPat + AndPat + OrPat +

  -- Non-default implementations (Terms)
  VarSym + LamSym + DataSym + MatchSym + DeclSym +

  -- Non-default implementations (Decls)
  LetSym + ExtSym + TypeSym + RecLetsSym +

  -- Non-default implementations (Types)
  VariantTypeSym + ConTypeSym + DataTypeSym + VarTypeSym + AllTypeSym +

  -- Non-default implementations (Kinds)
  DataKindSym +

  -- Non-default implementations (Patterns)
  NamedPatSym + SeqEdgePatSym + DataPatSym + NotPatSym
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RepTypesSym" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-RepTypesSym">

```mc
lang RepTypesSym
```



<ToggleWrapper text="Code..">
```mc
lang RepTypesSym = OpDeclSym + OpImplSym + OpVarSym + ReprSubstSym + ReprTypeSym
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SymCheck" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-SymCheck">

```mc
lang SymCheck
```

<Description>{`To test that the symbolization works as expected, we define functions that  
verify all names in the AST have been symbolized.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang SymCheck = MExprSym
  sem isFullySymbolized : Expr -> Bool
  sem isFullySymbolized =
  | ast -> isFullySymbolizedExpr ast ()

  sem isFullySymbolizedDecl : Decl -> () -> Bool
  sem isFullySymbolizedDecl =
  | DeclLet l ->
    foldl _and (lam. true) [
      lam. nameHasSym l.ident,
      isFullySymbolizedType l.tyAnnot,
      isFullySymbolizedExpr l.body
    ]
  | DeclRecLets l ->
    let isFullySymbolizedBinding = lam b.
      _and (lam. nameHasSym b.ident)
        (_and
           (isFullySymbolizedType b.tyAnnot)
           (isFullySymbolizedExpr b.body))
    in
    foldl _and (lam. true) (map isFullySymbolizedBinding l.bindings)
  | DeclType l ->
    _and (lam. nameHasSym l.ident) (_and
          (lam. (forAll nameHasSym l.params))
          (isFullySymbolizedType l.tyIdent))
  | DeclExt l ->
    _and (lam. nameHasSym l.ident) (isFullySymbolizedType l.tyIdent)
  | DeclConDef l ->
    _and (lam. nameHasSym l.ident) (isFullySymbolizedType l.tyIdent)
  | d ->
    _and (sfold_Decl_Expr (_andFold isFullySymbolizedExpr) (lam. true) d)
      (sfold_Decl_Type (_andFold isFullySymbolizedType) (lam. true) d)

  sem isFullySymbolizedExpr : Expr -> () -> Bool
  sem isFullySymbolizedExpr =
  | TmVar t -> lam. nameHasSym t.ident
  | TmLam t ->
    _and (lam. nameHasSym t.ident)
      (_and
         (isFullySymbolizedType t.tyAnnot)
         (isFullySymbolizedExpr t.body))
  | TmConApp t ->
    _and (lam. nameHasSym t.ident) (isFullySymbolizedExpr t.body)
  | TmDecl x ->
    _and (isFullySymbolizedDecl x.decl) (isFullySymbolizedExpr x.inexpr)
  | t ->
    _and (sfold_Expr_Expr (_andFold isFullySymbolizedExpr) (lam. true) t)
      (_and
         (sfold_Expr_Type (_andFold isFullySymbolizedType) (lam. true) t)
         (sfold_Expr_Pat (_andFold isFullySymbolizedPat) (lam. true) t))

  sem isFullySymbolizedPat : Pat -> () -> Bool
  sem isFullySymbolizedPat =
  | PatNamed {ident = PName id} -> lam. nameHasSym id
  | PatCon t ->
    _and (lam. nameHasSym t.ident) (isFullySymbolizedPat t.subpat)
  | p ->
    _and
      (sfold_Pat_Pat (_andFold isFullySymbolizedPat) (lam. true) p)
      (sfold_Pat_Type (_andFold isFullySymbolizedType) (lam. true) p)

  sem isFullySymbolizedType : Type -> () -> Bool
  sem isFullySymbolizedType =
  | TyCon {ident = ident} | TyVar {ident = ident} -> lam. nameHasSym ident
  | TyAll t ->
    _and (lam. nameHasSym t.ident) (isFullySymbolizedType t.ty)
  | ty ->
    sfold_Type_Type (_andFold isFullySymbolizedType) (lam. true) ty
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/symbolize.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = SymCheck + MExprPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="_nameEnvEmpty" kind="let">

```mc
let _nameEnvEmpty  : NameEnv
```



<ToggleWrapper text="Code..">
```mc
let _nameEnvEmpty : NameEnv = {
  varEnv = mapEmpty cmpString,
  conEnv = mapEmpty cmpString,
  tyVarEnv = mapEmpty cmpString,
  tyConEnv = mapEmpty cmpString,
  reprEnv = mapEmpty cmpString,
  extensionEnv = mapEmpty nameCmp
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeNameEnv" kind="let">

```mc
let mergeNameEnv l r : NameEnv -> NameEnv -> {conEnv: Map String Name, varEnv: Map String Name, reprEnv: Map String Name, tyConEnv: Map String Name, tyVarEnv: Map String Name, extensionEnv: Map Name (Set Name)}
```



<ToggleWrapper text="Code..">
```mc
let mergeNameEnv = lam l. lam r. {
  varEnv = mapUnion l.varEnv r.varEnv,
  conEnv = mapUnion l.conEnv r.conEnv,
  tyVarEnv = mapUnion l.tyVarEnv r.tyVarEnv,
  tyConEnv = mapUnion l.tyConEnv r.tyConEnv,
  reprEnv = mapUnion l.reprEnv r.reprEnv,
  extensionEnv = (mapMerge
    (lam lhs. lam rhs.
      match lhs with None _ then rhs
      else match rhs with None _ then lhs
      else match (lhs, rhs) with (Some lhs, Some rhs)
      in Some (setUnion lhs rhs))
    l.extensionEnv
    r.extensionEnv)
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mergeSymEnv" kind="let">

```mc
let mergeSymEnv l r : SymEnv -> SymEnv -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let mergeSymEnv : SymEnv -> SymEnv -> SymEnv = lam l. lam r.
  { allowFree = l.allowFree
  , ignoreExternals = l.ignoreExternals
  , currentEnv = mergeNameEnv l.currentEnv r.currentEnv
  , langEnv = mapUnion l.langEnv r.langEnv
  , namespaceEnv = mapUnion l.namespaceEnv r.namespaceEnv
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeUpdateVarEnv" kind="let">

```mc
let symbolizeUpdateVarEnv env varEnv : SymEnv -> Map String Name -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symbolizeUpdateVarEnv = lam env : SymEnv . lam varEnv : Map String Name.
  {env with currentEnv = {env.currentEnv with varEnv = varEnv}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeUpdateConEnv" kind="let">

```mc
let symbolizeUpdateConEnv env conEnv : SymEnv -> Map String Name -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symbolizeUpdateConEnv = lam env : SymEnv . lam conEnv : Map String Name.
  {env with currentEnv = {env.currentEnv with conEnv = conEnv}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeUpdateTyVarEnv" kind="let">

```mc
let symbolizeUpdateTyVarEnv env tyVarEnv : SymEnv -> Map String Name -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symbolizeUpdateTyVarEnv = lam env : SymEnv . lam tyVarEnv : Map String Name.
  {env with currentEnv = {env.currentEnv with tyVarEnv = tyVarEnv}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeUpdateTyConEnv" kind="let">

```mc
let symbolizeUpdateTyConEnv env tyConEnv : SymEnv -> Map String Name -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symbolizeUpdateTyConEnv = lam env : SymEnv . lam tyConEnv : Map String Name.
  {env with currentEnv = {env.currentEnv with tyConEnv = tyConEnv}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeUpdateReprEnv" kind="let">

```mc
let symbolizeUpdateReprEnv env reprEnv : SymEnv -> Map String Name -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symbolizeUpdateReprEnv = lam env : SymEnv . lam reprEnv : Map String Name.
  {env with currentEnv = {env.currentEnv with reprEnv = reprEnv}}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_symEnvEmpty" kind="let">

```mc
let _symEnvEmpty  : SymEnv
```



<ToggleWrapper text="Code..">
```mc
let _symEnvEmpty : SymEnv = {
  allowFree = false,
  ignoreExternals = false,
  currentEnv = _nameEnvEmpty,
  langEnv = mapEmpty cmpString,
  namespaceEnv = mapEmpty cmpString
}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symEnvAddBuiltinTypes" kind="let">

```mc
let symEnvAddBuiltinTypes env : all a. SymEnv -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symEnvAddBuiltinTypes : all a. SymEnv -> SymEnv
  = lam env. symbolizeUpdateTyConEnv env
    (mapUnion env.currentEnv.tyConEnv builtinTypeNames)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symEnvDefault" kind="let">

```mc
let symEnvDefault  : SymEnv
```



<ToggleWrapper text="Code..">
```mc
let symEnvDefault =
  symEnvAddBuiltinTypes _symEnvEmpty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symEnvEmpty" kind="let">

```mc
let symEnvEmpty  : SymEnv
```

<Description>{`TODO\(oerikss, 2023\-11\-14\): Change all DSLs that use this name for the  
symbolize environment to instead point to \`symEnvDefault\` and then  
remove this alias and rename \`\_symEnvEmpty\` to \`symEnvEmpty\`.`}</Description>


<ToggleWrapper text="Code..">
```mc
let symEnvEmpty = symEnvDefault
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symSuggestionMaxDistance" kind="let">

```mc
let symSuggestionMaxDistance  : Int
```

<Description>{`NOTE\(vipa, 2025\-02\-17\): All suggestions made by symLookupError will  
have at most this edit distance`}</Description>


<ToggleWrapper text="Code..">
```mc
let symSuggestionMaxDistance = 4
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_symbolizePatName" kind="let">

```mc
let _symbolizePatName patEnv pname : Map String Name -> PatName -> (Map String Name, PatName)
```



<ToggleWrapper text="Code..">
```mc
let _symbolizePatName: Map String Name -> PatName -> (Map String Name, PatName) =
  use SymLookup in
  lam patEnv. lam pname.
    match pname with PName name then
      getSymbolWith
        { hasSym = lam. (patEnv, PName name),
          absent = lam.
            let name = nameSetNewSym name in
            (mapInsert (nameGetStr name) name patEnv, PName name),
          present = lam name. (patEnv, PName name)
        } patEnv name
    else (patEnv, pname)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_and" kind="let">

```mc
let _and cond f _ : all a. (() -> Bool) -> (() -> Bool) -> a -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _and = lam cond. lam f. lam. if cond () then f () else false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_andFold" kind="let">

```mc
let _andFold f acc e : all a. all a1. (a -> () -> Bool) -> (() -> Bool) -> a -> a1 -> Bool
```



<ToggleWrapper text="Code..">
```mc
let _andFold = lam f. lam acc. lam e. _and acc (f e)
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr

use TestLang in

let x = nameSym "x" in
utest isFullySymbolized (ulam_ "x" (var_ "x")) with false in
utest isFullySymbolized (nulam_ x (var_ "x")) with false in
utest isFullySymbolized (nulam_ x (nvar_ x)) with true in

let testSymbolize = lam ast. lam testEqStr.
  let symbolizeCalls =
    [ symbolize
    , symbolizeExpr {symEnvDefault with allowFree = true}] in
  foldl
    (lam acc. lam symb.
      if acc then
        let symAst = symb ast in
        isFullySymbolized symAst
      else false)
    true symbolizeCalls
in

let base = (ulam_ "x" (ulam_ "y" (app_ (var_ "x") (var_ "y")))) in
utest testSymbolize base false with true in

let rec = urecord_ [("k1", base), ("k2", (int_ 1)), ("k3", (int_ 2))] in
utest testSymbolize rec false with true in

let letin = bind_ (ulet_ "x" rec) (app_ (var_ "x") base) in
utest testSymbolize letin false with true in

let lettypein = bindall_ [
  type_ "Type" [] tystr_,
  type_ "Type" [] (tycon_ "Type")
] (lam_ "Type" (tycon_ "Type") (var_ "Type")) in
utest testSymbolize lettypein false with true in

let rlets =
  bind_ (ureclets_ [("x", (var_ "y")), ("y", (var_ "x"))])
    (app_ (var_ "x") (var_ "y")) in
utest testSymbolize rlets false with true in

let const = int_ 1 in
utest testSymbolize const false with true in

let data = bind_ (ucondef_ "Test") (conapp_ "Test" base) in
utest testSymbolize data false with true in

let varpat = match_ uunit_ (pvar_ "x") (var_ "x") base in
utest testSymbolize varpat false with true in

let recpat =
  match_ base
    (prec_ [("k1", (pvar_ "x")), ("k2", pvarw_), ("k3", (pvar_ "x"))])
    (var_ "x") uunit_ in
utest testSymbolize recpat false with true in

let datapat =
  bind_ (ucondef_ "Test")
    (match_ uunit_ (pcon_ "Test" (pvar_ "x")) (var_ "x") uunit_) in
utest testSymbolize datapat false with true in

let litpat =
  match_ uunit_ (pint_ 1)
    (match_ uunit_ (pchar_ 'c')
       (match_ uunit_ (ptrue_)
            base
          uunit_)
       uunit_)
    uunit_ in
utest testSymbolize litpat false with true in

let ut = bind_ (utest_ base base) unit_ in
utest testSymbolize ut false with true in

let utu = bind_ (utestu_ base base (uconst_ (CEqi{}))) unit_ in
utest testSymbolize utu false with true in

let seq = seq_ [base, data, const, utu] in
utest testSymbolize seq false with true in

let nev = never_ in
utest testSymbolize nev false with true in

let matchand = bind_ (ulet_ "a" (int_ 2)) (match_ (int_ 1) (pand_ (pint_ 1) (pvar_ "a")) (var_ "a") (never_)) in
utest testSymbolize matchand false with true in

let matchor = bind_ (ulet_ "a" (int_ 2)) (match_ (int_ 1) (por_ (pvar_ "a") (pvar_ "a")) (var_ "a") (never_)) in
utest testSymbolize matchor false with true in

-- NOTE(vipa, 2020-09-23): (var_ "a") should refer to the "a" from ulet_, not the pattern, that's intended, in case someone happens to notice and finds it odd
let matchnot = bind_ (ulet_ "a" (int_ 2)) (match_ (int_ 1) (pnot_ (pvar_ "a")) (var_ "a") (never_)) in
utest testSymbolize matchnot false with true in

let matchoredge = bind_ (ulet_ "a" (int_ 2)) (match_ (int_ 1) (por_ (pseqedge_ [pchar_ 'a'] "a" []) (pseqedge_ [pchar_ 'b'] "a" [])) (var_ "a") (never_)) in
utest testSymbolize matchoredge false with true in

let lettyvar = let_ "f" (tyall_ "a" (tyarrow_ (tyvar_ "a") (tyvar_ "a")))
                        (lam_ "x" (tyvar_ "a") (var_ "x")) in
utest testSymbolize (bind_ lettyvar unit_) false with true in

-- NOTE(larshum, 2023-01-20): This test checks that the type parameters of a
-- type application are not erased when the constructor is a free variable.
let tyconApps = bind_ (
  let_ "f"
    (tyall_ "a" (tyarrow_ (tyapp_ (tycon_ "Con") (tyvar_ "a")) (tyvar_ "a")))
    (ulam_ "x" never_)
) unit_ in
utest expr2str (symbolizeAllowFree tyconApps) with expr2str tyconApps using eqString in

()
```
</ToggleWrapper>
</DocBlock>

