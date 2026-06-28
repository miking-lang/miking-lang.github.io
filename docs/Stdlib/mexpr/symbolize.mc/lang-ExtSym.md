import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeDecl" kind="sem">

```mc
sem symbolizeDecl : SymEnv -> Ast_Decl -> (SymEnv, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeDecl (env : SymEnv) =
  | DeclExt t ->
    let setName = if env.ignoreExternals then lam x. lam y. (x, y) else setSymbol in
    match setName env.currentEnv.varEnv t.ident with (varEnv, ident) in
    ( symbolizeUpdateVarEnv env varEnv
    , DeclExt {t with ident = ident, tyIdent = symbolizeType env t.tyIdent}
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
  | DeclExt t ->
    let varEnv = mapInsert (nameGetStr t.ident) t.ident env.currentEnv.varEnv in
    symbolizeUpdateVarEnv env varEnv
```
</ToggleWrapper>
</DocBlock>

