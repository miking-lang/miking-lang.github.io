import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclExtRecLangSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```

<Description>{`TODO\(25\-09\-2024, voorberg\): A bunch of symbols are created manually  
through \`nameSym\`. These should probably be replaced with calls to  
\`setSymbol\` to detect duplicates and provide standardized error messages.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | DeclLang t ->
    -- Symbolize the name of the language
    match setSymbol env.namespaceEnv t.ident with (namespaceEnv, ident) in
    let env = {env with namespaceEnv = namespaceEnv} in

    -- Symbolize included languages
    let includes = map (getSymbol {kind = "language", info = [t.info], allowFree = false} env.namespaceEnv) t.includes in

    -- Create new langEnv and include the names defined in the included languages
    let includedLangEnvs = map
      (lam incl. match mapLookup (nameGetStr incl) env.langEnv
                 with Some langEnv then langEnv
                 else errorMulti
                   [(t.info, nameGetStr incl)]
                   "The included language can not be found!")
    t.includes in

    let langEnv : NameEnv = foldl mergeNameEnv _nameEnvEmpty includedLangEnvs in

    let isSynDecl = lam d. match d with DeclSyn _ then true else false in
    let synDecls = filter isSynDecl t.decls in

    let isProdDecl = lam d. match d with SynDeclProdExt _ then true else false in
    let prodDecls = filter isProdDecl t.decls in

    let isSemDecl = lam d. match d with DeclSem _ then true else false in
    let semDecls = filter isSemDecl t.decls in

    let isTypeDecl = lam d. match d with DeclType _ then true else false in
    let typeDecls = filter isTypeDecl t.decls in

    let isCosynDecl = lam d. match d with DeclCosyn _ then true else false in
    let cosynDecls = filter isCosynDecl t.decls in

    let isCosemDecl = lam d. match d with DeclCosem _ then true else false in
    let cosemDecls = filter isCosemDecl t.decls in

    match mapAccumL (symbolizeSynStep1 env) langEnv synDecls
    with (langEnv, synDecls) in

    match mapAccumL (symbolizeCosynStep1 env) langEnv cosynDecls
    with (langEnv, cosynDecls) in

    match mapAccumL (symbolizeDeclType env) langEnv typeDecls
    with (langEnv, typeDecls) in

    match mapAccumL (symbolizeSynStep2 env) langEnv synDecls
    with (langEnv, synDecls) in

    match mapAccumL (symbolizeCosynStep2 env) langEnv cosynDecls
    with (langEnv, cosynDecls) in

    match mapAccumL (symbolizeProdExt env) langEnv prodDecls
    with (langEnv, prodDecls) in

    match mapAccumL (symbolizeSemStep1 env) langEnv semDecls
    with (langEnv, semDecls) in

    match mapAccumL (symbolizeCosemStep1 env) langEnv cosemDecls
    with (langEnv, cosemDecls) in

    let semDecls = map (symbolizeSemStep2 env langEnv) semDecls in
    let cosemDecls = map (symbolizeCosemStep2 env langEnv) cosemDecls in


    let env = {env with langEnv = mapInsert (nameGetStr t.ident) langEnv env.langEnv} in
    let t = {t with decls = join [typeDecls, synDecls, cosynDecls, semDecls, prodDecls, cosemDecls],
                    includes = includes,
                    ident = ident} in

    (env, DeclLang t)
```
</ToggleWrapper>
</DocBlock>

