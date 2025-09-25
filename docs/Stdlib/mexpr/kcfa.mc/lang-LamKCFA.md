import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```

<Description>{`Abstract representation of lambdas.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  | AVLam { ident: IName, bident: IName, body: Expr, env: CtxEnv }
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
  | (AVLam { ident = lhs, bident = lbody, env = lenv },
     AVLam { ident = rhs, bident = rbody, env = renv }) ->
     let diff = subi lhs rhs in
     if eqi diff 0 then
       let diff = subi lbody rbody in
       if eqi diff 0 then cmpCtxEnv lenv renv else diff
     else diff
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmLam t, info = info }} ->
    let ident = name2int im info ident in
    let av: AbsVal = AVLam {
      ident = name2int im t.info t.ident,
      bident = name2int im (infoTm t.body) (exprName t.body),
      body = t.body,
      env = ctxEnvFilterFree im (TmLam t) env
    } in
    let cstrs = [ CstrInit { lhs = av, rhs = (ident, ctx) } ] in
    (ctxEnvAdd ident ctx env, cstrs)
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
  | AVLam { ident = ident, bident = bident } ->
    match pprintVarIName im env ident with (env,ident) in
    match pprintVarIName im env bident with (env,bident) in
    (env, join ["lam ", ident, ". ", bident])
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectConstraints" kind="sem">

```mc
sem collectConstraints : KCFA_Ctx -> [KCFA_GenFun] -> KCFA_GenFunAcc -> Ast_Expr -> KCFA_GenFunAcc
```

<Description>{`We analyze the terms in the lambda body when discovering an application of  
an \`AVLam\`. Hence, we do nothing here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem collectConstraints ctx cgfs acc =
  | TmLam t -> acc
```
</ToggleWrapper>
</DocBlock>

