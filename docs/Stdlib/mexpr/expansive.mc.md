import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# expansive.mc  
  

Miking is licensed under the MIT license.  
Copyright \(C\) David Broman. See file LICENSE.txt  
  
Functions for determining whether a term is non\-expansive.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>ast-builder.mc</a>  
  
## Languages  
  

          <DocBlock title="NonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-NonExpansive">

```mc
lang NonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang NonExpansive = Ast
  -- We define non-expansive and "guarded" non-expansive terms,
  -- following the FreezeML paper (see type-check.mc).  Non-expansive
  -- terms are syntactic values and terms where no subterm contains a
  -- function application.  "Guarded" non-expansive terms additionally
  -- have no frozen variable in tail position, i.e., the type is
  -- guaranteed to have no leading quantifiers.
  type Guarded = Bool

  sem nonExpansive : Guarded -> Expr -> Bool
  sem nonExpansive (guarded : Guarded) =
  | t ->
    sfold_Expr_Expr (lam v. lam tm.
      if v then nonExpansive false tm else false) true t

  sem nonExpansiveDecl : Decl -> Bool
  sem nonExpansiveDecl =
  | d ->
    sfold_Decl_Expr (lam v. lam tm. if v then nonExpansive false tm else false) true d
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-VarNonExpansive">

```mc
lang VarNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang VarNonExpansive = NonExpansive + VarAst
  sem nonExpansive (guarded : Guarded) =
  | TmVar t -> not (and guarded t.frozen)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AppNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-AppNonExpansive">

```mc
lang AppNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang AppNonExpansive = NonExpansive + AppAst
  sem nonExpansive (guarded : Guarded) =
  | TmApp t -> false
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LamNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-LamNonExpansive">

```mc
lang LamNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang LamNonExpansive = NonExpansive + LamAst
  sem nonExpansive (guarded : Guarded) =
  | TmLam t -> true
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DeclNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-DeclNonExpansive">

```mc
lang DeclNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang DeclNonExpansive = NonExpansive + DeclAst
  sem nonExpansive guarded =
  | TmDecl x ->
    if nonExpansiveDecl x.decl
    then nonExpansive guarded x.inexpr
    else false
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="UtestNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-UtestNonExpansive">

```mc
lang UtestNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang UtestNonExpansive = NonExpansive + UtestDeclAst
  sem nonExpansiveDecl =
  | DeclUtest _ -> true
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-MatchNonExpansive">

```mc
lang MatchNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang MatchNonExpansive = NonExpansive + MatchAst
  sem nonExpansive (guarded : Guarded) =
  | TmMatch t ->
    if nonExpansive false t.target then
      if nonExpansive guarded t.thn then
        nonExpansive guarded t.els
      else false
    else false
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprNonExpansive" kind="lang" link="/docs/Stdlib/mexpr/expansive.mc/lang-MExprNonExpansive">

```mc
lang MExprNonExpansive
```



<ToggleWrapper text="Code..">
```mc
lang MExprNonExpansive =
  MExprAst + NonExpansive + DeclNonExpansive + VarNonExpansive +
  AppNonExpansive + LamNonExpansive + MatchNonExpansive + UtestNonExpansive
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

use MExprNonExpansive in

-- Variables
utest nonExpansive false (var_ "a") with true in
utest nonExpansive true (var_ "a") with true in

utest nonExpansive false (freeze_ (var_ "a")) with true in
utest nonExpansive true (freeze_ (var_ "a")) with false in

-- Constants
utest nonExpansive true (int_ 0) with true in

-- Application
utest nonExpansive false (app_ (var_ "a") (var_ "b")) with false in

-- Lambda
utest nonExpansive true (ulam_ "x" (app_ (var_ "x") (var_ "b"))) with true in

-- Let
utest nonExpansive false (bind_ (ulet_ "f" (ulam_ "x" (var_ "x")))
                            (freeze_ (var_ "f"))) with true in
utest nonExpansive true (bind_ (ulet_ "f" (ulam_ "x" (var_ "x")))
                           (freeze_ (var_ "f"))) with false in
utest nonExpansive false (bind_ (ulet_ "f" (app_ (var_ "y") (var_ "x")))
                            (var_ "f")) with false in

-- Record
utest nonExpansive true (utuple_ [freeze_ (var_ "x"), int_ 0]) with true in
utest nonExpansive false (utuple_ [app_ (var_ "y") (var_ "x"), int_ 0]) with false in

-- Utest
utest nonExpansive true (bind_ (utest_ (app_ (var_ "y") (var_ "x"))
                           (int_ 0)) unit_) with true in

()
```
</ToggleWrapper>
</DocBlock>

