import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl (env : SymEnv) =
  | DeclLet t ->
    match symbolizeTyAnnot env t.tyAnnot with (tyVarEnv, tyAnnot) in
    match setSymbol env.currentEnv.varEnv t.ident with (varEnv, ident) in
    let decl = DeclLet
      {t with ident = ident
      , tyAnnot = tyAnnot
      , body = symbolizeExpr (symbolizeUpdateTyVarEnv env tyVarEnv) t.body
      } in
    (symbolizeUpdateVarEnv env varEnv, decl)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeTyAnnot" kind="sem">

```mc
sem symbolizeTyAnnot : SymEnv -> Ast_Type -> (Map String Name, Ast_Type)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem symbolizeTyAnnot env =
  | tyAnnot ->
    let symbolized = symbolizeType env tyAnnot in
    match stripTyAll symbolized with (vars, stripped) in
    (foldl (lam env. lam nk. mapInsert (nameGetStr nk.0) nk.0 env)
       env.currentEnv.tyVarEnv vars, symbolized)
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
  | DeclLet t ->
    let varEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.varEnv in
    symbolizeUpdateVarEnv env varEnv
```
</ToggleWrapper>
</DocBlock>

