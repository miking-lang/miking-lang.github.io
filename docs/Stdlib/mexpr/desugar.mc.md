import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# desugar.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mlang/loader.mc"} style={S.link}>mlang/loader.mc</a>  
  
## Languages  
  

          <DocBlock title="Desugar" kind="lang" link="/docs/Stdlib/mexpr/desugar.mc/lang-Desugar">

```mc
lang Desugar
```



<ToggleWrapper text="Code..">
```mc
lang Desugar = Ast
  sem desugarExpr: Expr -> Expr
  sem desugarExpr =
  | tm -> smap_Expr_Expr desugarExpr tm
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DesugarLoader" kind="lang" link="/docs/Stdlib/mexpr/desugar.mc/lang-DesugarLoader">

```mc
lang DesugarLoader
```



<ToggleWrapper text="Code..">
```mc
lang DesugarLoader = Ast + MCoreLoader
  syn Hook =
  | DesugarHook ()

  sem desugarDecl : Loader -> Decl -> (Loader, Decl)
  sem desugarDecl loader = | decl ->
    smapAccumL_Decl_Expr desugarExpr loader decl

  sem desugarExpr : Loader -> Expr -> (Loader, Expr)
  sem desugarExpr loader = | expr ->
    smapAccumL_Expr_Expr desugarExpr loader expr

  sem enableDesugar : Loader -> Loader
  sem enableDesugar = | loader ->
    if hasHook (lam x. match x with DesugarHook _ then true else false) loader then loader else

    addHook loader (DesugarHook ())

  sem _postTypecheck loader decl = | DesugarHook _ ->
    desugarDecl loader decl
end
```
</ToggleWrapper>
</DocBlock>

