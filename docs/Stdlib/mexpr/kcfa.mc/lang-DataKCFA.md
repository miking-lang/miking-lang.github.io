import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKCFA  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AbsVal" kind="syn">

```mc
syn AbsVal
```



<ToggleWrapper text="Code..">
```mc
syn AbsVal =
  -- Abstract representation of constructed data.
  | AVCon { ident: (IName,Ctx), body: (IName,Ctx) }
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
    let idiff = cmpINameCtx ilhs irhs in
    if eqi idiff 0 then cmpINameCtx blhs brhs else idiff
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
  | TmDecl {decl = DeclLet { ident = ident, body = TmConApp t, info = info }} ->
    let body =
      match t.body with TmVar v then name2int im v.info v.ident
      else errorSingle [infoTm t.body] "Not a TmVar in con app" in
    let ctxBody = ctxEnvLookup im (infoTm t.body) body env in
    let av: AbsVal = AVCon {
        ident = (name2int im t.info t.ident, ctx),
        body = (body, ctxBody)
      } in
    let ident = name2int im info ident in
    let cstrs = [ CstrInit { lhs = av, rhs = (ident,ctx) } ] in
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
  | AVCon { ident = ident, body = body } ->
    match pprintConINameCtx im env ident with (env,ident) in
    match pprintVarINameCtx im env body with (env,body) in
    (env, join [ident, " ", body])
```
</ToggleWrapper>
</DocBlock>

