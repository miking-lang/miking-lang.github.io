import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LanguageComposer  
  

  
  
  
## Semantics  
  

          <DocBlock title="composeProgram" kind="sem">

```mc
sem composeProgram : MLangTopLevel_MLangProgram -> MLangTopLevel_MLangProgram
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem composeProgram =| p ->
    let ctx = emptyComposerContext in 
    match mapAccumL composeLang ctx p.decls with (_, decls) in 
    {p with decls = decls}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="composeLang" kind="sem">

```mc
sem composeLang : ComposerContext -> Ast_Decl -> (ComposerContext, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem composeLang ctx =
  | DeclLang l -> 
    let includes = map nameGetStr l.includes in 
    match mapAccumL (handleDecl (nameGetStr l.ident) includes) ctx l.decls with (ctx, decls) in 

    let synOrSemNames = mapOption 
      (lam d. match d with DeclSem {ident = ident} then Some ident 
              else match d with DeclSyn {ident = ident} then Some ident
              else match d with SynDeclProdExt {ident = ident} then Some ident
              -- else match d with DeclCosyn {ident = ident} then Some ident
              else match d with DeclCosem {ident = ident} then Some ident
              else None ()) decls in 
    let synOrSemStrings = map nameGetStr synOrSemNames in 

    match addImplicitIncludes (nameGetStr l.ident) l.info includes synOrSemStrings ctx 
    with (ctx, generatedDecls) in 

    (ctx, DeclLang {l with decls = concat decls generatedDecls})
  | other -> (ctx, other)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="handleDecl" kind="sem">

```mc
sem handleDecl : String -> [String] -> ComposerContext -> Ast_Decl -> (ComposerContext, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem handleDecl langStr includes ctx = 
  | decl & DeclSem d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter isCosemInfo foundIncludes in 
    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared sem has an identifier that conflicts with included cosems!"
    else
      let includedSems = filter isSemInfo foundIncludes in 

      let includes = map projIdent includedSems in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclSem {d with includes = includes})
  | decl & DeclCosem d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 

    let conflicts = filter isSemInfo foundIncludes in 
    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared sem has an identifier that conflicts with included sems!"
    else
      let includedCosems = filter isCosemInfo foundIncludes in 

      let includes = map projIdent includedCosems in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclCosem {d with includes = includes})
  | decl & DeclSyn d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter isTypeInfo foundIncludes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared syn has an identifier that conflicts with included types!"
    else
      let includedSyns = filter isSynInfo foundIncludes in 

      let includes = map projIdent includedSyns in 
      let info = {ident = d.ident, info = d.info} in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclSyn {d with includes = includes})
  | decl & SynDeclProdExt d ->
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter isTypeInfo foundIncludes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared syn has an identifier that conflicts with included types!"
    else
      let includedSyns = filter (lam i. or (isProdInfo i) (isSynInfo i)) foundIncludes in 

      let includes = map projIdent includedSyns in 
      let info = {ident = d.ident, info = d.info} in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       SynDeclProdExt {d with includes = includes})
  | decl & DeclType d -> 
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let conflicts : [DeclInfo] = mapOption findMatchingInfo includes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared type has an identifier that conflicts with included types or syns!"
    else
      let info = decl2info langStr decl in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) info, decl)
  | decl & DeclCosyn d -> 
    let identStr = nameGetStr d.ident in 
    let findMatchingInfo : String -> Option DeclInfo = lam incl.
      mapLookup (incl, identStr) ctx.langMap in 
    let foundIncludes : [DeclInfo] = mapOption findMatchingInfo includes in 
    
    let conflicts = filter (lam i. or (isTypeInfo i) (isSynInfo i)) foundIncludes in 

    let errors = cons (d.info, nameGetStr d.ident) (map extractInfoName conflicts) in 

    if not (null conflicts) then
      errorMulti errors "The declared syn has an identifier that conflicts with included types!"
    else
      let includedSyns = filter isSynInfo foundIncludes in 

      let includes = map projIdent includedSyns in 
      let info = {ident = d.ident, info = d.info} in 
      (ctxWithDeclInfo ctx (langStr, nameGetStr d.ident) (decl2info langStr decl), 
       DeclCosyn {d with includes = includes})
  | decl -> 
    -- (ctx, decl) 
    error "Only Type, Syn, and Sem declarations can be contained inside of a langauge!"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addImplicitIncludes" kind="sem">

```mc
sem addImplicitIncludes : String -> Info -> [String] -> [String] -> ComposerContext -> (ComposerContext, [Ast_Decl])
```



<ToggleWrapper text="Code..">
```mc
sem addImplicitIncludes langStr langInfo includes definedSynsSems =
  | ctx ->
    let includeSet = setOfSeq cmpString includes in 

    -- We are going to include elements from ctx.langMap that
    -- (1) that are not Type declarations.
    -- (2) that are not Cosyn declarations
    -- (3) belong to an included langauge
    -- (4) that have not already been included explicitly through a syn or sem
    let pred = lam k. lam v. 
      match k with (origLang, ident) in 
        allb [not (isTypeInfo v),
              not (isCosynInfo v),
              setMem origLang includeSet,
              not (seqMem eqString definedSynsSems ident)]
    in       
    let filteredCtx = mapFilterWithKey pred ctx.langMap in 

    -- Group the filtered element by the identifiers and put the results in the
    -- toBeGenerated map
    let f = lam acc. lam pair. 
      match pair with ((origLang, ident), info) in 
      let l = mapLookupOrElse (lam. []) ident acc in 
      mapInsert ident (cons ((origLang, ident), info) l) acc
    in 
    let toBeGenerated = foldl f (mapEmpty cmpString) (mapToSeq filteredCtx) in 

    -- Iterate over the the toBeGenerated map and add the newly generated
    -- sem or syn to the context and list of decls.
    let gen = lam ctx. lam pairs : [((String, String), DeclInfo)].
      let includes = map (lam p. match p with ((orig, ident), _) in (orig, ident)) pairs in 


      let pair = head pairs in 
      match pair with ((origLang, ident), info) in

      switch info 
        case SynInfo s then 
          let decl = DeclSyn {ident = s.ident,
                              params = s.params,
                              defs = [],
                              includes = includes,
                              info = langInfo,
                              declKind = sumext_kind_} in 
          let info = decl2info langStr decl in 
          (ctxWithDeclInfo ctx (langStr, nameGetStr s.ident) info, decl)
        case SemInfo s then
          let include2args = lam incl.
            match mapLookup incl ctx.langMap with Some info in 
            match info with SemInfo semInfo in
            semInfo.args
          in 
          let args = mapOption include2args includes in 
          let args = if null args then None () else Some (head args) in 
          let decl = DeclSem {ident = s.ident,
                              tyAnnot = s.ty,
                              tyBody = tyunknown_,
                              args = args,
                              cases = [],
                              includes = includes,
                              info = langInfo,
                              declKind = sumext_kind_} in 
          let info = decl2info langStr decl in 
          (ctxWithDeclInfo ctx (langStr, nameGetStr s.ident) info, decl)
        case CosemInfo s then
          let include2args = lam incl.
            match mapLookup incl ctx.langMap with Some info in 
            match info with CosemInfo semInfo in
            semInfo.args
          in 
          let includedArgs = map include2args includes in 
          let args = head includedArgs in 
          let decl = DeclCosem {ident = s.ident,
                                args = args,
                                cases = [],
                                includes = includes,
                                info = langInfo,
                                isBase = false,
                                tyAnnot = tyunknown_,
                                targetTyIdent = nameSym ""} in 
          let info = decl2info langStr decl in 
          (ctxWithDeclInfo ctx (langStr, nameGetStr s.ident) info, decl)
        case CosynInfo _ then 
          error "Encountered unexpected cosyn!"
        case _ then
          error "Encountered unexpected info (wildcard match)!"
      end 
    in 
    mapAccumL gen ctx (mapValues toBeGenerated)
```
</ToggleWrapper>
</DocBlock>

