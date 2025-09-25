import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  -- Abstract representation of constructed data.
  | AVCon { ident: IName, body: IName }
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
  | (AVCon { ident = ilhs, body = blhs },
     AVCon { ident = irhs, body = brhs }) ->
    let idiff = subi ilhs irhs in
    if eqi idiff 0 then subi blhs brhs else idiff
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmConApp t, info = info }} ->
    let body =
      match t.body with TmVar v then name2intAcc graph.ia v.info v.ident
      else errorSingle [infoTm t.body] "Not a TmVar in con app" in
    let av: AbsVal = AVCon { ident = name2intAcc graph.ia t.info t.ident, body = body } in
    let cstr = CstrInit { lhs = av, rhs = name2intAcc graph.ia info ident }  in
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
  | AVCon { ident = ident, body = body } ->
    match pprintConIName im env ident with (env,ident) in
    match pprintVarIName im env body with (env,body) in
    (env, join [ident, " ", body])
```
</ToggleWrapper>
</DocBlock>

