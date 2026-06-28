import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordCFA  
  

  
  
  
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
  | AVRec { bindings: Map SID IName }
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
  | CstrRecordUpdate { lhs: IName, key: SID, val: IName, rhs: IName }
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
    mapCmp subi lhs rhs
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
     let d = subi lhs1 lhs2 in
     if eqi d 0 then
       let d = cmpSID key1 key2 in
       if eqi d 0 then
         let d = subi val1 val2 in
         if eqi d 0 then subi rhs1 rhs2
         else d
       else d
     else d
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="initConstraint" kind="sem">

```mc
sem initConstraint : CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
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
sem generateConstraints : CFA_GenFun
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints graph =
  | TmDecl {decl = DeclLet { ident = ident, body = TmRecord t, info = info }} ->
    let bindings = mapMap (lam v: Expr.
        match v with TmVar t then name2intAcc graph.ia t.info t.ident
        else errorSingle [infoTm v] "Not a TmVar in record"
      ) t.bindings
    in
    let av: AbsVal = AVRec { bindings = bindings } in
    let cstr = CstrInit { lhs = av, rhs = name2intAcc graph.ia info ident }  in
    { graph with cstrs = cons cstr graph.cstrs }

  | TmDecl {decl = DeclLet { ident = ident, body = TmRecordUpdate t, info = info }} ->
    match t.rec with TmVar vrec then
      match t.value with TmVar vval then
        let lhs = name2intAcc graph.ia vrec.info vrec.ident in
        let val = name2intAcc graph.ia vval.info vval.ident in
        let ident = name2intAcc graph.ia info ident in
        let cstr = CstrRecordUpdate { lhs = lhs, key = t.key, val = val, rhs = ident } in
        { graph with cstrs = cons cstr graph.cstrs }
      else errorSingle [t.info] "Not a TmVar in record update"
    else errorSingle [t.info] "Not a TmVar in record update"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, CFABase_AbsVal) -> CFA_CFAGraph -> CFABase_Constraint -> CFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint (update: (IName,AbsVal)) (graph: CFAGraph) =
  | CstrRecordUpdate { lhs = lhs, key = key, val = val, rhs = rhs } ->
    match update.1 with AVRec { bindings = bindings } then
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
        match pprintVarIName im env v with (env, v) in
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
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintLabelString key with key in
    match pprintVarIName im env val with (env,val) in
    match pprintVarIName im env rhs with (env,rhs) in
    (env, join [">r< ⊆ ", lhs, " ⇒ { >r< with ", key, " = ", val, " } ⊆ ", rhs])
```
</ToggleWrapper>
</DocBlock>

