import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# remove-ascription.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>eq.mc</a>  
  
## Languages  
  

          <DocBlock title="MExprRemoveTypeAscription" kind="lang" link="/docs/Stdlib/mexpr/remove-ascription.mc/lang-MExprRemoveTypeAscription">

```mc
lang MExprRemoveTypeAscription
```



<ToggleWrapper text="Code..">
```mc
lang MExprRemoveTypeAscription = MExprAst
  sem removeTypeAscription : Expr -> Expr
  sem removeTypeAscription =
  | (TmDecl {decl = DeclLet {ident = idLet, body = body}, inexpr = TmVar {ident = idExpr}}) & letexpr ->
    if nameEq idLet idExpr then
      removeTypeAscription body
    else smap_Expr_Expr removeTypeAscription letexpr
  | expr -> smap_Expr_Expr removeTypeAscription expr
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/remove-ascription.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = MExprAst + MExprRemoveTypeAscription + MExprEq
end
```
</ToggleWrapper>
</DocBlock>

## Mexpr  
  

          <DocBlock title="mexpr" kind="mexpr">

```mc
mexpr
```



<ToggleWrapper text="Code..">
```mc
mexpr
use TestLang in

let t1 = bind_ (ulet_ "x" (int_ 1)) (var_ "x") in
utest removeTypeAscription t1
with int_ 1 using eqExpr in

let t2 = bind_ (ulet_ "x" t1) (var_ "x") in
utest removeTypeAscription t2
with int_ 1 using eqExpr in

()
```
</ToggleWrapper>
</DocBlock>

