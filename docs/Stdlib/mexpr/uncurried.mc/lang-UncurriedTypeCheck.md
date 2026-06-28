import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UncurriedTypeCheck  
  

  
  
  
## Semantics  
  

          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmUncurriedLam x ->
    let f = lam env. lam param.
      let tyAnnot = resolveType param.info env false param.tyAnnot in
      let tyAnnot = substituteNewReprs env tyAnnot in
      let tyParam = substituteUnknown param.info env (Mono ()) tyAnnot in
      (_insertVar param.ident tyParam env, {param with tyAnnot = tyAnnot, tyParam = tyParam}) in
    match mapAccumL f env x.positional with (env, positional) in
    let body = typeCheckExpr env x.body in
    let ty = TyUncurriedArrow
      { positional = map (lam param. param.tyParam) positional
      , ret = tyTm body
      , info = x.info
      } in
    TmUncurriedLam {x with positional = positional, body = body, ty = ty}
  | TmUncurriedApp x ->
    let f = typeCheckExpr env x.f in
    let positional = map (typeCheckExpr env) x.positional in
    let retTy = newpolyvar env.currentLvl x.info in
    let positionalTys = map (lam arg. newpolyvar env.currentLvl (infoTm arg)) positional in
    let expected = TyUncurriedArrow
      { positional = positionalTys
      , ret = retTy
      , info = x.info
      } in
    unify env [infoTm f] expected (tyTm f);
    iter2 (lam pos. lam ty. unify env [infoTm pos] ty (tyTm pos)) positional positionalTys;
    TmUncurriedApp {x with f = f, positional = positional, ty = retTy}
```
</ToggleWrapper>
</DocBlock>

