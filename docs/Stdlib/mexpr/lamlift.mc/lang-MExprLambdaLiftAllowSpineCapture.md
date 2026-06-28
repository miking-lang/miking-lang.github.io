import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MExprLambdaLiftAllowSpineCapture  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="AllowCapture" kind="syn">

```mc
syn AllowCapture
```



<ToggleWrapper text="Code..">
```mc
syn AllowCapture =
  | AllowCapture
  | DisallowCapture
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="findFreeVariablesSpine" kind="sem">

```mc
sem findFreeVariablesSpine : ({ty: Ast_Type, body: Ast_Expr} -> MExprLambdaLiftAllowSpineCapture_AllowCapture) -> LambdaLiftState -> Ast_Expr -> LambdaLiftState
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findFreeVariablesSpine shouldAllowCapture state =
  | TmDecl (x & {decl = DeclLet t}) ->
    let state =
      match t.body with TmLam _ then
        -- NOTE(vipa, 2023-10-09): A let-bound lambda, find a solution
        -- for it
        let sol = findFreeVariablesInBody state _solEmpty t.body in
        {state with sols = mapInsert t.ident sol state.sols}
      else switch shouldAllowCapture {ty = t.tyBody, body = t.body}
        case AllowCapture _ then
          -- NOTE(vipa, 2025-01-14): Not adding a variable to the
          -- state means we don't add it as a parameter to functions
          -- that close over it, i.e., we allow their capture.
          state
        case DisallowCapture _ then
          -- NOTE(vipa, 2025-05-16): A normal variable that should not
          -- be implicitly captured, but rather passed as an explicit
          -- argument.
          {state with vars = mapInsert t.ident t.tyBody state.vars}
        end
    in
    let state =
      let tyvars = concat (stripTyAll t.tyAnnot).0 (stripTyAll t.tyBody).0 in
      foldl (lam acc. lam pair. {acc with tyVars = mapInsert pair.0 pair.1 acc.tyVars}) state tyvars in
    let state = findFreeVariables state t.body in
    findFreeVariablesSpine shouldAllowCapture state x.inexpr
  | tm & TmDecl (x & {decl = DeclRecLets t}) -> recursive
    let insertInitialSolution = lam state. lam binding.
      let sol = findFreeVariablesInBody state _solEmpty binding.body in
      {state with sols = mapInsert binding.ident sol state.sols} in
    recursive let propagateFunNames
      : LambdaLiftState -> [[Name]] -> LambdaLiftState
      = lam state. lam s.
        match s with [h] ++ t then
          let sol =
            foldl
              (lam acc. lam id.
                match mapLookup id state.sols with Some sol then
                  _solUnion acc sol
                else acc)
              _solEmpty h in
          let state =
            foldl
              (lam state : LambdaLiftState. lam id.
                {state with sols = mapInsert id sol state.sols})
              state h in
          propagateFunNames state t
        else state
    in
    let findFreeVariablesBinding
      : LambdaLiftState -> DeclLetRecord -> LambdaLiftState
      = lam state. lam bind.
        let tyvars = concat (stripTyAll bind.tyAnnot).0 (stripTyAll bind.tyBody).0 in
        let state = foldl (lam acc. lam pair. {acc with tyVars = mapInsert pair.0 pair.1 acc.tyVars}) state tyvars in
        findFreeVariables state bind.body
    in
    let state = foldl insertInitialSolution state t.bindings in
    let g : Digraph Name Int = constructCallGraph tm in
    let sccs = digraphTarjan g in
    let state = propagateFunNames state (reverse sccs) in
    let state = foldl findFreeVariablesBinding state t.bindings in
    findFreeVariablesSpine shouldAllowCapture state x.inexpr
  | TmDecl (x & {decl = DeclExt t}) ->
    let state = {state with sols = mapInsert t.ident _solEmpty state.sols} in
    findFreeVariablesSpine shouldAllowCapture state x.inexpr
  | TmDecl x ->
    let state = sfold_Decl_Expr findFreeVariables state x.decl in
    findFreeVariablesSpine shouldAllowCapture state x.inexpr
  | tm -> findFreeVariables state tm
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftLambdasWithSolutionsMaybeAllowSpineCapture" kind="sem">

```mc
sem liftLambdasWithSolutionsMaybeAllowSpineCapture : ({ty: Ast_Type, body: Ast_Expr} -> MExprLambdaLiftAllowSpineCapture_AllowCapture) -> Ast_Expr -> (Map Name FinalOrderedLamLiftSolution, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftLambdasWithSolutionsMaybeAllowSpineCapture shouldAllowCapture = | t ->
    let t = nameAnonymousLambdas t in
    let state = findFreeVariablesSpine shouldAllowCapture emptyLambdaLiftState t in
    let t = insertFreeVariables state.sols t in
    let t = liftGlobal t in
    replaceCapturedParameters state.sols t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="liftLambdasWithSolutionsAllowSpineCapture" kind="sem">

```mc
sem liftLambdasWithSolutionsAllowSpineCapture : Ast_Expr -> (Map Name FinalOrderedLamLiftSolution, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem liftLambdasWithSolutionsAllowSpineCapture = | t ->
    liftLambdasWithSolutionsMaybeAllowSpineCapture (lam. AllowCapture ()) t
```
</ToggleWrapper>
</DocBlock>

