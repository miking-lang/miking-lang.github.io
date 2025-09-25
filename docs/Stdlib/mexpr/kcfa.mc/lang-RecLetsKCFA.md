import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : Index_IndexMap -> KCFA_Ctx -> KCFA_CtxEnv -> Ast_Expr -> KCFA_GenFunAcc
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints im ctx env =
  | tm & TmDecl {decl = DeclRecLets ({ bindings = bindings } & t)} ->
    -- Make each binding available in the environment
    let idents = map (lam b. name2int im b.info b.ident) bindings in
    let envBody = foldl (lam env. lam i.
        ctxEnvAdd i ctx env) (ctxEnvFilterFree im tm env) idents in
    let cstrs = map (lam identBind: (IName, DeclLetRecord).
      match identBind with (ident, b) in
      match b.body with TmLam t then
        let av: AbsVal = AVLam {
          ident = name2int im t.info t.ident,
          bident = name2int im (infoTm t.body) (exprName t.body),
          body = t.body,
          env = envBody
        } in
        CstrInit { lhs = av, rhs = (ident, ctx) }
      else errorSingle [infoTm b.body] "Not a lambda in recursive let body"
    ) (zip idents bindings) in
    let env = foldl (lam env. lam i. ctxEnvAdd i ctx env) env idents in
    (env, cstrs)
```
</ToggleWrapper>
</DocBlock>

