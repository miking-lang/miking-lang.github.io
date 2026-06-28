import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LambdaLiftFindFreeVariables  
  

Finds the map of free variables of all functions, mapped to their  
corresponding types. For recursive let\-expressions, this requires solving a  
system of set equations \(as the free variables within bindings may affect  
each other\).

  
  
  
## Semantics  
  

          <DocBlock title="findFreeVariablesInType" kind="sem">

```mc
sem findFreeVariablesInType : LambdaLiftState -> LambdaLiftSolution -> Ast_Type -> LambdaLiftSolution
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findFreeVariablesInType state sol =
  | TyVar x ->
    match mapLookup x.ident state.tyVars with Some kind
    then {sol with tyVars = mapInsert x.ident kind sol.tyVars}
    else sol
  | ty -> sfold_Type_Type (findFreeVariablesInType state) sol ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findFreeVariablesInBody" kind="sem">

```mc
sem findFreeVariablesInBody : LambdaLiftState -> LambdaLiftSolution -> Ast_Expr -> LambdaLiftSolution
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findFreeVariablesInBody state sol =
  | TmVar t ->
    let sol = findFreeVariablesInType state sol t.ty in
    match mapLookup t.ident state.vars with Some ty then
      { sol with vars = mapInsert t.ident ty sol.vars }
    else match mapLookup t.ident state.sols with Some sol2 then
      _solUnion sol sol2
    else sol
  | t ->
    let sol = sfold_Expr_TypeLabel (findFreeVariablesInType state) sol t in
    sfold_Expr_Expr (findFreeVariablesInBody state) sol t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="findFreeVariables" kind="sem">

```mc
sem findFreeVariables : LambdaLiftState -> Ast_Expr -> LambdaLiftState
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem findFreeVariables state =
  | TmLam t ->
    let state = {state with vars = mapInsert t.ident t.tyParam state.vars} in
    findFreeVariables state t.body
  | TmDecl (x & {decl = DeclLet t}) ->
    let state =
      match t.body with TmLam _ then
        -- NOTE(vipa, 2023-10-09): A let-bound lambda, find a solution
        -- for it
        let sol = findFreeVariablesInBody state _solEmpty t.body in
        {state with sols = mapInsert t.ident sol state.sols}
      else
        -- NOTE(vipa, 2023-10-09): Just another variable
        {state with vars = mapInsert t.ident t.tyBody state.vars}
    in
    let state =
      let tyvars = concat (stripTyAll t.tyAnnot).0 (stripTyAll t.tyBody).0 in
      foldl (lam acc. lam pair. {acc with tyVars = mapInsert pair.0 pair.1 acc.tyVars}) state tyvars in
    let state = findFreeVariables state t.body in
    findFreeVariables state x.inexpr
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
    findFreeVariables state x.inexpr
  | TmMatch t ->
    let state = findFreeVariables state t.target in
    let state = findFreeVariablesPat state t.pat in
    let state = findFreeVariables state t.thn in
    findFreeVariables state t.els
  | TmDecl (x & {decl = DeclExt t}) ->
    let state = {state with sols = mapInsert t.ident _solEmpty state.sols} in
    findFreeVariables state x.inexpr
  | t -> sfold_Expr_Expr findFreeVariables state t
```
</ToggleWrapper>
</DocBlock>

