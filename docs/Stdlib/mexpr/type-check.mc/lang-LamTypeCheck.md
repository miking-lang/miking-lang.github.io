import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmLam t ->
    let tyAnnot = resolveType t.info env false t.tyAnnot in
    let tyAnnot = substituteNewReprs env tyAnnot in
    let tyParam = substituteUnknown t.info env (Mono ()) tyAnnot in
    let body = typeCheckExpr (_insertVar t.ident tyParam env) t.body in
    let tyLam = ityarrow_ t.info tyParam (tyTm body) in
    TmLam {t with body = body, tyAnnot = tyAnnot, tyParam = tyParam, ty = tyLam}
```
</ToggleWrapper>
</DocBlock>

