import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtRecordSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl env =
  | DeclRecType t ->
    match setSymbol env.currentEnv.tyConEnv t.ident with (tyConEnv, ident) in
    let params = (mapAccumL setSymbol env.currentEnv.tyVarEnv t.params).1 in
    ( symbolizeUpdateTyConEnv env tyConEnv
    , DeclRecType {t with ident = ident, params = params}
    )
  | DeclRecField t ->
    ( env
    , DeclRecField {t with tyIdent = symbolizeType env t.tyIdent}
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
  | TmExtRecord t ->
    let ident = getSymbol {kind = "type constructor",
                           info = [t.info],
                           allowFree = env.allowFree} env.currentEnv.tyConEnv t.ident in
    let bindings = mapMap (symbolizeExpr env) t.bindings in
    TmExtRecord {t with ident = ident, bindings = bindings}
  | TmExtExtend t ->
    let e = symbolizeExpr env t.e in
    let bindings = mapMap (symbolizeExpr env) t.bindings in
    TmExtExtend {t with bindings = bindings, e = e}
```
</ToggleWrapper>
</DocBlock>

