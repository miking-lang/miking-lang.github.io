import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprCCompile  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Result" kind="syn">

```mc
syn Result
```

<Description>{`Used in compileStmt and compileStmts for deciding what action to take in  
tail position`}</Description>


<ToggleWrapper text="Code..">
```mc
syn Result =
  | RIdent Name
  | RReturn ()
  | RNone ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="alloc" kind="sem">

```mc
sem alloc : Name -> CExprTypeAst_CType -> [{id: Option Name, ty: CExprTypeAst_CType, init: Option CInitAst_CInit}]
```

<Description>{`Function that is called when allocation of data is needed. Must be implemented by a concrete C compiler.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem alloc (name: Name) =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="free" kind="sem">

```mc
sem free : all a. all a1. a -> a1
```

<Description>{`Function that is called to free allocated data. Should be implemented by a concrete C compiler. NOTE\(dlunde,2021\-09\-30\): Currently unused`}</Description>


<ToggleWrapper text="Code..">
```mc
sem free =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compile" kind="sem">

```mc
sem compile : [(Name, Ast_Type)] -> CompileCOptions -> Ast_Expr -> (MExprCCompileBase_CompileCEnv, [CTopAst_CTop], [CTopAst_CTop], [CStmtAst_CStmt], CExprTypeAst_CType)
```

<Description>{`Entry point`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compile (typeEnv: [(Name,Type)]) (compileOptions : CompileCOptions) =
  | prog ->

    -- Find all type names which translates to C structs
    let ptrTypes: [Name] = foldr (lam t: (Name,Type). lam acc.
      if isPtrType acc t.1 then snoc acc t.0 else acc
    ) [] typeEnv in

    -- Construct a map from MCore external names to C names
    let externals: Map Name ExtInfo = collectExternals (mapEmpty nameCmp) prog in

    -- Set up initial environment
    let env = {{{ let e : CompileCEnv = compileCEnvEmpty compileOptions in e
      with ptrTypes = ptrTypes }
      with typeEnv = typeEnv }
      with externals = externals }
    in

    -- Compute type declarations
    let decls: [CTop] = foldl (lam acc. lam t: (Name,Type).
      genTyDecls acc t.0 t.1
    ) [] typeEnv in

    -- Compute type definitions
    let defs: [CTop] = foldl (lam acc. lam t: (Name,Type).
      genTyDefs env acc t.0 t.1
    ) [] typeEnv in

    -- Compute type definitions that must occur after the above definitions
    let postDefs: [CTop] = foldl (lam acc. lam t: (Name,Type).
      genTyPostDefs env acc t.0 t.1
    ) [] typeEnv in

    -- Run compiler
    match compileTops env [] [] prog with (tops, inits) in

    -- Generate functions for computing linear index for tensors, if the
    -- provided AST uses tensors and sequences of integers.
    let tops =
      if usesTensorTypes typeEnv then
        concat (snoc (cartesianToLinearIndexDef env) (tensorShapeDef env)) tops
      else tops
    in

    -- Compute return type
    let retTy: CType = compileType env (tyTm prog) in

    -- Return final compiler environment, types, top-level definitions,
    -- initialization code (e.g., to put in a main function), and the return
    -- type
    (env, join [decls, defs, postDefs], tops, inits, retTy)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectExternals" kind="sem">

```mc
sem collectExternals : Map Name ExtInfo -> Ast_Expr -> Map Name ExtInfo
```



<ToggleWrapper text="Code..">
```mc
sem collectExternals (acc: Map Name ExtInfo) =
  | TmDecl (x & {decl = DeclExt t}) ->
    let str = nameGetStr t.ident in
    match mapLookup str externalsMap with Some e then
      let e: ExtInfo = e in -- TODO(dlunde,2021-10-25): Remove with more complete type system?
      let acc = mapInsert t.ident e acc in
      sfold_Expr_Expr collectExternals acc x.inexpr
    else errorSingle [t.info] "Unsupported external"
  | expr -> sfold_Expr_Expr collectExternals acc expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isPtrType" kind="sem">

```mc
sem isPtrType : [Name] -> Ast_Type -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isPtrType (acc: [Name]) =
  -- Variants are always accessed through pointer (could potentially be
  -- optimized in the same way as records)
  | TyVariant _ -> true
  -- Sequences and tensors are handled specially, and are not accessed directly
  -- through pointers
  | TySeq _ -> false
  | TyTensor _ -> false
  -- Records are only accessed through pointer if they contain pointer types.
  -- This allows for returning small records from functions, but may be
  -- expensive for very large records if it's not handled by the underlying
  -- C/C++ compiler.
  | TyRecord { fields = fields } ->
    let r = mapFoldlOption (lam. lam. lam ty.
      if isPtrType acc ty then None () else Some ()
    ) () fields in
    match r with None _ then true else false
  | TyCon { ident = ident } -> any (nameEq ident) acc
  | _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="genTyDecls" kind="sem">

```mc
sem genTyDecls : [CTopAst_CTop] -> Name -> Ast_Type -> [CTopAst_CTop]
```

<Description>{`Generate declarations for all variant types \(required because of recursion\).`}</Description>


<ToggleWrapper text="Code..">
```mc
sem genTyDecls (acc: [CTop]) (name: Name) =
  | TyVariant _ ->
    let decl = CTTyDef {
      ty = CTyStruct { id = Some name, mem = None () },
      id = name
    } in
    cons decl acc
  | _ -> acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="genTyDefs" kind="sem">

```mc
sem genTyDefs : MExprCCompileBase_CompileCEnv -> [CTopAst_CTop] -> Name -> Ast_Type -> [CTopAst_CTop]
```

<Description>{`Generate type definitions.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem genTyDefs (env: CompileCEnv) (acc: [CTop]) (name: Name) =
  | TyVariant _ -> acc -- These are handled by genTyPostDefs instead
  | (TyRecord { fields = fields }) & ty ->
    let labels = tyRecordOrderedLabels ty in
    let fieldsLs: [(CType,Option Name)] =
      foldl (lam acc. lam k.
        let ty = mapFindExn k fields in
        let ty = compileType env ty in
        snoc acc (ty, Some (nameNoSym (sidToString k)))) [] labels in
    let def = CTTyDef {
      ty = CTyStruct { id = Some name, mem = Some fieldsLs },
      id = name
    } in
    cons def acc
  | TySeq { ty = ty } ->
    let ty = compileType env ty in
    let fields = [
      (CTyPtr { ty = ty }, Some _seqKey),
      (getCIntType env, Some _seqLenKey)
    ] in
    let def = CTTyDef {
      ty = CTyStruct { id = Some name, mem = Some fields },
      id = name
    } in
    cons def acc
  | TyTensor { ty = ty } ->
    let ty = compileType env ty in
    let dimsType = TySeq {ty = TyInt {info = NoInfo ()}, info = NoInfo ()} in
    let maxRank = env.options.tensorMaxRank in
    let fields = [
      (CTyInt64 (), Some _tensorIdKey),
      (CTyPtr { ty = ty }, Some _tensorDataKey),
      (CTyArray { ty = CTyInt64 (), size = Some (CEInt {i = maxRank}) }, Some _tensorDimsKey),
      (CTyInt64 (), Some _tensorRankKey),
      (CTyInt64 (), Some _tensorSizeKey)
    ] in
    let def = CTTyDef {
      ty = CTyStruct { id = Some name, mem = Some fields },
      id = name
    } in
    cons def acc
  | ty ->
    let def = CTTyDef { ty = compileType env ty, id = name } in
    cons def acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="genTyPostDefs" kind="sem">

```mc
sem genTyPostDefs : MExprCCompileBase_CompileCEnv -> [CTopAst_CTop] -> Name -> Ast_Type -> [CTopAst_CTop]
```

<Description>{`Generate variant definitions.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem genTyPostDefs
    (env: CompileCEnv) (acc: [CTop]) (name: Name) =
  | TyVariant { constrs = constrs } ->
      let constrLs: [(Name, CType)] =
        mapFoldWithKey (lam acc. lam name. lam ty.
          let ty = compileType env ty in
            snoc acc (name, ty)) [] constrs in
      let nameEnum = nameSym "constrs" in
      let enum = CTDef {
        ty = CTyEnum {
          id = Some nameEnum,
          mem = Some (map (lam t: (Name, CType). t.0) constrLs)
        },
        id = None (), init = None ()
      } in
      let def = CTTyDef {
        ty = CTyStruct {
          id = Some name,
          mem = Some [
            (CTyEnum { id = Some nameEnum, mem = None () }, Some _constrKey),
            (CTyUnion {
               id = None (),
               mem = Some (map
                 (lam t: (Name,CType). (t.1, Some t.0)) constrLs)
             }, None ())
          ] },
        id = name
      }
      in
      concat [enum,def] acc
  | _ -> acc
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileType" kind="sem">

```mc
sem compileType : MExprCCompileBase_CompileCEnv -> Ast_Type -> CExprTypeAst_CType
```



<ToggleWrapper text="Code..">
```mc
sem compileType (env: CompileCEnv) =
  | TyInt _ -> getCIntType env
  | TyFloat _ -> getCFloatType env
  | TyBool _ -> getCBoolType env
  | TyChar _ -> getCCharType env

  | TyCon { ident = ident } & ty ->
    -- Pointer types
    if any (nameEq ident) env.ptrTypes then
      CTyPtr { ty = CTyVar { id = ident } }
    -- Non-pointer types
    else CTyVar { id = ident }

  | TyUnknown _ & ty -> errorSingle [infoTy ty] "Unknown type in compileType"

  | TyRecord { fields = fields } & ty ->
    if mapIsEmpty fields then CTyVoid {}
    else
      errorSingle [infoTy ty]
        "TyRecord should not occur in compileType. Did you run type lift?"

  | TyVariant _ & ty ->
    errorSingle [infoTy ty]
      "TyVariant should not occur in compileType. Did you run type lift?"

  | TySeq { ty = TyChar _ } -> CTyPtr { ty = CTyChar {} }

  | TySeq _ & ty ->
    errorSingle [infoTy ty]
      "TySeq should not occur in compileType. Did you run type lift?"

  | TyTensor _ & ty ->
    errorSingle [infoTy ty]
      "TyTensor should not occur in compileType. Did you run type lift?"

  | TyApp _ & ty -> errorSingle [infoTy ty] "Type not currently supported"
  | TyArrow _ & ty ->
    errorSingle [infoTy ty] "TyArrow currently not supported"
    -- recursive let params = lam acc. lam ty.
    --   match ty with TyArrow { from = from, to = to } then
    --     params (snoc acc from) to
    --   else (acc, ty)
    -- in
    -- match params [] ty with (params, ret) then
    --   match mapAccumL compileType params with (env, params) then
    --     match compileType ret with (env, ret) then
    --       (env, CTyFun { ret = ret, params = params })
    --     else never
    --   else never
    -- else never

  | TyAlias t -> compileType env t.display

  | ty -> errorSingle [infoTy ty] "Unsupported type in compileType"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileFun" kind="sem">

```mc
sem compileFun : MExprCCompileBase_CompileCEnv -> Name -> Ast_Type -> Ast_Expr -> (MExprCCompileBase_CompileCEnv, CTopAst_CTop)
```

<Description>{`Translate a sequence of lambdas to a C function. Takes an explicit type as  
argument, because the lambdas do not explicitly give the return type,  
which is required in C.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileFun (env: CompileCEnv) (id: Name) (ty: Type) =
  | TmLam _ & fun ->
    recursive let detachParams: [Name] -> Expr -> ([Name], Expr) =
      lam acc. lam rest.
        match rest with
        TmLam { ty = ty, ident = ident, body = rest } then
          match ty with TyArrow { from = fromTy } then
            if _isUnitTy fromTy then detachParams acc rest
            else detachParams (snoc acc ident) rest
          else
            errorSingle [infoTy ty] "Incorrect type in compileFun"
        else (acc, rest)
    in
    recursive let funTypes: [Type] -> Type -> ([Type], Type) =
      lam acc. lam rest.
        match rest with TyArrow { from = from, to = rest } then
          if _isUnitTy from then funTypes acc rest
          else funTypes (snoc acc from) rest
        else (acc, rest)
    in
    match detachParams [] fun with (params, body) then
      match funTypes [] ty with (paramTypes, retType) then
        if neqi (length params) (length paramTypes) then
          errorSingle [infoTy ty] "Number of parameters in compileFun does not match."
        else
          match map (compileType env) paramTypes with paramTypes then
            let params = zipWith (lam t. lam id. (t, id)) paramTypes params in
            match (compileType env) retType with ret then
              let benv = { env with allocs = [] } in
              match compileStmts benv (RReturn ()) [] body with (benv, body) then
                let benv: CompileCEnv = benv in
                let body = concat benv.allocs body in
                -- Restore previous allocs
                let env = { benv with allocs = env.allocs } in
                (env, CTFun { ret = ret, id = id, params = params, body = body })
              else never
            else never
          else never
      else never
    else never

  | t -> errorSingle [infoTm t] "Non-lambda supplied to compileFun"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileAlloc" kind="sem">

```mc
sem compileAlloc : MExprCCompileBase_CompileCEnv -> Option Name -> Ast_Expr -> (MExprCCompileBase_CompileCEnv, [{id: Option Name, ty: CExprTypeAst_CType, init: Option CInitAst_CInit}], [CStmtAst_CStmt], Name)
```

<Description>{`Compiles allocation/definition and initialization of composite data types.  
The name of the allocation can either be given or generated.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileAlloc (env: CompileCEnv) (name: Option Name) =

  | TmConApp { ident = constrIdent, body = body, ty = ty } & t ->
    let n = match name with Some name then name else nameSym "alloc" in
    let def = alloc n (compileType env ty) in
    let init = [
      -- Set constructor tag
      CSExpr {
        expr = _assign (CEArrow { lhs = CEVar { id = n }, id = _constrKey })
          (CEVar { id = constrIdent })
      },
      -- Set data
      CSExpr {
        expr = _assign (CEArrow { lhs = CEVar { id = n }, id = constrIdent })
          (compileExpr env body)
      }
    ] in
    (env, def, init, n)

  | TmRecord _ & t ->
    errorSingle [infoTm t]
      "Unhandled case for TmRecord in compileAlloc (should be impossible)."
  | TmRecord { ty = TyRecord _, bindings = bindings } & t ->
    -- If the type is TyRecord, it follows from type lifting that this must be
    -- an empty record.
    -- TODO(dlunde,2021-10-07): Handle this how?
    errorSingle [infoTm t] "Empty bindings in TmRecord in compileAlloc"
  | TmRecord { ty = TyCon { ident = ident } & ty, bindings = bindings } & t ->
    let orderedLabels = recordOrderedLabels (mapKeys bindings) in
    let n = match name with Some name then name else nameSym "alloc" in
    let cTy = compileType env ty in
    if any (nameEq ident) env.ptrTypes then
      let def = alloc n cTy in
      let init = map (lam sid.
        let expr = mapFindExn sid bindings in
        CSExpr {
          expr = _assign
            (CEArrow {
              lhs = CEVar { id = n }, id = nameNoSym (sidToString sid)
            })
            (compileExpr env expr)
        }
      ) orderedLabels in
      (env, def, init, n)
    else
      let def = [{ ty = cTy, id = Some n, init = None ()}] in
      let init = map (lam sid.
        let expr = mapFindExn sid bindings in
        CSExpr {
          expr = _assign
            (CEMember {
              lhs = CEVar { id = n }, id = nameNoSym (sidToString sid)
            })
            (compileExpr env expr)
        }
      ) orderedLabels in
      (env, def, init, n)

  | TmSeq {tms = tms, ty = ty} & t ->
    let uTy = _unwrapType (env.typeEnv) ty in
    let n = match name with Some name then name else nameSym "alloc" in
    let len = length tms in

    -- Special handling of strings
    match uTy with TySeq { ty = TyChar _ & iTy } then
      let toChar = lam expr.
        match expr with TmConst { val = CChar { val = val } } then Some val
        else None ()
      in
      match optionMapM toChar tms with Some str then
        let str = CEString { s = str } in
        let def = [
          {
            ty = compileType env ty,
            id = Some n,
            init = Some (CIExpr { expr = str })
          }] in
        (env, def, [], n)
      else
        errorSingle [infoTm t] "Non-literal strings currently unsupported."
        -- let iTy = CTyArray {
        --   ty = compileType env iTy,
        --   size = Some (CEInt { i = addi 1 len })
        -- } in

    -- General sequences
    else match uTy with TySeq { ty = iTy } then
      -- Define the array
      let iTy = CTyArray {
        ty = compileType env iTy,
        size = Some (CEInt { i = len })
      } in
      let arrayName = nameSym "seqAlloc" in
      let def = alloc arrayName iTy in
      -- Initialize the array
      let init = mapi (lam i. lam t.
        CSExpr {
          expr = _assign
            (CEBinOp {
              op = COSubScript {},
              lhs = CEVar { id = arrayName },
              rhs = CEInt { i = i }
            })
            (compileExpr env t)
        }
      ) tms in
      -- Define and initialize the sequence struct
      let def = snoc def
        { ty = compileType env ty, id = Some n, init = None () } in
      let initSeq = [
        -- Set ptr
        CSExpr {
          expr = _assign (CEMember { lhs = CEVar { id = n }, id = _seqKey })
            (CEVar { id = arrayName })
        },
        -- Set len
        CSExpr {
          expr = _assign (CEMember { lhs = CEVar { id = n }, id = _seqLenKey })
            (CEInt { i = len })
        }
      ] in
      (env, def, concat init initSeq, n)


    else errorSingle [infoTm t] "TmSeq type inconsistency"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileTops" kind="sem">

```mc
sem compileTops : MExprCCompileBase_CompileCEnv -> [CTopAst_CTop] -> [CStmtAst_CStmt] -> Ast_Expr -> ([CTopAst_CTop], [CStmtAst_CStmt])
```



<ToggleWrapper text="Code..">
```mc
sem compileTops (env: CompileCEnv) (accTop: [CTop]) (accInit: [CStmt]) =

    | TmDecl {decl = DeclLet { ident = ident, tyBody = tyBody, body = body }, inexpr = inexpr } ->

    -- Functions
    match body with TmLam _ then
      match compileFun env ident tyBody body with (env, fun) then
        compileTops env (snoc accTop fun) accInit inexpr
      else never

    -- Optimize direct allocations
    else match body with TmConApp _ | TmRecord _ | TmSeq _ then
      match compileAlloc env (Some ident) body with (env, def, init, n) then
        let accTop = concat accTop (map (lam d. CTDef d) def) in
        let accInit = concat accInit init in
        compileTops env accTop accInit inexpr
      else never

    -- Other lets
    else
      let iu = _isUnitTy tyBody in
      let def =
        if iu then []
        else
          let ty = compileType env tyBody in
          [CTDef { ty = ty, id = Some ident, init = None () }]
      in
      let lres = if iu then RNone () else RIdent ident in
      match compileStmt env lres body with (env, stmts) then
        let accTop = concat accTop def in
        let accInit = concat accInit stmts in
        compileTops env accTop accInit inexpr
      else never

  | TmDecl {decl = DeclRecLets { bindings = bindings}, inexpr = inexpr } ->
    let f = lam env. lam binding: DeclLetRecord.
      match binding with { ident = ident, tyBody = tyBody, body = body } then
        compileFun env ident tyBody body
      else never
    in
    let g = lam fun.
      match fun with CTFun { ret = ret, id = id, params = params, body = body }
      then
        let params = map (lam t: (CType,Name). t.0) params in
        CTDef { ty = CTyFun { ret = ret, params = params }, id = Some id,
                init = None () }
      else never
    in
    match mapAccumL f env bindings with (env, funs) then
      let decls = if leqi (length funs) 1 then [] else map g funs in
      compileTops env (join [accTop, decls, funs]) accInit inexpr
    else never

  -- Ignore externals (handled elsewhere)
  | TmDecl {decl = DeclExt _, inexpr = inexpr} -> compileTops env accTop accInit inexpr

  -- Set up initialization code (for use, e.g., in a main function)
  | rest ->
    match compileStmts env (RReturn ()) accInit rest with (env, accInit) then
      let env: CompileCEnv = env in
      (accTop, concat env.allocs accInit)
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compilePat" kind="sem">

```mc
sem compilePat : MExprCCompileBase_CompileCEnv -> [CExprTypeAst_CExpr] -> [CStmtAst_CStmt] -> CExprTypeAst_CExpr -> Ast_Type -> Ast_Pat -> ([CExprTypeAst_CExpr], [CStmtAst_CStmt])
```



<ToggleWrapper text="Code..">
```mc
sem compilePat (env: CompileCEnv) (conds: [CExpr]) (defs: [CStmt])
    (target: CExpr) (ty: Type) =

  | PatNamed { ident = PName ident } ->
    let def = CSDef {
      ty = compileType env ty,
      id = Some ident,
      init = Some (CIExpr { expr = target })
    } in
    ( conds, snoc defs def )

  | PatNamed { ident = PWildcard _ } -> (conds, defs)

  | PatBool { val = val } ->
    ( snoc conds (CEBinOp {
        op = COEq {},
        lhs = target,
        rhs = let val = match val with true then 1 else 0 in CEInt { i = val }
      }),
      defs )

  | PatRecord { bindings = bindings } & pat ->
    match env with { typeEnv = typeEnv } then
      let f = lam acc. lam sid. lam subpat.
        match acc with (conds, defs) then
          match _unwrapType typeEnv ty with TyRecord { fields = fields } then
            match mapLookup sid fields with Some fTy then
              let label = sidToString sid in
              let expr = match unwrapType ty with TyCon { ident = ident } then
                  if any (nameEq ident) env.ptrTypes then
                    CEArrow { lhs = target, id = nameNoSym label }
                  else
                    CEMember { lhs = target, id = nameNoSym label }
                else errorSingle [infoPat pat] "Impossible scenario"
              in
              compilePat env conds defs expr fTy subpat
            else errorSingle [infoPat pat] "Label does not match between PatRecord and TyRecord"
          else errorSingle [infoPat pat] "Type not TyCon for PatRecord in compilePat"
        else never
      in
      mapFoldWithKey f (conds, defs) bindings
    else never

  | PatCon { ident = ident, subpat = subpat } & pat ->
    match env with { typeEnv = typeEnv } then
      match _unwrapType typeEnv ty with TyVariant { constrs = constrs } then
        match mapLookup ident constrs with Some ty then
          let cond = CEBinOp {
            op = COEq {},
            lhs = CEArrow { lhs = target, id = _constrKey },
            rhs = CEVar { id = ident }
          } in
          let expr = CEArrow { lhs = target, id = ident } in
          compilePat env (snoc conds cond)
            defs expr ty subpat
        else errorSingle [infoPat pat] "Invalid constructor in compilePat"
      else errorSingle [infoPat pat] "Not a TyVariant for PatCon in compilePat"
    else never
  | pat -> errorSingle [infoPat pat] "Pattern not supported"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileStmt" kind="sem">

```mc
sem compileStmt : MExprCCompileBase_CompileCEnv -> MExprCCompile_Result -> Ast_Expr -> (MExprCCompileBase_CompileCEnv, [CStmtAst_CStmt])
```

<Description>{`Compile a single C statement, and take action according to res.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileStmt (env: CompileCEnv) (res: Result) =

  -- TmMatch: Compile to if-statement
  | TmMatch { target = target, pat = pat, thn = thn, els = els } & t ->

    let ctarget = compileExpr env target in

    -- Compile branches
    match compileStmts env res [] thn with (env, thn) then
      match compileStmts env res [] els with (env, els) then

        -- Generate conditions corresponding to pat, and add pattern bindings
        -- to start of thn
        match compilePat env [] [] ctarget (tyTm target) pat
        with (conds, defs) then

          let thn = concat defs thn in

          let stmts =
            if null conds then thn
            else
              -- Compute joint condition
              let cond = foldr1 (lam cond. lam acc.
                  CEBinOp { op = COAnd {}, lhs = cond, rhs = acc }
                ) conds in
              [CSIf { cond = cond, thn = thn, els = els }]
          in

          (env, stmts)

        else never
      else never
    else never

  | TmSeq { tms = tms } & t ->
    match res with RIdent id then
      match compileAlloc env (None ()) t with (env, def, init, n) then
        let env: CompileCEnv = env in
        let def = map (lam d. CSDef d) def in
        let env = { env with allocs = concat def env.allocs } in
        (env, join [
          init,
          [CSExpr { expr = _assign (CEVar { id = id }) (CEVar { id = n }) }]
        ])
      else never
    else match res with RReturn _ then
      errorSingle [infoTm t] "Returning TmSeq is not allowed"
    else
      errorSingle [infoTm t] "Type error, should have been caught previously"

  -- TODO(dlunde,2021-10-07): Lots of code duplication here ...
  | TmConApp { ident = constrIdent, body = body, ty = ty } & t ->
    match res with RIdent id then
      match compileAlloc env (None ()) t with (env, def, init, n) then
        let def = map (lam d. CSDef d) def in
        let env: CompileCEnv = env in
        let env = { env with allocs = concat def env.allocs } in
        (env, join [
          init,
          [CSExpr { expr = _assign (CEVar { id = id }) (CEVar { id = n }) }]
        ])
      else never
    else match res with RReturn _ then
      errorSingle [infoTm t] "Returning TmConApp is not allowed"
    else
      errorSingle [infoTm t] "Type error, should have been caught previously"

  -- TODO(dlunde,2021-10-07): ... and here
  | TmRecord { ty = ty, bindings = bindings } & t ->
    if mapIsEmpty bindings then
      match res with RNone _ | RReturn _ then (env, [CSNop {}])
      else errorSingle [infoTm t] "Binding of unit type is not allowed"
    else
      match res with RIdent id then
        match compileAlloc env (None ()) t with (env, def, init, n) in
        let env: CompileCEnv = env in
        let def = map (lam d. CSDef d) def in
        let env = { env with allocs = concat def env.allocs } in
        (env, join [
          init,
          [CSExpr { expr = _assign (CEVar { id = id }) (CEVar { id = n })}]
        ])
      else match res with RReturn _ then
        if isPtrType env.ptrTypes ty then
          errorSingle [infoTm t] "Returning TmRecord containing pointers is not allowed"
        else
          match compileAlloc env (None ()) t with (env, def, init, n) in
          let env : CompileCEnv = env in
          let def = map (lam d. CSDef d) def in
          let env = {env with allocs = concat def env.allocs} in
          (env, join [
            init,
            [CSRet {val = Some (CEVar {id = n})}]])
      else
        errorSingle [infoTm t] "Type error, should have been caught previously"

  | TmRecordUpdate _ & t -> errorSingle [infoTm t] "TODO: TmRecordUpdate"

  -- Declare variable and call \\`compileExpr\\` on body.
  | expr ->

    -- TODO(dlunde,2021-10-07) Throw error on types that cannot be returned,
    -- etc.

    match res with RReturn _ then
      if _isUnitTy (tyTm expr) then
        match expr with TmVar _ then (env, [])
        else (env, [CSExpr { expr = compileExpr env expr }])
      else (env, [CSRet { val = Some (compileExpr env expr) }])

    else match res with RNone _ then
      if _isUnitTy (tyTm expr) then
        match expr with TmVar _ then (env, [])
        else (env, [CSExpr { expr = compileExpr env expr }])
      else errorSingle [infoTm expr]
        "Type error, should have been caught previously"

    else match res with RIdent id then
      (env, [CSExpr {
        expr = _assign (CEVar { id = id }) (compileExpr env expr)
      }])

    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileStmts" kind="sem">

```mc
sem compileStmts : MExprCCompileBase_CompileCEnv -> MExprCCompile_Result -> [CStmtAst_CStmt] -> Ast_Expr -> (MExprCCompileBase_CompileCEnv, [CStmtAst_CStmt])
```



<ToggleWrapper text="Code..">
```mc
sem compileStmts (env: CompileCEnv) (res: Result) (acc: [CStmt]) =

  | TmDecl {decl = DeclLet { ident = ident, tyBody = tyBody, body = body}, inexpr = inexpr } ->

    -- Optimize direct allocations
    match body with TmConApp _ | TmRecord _ | TmSeq _ then
      match compileAlloc env (Some ident) body with (env, def, init, n) then
        let def = map (lam d. CSDef d) def in
        let env: CompileCEnv = env in
        let env = { env with allocs = concat def env.allocs } in
        let acc = join [ acc, init ] in
        compileStmts env res acc inexpr
      else never

    else
      let iu = _isUnitTy tyBody in
      let def =
        if iu then []
        else
          let ty = compileType env tyBody in
          [CSDef { ty = ty, id = Some ident, init = None () }]
      in
      let lres = if iu then RNone () else RIdent ident in
      match compileStmt env lres body with (env, stmts) then
        let acc = join [acc, def, stmts] in
        compileStmts env res acc inexpr
      else never

  | stmt ->
    match compileStmt env res stmt with (env, stmts) then
      (env, join [acc, stmts])
    else never

  | TmNever _ -> (env, snoc acc (CSNop {}))

  -- Ignore externals (handled elsewhere)
  | TmDecl {decl = DeclExt _, inexpr = inexpr} -> compileStmts env res acc inexpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileOp" kind="sem">

```mc
sem compileOp : MExprCCompileBase_CompileCEnv -> Info -> [CExprTypeAst_CExpr] -> ConstAst_Const -> CExprTypeAst_CExpr
```

<Description>{`Only a subset of constants can be compiled`}</Description>


<ToggleWrapper text="Code..">
```mc
sem compileOp (env : CompileCEnv) (info : Info) (args: [CExpr]) =

  -- Binary operators
  | CAddi _
  | CAddf _ -> CEBinOp { op = COAdd {}, lhs = head args, rhs = last args }
  | CSubi _
  | CSubf _ -> CEBinOp { op = COSub {}, lhs = head args, rhs = last args }
  | CMuli _
  | CMulf _ -> CEBinOp { op = COMul {}, lhs = head args, rhs = last args }
  | CDivi _
  | CDivf _ -> CEBinOp { op = CODiv {}, lhs = head args, rhs = last args }
  | CModi _ -> CEBinOp { op = COMod {}, lhs = head args, rhs = last args }
  | CEqi _
  | CEqf _  -> CEBinOp { op = COEq {},  lhs = head args, rhs = last args }
  | CLti _
  | CLtf _  -> CEBinOp { op = COLt {},  lhs = head args, rhs = last args }
  | CGti _
  | CGtf _  -> CEBinOp { op = COGt {},  lhs = head args, rhs = last args }
  | CLeqi _
  | CLeqf _ -> CEBinOp { op = COLe {},  lhs = head args, rhs = last args }
  | CGeqi _
  | CGeqf _ -> CEBinOp { op = COGe {},  lhs = head args, rhs = last args }
  | CNeqi _
  | CNeqf _ -> CEBinOp { op = CONeq {}, lhs = head args, rhs = last args }

  -- Unary operators
  | CNegf _
  | CNegi _ -> CEUnOp { op = CONeg {}, arg = head args }

  -- Not directly mapped to C operators
  | CPrint _ ->
    CEApp { fun = _printf, args = [CEString { s = "%s" }, head args] }
  | CDPrint _ ->
    -- TODO(larshum, 2022-03-29): Properly implement dprint support.
    CEApp { fun = _printf, args = [CEString { s = "" }] }
  | CInt2float _ -> CECast { ty = getCFloatType env, rhs = head args }
  | CFloorfi _ -> CECast { ty = getCIntType env, rhs = head args }

  -- List operators
  | CGet _ ->
    let lhs = CEMember { lhs = head args, id = _seqKey } in
    CEBinOp { op = COSubScript {}, lhs = lhs, rhs = last args }
  | CLength _ -> CEMember { lhs = head args, id = _seqLenKey }

  -- Tensor operators
  | CTensorGetExn _ ->
    let idx = tensorComputeLinearIndex (head args) (last args) in
    let data = CEMember {lhs = head args, id = _tensorDataKey} in
    CEBinOp {op = COSubScript {}, lhs = data, rhs = idx}
  | CTensorSetExn _ ->
    let idx = tensorComputeLinearIndex (head args) (get args 1) in
    let data = CEMember {lhs = head args, id = _tensorDataKey} in
    CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {op = COSubScript {}, lhs = data, rhs = idx},
      rhs = get args 2
    }
  | CTensorLinearGetExn _ ->
    let data = CEMember {lhs = head args, id = _tensorDataKey} in
    CEBinOp {op = COSubScript {}, lhs = data, rhs = last args}
  | CTensorLinearSetExn _ ->
    let data = CEMember {lhs = head args, id = _tensorDataKey} in
    CEBinOp {
      op = COAssign (),
      lhs = CEBinOp {op = COSubScript {}, lhs = data, rhs = get args 1},
      rhs = get args 2
    }
  | CTensorRank _ -> CEMember {lhs = head args, id = _tensorRankKey}
  | CTensorShape _ -> tensorShapeCall (head args)

  -- NOTE(larshum, 2022-03-29): To ensure this construct can be used in GPU
  -- code, we do not use 'exit' as that is only available from CPU code.
  | CError _ -> CEApp {fun = _printf, args = [CEString {s = "%s\n"}, head args]}

  | c -> errorSingle [info] "Unsupported intrinsic in compileOp"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="compileExpr" kind="sem">

```mc
sem compileExpr : MExprCCompileBase_CompileCEnv -> Ast_Expr -> CExprTypeAst_CExpr
```



<ToggleWrapper text="Code..">
```mc
sem compileExpr (env: CompileCEnv) =

  | TmVar { ty = ty, ident = ident } & t->
    if _isUnitTy ty then
      errorSingle [infoTm t] "Unit type var in compileExpr"
    else match mapLookup ident env.externals with Some ext then
      let ext : ExtInfo = ext in
      CEVar { id = nameNoSym ext.ident }
    else CEVar { id = ident }

  | TmApp _ & app ->
    recursive let rec: [Expr] -> Expr -> (Expr, [Expr]) = lam acc. lam t.
      match t with TmApp { lhs = lhs, rhs = rhs } then
        if _isUnitTy (tyTm rhs) then rec acc lhs
        else rec (cons rhs acc) lhs
      else (t, acc)
    in
    match rec [] app with (fun, args) then
      -- Function calls
      match fun with TmVar { ident = ident } then
        let ident =
          match mapLookup ident env.externals with Some ext then
            let ext : ExtInfo = ext in
            nameNoSym ext.ident
          else ident
        in
        CEApp { fun = ident, args = map (compileExpr env) args }

      -- Intrinsics
      else match fun with TmConst { val = val } then
        let args = map (compileExpr env) args in
        compileOp env (infoTm fun) args val

      else errorSingle [infoTm app] "Unsupported application in compileExpr"
    else never

  -- Anonymous function, not allowed.
  | (TmLam _) & t -> errorSingle [infoTm t] "Anonymous function in compileExpr."

  -- Unit type is represented by int literal 0.
  | TmRecord { bindings = bindings } & t ->
    if mapIsEmpty bindings then CEInt { i = 0 }
    else errorSingle [infoTm t] "ERROR: Records cannot be handled in compileExpr."

  -- Should not occur after ANF and type lifting.
  | (TmRecordUpdate _ | TmDecl {decl = DeclLet _}
    | TmDecl {decl = DeclRecLets _} | TmDecl {decl = DeclType _} | TmDecl {decl = DeclConDef _}
    | TmConApp _ | TmMatch _ | TmDecl {decl = DeclUtest _}
    | TmSeq _ | TmDecl {decl = DeclExt _}) & t ->
    errorSingle [infoTm t] "ERROR: Term cannot be handled in compileExpr."

  -- Literals
  | TmConst { val = val } & t ->
    match val      with CInt   { val = val } then CEInt   { i = val }
    else match val with CFloat { val = val } then CEFloat { f = val }
    else match val with CChar  { val = val } then CEChar  { c = val }
    else match val with CBool  { val = val } then
      let val = match val with true then 1 else 0 in
      CEInt { i = val }
    else errorSingle [infoTm t] "Unsupported literal"

  -- Should not occur
  | (TmNever _) & t -> errorSingle [infoTm t] "Never term found in compileExpr"
```
</ToggleWrapper>
</DocBlock>

