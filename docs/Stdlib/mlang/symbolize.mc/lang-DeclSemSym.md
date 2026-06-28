import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclSemSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeSemStep1" kind="sem">

```mc
sem symbolizeSemStep1 : all a. a -> _a1 -> Ast_Decl -> (_a1, Ast_Decl)
```

<Description>{`Assign names to semantic functions`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeSemStep1 env langEnv =
  | DeclSem s ->
    match setSymbol langEnv.varEnv s.ident with (varEnv, ident) in

    let langEnv = {langEnv with varEnv = varEnv} in
    let decl = DeclSem {s with ident = ident} in

    (langEnv, decl)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeSemStep2" kind="sem">

```mc
sem symbolizeSemStep2 : SymEnv -> NameEnv -> Ast_Decl -> Ast_Decl
```

<Description>{`5. Assign names to semantic bodies, params, and types`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeSemStep2 env langEnv =
  | DeclSem s ->
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
    let result = match optionMap (lam a. mapAccumL symbArgTy env a) s.args with Some (env, args)
                  then (env, Some args) else (env, None ()) in
    match result with (env, args) in


    let symbCases = lam cas : {pat : Pat, thn : Expr}.
        match symbolizePat env (mapEmpty cmpString) cas.pat with (thnVarEnv, pat) in
        let varEnv = mapUnion env.currentEnv.varEnv thnVarEnv in
        let thn = symbolizeExpr (symbolizeUpdateVarEnv env varEnv) cas.thn in
        {pat = pat, thn = thn}
    in
    let cases = map symbCases s.cases in

    DeclSem {s with cases = cases,
                    tyAnnot = tyAnnot,
                    args = args}
```
</ToggleWrapper>
</DocBlock>

