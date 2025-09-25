import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Constraint" kind="syn">

```mc
syn Constraint
```



<ToggleWrapper text="Code..">
```mc
syn Constraint =
  | CstrMatch { id: (IName,Ctx), pat: Pat, target: (IName,Ctx) }
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
     let d = cmpINameCtx id1 id2 in
     if eqi d 0 then
       let d = cmpINameCtx target1 target2 in
       if eqi d 0 then cmpPat pat1 pat2
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
  | CstrMatch r & cstr -> initConstraintName r.target graph cstr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateConstraint" kind="sem">

```mc
sem propagateConstraint : (IName, KCFA_Ctx, CFABase_AbsVal) -> KCFA_CFAGraph -> CFABase_Constraint -> KCFA_CFAGraph
```



<ToggleWrapper text="Code..">
```mc
sem propagateConstraint (update: (IName,Ctx,AbsVal)) graph =
  | CstrMatch r ->
    propagateMatchConstraint graph r.id (r.pat,update.2)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="propagateMatchConstraint" kind="sem">

```mc
sem propagateMatchConstraint : KCFA_CFAGraph -> (IName, KCFA_Ctx) -> (Ast_Pat, CFABase_AbsVal) -> KCFA_CFAGraph
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem propagateMatchConstraint graph id =
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
    match pprintVarINameCtx im env id with (env, id) in
    match getPatStringCode 0 env pat with (env, pat) in
    match pprintVarINameCtx im env target with (env, target) in
    (env, join [id, ": match ", target, " with ", pat])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateConstraintsMatch" kind="sem">

```mc
sem generateConstraintsMatch : Index_IndexMap -> [KCFA_MatchGenFun] -> KCFA_Ctx -> KCFA_CtxEnv -> Ast_Expr -> KCFA_GenFunAcc
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateConstraintsMatch im mcgfs ctx env =
  | _ -> (env,[])
  | TmDecl {decl = DeclLet { ident = ident, body = TmMatch t, info = info }} ->
    let thn = name2int im (infoTm t.thn) (exprName t.thn) in
    let els = name2int im (infoTm t.els) (exprName t.els) in
    let ident = name2int im info ident in
    let cstrs = [
      CstrDirect { lhs = (thn,ctx), rhs = (ident,ctx) },
      CstrDirect { lhs = (els,ctx), rhs = (ident,ctx) }
    ] in
    let cstrs =
      match t.target with TmVar tv then
        let target = name2int im tv.info tv.ident in
        let targetCtx = ctxEnvLookup im tv.info target env in
        foldl (lam acc. lam f.
            concat (f (ident,ctx) (target, targetCtx) t.pat) acc
          ) cstrs mcgfs
      else errorSingle [infoTm t.target] "Not a TmVar in match target"
    in
    -- Add the names bound in the pattern to the environment
    let names = map (name2int im t.info) (patNames [] t.pat) in
    let env = foldl (lam acc. lam n. ctxEnvAdd n ctx acc) env names in
    (ctxEnvAdd ident ctx env, cstrs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="generateMatchConstraints" kind="sem">

```mc
sem generateMatchConstraints : (IName, KCFA_Ctx) -> (IName, KCFA_Ctx) -> Ast_Pat -> [CFABase_Constraint]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem generateMatchConstraints id target =
  | pat -> [ CstrMatch { id = id, pat = pat, target = target } ]
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="patNames" kind="sem">

```mc
sem patNames : [Name] -> Ast_Pat -> [Name]
```

<Description>{`Returns the set of names bound in a patternNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem patNames acc =
  | p ->
    sfold_Pat_Pat patNames acc p
```
</ToggleWrapper>
</DocBlock>

