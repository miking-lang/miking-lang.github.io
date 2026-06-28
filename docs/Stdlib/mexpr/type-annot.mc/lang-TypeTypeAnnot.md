import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmDecl (x & {decl = DeclType t}) ->
    let tyEnv = mapInsert t.ident t.tyIdent env.tyEnv in
    let inexpr = typeAnnotExpr {env with tyEnv = tyEnv} x.inexpr in
    TmDecl {x with inexpr = inexpr, ty = tyTm inexpr}
```
</ToggleWrapper>
</DocBlock>

