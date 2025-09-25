import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl (env : SymEnv) =
  | DeclRecLets t ->
    -- Generate fresh symbols for all identifiers and add to the environment
    let setSymbolIdent = lam env. lam b.
      match setSymbol env b.ident with (env, ident) in
      (env, {b with ident = ident})
    in
    match mapAccumL setSymbolIdent env.currentEnv.varEnv t.bindings with (varEnv, bindings) in
    let newEnv = symbolizeUpdateVarEnv env varEnv in

    -- Symbolize all bodies with the new environment
    let bindings =
      map (lam b. match symbolizeTyAnnot env b.tyAnnot with (tyVarEnv, tyAnnot) in
                  {b with body = symbolizeExpr (symbolizeUpdateTyVarEnv newEnv tyVarEnv) b.body,
                          tyAnnot = tyAnnot})
        bindings in

    (newEnv, DeclRecLets {t with bindings = bindings})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declAddDefinition" kind="sem">

```mc
sem declAddDefinition : SymEnv -> Ast_Decl -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
sem declAddDefinition env =
  | DeclRecLets t ->
    let varEnv =
      foldr (lam b. mapInsert (nameGetStr b.ident) b.ident) env.currentEnv.varEnv t.bindings in
    symbolizeUpdateVarEnv env varEnv
```
</ToggleWrapper>
</DocBlock>

