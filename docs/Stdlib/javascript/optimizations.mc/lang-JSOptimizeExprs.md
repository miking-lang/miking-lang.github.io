import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# JSOptimizeExprs  
  

  
  
  
## Semantics  
  

          <DocBlock title="cleanStatements" kind="sem">

```mc
sem cleanStatements : [JSExprAst_JSExpr] -> JSExprAst_JSExpr -> [JSExprAst_JSExpr]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem cleanStatements acc =
  | JSENop _ -> acc
  | JSEObject _ -> acc
  | e -> snoc acc e
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizeExpr3" kind="sem">

```mc
sem optimizeExpr3 : JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem optimizeExpr3 =
  | expr -> optimizeExpr (optimizeExpr (optimizeExpr expr))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="optimizeExpr" kind="sem">

```mc
sem optimizeExpr : JSExprAst_JSExpr -> JSExprAst_JSExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem optimizeExpr =
  | JSEBinOp { op = JSOEq  {}, lhs = lhs, rhs = rhs } & p ->
    match lhs with JSEBool { b = true } then optimizeExpr rhs else
    match rhs with JSEBool { b = true } then optimizeExpr lhs else
    match lhs with JSEBool { b = false } then JSEUnOp { op = JSONot {}, rhs = optimizeExpr rhs } else
    match rhs with JSEBool { b = false } then JSEUnOp { op = JSONot {}, rhs = optimizeExpr lhs } else p
  | JSEBinOp { op = JSOAnd {}, lhs = lhs, rhs = rhs } & p ->
    match lhs with JSEBool { b = true } then optimizeExpr rhs else
    match rhs with JSEBool { b = true } then optimizeExpr lhs else p

  | JSEBinOp { op = JSOOr {}, lhs = lhs, rhs = rhs } & p ->
    match lhs with JSEBool { b = false } then optimizeExpr rhs else
    match rhs with JSEBool { b = false } then optimizeExpr lhs else p

  | JSETernary { cond = cond, thn = thn, els = els } ->
    let cond = optimizeExpr cond in
    let thn = optimizeExpr thn in
    let els = optimizeExpr els in
    match cond with JSEBool { b = true } then thn else
    match cond with JSEBool { b = false } then els else
    -- If the then branch is a boolean, optimize it
    match els with JSEBool { b = false } then
      JSEBinOp { op = JSOAnd {}, lhs = cond, rhs = thn }
    else match thn with JSEBool { b = true } then
      JSEBinOp { op = JSOOr {}, lhs = cond, rhs = els }
    else match (thn, els) with (JSEBool { b = true }, JSEBool { b = false }) then
      cond
    else match (thn, els) with (JSEBool { b = false }, JSEBool { b = true }) then
      JSEUnOp { op = JSONot {}, rhs = cond }
    else JSETernary { cond = cond, thn = thn, els = els }

  | JSEBlock { exprs = exprs, ret = ret } ->
    let exprs = foldl cleanStatements [] exprs in
    let ret = optimizeExpr ret in
    JSEBlock { exprs = exprs, ret = ret }
  | JSEIIFE { body = JSEBlock { exprs = [], ret = ret } } -> ret

  | e -> smapJSExprJSExpr optimizeExpr e
```
</ToggleWrapper>
</DocBlock>

