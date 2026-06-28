import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MLangCompositionCheck  
  

TODO\(voorberg, 09/09/2024\): Refactor to avoid code duplication between syn, sem and cosyn.   
E.g. checking the params and base is identical for cosyn and syn.  
TODO\(voorberg, 15/09/202\): A composition check should be added that ensures  
that the labels in a constructor's type are disjoint under product extension.

  
  
  
## Syntaxes  
  

          <DocBlock title="CompositionError" kind="syn">

```mc
syn CompositionError
```



<ToggleWrapper text="Code..">
```mc
syn CompositionError =
  | DifferentBaseSyn {
    synIdent : Name,
    info : Info 
  }
  | DifferentBaseSem {
    semIdent : Name,
    info : Info
  }
  | MismatchedSemParams {
    semIdent : Name,
    info : Info
  }
  | MismatchedSynParams {
    synIdent : Name,
    info : Info
  }
  | InvalidSemPatterns {
    semIdent : Name,
    info : Info
  }
  | SyntaxBaseHasIncludes {
    ident : Name,
    info : Info
  }
  | SyntaxSumExtHasNoIncludes {
    ident : Name,
    info : Info
  }
  | OverlappingCopatterns {
    ident : Name,
    info : Info
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="CompositionWarning" kind="syn">

```mc
syn CompositionWarning
```



<ToggleWrapper text="Code..">
```mc
syn CompositionWarning = 
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="raiseError" kind="sem">

```mc
sem raiseError : MLangCompositionCheck_CompositionError -> ()
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem raiseError = 
  | DifferentBaseSyn e -> 
    let msg = join [
      "Invalid language composition because the syn '",
      nameGetStr e.synIdent,
      "' includes syns with different bases!"
    ] in 
    errorMulti [(e.info, "")] msg
  | DifferentBaseSem e -> 
    let msg = join [
      "Invalid language composition because the semantic function '",
      nameGetStr e.semIdent,
      "' includes semantic functions with different bases!"
    ] in 
    errorMulti [(e.info, "")] msg
  | MismatchedSemParams e -> 
    let msg = join [
      "Invalid language composition because the semantic function '",
      nameGetStr e.semIdent,
      "' includes semantic functions with different number of parameters!"
    ] in 
    errorMulti [(e.info, "")] msg
  | MismatchedSynParams e ->     
    let msg = join [
      "Invalid language composition because the syn '",
      nameGetStr e.synIdent,
      "' includes syns with different number of parameters!"
    ] in 
    errorMulti [(e.info, "")] msg
  | InvalidSemPatterns e ->     
    let msg = join [
      "Invalid language composition because the semantic function '",
      nameGetStr e.semIdent,
      "' includes or defined patterns which are overlapping or equal!"
    ] in 
    errorMulti [(e.info, "")] msg
  | SyntaxBaseHasIncludes e -> 
    let msg =  join [
      "Invalid language composition because the declaration '",
      nameGetStr e.ident,
      "' includes other declarations even though it is a base declaration",
      " as indicated by the '=' symbol! You can use the",
      "--disable-strict-sum-extension flag to disable this check."
    ] in 
    errorMulti [(e.info, "")] msg
  | SyntaxSumExtHasNoIncludes e ->
    let msg = join [
      "Invalid language composition because the declaration '",
      nameGetStr e.ident,
      "' does not include any other other declarations even though it is",
      "syntactically declared as a sum extension through the += symbol!",
      "You can use the",
      "--disable-strict-sum-extension flag to disable this check."
    ] in 
    errorMulti [(e.info, "")] msg
  | OverlappingCopatterns e ->
    let msg = join [
      " * Invalid language composition because the declaration '",
      nameGetStr e.ident,
      "' contains overlapping co-patterns!"
    ] in 
    errorMulti [(e.info, "")] msg
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="checkComposition" kind="sem">

```mc
sem checkComposition : MLangTopLevel_MLangProgram -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem checkComposition =| prog -> 
    checkCompositionWithOptions defaultCompositionCheckOptions prog
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="checkCompositionWithOptions" kind="sem">

```mc
sem checkCompositionWithOptions : ComposotionCheckOptions -> MLangTopLevel_MLangProgram -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem checkCompositionWithOptions options =| prog -> 
    let env = {_emptyCompositionCheckEnv with options = options} in 
    result.foldlM validateTopLevelComposition env prog.decls 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateTopLevelComposition" kind="sem">

```mc
sem validateTopLevelComposition : CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem validateTopLevelComposition env = 
  | DeclLang l -> 
    result.foldlM (validateLangDeclComposition (nameGetStr l.ident)) env l.decls
  | other -> result.ok env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateLangDeclComposition" kind="sem">

```mc
sem validateLangDeclComposition : String -> CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```



<ToggleWrapper text="Code..">
```mc
sem validateLangDeclComposition langStr env = 
  | DeclSem s & d ->
    _foldlMfun env d [validateSynSemParams langStr, validateSynSemBase langStr, validateStrictSumExtension, validateSemCaseOrdering langStr]
  | DeclSyn s & d ->
    _foldlMfun env d [validateSynSemParams langStr, validateSynSemBase langStr, validateStrictSumExtension]
  | SynDeclProdExt s & d ->
    _foldlMfun env d [validateSynSemParams langStr, validateSynSemBase langStr]
  | DeclCosyn _ & d -> 
    _foldlMfun env d [validateSynSemParams langStr, validateSynSemBase langStr]
  | DeclCosem _ & d ->
    _foldlMfun env d [validateSynSemParams langStr, 
                      validateSynSemBase langStr, 
                      validateCosemPatterns langStr]
  | other -> result.ok env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateCosemPatterns" kind="sem">

```mc
sem validateCosemPatterns : String -> CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```



<ToggleWrapper text="Code..">
```mc
sem validateCosemPatterns langStr env = 
  | DeclCosem d ->  
    let includedCases = collectCopats env d.includes in 

    let work = lam env. lam cas.
      match cas with (copat, thn) in 
      ({env with nextId = addi env.nextId 1}, {copat = copat, 
                                               thn = thn, 
                                               id = env.nextId,
                                               orig = (langStr, nameGetStr d.ident)}) in 
    match mapAccumL work env d.cases with (env, newCases) in 
    let newCases = setOfSeq cmpExtCopat newCases in 

    let allCases = setUnion newCases includedCases in 

    let propError = lam acc : Either CompositionError (Set String). lam cas. 
      switch acc 
        case Left err then Left err
        case Right s then 
          match cas with {copat = RecordCopat {fields = fields}} in 
          let fields = setOfSeq cmpString fields in 
          if setDisjoint s fields then
            Right (setUnion s fields)
          else 
            Left (OverlappingCopatterns {ident = d.ident, info = d.info})
      end
    in 
    
    match setFold propError (Right (setEmpty cmpString)) allCases with Left err then 
      result.err err
    else
      let env = {env with cosemCaseMap = mapInsert (langStr, nameGetStr d.ident) allCases env.cosemCaseMap} in 
      result.ok env 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateSynSemParams" kind="sem">

```mc
sem validateSynSemParams : String -> CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem validateSynSemParams langStr env = 
  | DeclCosem s ->
    let args = map (lam a. a.ident) s.args in 
    let includeParams : [[Name]] = mapOption (lam incl. match mapLookup incl env.semArgsMap with Some res in res) s.includes in 

    let errIfUnequalAmount : [Name] -> Option CompositionError = lam params.
      if eqi (length params) (length args) then
        None ()
      else 
        Some (MismatchedSemParams {
          semIdent = s.ident,
          info = s.info
        })
    in

    let errs = mapOption errIfUnequalAmount includeParams in 

    if neqi (length errs) 0 then
      result.err (head errs)
    else 
       result.ok (insertArgsMap env (langStr, nameGetStr s.ident) (Some args))
  | DeclCosyn s ->  
    let str = nameGetStr s.ident in 
    let paramNum = length s.params in 

    match s.includes with [] then 
      result.ok (insertParamMap env (langStr, str) paramNum)
    else 
      let paramNum = length s.params in 

      let includeList = map 
        (lam incl. match mapLookup incl env.paramMap with Some b in b) 
        s.includes in 
      let includeSet = setOfSeq subi includeList in 
      let includeSet = setInsert paramNum includeSet in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertParamMap env (langStr, str) paramNum)
      else
        result.err (MismatchedSynParams {
          synIdent = s.ident,
          info = s.info
        })
  | SynDeclProdExt s ->
    let str = nameGetStr s.ident in 
    let paramNum = length s.params in 

    match s.includes with [] then 
      result.ok (insertParamMap env (langStr, str) paramNum)
    else 
      let paramNum = length s.params in 

      let raiseErr = lam. 
        errorSingle [s.info] (join [
          "Illegal state during composition-check for the syn '",
          str,
          "'!"
        ]) in 
      let includeList = map (lam incl. mapLookupOrElse raiseErr incl env.paramMap) 
        s.includes in 
      let includeSet = setOfSeq subi includeList in 
      let includeSet = setInsert paramNum includeSet in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertParamMap env (langStr, str) paramNum)
      else
        result.err (MismatchedSynParams {
          synIdent = s.ident,
          info = s.info
        })
  | DeclSyn s -> 
    let str = nameGetStr s.ident in 
    let paramNum = length s.params in 

    match s.includes with [] then 
      result.ok (insertParamMap env (langStr, str) paramNum)
    else 
      let paramNum = length s.params in 

      let raiseErr = lam. 
        errorSingle [s.info] (join [
          "Illegal state during composition-check for the syn '",
          str,
          "'!"
        ]) in 
      let includeList = map (lam incl. mapLookupOrElse raiseErr incl env.paramMap) 
        s.includes in 
      let includeSet = setOfSeq subi includeList in 
      let includeSet = setInsert paramNum includeSet in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertParamMap env (langStr, str) paramNum)
      else
        result.err (MismatchedSynParams {
          synIdent = s.ident,
          info = s.info
        })
  | DeclSem {ident = ident, args = None _} ->
    result.ok (insertArgsMap env (langStr, nameGetStr ident) (None ()))
  | DeclSem s ->
    match s.args with Some args in 
    let args = map (lam a. a.ident) args in 
    let includeParams : [[Name]] = mapOption (lam incl. match mapLookup incl env.semArgsMap with Some res in res) s.includes in 

    let errIfUnequalAmount : [Name] -> Option CompositionError = lam params.
      if eqi (length params) (length args) then
        None ()
      else 
        Some (MismatchedSemParams {
          semIdent = s.ident,
          info = s.info
        })
    in

    let errs = mapOption errIfUnequalAmount includeParams in 

    if neqi (length errs) 0 then
      result.err (head errs)
    else 
       result.ok (insertArgsMap env (langStr, nameGetStr s.ident) (Some args))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateSynSemBase" kind="sem">

```mc
sem validateSynSemBase : String -> CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem validateSynSemBase langStr env =
  | DeclCosem s -> 
    let env = {env with symToPair = mapInsert s.ident (langStr, nameGetStr s.ident) env.symToPair,
                        semSymMap = mapInsert (langStr, nameGetStr s.ident) s.ident env.semSymMap,
                        langToSems = mapInsert langStr (cons s.ident (mapLookupOrElse (lam. []) langStr env.langToSems)) env.langToSems
    } in
    match s.includes with [] then 
      if s.isBase then 
        result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident s.ident)
      else 
        result.err (DifferentBaseSem {
          semIdent = s.ident,
          info = s.info
        })
    else 
      if s.isBase then 
        result.err (DifferentBaseSem {
          semIdent = s.ident,
          info = s.info
        })
      else 
        let includeList = map 
          (lam incl. match mapLookup incl env.baseMap with Some b in b) 
          s.includes in 
        let includeSet = setOfSeq nameCmp includeList in 

        if eqi 1 (setSize includeSet) then
          result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident (head includeList))
        else
          result.err (DifferentBaseSem {
            semIdent = s.ident,
            info = s.info
          })
  | DeclCosyn s -> 
    let env = {env with symToPair = mapInsert s.ident (langStr, nameGetStr s.ident) env.symToPair} in

    match s.includes with [] then 
      result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident s.ident)
    else 
      let includeList = map 
        (lam incl. match mapLookup incl env.baseMap with Some b in b) 
        s.includes in 
      let includeSet = setOfSeq nameCmp includeList in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident (head includeList))
      else
        result.err (DifferentBaseSyn {
          synIdent = s.ident,
          info = s.info
        })
  | DeclSyn s -> 
    let env = {env with symToPair = mapInsert s.ident (langStr, nameGetStr s.ident) env.symToPair} in


    match s.includes with [] then 
      result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident s.ident)
    else 
      let includeList = map 
        (lam incl. match mapLookup incl env.baseMap with Some b in b) 
        s.includes in 
      let includeSet = setOfSeq nameCmp includeList in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident (head includeList))
      else
        result.err (DifferentBaseSyn {
          synIdent = s.ident,
          info = s.info
        })
  | SynDeclProdExt s ->
    let env = {env with symToPair = mapInsert s.ident (langStr, nameGetStr s.ident) env.symToPair} in

    match s.includes with [] then 
      result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident s.ident)
    else 
      let includeList = map 
        (lam incl. match mapLookup incl env.baseMap with Some b in b) 
        s.includes in 
      let includeSet = setOfSeq nameCmp includeList in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident (head includeList))
      else
        result.err (DifferentBaseSyn {
          synIdent = s.ident,
          info = s.info
        })
  | DeclSem s ->
    let env = {env with semSymMap = mapInsert (langStr, nameGetStr s.ident) s.ident env.semSymMap,
                        langToSems = mapInsert langStr (cons s.ident (mapLookupOrElse (lam. []) langStr env.langToSems)) env.langToSems
    } in 
    match s.includes with [] then 
      let env = {env with semBaseToTyAnnot = mapInsert s.ident s.tyAnnot env.semBaseToTyAnnot} in 
      result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident s.ident)
    else 
      let includeList = map 
        (lam incl. match mapLookup incl env.baseMap with Some b in b) 
        s.includes in 
      let includeSet = setOfSeq nameCmp includeList in 

      if eqi 1 (setSize includeSet) then
        result.ok (insertBaseMap env (langStr, nameGetStr s.ident) s.ident (head includeList))
      else
        result.err (DifferentBaseSem {
          semIdent = s.ident, 
          info = s.info
        })
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_strictSumExtensionHelper" kind="sem">

```mc
sem _strictSumExtensionHelper : CompositionCheckEnv -> Name -> Info -> [(String, String)] -> DeclKind -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```



<ToggleWrapper text="Code..">
```mc
sem _strictSumExtensionHelper env ident info includes = 
  | BaseKind _ -> 
    if null includes then 
      result.ok env
    else result.err (SyntaxBaseHasIncludes {
      ident = ident,
      info = info
    })
  | SumExtKind _ -> 
    if null includes then 
      result.err (SyntaxSumExtHasNoIncludes {
        ident = ident,
        info = info
      })
    else 
      result.ok env
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateStrictSumExtension" kind="sem">

```mc
sem validateStrictSumExtension : CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```



<ToggleWrapper text="Code..">
```mc
sem validateStrictSumExtension env = 
  | DeclSem s ->
    if env.options.disableStrictSumExtension then
      result.ok env
    else
      _strictSumExtensionHelper env s.ident s.info s.includes s.declKind
  | DeclSyn s ->
    if env.options.disableStrictSumExtension then
      result.ok env
    else
      _strictSumExtensionHelper env s.ident s.info s.includes s.declKind
  | _ -> 
    result.ok env 
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="validateSemCaseOrdering" kind="sem">

```mc
sem validateSemCaseOrdering : String -> CompositionCheckEnv -> Ast_Decl -> Result MLangCompositionCheck_CompositionWarning MLangCompositionCheck_CompositionError CompositionCheckEnv
```



<ToggleWrapper text="Code..">
```mc
sem validateSemCaseOrdering langStr env = 
  | DeclSem s -> 
    recursive let gatherTyVars = lam ty. 
      switch ty
        case TyAll tyall then cons tyall.ident (gatherTyVars tyall.ty)
        case _ then []
      end
    in 
    let env = {env with semTyVarMap = mapInsert (langStr, nameGetStr s.ident) (gatherTyVars s.tyAnnot) env.semTyVarMap} in 

    -- Assign unique ids to each case based on nextId in env
    let casesWithId = zipWith 
      (lam c. lam id. {orig = (langStr, nameGetStr s.ident),
                       id = addi env.nextId id,
                       thn = c.thn,
                       pat = c.pat})
      s.cases
      (range 0 (length s.cases) 1)
    in 
    let env = {env with nextId = addi env.nextId (length s.cases)} in 

    let pats = concat (collectPats env s.includes) casesWithId in

    recursive let removeDups = lam seenIds : Set Int. lam cases. 
      switch cases
        case [h] ++ t then
          if setMem h.id seenIds then
            removeDups seenIds t
          else 
             cons h (removeDups (setInsert h.id seenIds) t)
        case [] then []
      end
    in
    let pats = removeDups (setEmpty subi) pats in 

    let normPats = map patToNormpat (map (lam c. c.pat) pats) in 
    let pairs = pairWithLater (range 0 (length normPats) 1) in 

    let isStrictSubpat = lam pat1. lam pat2.
      null (normpatIntersect pat1 (normpatComplement pat2))
    in

    let g = digraphAddVertices (range 0 (length pats) 1) (digraphEmpty subi (lam. lam. true)) in 

    let accGraph : (Digraph Int ())
                -> (Int, Int)
                -> Result CompositionWarning CompositionError (Digraph Int ())
      = lam g. lam p. 
        match p with (i, j) in 
        let ap = get normPats i in 
        let an = normpatComplement ap in 

        let bp = get normPats j in 
        let bn = normpatComplement bp in 

        let a_minus_b = normpatIntersect ap bn in
        let b_minus_a = normpatIntersect bp an in

        -- printLn (match getPatStringCode 0 pprintEnvEmpty (get pats i).pat with (_, s) in s) ;
        -- printLn (int2string (i)) ;
        -- printLn (match getPatStringCode 0 pprintEnvEmpty (get pats j).pat with (_, s) in s) ;
        -- printLn (int2string (j)) ;

        if and (null a_minus_b) (null b_minus_a) then 
          -- EQUAL
          -- printLn "equal" ;
          result.err (InvalidSemPatterns {
            semIdent = s.ident, 
            info = s.info
          })
        else if null a_minus_b then 
          -- SUBSET
          -- printLn "subset" ;
          result.ok (digraphAddEdge i j () g)
        else if null b_minus_a then 
          -- SUPERSET
          -- printLn "superset" ;
          result.ok (digraphAddEdge j i () g)

        else
          let overlapping = normpatIntersect ap bp in
          if null overlapping then 
            -- DISJOINT
            -- printLn "disjoint" ;
            result.ok g
          else
            -- OVERLAPPING
            -- printLn "overlapping" ;
            result.err (InvalidSemPatterns {
              semIdent = s.ident, 
              info = s.info
            })
    in 
    let res = result.foldlM accGraph g pairs in 

    match result.consume res with (_, errorsOrGraph) in
    switch errorsOrGraph 
    case Left errs then result.err (head errs)
    case Right graph then 
      let order = digraphTopologicalOrder graph in
      let orderedCases = map (lam i. get pats i) order in 
      result.ok (insertSemPatMap env (langStr, nameGetStr s.ident) orderedCases)
    end
```
</ToggleWrapper>
</DocBlock>

