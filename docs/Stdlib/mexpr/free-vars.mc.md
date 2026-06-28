import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# free-vars.mc  
  

This file contains language fragments and functions related to free  
variables.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/set.mc"} style={S.link}>set.mc</a>, <a href={"/docs/Stdlib/name.mc"} style={S.link}>name.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/symbolize.mc"} style={S.link}>mexpr/symbolize.mc</a>, <a href={"/docs/Stdlib/mexpr/boot-parser.mc"} style={S.link}>mexpr/boot-parser.mc</a>  
  
## Languages  
  

          <DocBlock title="FreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-FreeVars">

```mc
lang FreeVars
```



<ToggleWrapper text="Code..">
```mc
lang FreeVars = Ast
  -- Returns the set of free variables for a given expression. Assumes
  -- that the expression is symbolized (and no Names are defined more
  -- than once).
  sem freeVars : Expr -> Set Name
  sem freeVars =| t -> freeVarsExpr (setEmpty nameCmp) t

  sem freeVarsExpr : Set Name -> Expr -> Set Name
  sem freeVarsExpr acc =
  | t -> sfold_Expr_Expr freeVarsExpr acc t
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="FreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-FreeNames">

```mc
lang FreeNames
```



<ToggleWrapper text="Code..">
```mc
lang FreeNames = Ast
  -- A broader form of freeVars that returns free occurrences of all
  -- Names, including variables, constructors, type constructors, and
  -- type variables. Same assumptions as for freeVars. Does not look
  -- at inferred types, only explicit annotations.
  sem freeNames : Expr -> Set Name
  sem freeNames = | tm ->
    freeNamesExpr (setEmpty nameCmp) tm
  sem freeNamesExpr : Set Name -> Expr -> Set Name
  sem freeNamesExpr free = | tm ->
    let free = sfold_Expr_Expr freeNamesExpr free tm in
    let free = sfold_Expr_Type freeNamesType free tm in
    free
  sem freeNamesType : Set Name -> Type -> Set Name
  sem freeNamesType free = | ty ->
    let free = sfold_Type_Type freeNamesType free ty in
    free
  sem freeNamesPat : Set Name -> Pat -> Set Name
  sem freeNamesPat free = | pat ->
    let free = sfold_Pat_Pat freeNamesPat free pat in
    let free = sfold_Pat_Type freeNamesType free pat in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarFreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-VarFreeVars">

```mc
lang VarFreeVars
```



<ToggleWrapper text="Code..">
```mc
lang VarFreeVars = FreeVars + VarAst
  sem freeVarsExpr acc =
  | TmVar r -> setInsert r.ident acc
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-VarFreeNames">

```mc
lang VarFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang VarFreeNames = FreeNames + VarAst
  sem freeNamesExpr free =
  | TmVar x -> setInsert x.ident free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LamFreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-LamFreeVars">

```mc
lang LamFreeVars
```



<ToggleWrapper text="Code..">
```mc
lang LamFreeVars = FreeVars + LamAst
  sem freeVarsExpr acc =
  | TmLam r ->
    setRemove r.ident (freeVarsExpr acc r.body)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LamFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-LamFreeNames">

```mc
lang LamFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang LamFreeNames = FreeNames + LamAst
  sem freeNamesExpr free =
  | TmLam x ->
    let free = freeNamesExpr free x.body in
    let free = setRemove x.ident free in
    let free = freeNamesType free x.tyAnnot in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LetFreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-LetFreeVars">

```mc
lang LetFreeVars
```



<ToggleWrapper text="Code..">
```mc
lang LetFreeVars = FreeVars + LetDeclAst
  sem freeVarsExpr acc =
  | TmDecl {decl = DeclLet r, inexpr = inexpr} ->
    setRemove r.ident (freeVarsExpr (freeVarsExpr acc r.body) inexpr)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="LetFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-LetFreeNames">

```mc
lang LetFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang LetFreeNames = FreeNames + LetDeclAst + AllTypeAst
  sem freeNamesExpr free =
  | TmDecl {decl = DeclLet x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = setRemove x.ident free in
    let free = freeNamesExpr free x.body in
    match stripTyAll x.tyAnnot with (tyalls, tyAnnot) in
    let free = freeNamesType free tyAnnot in
    -- NOTE(vipa, 2025-03-19): This also handles removing type
    -- variables from \\`.body\\`, not just \\`.tyAnnot\\`.
    let free = foldl (lam free. lam pair. setRemove pair.0 free) free tyalls in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecLetsFreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-RecLetsFreeVars">

```mc
lang RecLetsFreeVars
```



<ToggleWrapper text="Code..">
```mc
lang RecLetsFreeVars = FreeVars + RecLetsDeclAst
  sem freeVarsExpr acc =
  | TmDecl {decl = DeclRecLets r, inexpr = inexpr} ->
    let acc = foldl (lam acc. lam b.
      freeVarsExpr acc b.body) (freeVarsExpr acc inexpr) r.bindings in
    foldl (lam acc. lam b. setRemove b.ident acc) acc r.bindings
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="RecLetsFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-RecLetsFreeNames">

```mc
lang RecLetsFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang RecLetsFreeNames = FreeNames + RecLetsDeclAst + AllTypeAst
  sem freeNamesExpr free =
  | TmDecl {decl = DeclRecLets x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let f = lam free. lam binding.
      let free = freeNamesExpr free binding.body in
      match stripTyAll binding.tyAnnot with (tyalls, tyAnnot) in
      let free = freeNamesType free tyAnnot in
      let free = foldl (lam free. lam pair. setRemove pair.0 free) free tyalls in
      free in
    let free = foldl f free x.bindings in
    let free = foldl (lam free. lam b. setRemove b.ident free) free x.bindings in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TypeFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-TypeFreeNames">

```mc
lang TypeFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang TypeFreeNames = FreeNames + TypeDeclAst
  sem freeNamesExpr free =
  | TmDecl {decl = DeclType x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = freeNamesType free x.tyIdent in
    let free = foldr setRemove free x.params in
    let free = setRemove x.ident free in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-DataFreeNames">

```mc
lang DataFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang DataFreeNames = FreeNames + DataAst + DataDeclAst
  sem freeNamesExpr free =
  | TmDecl {decl = DeclConDef x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = setRemove x.ident free in
    let free = freeNamesType free x.tyIdent in
    free
  | TmConApp x ->
    let free = freeNamesExpr free x.body in
    let free = setInsert x.ident free in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ExtFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-ExtFreeNames">

```mc
lang ExtFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang ExtFreeNames = FreeNames + ExtDeclAst
  sem freeNamesExpr free =
  | TmDecl {decl = DeclExt x, inexpr = inexpr} ->
    let free = freeNamesExpr free inexpr in
    let free = setRemove x.ident free in
    let free = freeNamesType free x.tyIdent in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchFreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-MatchFreeVars">

```mc
lang MatchFreeVars
```



<ToggleWrapper text="Code..">
```mc
lang MatchFreeVars = FreeVars + MatchAst + NamedPat + SeqEdgePat
  sem freeVarsExpr acc =
  | TmMatch r ->
    freeVarsExpr
      (freeVarsExpr
         (bindVarsPat
            (freeVarsExpr acc r.thn)
            r.pat)
         r.els)
      r.target

  sem bindVarsPat : Set Name -> Pat -> Set Name
  sem bindVarsPat acc =
  | PatNamed {ident = PName ident} -> setRemove ident acc
  | pat & (PatSeqEdge {middle = PName ident}) ->
    let acc = setRemove ident acc in
    sfold_Pat_Pat bindVarsPat acc pat
  | pat -> sfold_Pat_Pat bindVarsPat acc pat
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MatchFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-MatchFreeNames">

```mc
lang MatchFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang MatchFreeNames = FreeNames + MatchAst
  sem freeNamesExpr free =
  | TmMatch x ->
    let free = freeNamesExpr free x.thn in
    -- NOTE(vipa, 2025-03-19): This will remove whatever the pattern
    -- itself binds from free, hence the weird order
    let free = freeNamesPat free x.pat in
    let free = freeNamesExpr free x.target in
    let free = freeNamesExpr free x.els in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="NamedPatFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-NamedPatFreeNames">

```mc
lang NamedPatFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang NamedPatFreeNames = FreeNames + NamedPat
  sem freeNamesPat free =
  | PatNamed {ident = PName ident} -> setRemove ident free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SeqEdgePatFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-SeqEdgePatFreeNames">

```mc
lang SeqEdgePatFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang SeqEdgePatFreeNames = FreeNames + SeqEdgePat
  sem freeNamesPat free =
  | PatSeqEdge (x & {middle = PName ident}) ->
    let free = setRemove ident free in
    let free = foldl freeNamesPat free x.prefix in
    let free = foldl freeNamesPat free x.postfix in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="DataPatFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-DataPatFreeNames">

```mc
lang DataPatFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang DataPatFreeNames = FreeNames + DataPat
  sem freeNamesPat free =
  | PatCon x ->
    let free = freeNamesPat free x.subpat in
    let free = setInsert x.ident free in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="ConTypeFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-ConTypeFreeNames">

```mc
lang ConTypeFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang ConTypeFreeNames = FreeNames + ConTypeAst
  sem freeNamesType free =
  | TyCon x -> setInsert x.ident free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="VarTypeFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-VarTypeFreeNames">

```mc
lang VarTypeFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang VarTypeFreeNames = FreeNames + VarTypeAst
  sem freeNamesType free =
  | TyVar x -> setInsert x.ident free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="AllTypeFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-AllTypeFreeNames">

```mc
lang AllTypeFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang AllTypeFreeNames = FreeNames + AllTypeAst
  sem freeNamesType free =
  | TyAll x ->
    let free = freeNamesType free x.ty in
    let free = setRemove x.ident free in
    free
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprFreeVars" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-MExprFreeVars">

```mc
lang MExprFreeVars
```



<ToggleWrapper text="Code..">
```mc
lang MExprFreeVars =
  VarFreeVars + LamFreeVars + LetFreeVars + RecLetsFreeVars + MatchFreeVars
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MExprFreeNames" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-MExprFreeNames">

```mc
lang MExprFreeNames
```



<ToggleWrapper text="Code..">
```mc
lang MExprFreeNames =
  LamFreeNames + LetFreeNames + RecLetsFreeNames + TypeFreeNames + DataFreeNames +
  ExtFreeNames + MatchFreeNames + NamedPatFreeNames + SeqEdgePatFreeNames +
  DataPatFreeNames + ConTypeFreeNames + VarTypeFreeNames + AllTypeFreeNames + VarFreeNames
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/free-vars.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = MExprFreeVars + MExprSym + BootParser end
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

let parseProgram : String -> Expr =
  lam str.
    let parseArgs =
      {defaultBootParserParseMExprStringArg with allowFree = true}
    in
    let ast = parseMExprStringExn parseArgs str in
    symbolizeExpr {symEnvEmpty with allowFree = true} ast
in

-------------------
-- Test freeVars --
-------------------

let testFreeVars = lam prog.
  let fv = freeVars prog in
  sort cmpString (map nameGetStr (setToSeq fv))
in

let prog = parseProgram "
  lam x. x x y y y
  "
in

utest testFreeVars prog with ["y"] in

let prog = parseProgram "
  let x = z in x x y y y
  "
in

utest testFreeVars prog with ["y", "z"] in

let prog = parseProgram "
  recursive let f = lam x. w f (f x) in
  recursive let g = lam y. z f (g y) in
  w z (f (g u))
  "
in

utest testFreeVars prog with ["u", "w", "z"] in

let prog = parseProgram "
  match u with (x, (y, z)) in
  x y y z z z u w w
  "
in

utest testFreeVars prog with ["u", "w"] in

let prog = parseProgram "
  match t with [x] ++ xs in
    x xs t r
  "
in

utest testFreeVars prog with ["r", "t"] in

let prog = parseProgram "
  match t with [first] ++ mid ++ [last] in
    first mid f r last t
  "
in

utest testFreeVars prog with ["f", "r", "t"] in

()
```
</ToggleWrapper>
</DocBlock>

