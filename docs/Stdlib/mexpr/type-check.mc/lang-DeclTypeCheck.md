import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DeclTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmDecl x ->
    let preLvl = env.currentLvl in
    match typeCheckDecl env x.decl with (env, decl) in
    let inexpr = typeCheckExpr env x.inexpr in
    (if gti env.currentLvl preLvl then
      unify env [infoDecl x.decl, infoTm inexpr] (newpolyvar preLvl x.info) (tyTm inexpr)
     else ());
    TmDecl {x with decl = decl, inexpr = inexpr, ty = tyTm inexpr}
```
</ToggleWrapper>
</DocBlock>

