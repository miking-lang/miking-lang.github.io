import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  -- [{names}] ⊆ lhs ⇒ ∀n ∈ names: {n} ⊆ rhs
  | CstrSeq {lhs : (IName,Ctx), rhs : (IName,Ctx)}
  -- [{names}] ⊆ lhs ⇒ [{names} ∪ {rhs}] ⊆ res
  | CstrSeqUnion {lhs : (IName,Ctx),
                  rhs : (IName,Ctx),
                  res : (IName,Ctx)}
  -- [{names}] ∈ seq ⇒ [{f n : n ∈ names}] ∈ res
  | CstrSeqMap1 {seq: (IName,Ctx), f: (IName,Ctx), res: (IName,Ctx)}
  -- {lam x. b} ⊆ f ⇒ (names ⊆ x and [{b}] ∈ res)
  | CstrSeqMap2 {f: (IName,Ctx), names: Set (IName,Ctx), res: (IName,Ctx)}

  -- CstrSeqFold<n> implements foldl when left = true, and foldr otherwise
  -- l: [{names}] ∈ seq ⇒ [{f acc n : n ∈ names}] ∈ res
  -- r: [{names}] ∈ seq ⇒ [{f n acc : n ∈ names}] ∈ res
  | CstrSeqFold1 { seq: (IName,Ctx), f: (IName,Ctx), acc: (IName,Ctx),
                   res: (IName,Ctx), left: Bool }
  -- l: {lam x. b} ⊆ f ⇒ (acc ⊆ x and {lam y. c} ⊆ b ⇒ (names ⊆ y and c ⊆ res))
  -- r: {lam x. b} ⊆ f ⇒ (names ⊆ x and {lam y. c} ⊆ b ⇒ (acc ⊆ y and c ⊆ res))
  | CstrSeqFold2 { f: (IName,Ctx), acc: (IName,Ctx), names: Set (IName,Ctx),
                   res: (IName,Ctx), left: Bool }
  -- {lam x. b} ⊆ f ⇒ (names ⊆ x and b ⊆ res)
  | CstrSeqFold3 { f: (IName,Ctx), names: Set (IName,Ctx), res: (IName,Ctx) }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="cmpConstraintH" kind="sem">

```mc
sem cmpConstraintH : (CFABase_Constraint, CFABase_Constraint) -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpConstraintH =
  | (CstrSeq { lhs = lhs1, rhs = rhs1 },
     CstrSeq { lhs = lhs2, rhs = rhs2 }) ->
     let d = cmpINameCtx lhs1 lhs2 in
     if eqi d 0 then cmpINameCtx rhs1 rhs2
     else d
  | (CstrSeqUnion { lhs = lhs1, rhs = rhs1, res = res1 },
     CstrSeqUnion { lhs = lhs2, rhs = rhs2, res = res2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx lhs1 lhs2 in
       if eqi d 0 then cmpINameCtx rhs1 rhs2
       else d
     else d
  | (CstrSeqMap1 { seq = seq1, f = f1, res = res1 },
     CstrSeqMap1 { seq = seq2, f = f2, res = res2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx seq1 seq2 in
       if eqi d 0 then cmpINameCtx f1 f2
       else d
     else d
  | (CstrSeqMap2 { f = f1, names = names1, res = res1 },
     CstrSeqMap2 { f = f2, names = names2, res = res2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx f1 f2 in
       if eqi d 0 then setCmp names1 names2
       else d
     else d
  | (CstrSeqFold1 { seq = seq1, f = f1, acc = acc1, res = res1, left = l1 },
     CstrSeqFold1 { seq = seq2, f = f2, acc = acc2, res = res2, left = l2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx seq1 seq2 in
       if eqi d 0 then
         let d = cmpINameCtx acc1 acc2 in
         if eqi d 0 then
           let d = cmpINameCtx f1 f2 in
           if eqi d 0 then cmpBool l1 l2
           else d
         else d
       else d
     else d
  | (CstrSeqFold2 { f = f1, acc = acc1, names = names1, res = res1, left = l1 },
     CstrSeqFold2 { f = f2, acc = acc2, names = names2, res = res2, left = l2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx acc1 acc2 in
       if eqi d 0 then
         let d = cmpINameCtx f1 f2 in
         if eqi d 0 then
           let d = setCmp names1 names2 in
           if eqi d 0 then cmpBool l1 l2
           else d
         else d
       else d
     else d
  | (CstrSeqFold3 { f = f1, names = names1, res = res1 },
     CstrSeqFold3 { f = f2, names = names2, res = res2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx f1 f2 in
       if eqi d 0 then setCmp names1 names2
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
  | CstrSeq r & cstr -> initConstraintName r.lhs graph cstr
  | CstrSeqUnion r & cstr -> initConstraintName r.lhs graph cstr
  | CstrSeqMap1 r & cstr -> initConstraintName r.seq graph cstr
  | CstrSeqMap2 r & cstr -> initConstraintName r.f graph cstr
  | CstrSeqFold1 r & cstr -> initConstraintName r.seq graph cstr
  | CstrSeqFold2 r & cstr -> initConstraintName r.f graph cstr
  | CstrSeqFold3 r & cstr -> initConstraintName r.f graph cstr
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
  | CstrSeq { lhs = lhs, rhs = rhs } ->
    match pprintVarINameCtx im env lhs with (env,lhs) in
    match pprintVarINameCtx im env rhs with (env,rhs) in
    (env, join [ "[{names}] ⊆ ", lhs, " ⇒ ∀n ∈ names: {n} ⊆ ", rhs ])
  | CstrSeqUnion { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarINameCtx im env lhs with (env,lhs) in
    match pprintVarINameCtx im env rhs with (env,rhs) in
    match pprintVarINameCtx im env res with (env,res) in
    (env, join [
        "[{names}] ⊆ ", lhs, " ⇒ [{names} ∪ { ", rhs," }] ⊆ ", res
      ])
  | CstrSeqMap1 { seq = seq, f = f, res = res } ->
    match pprintVarINameCtx im env seq with (env,seq) in
    match pprintVarINameCtx im env f with (env,f) in
    match pprintVarINameCtx im env res with (env,res) in
    (env, join [
        "[{names}] ∈ ", seq, " ⇒ [{", f, " n : n ∈ names}] ∈ ", res
      ])
  | CstrSeqMap2 { f = f, names = names, res = res } ->
    match pprintVarINameCtx im env f with (env,f) in
    match mapAccumL (pprintVarINameCtx im) env (setToSeq names)
    with (env,names) in
    match pprintVarINameCtx im env res with (env,res) in
    (env, join [
        "{lam x. b} ⊆ ", f, " ⇒ {", strJoin ", " names, "} ⊆ x AND ",
        "[{b}] ∈ ", res
      ])
  | CstrSeqFold1 { seq = seq, f = f, acc = acc, res = res, left = left } ->
    match pprintVarINameCtx im env seq with (env,seq) in
    match pprintVarINameCtx im env f with (env,f) in
    match pprintVarINameCtx im env acc with (env,acc) in
    match pprintVarINameCtx im env res with (env,res) in
    let app = if left then [" ", acc, " n"] else [" n ", acc] in
    (env, join [
        "[{names}] ∈ ", seq, " ⇒ [{", f, join app, " : n ∈ names}] ∈ ", res
      ])
  | CstrSeqFold2 { f = f, acc = acc, names = names, res = res, left = left } ->
    match pprintVarINameCtx im env f with (env,f) in
    match pprintVarINameCtx im env acc with (env,acc) in
    match mapAccumL (pprintVarINameCtx im) env (setToSeq names)
    with (env,names) in
    match pprintVarINameCtx im env res with (env,res) in
    let args =
      if left then (acc, join ["{", strJoin ", " names, "}"])
      else (join ["{", strJoin ", " names, "}"], acc) in
    (env, join [
        "{lam x. b} ⊆ ", f, " ⇒ ", args.0, " ⊆ x AND ",
        "{lam y. c} ⊆ b ⇒ ", args.1, " ⊆ y AND {c} ⊆ ", res
      ])
  | CstrSeqFold3 { f = f, names = names, res = res } ->
    match pprintVarINameCtx im env f with (env,f) in
    match mapAccumL (pprintVarINameCtx im) env (setToSeq names)
    with (env,names) in
    match pprintVarINameCtx im env res with (env,res) in
    (env, join [
        "{lam x. b} ⊆ ", f, " ⇒ {", (strJoin ", " names), "} ⊆ x AND ",
        "b ⊆ ", res
      ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, KCFA_Ctx, CFABase_AbsVal) -> KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint update graph =
  | CstrSeq { lhs = lhs, rhs = rhs } ->
    match update.2 with AVSeq { names = names } then
      setFold (lam graph. lam name.
          initConstraint graph (CstrDirect {lhs = name, rhs = rhs})
        ) graph names
    else graph
  | CstrSeqUnion { lhs = lhs, rhs = rhs, res = res } ->
    match update.2 with AVSeq { names = names } then
      addData graph (AVSeq {names = setInsert rhs names}) res
    else graph
  | CstrSeqMap1 { seq = seq, f = f, res = res } ->
    match update.2 with AVSeq { names = names } then
      initConstraint graph (CstrSeqMap2 { f = f, names = names, res = res })
    else graph
  | CstrSeqMap2 { f = f, names = names, res = res } ->
    match update.2 with AVLam { ident = x, bident = b, body = body, env = env }
    then
      -- All calls to 'f' within the map get the same context
      let ctxBody = res.1 in
      let envBody = ctxEnvAdd x ctxBody env in
      -- Analyze the lambda body
      match initConstraints ctxBody envBody graph body with (envBody, graph) in
      -- Add names ⊆ x constraints
      let graph = setFold (lam graph. lam n.
          initConstraint graph (CstrDirect { lhs = n, rhs = (x, ctxBody) })
        ) graph names in
      -- Add [{b}] ⊆ res constraint
      let ctx = ctxEnvLookup graph.im (infoTm body) b envBody in
      initConstraint graph (CstrInit {
        lhs = AVSeq { names = setOfSeq cmpINameCtx [(b, ctx)]},
        rhs = res })
    else graph
  | CstrSeqFold1 { seq = seq, f = f, acc = acc, res = res, left = left } ->
    match update.2 with AVSeq { names = names } then
      initConstraint graph (
        CstrSeqFold2 { f = f, acc = acc, names = names, res = res, left = left }
      )
    else graph
  | CstrSeqFold2 { f = f, acc = acc, names = names, res = res, left = left } ->
    match update.2 with AVLam { ident = x, bident = b, body = body, env = env }
    then
      let ctxBody = res.1 in
      let envBody = ctxEnvAdd x ctxBody env in
      -- Analyze the lambda body
      match initConstraints ctxBody envBody graph body with (envBody, graph) in
      let ctxBident = ctxEnvLookup graph.im (infoTm body) b envBody in
      if left then
        -- Add acc ⊆ x constraint
        let graph = initConstraint graph (CstrDirect {
          lhs = acc, rhs = (x, ctxBody) }) in
        initConstraint graph (CstrSeqFold3 {
          f = (b, ctxBident), names = names, res = res})
      else
        -- Add names ⊆ x constraint
        let graph = setFold (lam graph. lam n.
            initConstraint graph (CstrDirect { lhs = n, rhs = (x, ctxBody) })
          ) graph names in
        initConstraint graph (CstrSeqFold3 {
          f = (b, ctxBident), names = setOfSeq cmpINameCtx [acc], res = res})
    else graph
  | CstrSeqFold3 { f = f, names = names, res = res } ->
    match update.2 with AVLam { ident = x, bident = b, body = body, env = env }
    then
      let ctxBody = res.1 in
      let envBody = ctxEnvAdd x ctxBody env in
      -- Analyze the lambda body
      match initConstraints ctxBody envBody graph body with (envBody, graph) in
      let ctxBident = ctxEnvLookup graph.im (infoTm body) b envBody in
      -- Add names ⊆ x constraints
      let graph = setFold (lam graph. lam n.
          initConstraint graph (CstrDirect { lhs = n, rhs = (x, ctxBody) })
        ) graph names in
      -- Add b ⊆ res constraint
      initConstraint graph (CstrDirect { lhs = (b, ctxBident), rhs = res })
    else graph
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsConst" kind="sem">

```mc
sem generateConstraintsConst : Info -> (IName, KCFA_Ctx) -> ConstAst_Const -> [CFABase_Constraint]
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraintsConst info ident =
  | ( CSet _
    | CGet _
    | CCons _
    | CSnoc _
    | CConcat _
    | CReverse _
    | CHead _
    | CTail _
    | CSubsequence _
    | CFoldl _
    | CFoldr _
    | CMap _
    ) & const ->
    [
      CstrInit {
        lhs = AVConst { id = ident, const = const, args = []}, rhs = ident
      }
    ]

  | ( CLength _
    | CNull _
    | CIsList _
    | CIsRope _
    ) -> []
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraintConst" kind="sem">

```mc
sem propagateConstraintConst : (IName, KCFA_Ctx) -> [(IName, KCFA_Ctx)] -> KCFA_CFAGraph -> ConstAst_Const -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraintConst res args graph =
  | CSet _ ->
    utest length args with 3 in
    let seq = get args 0 in
    let val = get args 2 in
    initConstraint graph (CstrSeqUnion {lhs = seq, rhs = val, res = res})
  | CGet _ ->
    utest length args with 2 in
    initConstraint graph (CstrSeq {lhs = head args, rhs = res})
  | CCons _ ->
    utest length args with 2 in
    let val = get args 0 in
    let seq = get args 1 in
    initConstraint graph (CstrSeqUnion {lhs = seq, rhs = val, res = res})
  | CSnoc _ ->
    utest length args with 2 in
    let seq = get args 0 in
    let val = get args 1 in
    initConstraint graph (CstrSeqUnion {lhs = seq, rhs = val, res = res})
  | CConcat _ ->
    utest length args with 2 in
    let graph = initConstraint graph (CstrDirect {lhs = head args, rhs = res}) in
    initConstraint graph (CstrDirect {lhs = get args 1, rhs = res})
  | CReverse _ ->
    utest length args with 1 in
    initConstraint graph (CstrDirect {lhs = head args, rhs = res})
  | CHead _ ->
    utest length args with 1 in
    initConstraint graph (CstrSeq {lhs = head args, rhs = res})
  | CTail _ ->
    utest length args with 1 in
    initConstraint graph (CstrDirect {lhs = head args, rhs = res})
  | CSubsequence _ ->
    utest length args with 3 in
    initConstraint graph (CstrDirect {lhs = head args, rhs = res})
  | CMap _ ->
    utest length args with 2 in
    initConstraint graph (
      CstrSeqMap1 {seq = get args 1, f = head args, res = res})
  | CFoldl _ ->
    utest length args with 3 in
    let seq = get args 2 in
    let f = head args in
    let acc = get args 1 in
    -- Add acc ⊆ res constraint
    let graph = initConstraint graph (CstrDirect { lhs = acc, rhs = res }) in
    initConstraint graph (CstrSeqFold1 {
      seq = seq, f = f, acc = acc, res = res, left = true})
  | CFoldr _ ->
    utest length args with 3 in
    let seq = get args 2 in
    let f = head args in
    let acc = get args 1 in
    -- Add acc ⊆ res constraint
    let graph = initConstraint graph (CstrDirect { lhs = acc, rhs = res }) in
    initConstraint graph (CstrSeqFold1 {
      seq = seq, f = f, acc = acc, res = res, left = false})
```
</ToggleWrapper>
</DocBlock>

