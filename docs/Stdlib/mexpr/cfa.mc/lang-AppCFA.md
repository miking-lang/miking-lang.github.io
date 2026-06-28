import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  -- {lam x. b} ⊆ lhs ⇒ (rhs ⊆ x and b ⊆ res)
  | CstrLamApp { lhs: IName, rhs: IName, res: IName }
  -- {const args} ⊆ lhs ⇒ {const args lhs} ⊆ res
  | CstrConstApp { lhs: IName, rhs: IName, res: IName }
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
     let d = subi res1 res2 in
     if eqi d 0 then
       let d = subi lhs1 lhs2 in
       if eqi d 0 then subi rhs1 rhs2
       else d
     else d
  | (CstrConstApp { lhs = lhs1, rhs = rhs1, res = res1},
     CstrConstApp { lhs = lhs2, rhs = rhs2, res = res2}) ->
     let d = subi res1 res2 in
     if eqi d 0 then
       let d = subi lhs1 lhs2 in
       if eqi d 0 then subi rhs1 rhs2
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
  | CstrLamApp r & cstr -> initConstraintName r.lhs graph cstr
  | CstrConstApp r & cstr -> initConstraintName r.lhs graph cstr
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
  | CstrLamApp { lhs = lhs, rhs = rhs, res = res } ->
    match update.1 with AVLam { ident = x, body = b } then
      -- Add rhs ⊆ x constraint
      let graph = initConstraint graph (CstrDirect { lhs = rhs, rhs = x }) in
      -- Add b ⊆ res constraint
      initConstraint graph (CstrDirect { lhs = b, rhs = res })
    else graph
  | CstrConstApp { lhs = lhs, rhs = rhs, res = res } ->
    match update.1 with AVConst avc then
      let arity = constArity avc.const in
      let args = snoc avc.args rhs in
      if eqi arity (length args) then
        -- Last application, call constant propagation functions
        let cstrs =
          foldl (lam acc. lam p.
                   concat (p res args avc.intermediates avc.const) acc)
            [] graph.cpfs
        in
        foldl initConstraint graph cstrs
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
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [ "{lam >x<. >b<} ⊆ ", lhs, " ⇒ ", rhs, " ⊆ >x< AND >b< ⊆ ", res ])
  | CstrConstApp { lhs = lhs, rhs = rhs, res = res } ->
    match pprintVarIName im env lhs with (env,lhs) in
    match pprintVarIName im env rhs with (env,rhs) in
    match pprintVarIName im env res with (env,res) in
    (env, join [
        ">const< >args< ⊆ ", lhs, " ⇒ ", ">const< >args< ", rhs, " ⊆ ", res
      ])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="appConstraints" kind="sem">

```mc
sem appConstraints : IName -> IName -> IName -> [CFABase_Constraint]
```



<ToggleWrapper text="Code..">
```mc
sem appConstraints lhs rhs =
  | res -> [
      CstrLamApp {lhs = lhs, rhs = rhs, res = res},
      CstrConstApp {lhs = lhs, rhs = rhs, res = res}
    ]
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmApp app, info = info}} ->
    match app.lhs with TmVar l then
      match app.rhs with TmVar r then
        let lhs = name2intAcc graph.ia l.info l.ident in
        let rhs = name2intAcc graph.ia r.info r.ident in
        let res = name2intAcc graph.ia info ident in
        let cstrs = appConstraints lhs rhs res in
        { graph with cstrs = concat cstrs graph.cstrs }
      else errorSingle [infoTm app.rhs] "Not a TmVar in application"
    else errorSingle [infoTm app.lhs] "Not a TmVar in application"
```
</ToggleWrapper>
</DocBlock>

