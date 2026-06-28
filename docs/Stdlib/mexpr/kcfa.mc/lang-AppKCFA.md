import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  -- {lam x. b} ⊆ lhs ⇒ (rhs ⊆ x and b ⊆ res)
  | CstrLamApp { lhs: (IName,Ctx), rhs: (IName,Ctx), res: (IName,Ctx) }
  -- {const args} ⊆ lhs ⇒ {const args lhs} ⊆ res
  | CstrConstApp { lhs: (IName,Ctx), rhs: (IName,Ctx),
                   res: (IName,Ctx) }
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
  | (CstrLamApp { lhs = lhs1, rhs = rhs1, res = res1 },
     CstrLamApp { lhs = lhs2, rhs = rhs2, res = res2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx lhs1 lhs2 in
       if eqi d 0 then cmpINameCtx rhs1 rhs2
       else d
     else d
  | (CstrConstApp { lhs = lhs1, rhs = rhs1, res = res1 },
     CstrConstApp { lhs = lhs2, rhs = rhs2, res = res2 }) ->
     let d = cmpINameCtx res1 res2 in
     if eqi d 0 then
       let d = cmpINameCtx lhs1 lhs2 in
       if eqi d 0 then cmpINameCtx rhs1 rhs2
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
  | CstrLamApp r & cstr -> initConstraintName r.lhs graph cstr
  | CstrConstApp r & cstr -> initConstraintName r.lhs graph cstr
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
  | CstrLamApp { lhs = lhs, rhs = rhs, res = res } ->
    match update.2 with AVLam { ident = x, bident = b, body = body, env = env }
    then
      let ctxBody = ctxAdd graph.k res.0 res.1 in
      let envBody = ctxEnvAdd x ctxBody env in
      -- Analyze the lambda body
      match initConstraints ctxBody envBody graph body with (envBody, graph) in
      -- Add rhs ⊆ x constraint
      let graph = initConstraint graph (CstrDirect {
          lhs = rhs, rhs = (x, ctxBody)
        }) in
      -- Add b ⊆ res constraint
      let graph = initConstraint graph (CstrDirect {
          lhs = (b, ctxEnvLookup graph.im (infoTm body) b envBody), rhs = res
        }) in
      graph
    else graph
  | CstrConstApp { lhs = lhs, rhs = rhs, res = res } ->
    match update.2 with AVConst ({ const = const, args = args } & avc) then
      let arity = constArity const in
      let args = snoc args rhs in
      if eqi arity (length args) then
        -- Last application
        propagateConstraintConst res args graph const
      else
        -- Curried application, add the new argument
        addData graph (AVConst { avc with args = args }) res
    else graph
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
  | CstrLamApp { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarINameCtx im env lhs with (env,lhs) in
    match pprintVarINameCtx im env rhs with (env,rhs) in
    match pprintVarINameCtx im env res with (env,res) in
    (env, join ["{lam >x<. >b<} ⊆ ", lhs, " ⇒ ", rhs, " ⊆ >x< AND >b< ⊆ ", res])
  | CstrConstApp { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarINameCtx im env lhs with (env,lhs) in
    match pprintVarINameCtx im env rhs with (env,rhs) in
    match pprintVarINameCtx im env res with (env,res) in
    (env, join [
        ">const< >args< ⊆ ", lhs, " ⇒ ", ">const< >args< ", rhs, " ⊆ ", res
      ])
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmApp app, info = info}} ->
    let ident = name2int im info ident in
    match app.lhs with TmVar l then
      match app.rhs with TmVar r then
        let lhs = name2int im l.info l.ident in
        let rhs = name2int im r.info r.ident in
        let lenv = ctxEnvLookup im l.info lhs env in
        let renv = ctxEnvLookup im r.info rhs env in
        let cstrs =
          [ CstrLamApp {
              lhs = (lhs, lenv),
              rhs = (rhs, renv),
                res = (ident, ctx)
              },
            CstrConstApp {
              lhs = (lhs, lenv),
              rhs = (rhs, renv),
              res = (ident, ctx)
            }
          ]
        in
        (ctxEnvAdd ident ctx env, cstrs)
      else errorSingle [infoTm app.rhs] "Not a TmVar in application"
    else errorSingle [infoTm app.lhs] "Not a TmVar in application"
```
</ToggleWrapper>
</DocBlock>

