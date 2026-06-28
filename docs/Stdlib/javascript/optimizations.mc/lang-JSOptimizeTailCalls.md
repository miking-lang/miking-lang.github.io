import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JSOptimizeTailCalls  
  

Tail Call Optimizations

  
  
  
## Semantics  
  

          <DocBlock title="optimizeTailCallFunc" kind="sem">

```mc
sem optimizeTailCallFunc : CompileJSContext -> Name -> Info -> JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem optimizeTailCallFunc ctx name info =
  | JSEFun _ & fun ->
    let fun = foldFunc fun in
    let mod = lam fun.
      -- Check if the nested tail call is to a recursive function registered in the current context
      match fun with JSEVar { id = id } then
        match getRFR id ctx.recursiveFunctions with Some (recFunName) then
          -- Replace the function call with a trampoline capture call to
          -- the recursive function variant of the optimized function
          (true, JSEVar { id = recFunName })
        else (false, fun)
      else (false, fun)
    in
    match runOnTailPosition (trampolineCapture mod) fun with { expr = recFun } in
    -- Assume that the optimized function already is registered in the current context
    match getRFR name ctx.recursiveFunctions with Some (thisRecFunName) in
    match fun with JSEFun { params = params } in
    JSEBlock {
      exprs = [
        JSEDef { id = thisRecFunName, expr = recFun },
        JSEDef {
          id = name,
          expr = JSEFun {
            params = params,
            body = intrinsicFromString intrGenNS "trampolineValue" [
              JSEApp {
                fun = JSEVar { id = thisRecFunName },
                args = map (lam p. JSEVar { id = p }) params,
                curried = true
              }
            ]
          }
        }
      ],
      ret = JSENop { }
    }
  | _ -> errorSingle [info] "Non-lambda expressions cannot be optimized for tail calls when compiling to JavaScript"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="trampolineCapture" kind="sem">

```mc
sem trampolineCapture : (JSExprAst_JSExpr -> (Bool, JSExprAst_JSExpr)) -> JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`Wrap all calls in a trampoline capture that is immediately returnedNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem trampolineCapture modifier =
  | JSEApp { fun = fun, args = args } & app ->
    -- Transform function calls to a trampoline capture intrinsic
    match modifier fun with (shouldCapture, fun) in
    if shouldCapture then
      intrinsicFromString intrGenNS "trampolineCapture" [fun, JSEArray{ exprs = args }]
    else app
  | _ -> error "trampolineCapture called on non-function application expression"
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="foldFunc" kind="sem">

```mc
sem foldFunc : JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`Fold \(collect\) nested functions to the top level \(a single function instead of a nested functions\)No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem foldFunc =
  | JSEFun { params = params, body = body } ->
    let body = foldFunc body in
    match body with JSEFun { params = paramsNested, body = bodyNested } then
      JSEFun { params = concat params paramsNested, body = bodyNested }
    else JSEFun { params = params, body = body }
  | e -> e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="runOnTailPosition" kind="sem">

```mc
sem runOnTailPosition : (JSExprAst_JSExpr -> JSExprAst_JSExpr) -> JSExprAst_JSExpr -> JSTCOContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem runOnTailPosition action =
  | JSEApp { fun = fun } & t ->
    -- If the function is a tail call, run the action on the function
    -- and replace the function with the result
    match fun with JSEVar _ then {
      expr = action t,
      foundTailCall = true
    } else {
      expr = t,
      foundTailCall = false
    }
  | JSEFun      t -> runWithJSTCOCtx action t.body (lam e. JSEFun { t with body = e })
  | JSEIIFE     t -> runWithJSTCOCtx action t.body (lam e. JSEIIFE { t with body = e })
  | JSEBlock    t -> runWithJSTCOCtx action t.ret (lam e. JSEBlock { t with ret = e })
  | JSETernary  t -> runWithJSTCOCtx2 action t.thn t.els (lam e1. lam e2. JSETernary { t with thn = e1, els = e2 })
  | JSEBinOp { op = JSOAnd{}, lhs = lhs, rhs = rhs } ->
    runWithJSTCOCtx action rhs (lam e. JSEBinOp { op = JSOAnd { }, lhs = lhs, rhs = e })
  | JSEBinOp { op = JSOOr{}, lhs = lhs, rhs = rhs } ->
    runWithJSTCOCtx action rhs (lam e. JSEBinOp { op = JSOOr { }, lhs = lhs, rhs = e })
  | t -> { expr = t, foundTailCall = false } -- No terms where tail calls can be located
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="runWithJSTCOCtx" kind="sem">

```mc
sem runWithJSTCOCtx : (JSExprAst_JSExpr -> JSExprAst_JSExpr) -> JSExprAst_JSExpr -> (JSExprAst_JSExpr -> JSExprAst_JSExpr) -> JSTCOContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem runWithJSTCOCtx action expr =
  | constr ->
    let res = runOnTailPosition action expr in {
      expr = constr res.expr,
      foundTailCall = res.foundTailCall
    }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="runWithJSTCOCtx2" kind="sem">

```mc
sem runWithJSTCOCtx2 : (JSExprAst_JSExpr -> JSExprAst_JSExpr) -> JSExprAst_JSExpr -> JSExprAst_JSExpr -> (JSExprAst_JSExpr -> JSExprAst_JSExpr -> JSExprAst_JSExpr) -> JSTCOContext
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem runWithJSTCOCtx2 action expr1 expr2 =
  | constr ->
    let res1 = runOnTailPosition action expr1 in
    let res2 = runOnTailPosition action expr2 in {
      expr = constr res1.expr res2.expr,
      foundTailCall = or res1.foundTailCall res2.foundTailCall
    }
```
</ToggleWrapper>
</DocBlock>

