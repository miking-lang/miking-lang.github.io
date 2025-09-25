import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BootParserLoader  
  

  
  
  
## Types  
  

          <DocBlock title="LoaderRec" kind="type">

```mc
type LoaderRec : { decls: [Decl], includedFiles: Map String SymEnv, symEnv: SymEnv, tcEnv: TCEnv, hooks: [Hook], queue: [Decl] }
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Loader" kind="syn">

```mc
syn Loader
```



<ToggleWrapper text="Code..">
```mc
syn Loader =
  | Loader LoaderRec
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FileType" kind="syn">

```mc
syn FileType
```



<ToggleWrapper text="Code..">
```mc
syn FileType =
  | FMCore ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="mkLoader" kind="sem">

```mc
sem mkLoader : SymEnv -> TCEnv -> [MCoreLoader_Hook] -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem mkLoader symEnv tcEnv = | hooks -> Loader
    { decls = []
    , includedFiles = mapEmpty cmpString
    , symEnv = symEnv
    , tcEnv = tcEnv
    , hooks = hooks
    , queue = []
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addHook" kind="sem">

```mc
sem addHook : MCoreLoader_Loader -> MCoreLoader_Hook -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem addHook loader = | hook ->
    match loader with Loader x in
    Loader {x with hooks = snoc x.hooks hook}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="remHook" kind="sem">

```mc
sem remHook : (MCoreLoader_Hook -> Bool) -> MCoreLoader_Loader -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem remHook check = | Loader x ->
    Loader {x with hooks = filter (lam x. not (check x)) x.hooks}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="hasHook" kind="sem">

```mc
sem hasHook : (MCoreLoader_Hook -> Bool) -> MCoreLoader_Loader -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem hasHook check = | Loader x ->
    optionIsSome (find check x.hooks)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getHookOpt" kind="sem">

```mc
sem getHookOpt : all a. (MCoreLoader_Hook -> Option a) -> MCoreLoader_Loader -> Option a
```



<ToggleWrapper text="Code..">
```mc
sem getHookOpt check = | Loader x ->
    findMap check x.hooks
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withHookState" kind="sem">

```mc
sem withHookState : all a. (MCoreLoader_Loader -> MCoreLoader_Hook -> Option (MCoreLoader_Loader, a)) -> MCoreLoader_Loader -> (MCoreLoader_Loader, a)
```



<ToggleWrapper text="Code..">
```mc
sem withHookState f = | loader & Loader x ->
    match findMap (f loader) x.hooks with Some res
    then res
    else error "Compiler error: missing hook in loader"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getSymEnv" kind="sem">

```mc
sem _getSymEnv : MCoreLoader_Loader -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
sem _getSymEnv = | Loader x -> x.symEnv
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_setSymEnv" kind="sem">

```mc
sem _setSymEnv : SymEnv -> MCoreLoader_Loader -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem _setSymEnv symEnv = | Loader x -> Loader {x with symEnv = symEnv}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_getTCEnv" kind="sem">

```mc
sem _getTCEnv : MCoreLoader_Loader -> TCEnv
```



<ToggleWrapper text="Code..">
```mc
sem _getTCEnv = | Loader x -> x.tcEnv
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_setTCEnv" kind="sem">

```mc
sem _setTCEnv : TCEnv -> MCoreLoader_Loader -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem _setTCEnv tcEnv = | Loader x -> Loader {x with tcEnv = tcEnv}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getDecls" kind="sem">

```mc
sem getDecls : MCoreLoader_Loader -> [Ast_Decl]
```



<ToggleWrapper text="Code..">
```mc
sem getDecls = | Loader x -> x.decls
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="buildFullAst" kind="sem">

```mc
sem buildFullAst : MCoreLoader_Loader -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem buildFullAst = | loader & Loader x ->
    match foldl (lam loader. lam cb. _preBuildFullAst loader cb) loader x.hooks
      with loader & Loader x in
    let ast = foldr bind_ unit_ x.decls in
    foldl (lam ast. lam cb. _postBuildFullAst loader ast cb) ast x.hooks
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_fileType" kind="sem">

```mc
sem _fileType : String -> MCoreLoader_FileType
```



<ToggleWrapper text="Code..">
```mc
sem _fileType = | _ ++ ".mc" -> FMCore ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_loadFile" kind="sem">

```mc
sem _loadFile : String -> (MCoreLoader_FileType, MCoreLoader_Loader) -> (SymEnv, MCoreLoader_Loader)
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addDeclsByFile" kind="sem">

```mc
sem _addDeclsByFile : MCoreLoader_Loader -> [Ast_Decl] -> MCoreLoader_Loader
```

<Description>{`Conceptually, take a list of decls from multiple files, split them to one list per fileNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_doHook" kind="sem">

```mc
sem _doHook : (MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Hook -> (MCoreLoader_Loader, Ast_Decl)) -> MCoreLoader_Loader -> Ast_Decl -> (MCoreLoader_Loader, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _doHook f loader = | decl ->
    match loader with Loader {hooks = hooks} in
    foldl (lam acc. lam cb. f acc.0 acc.1 cb) (loader, decl) hooks
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_queueAddDecl" kind="sem">

```mc
sem _queueAddDecl : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem _queueAddDecl loader = | decl ->
    match loader with Loader x in
    Loader {x with queue = snoc x.queue decl}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_drainQueueExn" kind="sem">

```mc
sem _drainQueueExn : MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem _drainQueueExn = | loader & Loader x ->
    match x.queue with [d] ++ queue
    -- NOTE(vipa, 2025-02-25): _addDeclExn will recursively call
    -- _drainQueueExn, so it's enough to drain one element here
    then _addDeclExn (Loader {x with queue = queue}) d
    else loader
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addDeclWithEnvExn" kind="sem">

```mc
sem _addDeclWithEnvExn : SymEnv -> MCoreLoader_Loader -> Ast_Decl -> (SymEnv, MCoreLoader_Loader)
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addDeclExn" kind="sem">

```mc
sem _addDeclExn : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addSymbolizedDeclExn" kind="sem">

```mc
sem _addSymbolizedDeclExn : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addTypecheckedDecl" kind="sem">

```mc
sem _addTypecheckedDecl : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Loader
```



<ToggleWrapper text="Code..">
```mc
sem _addTypecheckedDecl loader = | decl ->
    match loader with Loader x in

    let includedFiles = match infoDecl decl with Info {filename = filename}
      then mapUpdate filename (optionMap (lam env. _addDefinition env decl)) x.includedFiles
      else x.includedFiles in

    let loader = Loader {x with decls = snoc x.decls decl, includedFiles = includedFiles} in
    let loader = _drainQueueExn loader in

    loader
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_addDefinition" kind="sem">

```mc
sem _addDefinition : SymEnv -> Ast_Decl -> SymEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
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
```
</ToggleWrapper>
</DocBlock>

