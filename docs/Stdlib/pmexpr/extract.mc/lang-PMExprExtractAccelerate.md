import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprExtractAccelerate  
  

  
  
  
## Types  
  

          <DocBlock title="AccelerateData" kind="type">

```mc
type AccelerateData : { identifier: Name, bytecodeWrapperId: Name, params: [(Name, Type)], paramCopyStatus: [CopyStatus], returnType: Type, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type AccelerateData = {
    identifier : Name,
    bytecodeWrapperId : Name,
    params : [(Name, Type)],
    paramCopyStatus : [CopyStatus],
    returnType : Type,
    info : Info
  }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AddIdentifierAccelerateEnv" kind="type">

```mc
type AddIdentifierAccelerateEnv : { functions: Map Name AccelerateData, programIdentifiers: Set SID }
```



<ToggleWrapper text="Code..">
```mc
type AddIdentifierAccelerateEnv = {
    functions : Map Name AccelerateData,
    programIdentifiers : Set SID
  }
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="CopyStatus" kind="syn">

```mc
syn CopyStatus
```



<ToggleWrapper text="Code..">
```mc
syn CopyStatus =
  | CopyBoth ()
  | CopyToAccelerate ()
  | CopyFromAccelerate ()
  | NoCopy ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="omitCopyTo" kind="sem">

```mc
sem omitCopyTo : PMExprExtractAccelerate_CopyStatus -> PMExprExtractAccelerate_CopyStatus
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem omitCopyTo =
  | CopyBoth _ -> CopyFromAccelerate ()
  | CopyToAccelerate _ -> NoCopy ()
  | status -> status
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="omitCopyFrom" kind="sem">

```mc
sem omitCopyFrom : PMExprExtractAccelerate_CopyStatus -> PMExprExtractAccelerate_CopyStatus
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem omitCopyFrom =
  | CopyBoth _ -> CopyToAccelerate ()
  | CopyFromAccelerate _ -> NoCopy ()
  | status -> status
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="copyStatusTo" kind="sem">

```mc
sem copyStatusTo : PMExprExtractAccelerate_CopyStatus -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem copyStatusTo =
  | CopyBoth _ | CopyToAccelerate _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="copyStatusFrom" kind="sem">

```mc
sem copyStatusFrom : PMExprExtractAccelerate_CopyStatus -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem copyStatusFrom =
  | CopyBoth _ | CopyFromAccelerate _ -> true
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectProgramIdentifiers" kind="sem">

```mc
sem collectProgramIdentifiers : PMExprExtractAccelerate_AddIdentifierAccelerateEnv -> Ast_Expr -> PMExprExtractAccelerate_AddIdentifierAccelerateEnv
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectProgramIdentifiers env =
  | TmVar t ->
    let sid = stringToSid (nameGetStr t.ident) in
    {env with programIdentifiers = setInsert sid env.programIdentifiers}
  | t -> sfold_Expr_Expr collectProgramIdentifiers env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getUniqueIdentifier" kind="sem">

```mc
sem getUniqueIdentifier : Set SID -> Name
```



<ToggleWrapper text="Code..">
```mc
sem getUniqueIdentifier =
  | programIdentifiers /- : Set SID -> Name -/ ->
    recursive let genstr = lam acc. lam n.
      if eqi n 0 then acc
      else
        let nextchr = randAlphanum () in
        genstr (snoc acc nextchr) (subi n 1)
    in
    -- NOTE(larshum, 2021-09-15): Start the string with a hard-coded alphabetic
    -- character to avoid ending up with a digit in the first position.
    let str = genstr "v" 10 in
    if setMem (stringToSid str) programIdentifiers then
      getUniqueIdentifier programIdentifiers
    else nameSym str
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addIdentifierToAccelerateTerms" kind="sem">

```mc
sem addIdentifierToAccelerateTerms : Ast_Expr -> (Map Name PMExprExtractAccelerate_AccelerateData, Ast_Expr)
```

<Description>{`Adds identifiers to accelerate terms and collects information on the  
accelerated terms. An accelerate term 'accelerate e' is rewritten as  
'let t = lam \_x : Int. e in t 0', where t is a name containing a globally  
unique string within the AST. This format makes accelerate work even when  
there are no free variables, and it ensures that the term will be lambda  
lifted to the top of the program.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem addIdentifierToAccelerateTerms =
  | t ->
    let env = {
      functions = mapEmpty nameCmp,
      programIdentifiers = setEmpty cmpSID
    } in
    let env = collectProgramIdentifiers env t in
    match addIdentifierToAccelerateTermsH env t with (env, t) in
    let env : AddIdentifierAccelerateEnv = env in
    (env.functions, t)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="replaceTermWithLet" kind="sem">

```mc
sem replaceTermWithLet : PMExprExtractAccelerate_AddIdentifierAccelerateEnv -> {e: Ast_Expr, ty: Ast_Type, info: Info} -> (PMExprExtractAccelerate_AddIdentifierAccelerateEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem replaceTermWithLet (env : AddIdentifierAccelerateEnv) =
  | t ->
    let accelerateIdent = getUniqueIdentifier env.programIdentifiers in
    let bytecodeIdent = getUniqueIdentifier env.programIdentifiers in
    let retType = t.ty in
    let info = mergeInfo t.info (infoTm t.e) in
    let paramId = nameSym "x" in
    let paramTy = TyInt {info = info} in
    let functionData : AccelerateData = {
      identifier = accelerateIdent,
      bytecodeWrapperId = bytecodeIdent,
      params = [(paramId, paramTy)],
      paramCopyStatus = [CopyBoth ()],
      returnType = retType,
      info = info} in
    let env = {env with functions = mapInsert accelerateIdent functionData env.functions} in
    let funcType = TyArrow {from = paramTy, to = retType, info = info} in
    let accelerateLet = TmDecl
      { decl = DeclLet
        { ident = accelerateIdent
        , tyAnnot = funcType
        , tyBody = funcType
        , body = TmLam
          { ident = paramId
          , tyAnnot = paramTy
          , tyParam = paramTy
          , body = t.e
          , ty = TyArrow {from = paramTy, to = retType, info = info}
          , info = info
          }
        , info = info
        }
      , inexpr = TmApp
        { lhs = TmVar {ident = accelerateIdent, ty = funcType, info = info, frozen = false}
        , rhs = TmConst {val = CInt {val = 0}, ty = paramTy, info = info}
        , ty = retType
        , info = info
        }
      , ty = retType
      , info = info
      }
    in
    (env, accelerateLet)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addIdentifierToAccelerateTermsH" kind="sem">

```mc
sem addIdentifierToAccelerateTermsH : PMExprExtractAccelerate_AddIdentifierAccelerateEnv -> Ast_Expr -> (PMExprExtractAccelerate_AddIdentifierAccelerateEnv, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem addIdentifierToAccelerateTermsH (env : AddIdentifierAccelerateEnv) =
  | TmAccelerate t -> replaceTermWithLet env t
  | t -> smapAccumL_Expr_Expr addIdentifierToAccelerateTermsH env t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="extractAccelerateTerms" kind="sem">

```mc
sem extractAccelerateTerms : Set Name -> Ast_Expr -> Ast_Expr
```

<Description>{`Construct an extracted AST from the given AST, containing all terms that  
are used by the accelerate terms.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem extractAccelerateTerms accelerated =
  | t -> extractAst accelerated t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDummyParameter" kind="sem">

```mc
sem eliminateDummyParameter : Map Name (Map Name Ast_Type) -> Map Name PMExprExtractAccelerate_AccelerateData -> Ast_Expr -> (Map Name PMExprExtractAccelerate_AccelerateData, Ast_Expr)
```

<Description>{`NOTE\(larshum, 2021\-09\-17\): All accelerated terms are given a dummy  
parameter, so that expressions without free variables can also be  
accelerated \(also for lambda lifting\). Here we remove this dummy parameter  
for all accelerate terms with at least one free variable parameter.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem eliminateDummyParameter solutions accelerated =
  | ast ->
    let ast = eliminateDummyParameterH solutions accelerated ast in
    let accelerated =
      mapMapWithKey
        (lam accId : Name. lam accData : AccelerateData.
          match mapLookup accId solutions with Some fv then
            if gti (mapSize fv) 0 then
              let params = mapBindings fv in
              let copyStatus = create (length params) (lam. CopyBoth ()) in
              {{accData with params = params}
                        with paramCopyStatus = copyStatus}
            else accData
          else accData)
        accelerated in
    (accelerated, ast)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateDummyParameterH" kind="sem">

```mc
sem eliminateDummyParameterH : Map Name (Map Name Ast_Type) -> Map Name PMExprExtractAccelerate_AccelerateData -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eliminateDummyParameterH (solutions : Map Name (Map Name Type))
                               (accelerated : Map Name AccelerateData) =
  | TmDecl (x & {decl = DeclLet t}) ->
    let inexpr = eliminateDummyParameterH solutions accelerated x.inexpr in
    if mapMem t.ident accelerated then
      match mapLookup t.ident solutions with Some idSols then
        if gti (mapSize idSols) 0 then
          TmDecl {x with decl = DeclLet {{t with tyBody = eliminateInnermostParameterType t.tyBody}
                     with body = eliminateInnermostLambda t.body}
                     , inexpr = inexpr}
        else TmDecl {x with inexpr = inexpr}
      else TmDecl {x with inexpr = inexpr}
    else TmDecl {x with inexpr = inexpr}
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let isAccelerateBinding = lam bind : DeclLetRecord.
      if mapMem bind.ident accelerated then
        match mapLookup bind.ident solutions with Some idSols then
          true
        else false
      else false
    in
    let eliminateBinding = lam acc. lam bind : DeclLetRecord.
      if mapMem bind.ident accelerated then
        match mapLookup bind.ident solutions with Some idSols then
          match
            if gti (mapSize idSols) 0 then
              let tyBody = eliminateInnermostParameterType bind.tyBody in
              let body = eliminateInnermostLambda bind.body in
              (tyBody, body)
            else (bind.tyBody, bind.body)
          with (tyBody, body) in
          TmDecl
          { decl = DeclLet
            { ident = bind.ident
            , tyAnnot = tyBody
            , tyBody = tyBody
            , body = body
            , info = bind.info
            }
          , inexpr = acc
          , ty = tyTm acc
          , info = bind.info
          }
        else acc
      else acc
    in
    let inexpr = eliminateDummyParameterH solutions accelerated x.inexpr in
    match partition isAccelerateBinding t.bindings with (accelerated, bindings) in
    TmDecl {x with decl = DeclRecLets {t with bindings = bindings}
                  , inexpr = foldl eliminateBinding inexpr accelerated}
  | t -> smap_Expr_Expr (eliminateDummyParameterH solutions accelerated) t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateInnermostParameterType" kind="sem">

```mc
sem eliminateInnermostParameterType : Ast_Type -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem eliminateInnermostParameterType =
  | TyArrow {from = TyInt _, to = to & !(TyArrow _)} -> to
  | TyArrow t -> TyArrow {t with to = eliminateInnermostParameterType t.to}
  | t -> errorSingle [infoTy t] "Unexpected type of accelerate function body"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eliminateInnermostLambda" kind="sem">

```mc
sem eliminateInnermostLambda : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem eliminateInnermostLambda =
  | TmLam {body = body & !(TmLam _)} -> body
  | TmLam t -> TmLam {t with body = eliminateInnermostLambda t.body}
  | t -> errorSingle [infoTm t] "Unexpected structure of accelerate body"
```
</ToggleWrapper>
</DocBlock>

