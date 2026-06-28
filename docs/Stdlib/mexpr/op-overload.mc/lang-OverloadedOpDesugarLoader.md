import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OverloadedOpDesugarLoader  
  

  
  
  
## Semantics  
  

          <DocBlock title="desugarExpr" kind="sem">

```mc
sem desugarExpr : MCoreLoader_Loader -> Ast_Expr -> (MCoreLoader_Loader, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem desugarExpr loader =
  | TmOverloadedOp x ->
    match unwrapType x.ty with TyArrow t then
      recursive let flattenArrow = lam acc. lam t.
        match unwrapType t with TyArrow t then flattenArrow (snoc acc t.from) t.to
        else snoc acc t
      in
      let types = map unwrapType (flattenArrow [t.from] t.to) in
      resolveOpLoader loader x.info {params = init types, return = last types, op = x.op}
    else errorSingle [x.info] "Wrong type shape in desugarExpr"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="resolveOpLoader" kind="sem">

```mc
sem resolveOpLoader : MCoreLoader_Loader -> Info -> {op: OverloadedOpAst_Op, params: [Ast_Type], return: Ast_Type} -> (MCoreLoader_Loader, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem resolveOpLoader loader info = | params ->
    (loader, resolveOp info params)
```
</ToggleWrapper>
</DocBlock>

