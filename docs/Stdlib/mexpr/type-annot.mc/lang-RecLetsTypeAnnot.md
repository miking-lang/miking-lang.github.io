import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetsTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmDecl (x & {decl = DeclRecLets t}) ->
    -- Add mapping from binding identifier to annotated type before doing type
    -- annotations of the bindings. This is to make annotations work for
    -- mutually recursive functions, given correct type annotations.
    let foldBindingInit = lam acc. lam binding : DeclLetRecord.
      mapInsert binding.ident binding.tyBody acc
    in
    -- Add mapping from binding identifier to the inferred type.
    let foldBindingAfter = lam acc. lam binding : DeclLetRecord.
      mapInsert binding.ident binding.tyBody acc
    in
    let annotBinding = lam env : TypeEnv. lam binding : DeclLetRecord.
      let body = match binding.tyBody with TyUnknown _ then binding.body else
        match inspectType binding.tyBody with tyBody in
        propagateExpectedType env.tyEnv (tyBody, binding.body) in
      let body = typeAnnotExpr env body in
      match env with {tyEnv = tyEnv} then
        let tyBody =
          match compatibleType tyEnv binding.tyBody (tyTm body) with Some tyBody then
            tyBody
          else
            let msg = join [
              "Inconsistent type annotation of recursive let-expression\n",
              "Expected type: ", _pprintType (tyTm body), "\n",
              "Annotated type: ", _pprintType binding.tyBody
            ] in
            errorSingle [t.info] msg
        in
        {binding with body = body,
                      tyBody = tyBody}
      else never
    in
    match env with {varEnv = varEnv} then
      let env = {env with varEnv = foldl foldBindingInit varEnv t.bindings} in
      let bindings = map (annotBinding env) t.bindings in
      let env = {env with varEnv = foldl foldBindingAfter varEnv bindings} in
      let inexpr = typeAnnotExpr env x.inexpr in
      TmDecl {x with decl = DeclRecLets {t with bindings = bindings}
                     , inexpr = inexpr
                     , ty = tyTm inexpr}
    else never
```
</ToggleWrapper>
</DocBlock>

