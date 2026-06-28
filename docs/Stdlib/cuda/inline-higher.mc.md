import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# inline-higher.mc  
  

Performs inlining of applications that produce a function\-type value, to  
allow use of higher\-order functions in built\-in constants such as loop.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>  
  
## Languages  
  

          <DocBlock title="CudaInlineHigherOrder" kind="lang" link="/docs/Stdlib/cuda/inline-higher.mc/lang-CudaInlineHigherOrder">

```mc
lang CudaInlineHigherOrder
```



<ToggleWrapper text="Code..">
```mc
lang CudaInlineHigherOrder = MExprAst
  sem inlinePartialFunctions : Expr -> Expr
  sem inlinePartialFunctions =
  | expr -> inlinePartialFunctionsH (mapEmpty nameCmp) expr

  sem inlinePartialFunctionsH : Map Name Expr -> Expr -> Expr
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
end
```
</ToggleWrapper>
</DocBlock>

