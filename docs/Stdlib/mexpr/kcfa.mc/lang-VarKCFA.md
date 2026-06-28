import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarKCFA  
  

  
  
  
## Semantics  
  

          <DocBlock title="generateConstraints" kind="sem">

```mc
sem generateConstraints : Index_IndexMap -> KCFA_Ctx -> KCFA_CtxEnv -> Ast_Expr -> KCFA_GenFunAcc
```



<ToggleWrapper text="Code..">
```mc
sem generateConstraints im ctx env =
  | TmDecl {decl = DeclLet { ident = ident, body = TmVar t, info = info }} ->
    let ident = name2int im info ident in
    let lhs = name2int im t.info t.ident in
    let cstrs =
      [ CstrDirect {
        lhs = (lhs, ctxEnvLookup im t.info lhs env),
        rhs = (ident, ctx)
      } ]
    in
    (ctxEnvAdd ident ctx env, cstrs)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="exprName" kind="sem">

```mc
sem exprName : Ast_Expr -> Name
```



<ToggleWrapper text="Code..">
```mc
sem exprName =
  | TmVar t -> t.ident
```
</ToggleWrapper>
</DocBlock>

