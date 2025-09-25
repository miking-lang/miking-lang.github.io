import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# StripUtestLoader  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Hook" kind="syn">

```mc
syn Hook
```



<ToggleWrapper text="Code..">
```mc
syn Hook =
  | StripUtestHook ()
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="stripUtests" kind="sem">

```mc
sem stripUtests : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem stripUtests =
  | TmDecl (t & {decl = DeclUtest _}) -> stripUtests t.inexpr
  | t -> smap_Expr_Expr stripUtests t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_postTypecheck" kind="sem">

```mc
sem _postTypecheck : MCoreLoader_Loader -> Ast_Decl -> MCoreLoader_Hook -> (MCoreLoader_Loader, Ast_Decl)
```



<ToggleWrapper text="Code..">
```mc
sem _postTypecheck loader decl = | StripUtestHook _ ->
    let decl = match decl with DeclUtest x
      then DeclLet
        { ident = nameNoSym ""
        , tyAnnot = tyunknown_
        , tyBody = tyunit_
        , body = unit_
        , info = x.info
        }
      else smap_Decl_Expr stripUtests decl
    in (loader, decl)
```
</ToggleWrapper>
</DocBlock>

