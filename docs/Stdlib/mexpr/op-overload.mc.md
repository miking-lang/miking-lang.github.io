import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# op-overload.mc  
  

A library for creating overloaded operators whose types are resolved at  
compile\-time.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/mexpr/const-types.mc"} style={S.link}>mexpr/const-types.mc</a>, <a href={"/docs/Stdlib/mexpr/desugar.mc"} style={S.link}>mexpr/desugar.mc</a>, <a href={"/docs/Stdlib/mexpr/eq.mc"} style={S.link}>mexpr/eq.mc</a>, <a href={"/docs/Stdlib/mexpr/pprint.mc"} style={S.link}>mexpr/pprint.mc</a>, <a href={"/docs/Stdlib/mexpr/type-check.mc"} style={S.link}>mexpr/type-check.mc</a>  
  
## Languages  
  

          <DocBlock title="OverloadedOpAst" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-OverloadedOpAst">

```mc
lang OverloadedOpAst
```



<ToggleWrapper text="Code..">
```mc
lang OverloadedOpAst = Ast
  syn Op =
  syn Expr =
  | TmOverloadedOp {info: Info, op: Op, ty: Type}

  sem infoTm =
  | TmOverloadedOp x -> x.info
  sem withInfo info =
  | TmOverloadedOp x -> TmOverloadedOp {x with info = info}

  sem tyTm =
  | TmOverloadedOp x -> x.ty
  sem withType ty =
  | TmOverloadedOp x -> TmOverloadedOp {x with ty = ty}

  sem mkOp : Info -> Op -> Expr
  sem mkOp info = | op -> TmOverloadedOp
  { info = info
  , op = op
  , ty = tyunknown_
  }

  sem opMkTypes : Info -> TCEnv -> Op -> {params: [Type], return: Type}

  sem resolveOp : Info -> {params: [Type], return: Type, op: Op} -> Expr
  sem resolveOp info =
  | _ -> errorSingle [info] "Unable to resolve the type of the operator"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OverloadedOpTypeCheck" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-OverloadedOpTypeCheck">

```mc
lang OverloadedOpTypeCheck
```



<ToggleWrapper text="Code..">
```mc
lang OverloadedOpTypeCheck = TypeCheck + OverloadedOpAst
  sem typeCheckExpr env =
  | TmOverloadedOp x ->
    let types = opMkTypes x.info env x.op in
    let ty = tyarrows_ (snoc types.params types.return) in
    TmOverloadedOp {x with ty = ty}
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OverloadedOpDesugar" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-OverloadedOpDesugar">

```mc
lang OverloadedOpDesugar
```



<ToggleWrapper text="Code..">
```mc
lang OverloadedOpDesugar = Desugar + OverloadedOpAst + FunTypeAst
  sem desugarExpr =
  | TmOverloadedOp x ->
    match unwrapType x.ty with TyArrow t then
      recursive let flattenArrow = lam acc. lam t.
        match unwrapType t with TyArrow t then flattenArrow (snoc acc t.from) t.to
        else snoc acc t
      in
      let types = map unwrapType (flattenArrow [t.from] t.to) in
      resolveOp x.info {params = init types, return = last types, op = x.op}
    else errorSingle [x.info] "Wrong type shape in desugarExpr"
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OverloadedOpDesugarLoader" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-OverloadedOpDesugarLoader">

```mc
lang OverloadedOpDesugarLoader
```



<ToggleWrapper text="Code..">
```mc
lang OverloadedOpDesugarLoader = DesugarLoader + OverloadedOpAst + FunTypeAst
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

  sem resolveOpLoader : Loader -> Info -> {params: [Type], return: Type, op: Op} -> (Loader, Expr)
  sem resolveOpLoader loader info = | params ->
    (loader, resolveOp info params)
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OverloadedOpPrettyPrint" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-OverloadedOpPrettyPrint">

```mc
lang OverloadedOpPrettyPrint
```



<ToggleWrapper text="Code..">
```mc
lang OverloadedOpPrettyPrint = OverloadedOpAst + PrettyPrint
  sem getOpStringCode: Int -> PprintEnv -> Op -> (PprintEnv, String)
  sem opIsAtomic: Op -> Bool

  sem pprintCode indent env =
  | TmOverloadedOp x -> getOpStringCode indent env x.op

  sem isAtomic =
  | TmOverloadedOp x -> opIsAtomic x.op
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="OverloadedOp" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-OverloadedOp">

```mc
lang OverloadedOp
```



<ToggleWrapper text="Code..">
```mc
lang OverloadedOp = OverloadedOpAst + OverloadedOpTypeCheck + OverloadedOpDesugar
                  + OverloadedOpPrettyPrint
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="_testOverloadedOp" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-_testOverloadedOp">

```mc
lang _testOverloadedOp
```

<Description>{`A test language fragment. This fragment can be used as a template to create  
overloaded operators.`}</Description>


<ToggleWrapper text="Code..">
```mc
lang _testOverloadedOp = OverloadedOpAst + OverloadedOpPrettyPrint + ArithIntAst
                       + ArithFloatAst + IntTypeAst + FloatTypeAst
                       + CmpIntTypeAst + CmpFloatTypeAst
  syn Op =
  | OAdd
  | ONeg

  sem opMkTypes info env =
  | OAdd _ ->
    let ty = newmonovar env.currentLvl info in
    {params = [ty, ty], return = ty}
  | ONeg _ ->
    let ty = newmonovar env.currentLvl info in
    {params = [ty], return = ty}

  sem resolveOp info =
  | x & {op = OAdd _, params = [TyInt _] ++ _}   -> mkConst info (CAddi ())
  | x & {op = OAdd _, params = [TyFloat _] ++ _} -> mkConst info (CAddf ())

  | x & {op = ONeg _, params = [TyInt _] ++ _}   -> mkConst info (CNegi ())
  | x & {op = ONeg _, params = [TyFloat _] ++ _} -> mkConst info (CNegf ())

  sem getOpStringCode indent env =
  | OAdd _ -> (env, "+")
  | ONeg _ -> (env, "-")

  sem opIsAtomic =
  | (OAdd _) | (ONeg _) -> true
end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="TestLang" kind="lang" link="/docs/Stdlib/mexpr/op-overload.mc/lang-TestLang">

```mc
lang TestLang
```



<ToggleWrapper text="Code..">
```mc
lang TestLang = _testOverloadedOp + OverloadedOp + MExprTypeCheck + MExprEq
              + MExprPrettyPrint
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

-- add
utest
  let t = appf2_ (mkOp (NoInfo ()) (OAdd ())) (int_ 1) (int_ 2) in
  desugarExpr (typeCheck t)
with addi_ (int_ 1) (int_ 2)
using eqExpr
in

utest
  let t = appf2_ (mkOp (NoInfo ()) (OAdd ())) (float_ 1.) (float_ 2.) in
  desugarExpr (typeCheck t)
with addf_ (float_ 1.) (float_ 2.)
using eqExpr
in

utest expr2str (mkOp (NoInfo ()) (OAdd ())) with "+" in

-- negative test: type error from mixing types
-- utest
--   let t = appf2_ (mkOp (NoInfo ()) (OAdd ())) (float_ 1.) (int_ 2) in
--   desugarExpr (typeCheck t)
-- with unit_
-- using eqExpr
-- in

-- neg
utest
  let t = appf1_ (mkOp (NoInfo ()) (ONeg ())) (int_ 3) in
  desugarExpr (typeCheck t)
with negi_ (int_ 3)
using eqExpr
in

utest
  let t = appf1_ (mkOp (NoInfo ()) (ONeg ())) (float_ 3.) in
  desugarExpr (typeCheck t)
with negf_ (float_ 3.)
using eqExpr
in

utest expr2str (mkOp (NoInfo ()) (ONeg ())) with "-" in

-- negative test: type error from wrong number of arguments
-- utest
--   let t = appf2_ (mkOp (NoInfo ()) (ONeg ())) (float_ 1.) (int_ 2) in
--   desugarExpr (typeCheck t)
-- with unit_
-- using eqExpr
-- in

()
```
</ToggleWrapper>
</DocBlock>

