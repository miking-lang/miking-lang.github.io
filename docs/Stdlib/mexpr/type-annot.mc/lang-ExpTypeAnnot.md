import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExpTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmDecl (x & {decl = DeclExt t}) ->
    match env with {varEnv = varEnv, tyEnv = tyEnv} then
      let env = {env with varEnv = mapInsert t.ident t.tyIdent varEnv} in
      let inexpr = typeAnnotExpr env x.inexpr in
      TmDecl {x with inexpr = inexpr, ty = tyTm inexpr}
    else never
```
</ToggleWrapper>
</DocBlock>

