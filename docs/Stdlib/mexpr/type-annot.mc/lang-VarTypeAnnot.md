import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeAnnot  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeAnnotExpr" kind="sem">

```mc
sem typeAnnotExpr : {tyEnv: Map Name Ast_Type, conEnv: Map Name Ast_Type, varEnv: Map Name Ast_Type} -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeAnnotExpr (env : TypeEnv) =
  | TmVar t ->
    let ty =
      match env with {varEnv = varEnv, tyEnv = tyEnv} then
        match mapLookup t.ident varEnv with Some ty then
          match compatibleType tyEnv t.ty ty with Some ty then
            ty
          else
            let msg = join [
              "Type of variable is inconsistent with environment\n",
              "Variable annotated with type: ", _pprintType t.ty, "\n",
              "Type in variable environment: ", _pprintType ty
            ] in
            errorSingle [t.info] msg
        else t.ty
      else never
    in
    TmVar {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>

