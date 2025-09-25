import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  | CstrMatch { id: IName, pat: Pat, target: IName }
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
  | (CstrMatch { id = id1, pat = pat1, target = target1 },
     CstrMatch { id = id2, pat = pat2, target = target2 }) ->
     let d = subi id1 id2 in
     if eqi d 0 then
       let d = subi target1 target2 in
       if eqi d 0 then cmpPat pat1 pat2
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
  | CstrMatch r & cstr -> initConstraintName r.target graph cstr
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
  | CstrMatch r ->
    propagateMatchConstraint graph r.id (r.pat,update.1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : CFA_CFAGraph -> IName -> (Ast_Pat, CFABase_AbsVal) -> CFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint (graph: CFAGraph) (id: IName) =
  | _ -> graph -- Default: do nothing
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
  | CstrMatch { id = id, pat = pat, target = target } ->
    match pprintVarIName im env id with (env, id) in
    match getPatStringCode 0 env pat with (env, pat) in
    match pprintVarIName im env target with (env, target) in
    (env, join [id, ": match ", target, " with ", pat])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsMatch" kind="sem">

```mc
sem generateConstraintsMatch : CFA_GenFun
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraintsMatch graph =
  | _ -> graph
  | TmDecl {decl = DeclLet { ident = ident, body = TmMatch t, info = info }} ->
    let thn = name2intAcc graph.ia (infoTm t.thn) (exprName t.thn) in
    let els = name2intAcc graph.ia (infoTm t.els) (exprName t.els) in
    let ident = name2intAcc graph.ia info ident in
    let cstrs = [
      CstrDirect { lhs = thn, rhs = ident },
      CstrDirect { lhs = els, rhs = ident }
    ] in
    let graph = { graph with cstrs = concat cstrs graph.cstrs } in
    match t.target with TmVar tv then
      foldl (lam graph. lam f.
          let cstrs = (f ident (name2intAcc graph.ia tv.info tv.ident) t.pat) in
          { graph with cstrs = concat cstrs graph.cstrs }
        ) graph graph.mcgfs
    else errorSingle [infoTm t.target] "Not a TmVar in match target"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateMatchConstraints" kind="sem">

```mc
sem generateMatchConstraints : CFA_MatchGenFun
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateMatchConstraints id target =
  | pat ->
    [CstrMatch { id = id, pat = pat, target = target }]
```
</ToggleWrapper>
</DocBlock>

