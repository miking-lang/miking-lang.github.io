import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeExpr" kind="sem">

```mc
sem symbolizeExpr : SymEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeExpr env =
  | TmDecl x ->
    match symbolizeDecl env x.decl with (env, decl) in
    let inexpr = symbolizeExpr env x.inexpr in
    TmDecl {x with decl = decl, inexpr = inexpr}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addTopNames" kind="sem">

```mc
sem addTopNames : SymEnv -> Ast_Expr -> SymEnv
```



<ToggleWrapper text="Code..">
```mc
sem addTopNames (env : SymEnv) =
  | TmDecl x ->
    let env = declAddDefinition env x.decl in
    addTopNames env x.inexpr
```
</ToggleWrapper>
</DocBlock>

