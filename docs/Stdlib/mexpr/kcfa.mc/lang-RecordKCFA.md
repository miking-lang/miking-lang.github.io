import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  -- Abstract representation of records. The bindings are from SIDs to names,
  -- rather than expressions.
  | AVRec { bindings: Map SID (IName,Ctx) }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  -- r ∈ lhs ⇒ { r with key = val } ∈ rhs
  | CstrRecordUpdate { lhs: (IName,Ctx), key: SID, val: (IName,Ctx),
                       rhs: (IName,Ctx) }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpAbsValH" kind="sem">

```mc
sem cmpAbsValH : (CFABase_AbsVal, CFABase_AbsVal) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpAbsValH =
  | (AVRec { bindings = lhs }, AVRec { bindings = rhs }) ->
    mapCmp cmpINameCtx lhs rhs
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="cmpConstraintH" kind="sem">

```mc
sem cmpConstraintH : (CFABase_Constraint, CFABase_Constraint) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstraintH =
  | (CstrRecordUpdate { lhs = lhs1, key = key1, val = val1, rhs = rhs1 },
     CstrRecordUpdate { lhs = lhs2, key = key2, val = val2, rhs = rhs2 }) ->
     let d = cmpINameCtx lhs1 lhs2 in
     if eqi d 0 then
       let d = cmpSID key1 key2 in
       if eqi d 0 then
         let d = cmpINameCtx val1 val2 in
         if eqi d 0 then cmpINameCtx rhs1 rhs2
         else d
       else d
     else d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraint" kind="sem">

```mc
sem initConstraint : KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem initConstraint (graph: CFAGraph) =
  | CstrRecordUpdate r & cstr -> initConstraintName r.lhs graph cstr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : Index_IndexMap -> KCFA_Ctx -> KCFA_CtxEnv -> Ast_Expr -> KCFA_GenFunAcc
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints im ctx env =
  | TmDecl {decl = DeclLet { ident = ident, body = TmRecord t, info = info }} ->
    let bindings = mapMap (lam v: Expr.
        match v with TmVar t then
          let vident = name2int im t.info t.ident in
          let vctx = ctxEnvLookup im t.info vident env in
          (vident,vctx)
        else errorSingle [infoTm v] "Not a TmVar in record"
      ) t.bindings
    in
    let av: AbsVal = AVRec { bindings = bindings } in
    let ident = name2int im info ident in
    let cstrs = [ CstrInit { lhs = av, rhs = (ident, ctx) } ] in
    (ctxEnvAdd ident ctx env, cstrs)
  | TmDecl {decl = DeclLet { ident = ident, body = TmRecordUpdate t, info = info }} ->
    match t.rec with TmVar vrec then
      match t.value with TmVar vval then
        let lhs = name2int im vrec.info vrec.ident in
        let val = name2int im vval.info vval.ident in
        let ident = name2int im info ident in
        let cstrs =
          [ CstrRecordUpdate { lhs = (lhs, ctxEnvLookup im vrec.info lhs env),
                               key = t.key,
                               val = (val, ctxEnvLookup im vval.info val env),
                               rhs = (ident, ctx)}
          ] in
        (ctxEnvAdd ident ctx env, cstrs)
      else errorSingle [t.info] "Not a TmVar in record update"
    else errorSingle [t.info] "Not a TmVar in record update"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, KCFA_Ctx, CFABase_AbsVal) -> KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint (update: (IName,Ctx,AbsVal)) (graph: CFAGraph) =
  | CstrRecordUpdate { lhs = lhs, key = key, val = val, rhs = rhs } ->
    match update.2 with AVRec { bindings = bindings } then
      let av = AVRec { bindings = mapInsert key val bindings } in
      initConstraint graph (CstrInit { lhs = av, rhs = rhs })
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="absValToString" kind="sem">

```mc
sem absValToString : Index_IndexMap -> PprintEnv -> CFABase_AbsVal -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem absValToString im (env: PprintEnv) =
  | AVRec { bindings = bindings } ->
    match mapMapAccum (lam env. lam k. lam v.
        match pprintVarINameCtx im env v with (env, v) in
        (env, join [pprintLabelString k, " = ", v])
      ) env bindings
    with (env, bindings) in
    let binds = mapValues bindings in
    let merged = strJoin ", " binds in
    (env, join ["{ ", merged, " }"])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constraintToString" kind="sem">

```mc
sem constraintToString : Index_IndexMap -> PprintEnv -> CFABase_Constraint -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem constraintToString im (env: PprintEnv) =
  | CstrRecordUpdate { lhs = lhs, key = key, val = val, rhs = rhs } ->
    match pprintVarINameCtx im env lhs with (env,lhs) in
    match pprintLabelString key with key in
    match pprintVarINameCtx im env val with (env,val) in
    match pprintVarINameCtx im env rhs with (env,rhs) in
    (env, join [">r< ∈ ", lhs, " ⇒ { >r< with ", key, " = ", val, " } ∈ ", rhs])
```
</ToggleWrapper>
</DocBlock>

