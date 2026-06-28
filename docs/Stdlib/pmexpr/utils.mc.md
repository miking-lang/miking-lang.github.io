import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# utils.mc  
  

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/ast-builder.mc"} style={S.link}>mexpr/ast-builder.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>mexpr/eq.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/symbolize.mc"} style={S.link}>mexpr/symbolize.mc</a>, <a href={"/docs/Stdlib/mexpr/type-check.mc"} style={S.link}>mexpr/type-check.mc</a>, <a href={"/docs/Stdlib/pmexpr/ast.mc"} style={S.link}>pmexpr/ast.mc</a>  
  
## Languages  
  

          <DocBlock title="PMExprVariableSub" kind="lang" link="/docs/Stdlib/pmexpr/utils.mc/lang-PMExprVariableSub">

```mc
lang PMExprVariableSub
```

<Description>{`Substitutes all variables of the given expression with the expressions their  
names have been mapped to.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang PMExprVariableSub = PMExprAst
  sem substituteVariables : Map Name (Info -> Expr) -> Expr -> Expr
  sem substituteVariables subMap =
  | TmVar t ->
    match mapLookup t.ident subMap with Some exprFn then
      exprFn t.info
    else TmVar t
  | t -> smap_Expr_Expr (substituteVariables subMap) t
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/pmexpr/utils.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = MExprEq + MExprSym + MExprTypeCheck + PMExprVariableSub
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="functionBodyReturnType" kind="let">

```mc
let functionBodyReturnType expr : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
let functionBodyReturnType : use Ast in Expr -> Type =
  use PMExprAst in
  lam expr.
  match expr with TmLam {body = body} then
    functionBodyReturnType body
  else tyTm expr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="functionParametersAndBody" kind="let">

```mc
let functionParametersAndBody functionExpr : Ast_Expr -> ([(Name, Ast_Type, Info)], Ast_Expr)
```

<Description>{`Takes a function expression and produces a tuple containing a list of the  
arguments and the function body without the lambdas.`}</Description>


<ToggleWrapper text="Code..">
```mc
let functionParametersAndBody : use Ast in Expr -> ([(Name, Type, Info)], Expr) =
  use MExprAst in
  lam functionExpr.
  recursive let work = lam acc. lam e.
    match e with TmLam t then
      work (snoc acc (t.ident, t.tyParam, t.info)) t.body
    else (acc, e)
  in work [] functionExpr
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="collectAppArguments" kind="let">

```mc
let collectAppArguments e : Ast_Expr -> (Ast_Expr, [Ast_Expr])
```

<Description>{`Collects the parameters of an application and returns them in a tuple  
together with the target expression \(the function being called\).`}</Description>


<ToggleWrapper text="Code..">
```mc
let collectAppArguments : use Ast in Expr -> (Expr, [Expr]) =
  use MExprAst in
  lam e.
  recursive let work = lam acc. lam e.
    match e with TmApp {lhs = !(TmApp _) & lhs, rhs = rhs} then
      (lhs, cons rhs acc)
    else match e with TmApp t then
      work (cons t.rhs acc) t.lhs
    else (e, acc)
  in
  work [] e
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

let typeCheckEnv = lam env : [(Name, Type)]. lam expr.
  let tcEnv =
    foldl
      (lam env. lam x : (Name, Type).
        match x with (id, ty) in
        _insertVar id ty env)
      typcheckEnvDefault env in
  removeMetaVarExpr (typeCheckExpr tcEnv expr)
in

let t = typeCheck (symbolize (lam_ "x" tyint_ (char_ 'c'))) in
utest functionBodyReturnType t with tychar_ using eqType in
let t = typeCheck (symbolize (lam_ "x" tyint_ (uconst_ (CAddi ())))) in
utest functionBodyReturnType t with tyarrows_ [tyint_, tyint_, tyint_] using eqType in

let x = nameSym "x" in
let y = nameSym "y" in
let t = typeCheck (nlam_ x tyint_ (char_ 'c')) in
let newBody = typeCheckEnv [(x, tyint_)] (nlam_ y tyint_ (addi_ (nvar_ x) (nvar_ y))) in
let b = replaceFunctionBody t newBody in
utest b with nulam_ x newBody using eqExpr in
utest tyTm b with tyarrows_ [tyint_, tyint_, tyint_] using eqType in

let names = mapFromSeq nameCmp [
  (x, lam info. TmConst {val = CInt {val = 2}, ty = TyInt {info = info},
                         info = info}),
  (y, lam. subi_ (int_ 0) (int_ 1))
] in
let t = addi_ (nvar_ x) (nvar_ y) in
utest substituteVariables names t with addi_ (int_ 2) (subi_ (int_ 0) (int_ 1)) using eqExpr in

let eqVariable = lam a : (Name, Type, Info). lam b : (Name, Type, Info).
  if nameEq a.0 b.0 then
    eqType a.1 b.1
  else false
in

let t = nlam_ x tyint_ (nlam_ y tychar_ (int_ 2)) in
let res : ([(Name, Type, Info)], Expr) = functionParametersAndBody t in
let arg1 = get res.0 0 in
let arg2 = get res.0 1 in
utest arg1 with (x, tyint_, NoInfo ()) using eqVariable in
utest arg2 with (y, tychar_, NoInfo ()) using eqVariable in
utest res.1 with int_ 2 using eqExpr in
let res : ([(Name, Type, Info)], Expr) = functionParametersAndBody (int_ 2) in
utest res.0 with [] using eqSeq eqVariable in
utest res.1 with int_ 2 using eqExpr in

let eqVar = lam var1. lam var2.
  match (var1, var2) with (TmVar {ident = id1}, TmVar {ident = id2}) then
    nameEq id1 id2
  else false
in

let x = nameSym "x" in
let y = nameSym "y" in
let z = nameSym "z" in
let t = collectAppArguments (appf2_ (nvar_ x) (nvar_ y) (nvar_ z)) in
let target = t.0 in
let args = t.1 in
utest t.0 with nvar_ x using eqVar in
utest t.1 with [nvar_ y, nvar_ z] using eqSeq eqVar in

()
```
</ToggleWrapper>
</DocBlock>

