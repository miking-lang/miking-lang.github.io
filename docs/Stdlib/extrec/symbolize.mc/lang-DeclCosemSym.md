import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclCosemSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeCosemStep1" kind="sem">

```mc
sem symbolizeCosemStep1 : all a. a -> _a1 -> Ast_Decl -> (_a1, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeCosemStep1 env langEnv =
  | DeclCosem s ->
    match setSymbol langEnv.varEnv s.ident with (varEnv, ident) in

    let langEnv = {langEnv with varEnv = varEnv} in
    let decl = DeclCosem {s with ident = ident} in

    (langEnv, decl)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeCosemStep2" kind="sem">

```mc
sem symbolizeCosemStep2 : SymEnv -> NameEnv -> Ast_Decl -> Ast_Decl
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeCosemStep2 env langEnv =
  | DeclCosem s ->
    let env = updateEnv env langEnv in

    match symbolizeTyAnnot env s.tyAnnot with (tyVarEnv, tyAnnot) in
    let env = symbolizeUpdateTyVarEnv env tyVarEnv in

    let symbArgTy = lam env : SymEnv. lam arg : {ident : Name, tyAnnot : Type}.
        match setSymbol env.currentEnv.varEnv arg.ident with (varEnv, ident) in
        let env = symbolizeUpdateVarEnv env varEnv in

        match symbolizeTyAnnot env arg.tyAnnot with (tyVarEnv, tyAnnot) in
        let env = symbolizeUpdateTyVarEnv env tyVarEnv in

        (env, {ident = ident, tyAnnot = tyAnnot})
    in
    match mapAccumL symbArgTy env s.args with (env, args) in

    let symbCases = lam cas : (Copat, Expr).
        -- let copat = symbolizeCopat env cas.0 in
        let copat = cas.0 in
        let thn = symbolizeExpr env cas.1 in
        (copat, thn)
    in
    let cases = map symbCases s.cases in

    DeclCosem {s with cases = cases,
                      args = args,
                      tyAnnot = tyAnnot}
```
</ToggleWrapper>
</DocBlock>

