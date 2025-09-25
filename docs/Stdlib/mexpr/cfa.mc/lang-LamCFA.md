import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```

<Description>{`Abstract representation of lambdas.`}</Description>


<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  | AVLam { ident: IName, body: IName }
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
  | (AVLam { ident = lhs, body = lbody },
     AVLam { ident = rhs, body = rbody }) ->
     let diff = subi lhs rhs in
     if eqi diff 0 then subi lbody rbody else diff
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmLam t, info = info }} ->
    let av: AbsVal = AVLam {
      ident = name2intAcc graph.ia t.info t.ident,
      body = name2intAcc graph.ia (infoTm t.body) (exprName t.body)
    } in
    let cstr = CstrInit { lhs = av, rhs = name2intAcc graph.ia info ident } in
    { graph with cstrs = cons cstr graph.cstrs }
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
  | AVLam { ident = ident, body = body } ->
    match pprintVarIName im env ident with (env,ident) in
    match pprintVarIName im env body with (env,body) in
    (env, join ["lam ", ident, ". ", body])
```
</ToggleWrapper>
</DocBlock>

