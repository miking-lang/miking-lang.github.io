import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppConstantFold  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  -- Partial constant application where all arguments are constant
  | PartialConstAppConsts { expr : Expr,  arity : Int }
  -- Partial constant application where some argument is NOT constant
  | PartialConstApp { expr : Expr,  arity : Int }
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="constantFoldConstAppConsts" kind="sem">

```mc
sem constantFoldConstAppConsts : Ast_Expr -> Ast_Expr
```

<Description>{`This semantic function is only be called with an expression representing a  
constant function without side\-effects applied on constant arguments.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constantFoldConstAppConsts =
  | t -> constantFoldConstApp t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantFoldConstApp" kind="sem">

```mc
sem constantFoldConstApp : Ast_Expr -> Ast_Expr
```

<Description>{`This semantic function is only called with an expression representing a  
constant function without side\-effects applied to arguments that may not be  
constants.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem constantFoldConstApp =
  | t -> t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantFoldExpr" kind="sem">

```mc
sem constantFoldExpr : Eval_EvalCtx -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldExpr ctx =
  | TmApp appr ->
    let lhs = constantFoldExpr ctx appr.lhs in
    let rhs = constantFoldExpr ctx appr.rhs in
    let t = TmApp { appr with lhs = lhs, rhs = rhs } in
    switch (lhs, isConstant rhs)
      -- Constant application on constant arguments
    case (TmConst constr, true) then
      if eqi (constArity constr.val) 1 then
        constantFoldConstAppConsts t
      else
        PartialConstAppConsts { expr = t, arity = pred (constArity constr.val) }
    case (PartialConstAppConsts pappr, true) then
      let expr = TmApp { appr with lhs = pappr.expr, rhs = rhs } in
      if neqi pappr.arity 1 then
        PartialConstAppConsts { expr = expr, arity = pred pappr.arity }
      else constantFoldConstAppConsts expr
      -- Constant application with some non-constant arguments
    case (TmConst constr, false) then
      if eqi (constArity constr.val) 1 then
        constantFoldConstApp t
      else
        PartialConstApp { expr = t, arity = pred (constArity constr.val) }
    case
      (PartialConstAppConsts pappr | PartialConstApp pappr, false)
    | (PartialConstAppConsts pappr, true)
    | (PartialConstApp pappr, true)
    then
      let expr = TmApp { appr with lhs = pappr.expr, rhs = rhs } in
      if neqi pappr.arity 1 then
        PartialConstApp { expr = expr, arity = pred pappr.arity }
      else constantFoldConstApp expr
    case _ then t
    end
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="isConstant" kind="sem">

```mc
sem isConstant : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isConstant =
  | PartialConstAppConsts _ -> true
  | PartialConstApp _ -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="readback" kind="sem">

```mc
sem readback : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem readback =
  | PartialConstAppConsts r | PartialConstApp r -> readback r.expr
```
</ToggleWrapper>
</DocBlock>

