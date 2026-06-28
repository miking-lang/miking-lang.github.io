import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl (env : SymEnv) =
  | DeclType t ->
    match setSymbol env.currentEnv.tyConEnv t.ident with (tyConEnv, ident) in
    match mapAccumL setSymbol env.currentEnv.tyVarEnv t.params with (tyVarEnv, params) in
    ( symbolizeUpdateTyConEnv env tyConEnv
    , DeclType
      {t with ident = ident
      , params = params
      , tyIdent = symbolizeType (symbolizeUpdateTyVarEnv env tyVarEnv) t.tyIdent
      }
    )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="declAddDefinition" kind="sem">

```mc
sem declAddDefinition : SymEnv -> Ast_Decl -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
sem declAddDefinition (env : SymEnv) =
  | DeclType t ->
    let tyConEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.tyConEnv in
    symbolizeUpdateTyConEnv env tyConEnv
```
</ToggleWrapper>
</DocBlock>

