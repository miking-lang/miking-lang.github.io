import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprTailRecursion  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTailRecursiveRewriteEnv" kind="sem">

```mc
sem getTailRecursiveRewriteEnv : LetDeclAst_DeclLetRecord -> Option TailRecursiveEnv
```

<Description>{`Attempts to construct a tail\-recursion rewrite environment from the given  
recursive binding. If this succeeds, this environment can be used to rewrite  
the given binding into a tail\-recursive form. Otherwise, None is returned.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTailRecursiveRewriteEnv =
  | t ->
    let binding : DeclLetRecord = t in
    recursive let findExpressionsAtTailPosition : Expr -> [Expr] = lam expr.
      match expr with TmLam t then findExpressionsAtTailPosition t.body
      else match expr with TmDecl x then findExpressionsAtTailPosition x.inexpr
      else match expr with TmMatch t then
        concat
          (findExpressionsAtTailPosition t.thn)
          (findExpressionsAtTailPosition t.els)
      else [expr]
    in
    let compatibleBinop : Option Expr -> Option TailPosInfo -> Option Expr =
      lam acc. lam info.
      let binop = optionMap (lam info : TailPosInfo. info.binop) info in
      optionCombine
        (lam l. lam r.
          if eqExpr l r then Some l else None ())
        acc binop in
    let compatibleArgumentSide : Option Side -> Option TailPosInfo -> Option Side =
      lam acc. lam info.
      let side = optionJoin (optionMap (lam info : TailPosInfo. info.side) info) in
      compatibleSide acc side in
    let exprs = findExpressionsAtTailPosition binding.body in
    let tailPosInfo = map (tailPositionExpressionInfo binding.ident) exprs in
    match foldl compatibleBinop (None ()) tailPosInfo with Some binop then
      match tyTm binop with TyArrow {from = elemTy, to = TyArrow _} then
        if isAssociative binop then
          match getNeutralElement binop with Some ne then
            let ne = withType elemTy (withInfo binding.info ne) in
            match foldl compatibleArgumentSide (None ()) tailPosInfo with Some side then
              let leftArgRecursion =
                match side with LeftSide () | Both () then true else false
              in
              Some {binop = binop, ne = ne, leftArgRecursion = leftArgRecursion}
            else None ()
          else None ()
        else None ()
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="toTailRecursiveForm" kind="sem">

```mc
sem toTailRecursiveForm : TailRecursiveEnv -> LetDeclAst_DeclLetRecord -> Option LetDeclAst_DeclLetRecord
```

<Description>{`Rewrites a given binding into a tail\-recursive form`}</Description>


<ToggleWrapper text="Code..">
```mc
sem toTailRecursiveForm (env : TailRecursiveEnv) =
  | t ->
    -- env = {binop : Expr, ne : Expr, leftArgRecursion : Bool}
    let binding : DeclLetRecord = t in

    -- Generate a new symbol for the name so that we can easily identify calls
    -- to which we need to add an accumulator argument.
    let oldIdent = binding.ident in
    let newIdent = nameSetNewSym binding.ident in
    let accIdent = nameSym "acc" in
    let accType = tyTm env.ne in

    -- Handles the recursive case, where the recursive call and the left- and
    -- right-hand side arguments of the updated accumulator value are given.
    -- The resulting expression is a call to the tail-recursive function with
    -- an accumulator.
    let makeRecursiveCallWithAccumulator : Info -> Expr -> Expr -> Expr -> Expr =
      lam info. lam recursiveApp. lam larg. lam rarg.
      let accTy = tyWithInfo info accType in
      let innerAppTy = TyArrow {from = tyTm rarg, to = accTy,
                                info = info} in
      let bindingBodyTy = tyWithInfo info binding.tyBody in
      let functionWithAccTy = TyArrow {from = accTy, to = bindingBodyTy,
                                       info = info} in
      let t = TmApp {
        lhs = TmVar {ident = newIdent, ty = functionWithAccTy,
                     info = info, frozen = false},
        rhs = TmApp {lhs = TmApp {lhs = env.binop, rhs = larg, ty = innerAppTy,
                                  info = info},
                     rhs = rarg, ty = accTy, info = info},
        ty = bindingBodyTy, info = info
      } in
      -- Replace the old identifier with an application of the accumulator
      -- value on the new function identifier.
      let substituteMap =
        mapFromSeq nameCmp [(oldIdent, lam. t)] in
      substituteVariables substituteMap recursiveApp
    in

    -- Handles the base case, where the expression is added as one of the
    -- arguments, the other being the accumulator value, to the binary
    -- operator.
    let baseCase = lam expr. lam acc.
      let info = infoTm acc in
      let args = if env.leftArgRecursion then (expr, acc) else (acc, expr) in
      match args with (larg, rarg) then
        let resultTy = tyWithInfo info (tyTm acc) in
        let innerAppTy = TyArrow {from = tyTm rarg, to = resultTy,
                                  info = info} in
        TmApp {lhs = TmApp {lhs = env.binop, rhs = larg, ty = innerAppTy,
                            info = info},
               rhs = rarg, ty = resultTy, info = info}
      else never
    in

    recursive let rewriteTailRecursive : Expr -> Expr = lam expr.
      match expr with TmLam t then
        TmLam {t with body = rewriteTailRecursive t.body}
      else match expr with TmDecl x then
        TmDecl {x with inexpr = rewriteTailRecursive x.inexpr}
      else match expr with TmMatch t then
        TmMatch {{t with thn = rewriteTailRecursive t.thn}
                    with els = rewriteTailRecursive t.els}
      else
        let info = infoTm expr in
        let acc = TmVar {ident = accIdent, ty = tyWithInfo info (tyTm expr),
                         info = info, frozen = false} in
        match expr with TmApp {lhs = TmApp {lhs = bop, rhs = arg1}, rhs = arg2} then
          if eqExpr env.binop bop then
            if and env.leftArgRecursion (isRecursiveCall arg1 binding.ident) then
              makeRecursiveCallWithAccumulator info arg1 arg2 acc
            else if and (not env.leftArgRecursion)
                        (isRecursiveCall arg2 binding.ident) then
              makeRecursiveCallWithAccumulator info arg2 acc arg1
            else baseCase expr acc
          else baseCase expr acc
        else if eqExpr expr env.ne then
          acc
        else baseCase expr acc
    in

    match functionParametersAndBody binding.body with (_, body) then
      let body = rewriteTailRecursive body in
      let functionBody = replaceFunctionBody binding.body body in
      let bodyWithAcc = TmLam {
        ident = accIdent,
        tyAnnot = accType,
        tyParam = accType,
        body = functionBody,
        ty = TyArrow {from = accType, to = binding.tyBody, info = binding.info},
        info = binding.info
      } in
      Some ({{{binding with ident = newIdent}
                       with tyBody = tyTm bodyWithAcc}
                       with body = bodyWithAcc})
    else never
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tailRecursiveRewrite" kind="sem">

```mc
sem tailRecursiveRewrite : Map Name (Info -> Ast_Expr) -> LetDeclAst_DeclLetRecord -> Option (Map Name (Info -> Ast_Expr), LetDeclAst_DeclLetRecord)
```



<ToggleWrapper text="Code..">
```mc
sem tailRecursiveRewrite (subMap : Map Name (Info -> Expr)) =
  | t ->
    let t : DeclLetRecord = t in
    match getTailRecursiveRewriteEnv t with Some env then
      let env : TailRecursiveEnv = env in
      match toTailRecursiveForm env t with Some tailRecursiveBinding then
        let binding : DeclLetRecord = tailRecursiveBinding in
        let oldIdent = t.ident in
        let replacementFunctionCall = lam info.
          TmApp {
            lhs = TmVar {
              ident = binding.ident,
              ty = tyWithInfo info binding.tyBody,
              info = binding.info,
              frozen = false
            },
            rhs = env.ne,
            ty = tyWithInfo info t.tyBody,
            info = info
          }
        in
        Some (mapInsert oldIdent replacementFunctionCall subMap, binding)
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tailRecursiveH" kind="sem">

```mc
sem tailRecursiveH : Map Name (Info -> Ast_Expr) -> Ast_Expr -> (Map Name (Info -> Ast_Expr), Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem tailRecursiveH (subMap : Map Name (Info -> Expr)) =
  | TmVar t ->
    match mapLookup t.ident subMap with Some subFn then
      (subMap, subFn t.info)
    else (subMap, TmVar t)
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let tailRecursiveBinding = lam subMap. lam binding : DeclLetRecord.
      optionGetOrElse
        (lam. (subMap, binding))
        (tailRecursiveRewrite subMap binding)
    in
    -- Try to rewrite the bindings into a tail-recursive form.
    match mapAccumL tailRecursiveBinding subMap t.bindings
    with (subMap, bindings) then
      -- Translate calls to rewritten bindings within each binding.
      let bindings =
        map
          (lam bind : DeclLetRecord.
            match tailRecursiveH subMap bind.body with (_, body) then
              {bind with body = body}
            else never)
          bindings in

      -- Translate calls to rewritten bindings in the inexpr term.
      match tailRecursiveH subMap x.inexpr with (subMap, inexpr) then
        (subMap, TmDecl {x with decl = DeclRecLets {t with bindings = bindings}, inexpr = inexpr})
      else never
    else never
  | t -> smapAccumL_Expr_Expr tailRecursiveH subMap t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tailRecursive" kind="sem">

```mc
sem tailRecursive : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem tailRecursive =
  | t ->
    match tailRecursiveH (mapEmpty nameCmp) t with (_, t) then
      t
    else never
```
</ToggleWrapper>
</DocBlock>

