import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaInlineHigherOrder  
  

  
  
  
## Semantics  
  

          <DocBlock title="inlinePartialFunctions" kind="sem">

```mc
sem inlinePartialFunctions : Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlinePartialFunctions =
  | expr -> inlinePartialFunctionsH (mapEmpty nameCmp) expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="inlinePartialFunctionsH" kind="sem">

```mc
sem inlinePartialFunctionsH : Map Name Ast_Expr -> Ast_Expr -> Ast_Expr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem inlinePartialFunctionsH inlineBodies =
  | TmVar t ->
    match mapLookup t.ident inlineBodies with Some body then body else TmVar t
  | TmDecl (x & {decl = DeclLet (t & {body = !TmLam _})}) ->
    match t.tyBody with TyArrow _ then
      let inlineBodies = mapInsert t.ident t.body inlineBodies in
      inlinePartialFunctionsH inlineBodies x.inexpr
    else TmDecl {x with decl = DeclLet {t with body = inlinePartialFunctionsH inlineBodies t.body},
                       inexpr = inlinePartialFunctionsH inlineBodies x.inexpr}
  | t -> smap_Expr_Expr (inlinePartialFunctionsH inlineBodies) t
```
</ToggleWrapper>
</DocBlock>

