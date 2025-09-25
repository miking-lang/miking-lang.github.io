import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DesugarLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | DesugarHook ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="desugarDecl" kind="sem">

```mc
sem desugarDecl : MCoreLoader_Loader -> Ast_Decl -> (MCoreLoader_Loader, Ast_Decl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem desugarDecl loader = | decl ->
    smapAccumL_Decl_Expr desugarExpr loader decl
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="desugarExpr" kind="sem">

```mc
sem desugarExpr : MCoreLoader_Loader -> Ast_Expr -> (MCoreLoader_Loader, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem desugarExpr loader = | expr ->
    smapAccumL_Expr_Expr desugarExpr loader expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="enableDesugar" kind="sem">

```mc
sem enableDesugar : MCoreLoader_Loader -> MCoreLoader_Loader
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem enableDesugar = | loader ->
    if hasHook (lam x. match x with DesugarHook _ then true else false) loader then loader else

    addHook loader (DesugarHook ())
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_postTypecheck" kind="sem">

```mc
sem _postTypecheck : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Hook -> (MCoreLoader_Loader, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem _postTypecheck loader decl = | DesugarHook _ ->
    desugarDecl loader decl
```
</ToggleWrapper>
</DocBlock>

