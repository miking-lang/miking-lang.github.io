import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmVar t ->
    match mapLookup t.ident env.varEnv with Some ty then
      let ty =
        if t.frozen then ty
        else inst t.info env.currentLvl ty
      in
      TmVar {t with ty = ty}
    else
      let msg = join [
        "* Encountered an unbound variable: ",
        nameGetStr t.ident, "\n",
        "* When type checking the expression\n"
      ] in
      errorSingle [t.info] msg
```
</ToggleWrapper>
</DocBlock>

