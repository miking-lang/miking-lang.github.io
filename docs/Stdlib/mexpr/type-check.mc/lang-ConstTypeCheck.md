import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConstTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmConst t ->
    let constTy = tyConstBase env.disableConstructorTypes t.val in
    recursive let f = lam ty. smap_Type_Type f (tyWithInfo t.info ty) in
    TmConst {t with ty = inst t.info env.currentLvl (f constTy)}
```
</ToggleWrapper>
</DocBlock>

