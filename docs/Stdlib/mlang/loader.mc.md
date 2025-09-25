import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# loader.mc  
  

This file provides a streamlined interface for loading files and their  
dependencies, and ensuring they are symbolized and type\-checked.  
  
Usage centers around the Loader type, which represents a set of  
loaded files and all their declarations. New files can be loaded  
incrementally. Note that loading a file is a no\-op if the file is  
already loaded. Note also that since type\-checking uses  
side\-effects for unification you cannot generally use a Loader as a  
persistent value, i.e., always only use the newly returned Loader,  
do not keep the old value.  
  
NOTE\(vipa, 2024\-11\-26\): The implementation wraps the \`boot\` backed  
pipeline rather than the new mlang\-pipeline present in this  
folder. This is temporary, until the new pipeline is sufficiently  
stable. The external interface should remain largely the same  
however.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/boot-parser.mc"} style={S.link}>mexpr/boot-parser.mc</a>, <a href={"/docs/Stdlib/stdlib.mc"} style={S.link}>stdlib.mc</a>, <a href={"/docs/Stdlib/mlang/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mlang/symbolize.mc"} style={S.link}>symbolize.mc</a>, <a href={"/docs/Stdlib/mlang/type-check.mc"} style={S.link}>type-check.mc</a>, <a href={"/docs/Stdlib/mlang/pprint.mc"} style={S.link}>pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/json-debug.mc"} style={S.link}>mexpr/json-debug.mc</a>  
  
## Languages  
  

          <DocBlock title="SymGetters" kind="lang" link="/docs/Stdlib/mlang/loader.mc/lang-SymGetters">

```mc
lang SymGetters
```



<ToggleWrapper text="Code..">
```mc
lang SymGetters = Sym
  -- Helpers for looking up names from known symbolization
  -- environments
  sem _getVarExn : String -> {path : String, env : SymEnv} -> Name
  sem _getVarExn str = | {path = path, env = env} ->
    match mapLookup str env.currentEnv.varEnv
    with Some n then n
    else error (join
      [ "Compiler error: expected variable \"", str, "\" to be defined in\n"
      , path
      ])
  sem _getConExn : String -> {path : String, env : SymEnv} -> Name
  sem _getConExn str = | {path = path, env = env} ->
    match mapLookup str env.currentEnv.conEnv
    with Some n then n
    else error (join
      [ "Compiler error: expected constructor \"", str, "\" to be defined in\n"
      , path
      ])
  sem _getTyConExn : String -> {path : String, env : SymEnv} -> Name
  sem _getTyConExn str = | {path = path, env = env} ->
    match mapLookup str env.currentEnv.tyConEnv
    with Some n then n
    else error (join
      [ "Compiler error: expected type \"", str, "\" to be defined in\n"
      , path
      ])
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MCorePathResolution" kind="lang" link="/docs/Stdlib/mlang/loader.mc/lang-MCorePathResolution">

```mc
lang MCorePathResolution
```

<Description>{`Use MCore\-style path resolution, e.g., using libraries set in  
MCORE\_LIBS`}</Description>


<ToggleWrapper text="Code..">
```mc
lang MCorePathResolution = MCoreLoader
  sem includeFileTypeExn ftype dir path = | loader ->
    let resolved = stdlibResolveFileOr (lam x. error x) dir path in
    match _loadFile resolved (ftype, loader) with (env, loader) in
    ({path = resolved, env = env}, loader)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="BootParserLoader" kind="lang" link="/docs/Stdlib/mlang/loader.mc/lang-BootParserLoader">

```mc
lang BootParserLoader
```



<ToggleWrapper text="Code..">
```mc
lang BootParserLoader = MCorePathResolution + DeclAst + BootParser
  + LetDeclAst + RecLetsDeclAst + TypeDeclAst + DataDeclAst + ExtDeclAst
  + MLangPrettyPrint + AstToJson
  type LoaderRec =
    { decls : [Decl]
    -- NOTE(vipa, 2024-11-27): We check each Decl if their info field
    -- points to a file in this set. The set is updated only after all
    -- decls from a file have been filtered (but before they've been
    -- added, symbolized, and type-checked), thus we can do simpler
    -- de-duplication than previously.
    , includedFiles : Map String SymEnv
    , symEnv : SymEnv
    , tcEnv : TCEnv
    , hooks : [Hook]
    , queue : [Decl]
    }
  syn Loader =
  | Loader LoaderRec
  syn FileType =
  | FMCore ()

  sem mkLoader symEnv tcEnv = | hooks -> Loader
    { decls = []
    , includedFiles = mapEmpty cmpString
    , symEnv = symEnv
    , tcEnv = tcEnv
    , hooks = hooks
    , queue = []
    }
  sem addHook loader = | hook ->
    match loader with Loader x in
    Loader {x with hooks = snoc x.hooks hook}
  sem remHook check = | Loader x ->
    Loader {x with hooks = filter (lam x. not (check x)) x.hooks}
  sem hasHook check = | Loader x ->
    optionIsSome (find check x.hooks)
  sem getHookOpt check = | Loader x ->
    findMap check x.hooks
  sem withHookState f = | loader & Loader x ->
    match findMap (f loader) x.hooks with Some res
    then res
    else error "Compiler error: missing hook in loader"

  sem _getSymEnv = | Loader x -> x.symEnv
  sem _setSymEnv symEnv = | Loader x -> Loader {x with symEnv = symEnv}

  sem _getTCEnv = | Loader x -> x.tcEnv
  sem _setTCEnv tcEnv = | Loader x -> Loader {x with tcEnv = tcEnv}

  sem getDecls = | Loader x -> x.decls
  sem buildFullAst = | loader & Loader x ->
    match foldl (lam loader. lam cb. _preBuildFullAst loader cb) loader x.hooks
      with loader & Loader x in
    let ast = foldr bind_ unit_ x.decls in
    foldl (lam ast. lam cb. _postBuildFullAst loader ast cb) ast x.hooks

  sem _fileType = | _ ++ ".mc" -> FMCore ()

  sem _loadFile path = | (FMCore _, loader & Loader x) ->
    -- NOTE(vipa, 2024-12-05): Don't reload previously loaded files
    match mapLookup path x.includedFiles with Some symEnv then (symEnv, loader) else
    let args =
      { _defaultBootParserParseMCoreFileArg ()
      -- NOTE(vipa, 2024-12-03): It's important to not remove dead
      -- code, because that code might end up not-dead later, at which
      -- point it would end up included then, out of order and in
      -- various ways messing with assumptions made in the loader.
      with eliminateDeadCode = false
      -- NOTE(vipa, 2024-12-03): This largely lets us error later,
      -- which gives better error messages.
      , allowFree = true
      } in
    let ast = parseMCoreFile args path in
    recursive let f = lam decls. lam ast.
      match ast with TmDecl {decl = decl, inexpr = ast}
      then f (snoc decls decl) ast
      else decls in
    match _addDeclsByFile loader (f [] ast) with loader & Loader x in
    match mapLookup path x.includedFiles with Some env
    then (env, loader)
    else (_symEnvEmpty, Loader {x with includedFiles = mapInsert path _symEnvEmpty x.includedFiles})

  -- Conceptually, take a list of decls from multiple files, split them to one list per file
  sem _addDeclsByFile : Loader -> [Decl] -> Loader
  sem _addDeclsByFile loader =
  | [first] ++ rest ->
    let getFName = lam decl.
      match infoDecl decl with Info {filename = filename}
      then filename
      else errorSingle [] "Missing info for decl" in
    recursive
      let newFile = lam filename. lam decl. lam loader. lam decls.
        match loader with Loader x in
        if mapMem filename x.includedFiles then
          dropNext filename loader decls
        else
          let loader = Loader {x with includedFiles = mapInsert filename _symEnvEmpty x.includedFiles} in
          addNext filename (_addDeclExn loader decl) decls
      let addNext = lam currFilename. lam loader. lam decls.
        match decls with [decl] ++ decls then
          let newFilename = getFName decl in
          if eqString newFilename currFilename then
            addNext currFilename (_addDeclExn loader decl) decls
          else
            newFile newFilename decl loader decls
        else loader
      let dropNext = lam currFilename. lam loader. lam decls.
        match decls with [decl] ++ decls then
          let newFilename = getFName decl in
          if eqString newFilename currFilename then
            dropNext currFilename loader decls
          else
            newFile newFilename decl loader decls
        else loader
    in newFile (getFName first) first loader rest
  | [] -> loader

  sem _doHook : (Loader -> Decl -> Hook -> (Loader, Decl)) -> Loader -> Decl -> (Loader, Decl)
  sem _doHook f loader = | decl ->
    match loader with Loader {hooks = hooks} in
    foldl (lam acc. lam cb. f acc.0 acc.1 cb) (loader, decl) hooks

  sem _queueAddDecl loader = | decl ->
    match loader with Loader x in
    Loader {x with queue = snoc x.queue decl}

  sem _drainQueueExn : Loader -> Loader
  sem _drainQueueExn = | loader & Loader x ->
    match x.queue with [d] ++ queue
    -- NOTE(vipa, 2025-02-25): _addDeclExn will recursively call
    -- _drainQueueExn, so it's enough to drain one element here
    then _addDeclExn (Loader {x with queue = queue}) d
    else loader

  sem _addDeclWithEnvExn symEnv loader = | decl ->
    match _doHook _preSymbolize loader decl with (loader, decl) in
    match symbolizeDecl symEnv decl with (symEnv, decl) in
    match _doHook _postSymbolize loader decl with (loader, decl) in

    match _doHook _preTypecheck loader decl with (Loader x, decl) in
    match typeCheckDecl x.tcEnv decl with (tcEnv, decl) in
    match _doHook _postTypecheck (Loader {x with tcEnv = tcEnv}) decl with (Loader x, decl) in

    let includedFiles = match infoDecl decl with Info {filename = filename}
      then mapUpdate filename (optionMap (lam env. _addDefinition env decl)) x.includedFiles
      else x.includedFiles in

    let loader = Loader {x with decls = snoc x.decls decl, includedFiles = includedFiles} in
    let loader = _drainQueueExn loader in

    (symEnv, loader)

  sem _addDeclExn loader = | decl ->
    match _doHook _preSymbolize loader decl with (Loader x, decl) in
    match symbolizeDecl x.symEnv decl with (symEnv, decl) in
    match _doHook _postSymbolize (Loader {x with symEnv = symEnv}) decl with (loader, decl) in

    match _doHook _preTypecheck loader decl with (Loader x, decl) in
    match typeCheckDecl x.tcEnv decl with (tcEnv, decl) in
    match _doHook _postTypecheck (Loader {x with tcEnv = tcEnv}) decl with (Loader x, decl) in

    let includedFiles = match infoDecl decl with Info {filename = filename}
      then mapUpdate filename (optionMap (lam env. _addDefinition env decl)) x.includedFiles
      else x.includedFiles in

    let loader = Loader {x with decls = snoc x.decls decl, includedFiles = includedFiles} in
    let loader = _drainQueueExn loader in

    loader

  sem _addSymbolizedDeclExn loader = | decl ->
    match _doHook _preTypecheck loader decl with (Loader x, decl) in
    match typeCheckDecl x.tcEnv decl with (tcEnv, decl) in
    match _doHook _postTypecheck (Loader {x with tcEnv = tcEnv}) decl with (Loader x, decl) in

    let includedFiles = match infoDecl decl with Info {filename = filename}
      then mapUpdate filename (optionMap (lam env. _addDefinition env decl)) x.includedFiles
      else x.includedFiles in

    let loader = Loader {x with decls = snoc x.decls decl, includedFiles = includedFiles} in
    let loader = _drainQueueExn loader in

    loader

  sem _addTypecheckedDecl loader = | decl ->
    match loader with Loader x in

    let includedFiles = match infoDecl decl with Info {filename = filename}
      then mapUpdate filename (optionMap (lam env. _addDefinition env decl)) x.includedFiles
      else x.includedFiles in

    let loader = Loader {x with decls = snoc x.decls decl, includedFiles = includedFiles} in
    let loader = _drainQueueExn loader in

    loader

  sem _addDefinition : SymEnv -> Decl -> SymEnv
  sem _addDefinition env =
  | _ -> env
  | DeclLet t ->
    let varEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.varEnv in
    symbolizeUpdateVarEnv env varEnv
  | DeclType t ->
    let tyConEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.tyConEnv in
    symbolizeUpdateTyConEnv env tyConEnv
  | DeclRecLets t ->
    let add = lam acc. lam b. mapInsert (nameGetStr b.ident) b.ident acc in
    let varEnv = foldl add env.currentEnv.varEnv t.bindings in
    symbolizeUpdateVarEnv env varEnv
  | DeclConDef t ->
    let conEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.conEnv in
    symbolizeUpdateConEnv env conEnv
  | DeclExt t ->
    let varEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.varEnv in
    symbolizeUpdateVarEnv env varEnv
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MCoreLoader" kind="lang" link="/docs/Stdlib/mlang/loader.mc/lang-MCoreLoader">

```mc
lang MCoreLoader
```



<ToggleWrapper text="Code..">
```mc
lang MCoreLoader
  = MCorePathResolution + BootParserLoader
  + MExprSym + MLangSym
  + MExprTypeCheck + MLangTypeCheck
end
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

use MCoreLoader in
use MExprCmp in

-- TODO(vipa, 2024-11-28): In the absence of proper comparison of
-- decls, we just compare the contained exprs
let declCmp = lam a. lam b.
  let as = sfold_Decl_Expr snoc [] a in
  let bs = sfold_Decl_Expr snoc [] b in
  seqCmp cmpExpr as bs in

-- Loading actually loads something
let loader = mkLoader _symEnvEmpty typcheckEnvDefault [] in
match includeFileExn (sysGetCwd ()) "stdlib::bool.mc" loader with (symEnv, loader) in
utest length (getDecls loader) with 1 using lam count. lam limit. geqi count limit in
utest mapLookup "eqBool" symEnv.env.currentEnv.varEnv with () using lam x. lam. optionIsSome x in

-- Inclusion is idempotent
let loader = mkLoader _symEnvEmpty typcheckEnvDefault [] in
let loader = (includeFileExn (sysGetCwd ()) "stdlib::seq.mc" loader).1 in
let boolDecls = getDecls loader in
let loader = (includeFileExn (sysGetCwd ()) "stdlib::seq.mc" loader).1 in
utest boolDecls with getDecls loader using lam a. lam b. eqi 0 (seqCmp declCmp a b) in

()
```
</ToggleWrapper>
</DocBlock>

