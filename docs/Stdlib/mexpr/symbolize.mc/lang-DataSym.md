import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl (env : SymEnv) =
  | DeclConDef t ->
    match setSymbol env.currentEnv.conEnv t.ident with (conEnv, ident) in
    ( symbolizeUpdateConEnv env conEnv
    , DeclConDef {t with ident = ident, tyIdent = symbolizeType env t.tyIdent}
    )
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr env =
  | TmConApp t ->
    let ident =
      getSymbol {kind = "constructor",
                 info = [t.info],
                 allowFree = env.allowFree}
        env.currentEnv.conEnv t.ident
    in
    TmConApp {t with ident = ident,
                     body = symbolizeExpr env t.body}
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
  | DeclConDef t ->
    let conEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.conEnv in
    symbolizeUpdateConEnv env conEnv
```
</ToggleWrapper>
</DocBlock>

