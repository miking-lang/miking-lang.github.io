import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmDecl (x & {decl = DeclLet t}) ->
    match env with {varEnv = varEnv, tyEnv = tyEnv} then
      let body = match t.tyBody with TyUnknown _ then t.body else
        match inspectType t.tyBody with tyBody in
        propagateExpectedType tyEnv (tyBody, t.body) in
      let body = typeAnnotExpr env body in
      match compatibleType tyEnv t.tyBody (tyTm body) with Some tyBody then
        let env = {env with varEnv = mapInsert t.ident tyBody varEnv} in
        let inexpr = typeAnnotExpr env x.inexpr in
        TmDecl
        {x with decl = DeclLet
          {t with tyBody = tyBody
          , body = withType tyBody body
          }
        , inexpr = inexpr
        , ty = tyTm inexpr
        }
      else
        let msg = join [
          "Inconsistent type annotation of let-expression\n",
          "Expected type: ", _pprintType (tyTm body), "\n",
          "Annotated type: ", _pprintType t.tyBody
        ] in
        errorSingle [t.info] msg
    else never
```
</ToggleWrapper>
</DocBlock>

