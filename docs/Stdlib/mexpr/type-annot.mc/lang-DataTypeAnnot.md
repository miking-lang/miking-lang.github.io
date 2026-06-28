import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmDecl (x & {decl = DeclConDef t}) ->
    match env with {conEnv = conEnv} then
      let env = {env with conEnv = mapInsert t.ident t.tyIdent conEnv} in
      let inexpr = typeAnnotExpr env x.inexpr in
      TmDecl {x with inexpr = inexpr, ty = tyTm inexpr}
    else never
  | TmConApp t ->
    let body = typeAnnotExpr env t.body in
    match env with {conEnv = conEnv, tyEnv = tyEnv} then
      let ty =
        match mapLookup t.ident conEnv with Some lty then
          match inspectType lty with TyArrow {from = from, to = to} then
            recursive let tyvar = lam ty.
              match ty with TyCon _ then ty
              else match ty with TyApp t then tyvar t.lhs
              else (ityunknown_ t.info)
            in
            match compatibleType tyEnv (tyTm body) from with Some _ then
              tyvar to
            else
              let msg = join [
                "Inconsistent types of constructor application. ",
                "Constructor expected argument of type ", _pprintType from,
                ", but the actual type was ", _pprintType (tyTm body)
              ] in
              errorSingle [t.info] msg
          else (ityunknown_ t.info)
        else
          let msg = join ["Application of untyped constructor: ",
                          nameGetStr t.ident] in
          errorSingle [t.info] msg
      in
      TmConApp {{t with body = body}
                   with ty = ty}
    else never
```
</ToggleWrapper>
</DocBlock>

