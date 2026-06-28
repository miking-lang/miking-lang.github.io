import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TailPositions  
  

  
  
  
## Semantics  
  

          <DocBlock title="tailPositionsReclet" kind="sem">

```mc
sem tailPositionsReclet : all a. all b. (a -> b -> Ast_Expr -> Ast_Expr) -> (a -> b -> Ast_Expr -> (a, Ast_Expr)) -> (b -> Ast_Expr -> (b, Ast_Expr -> Ast_Expr)) -> b -> a -> Ast_Expr -> (a, Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem tailPositionsReclet baseCase tailCall letexpr lacc acc =
  | TmDecl (x & {decl = DeclRecLets t}) ->
    let lets: [Name] = map (lam b: DeclLetRecord. b.ident) t.bindings in
    let lets = setOfSeq nameCmp lets in
    match mapAccumL (lam acc: a. lam b: DeclLetRecord.
        match visitTailPositions baseCase tailCall letexpr (lets, acc, lacc) b.body
        with ((_,acc,_), body)
        in (acc, {b with body = body})
      ) acc t.bindings
    with (acc, bindings) in
    (acc, TmDecl {x with decl = DeclRecLets {t with bindings = bindings}})

  | t ->
    smapAccumL_Expr_Expr (tailPositionsReclet baseCase tailCall letexpr lacc) acc t
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tailPositionBaseCase" kind="sem">

```mc
sem tailPositionBaseCase : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem tailPositionBaseCase =
  | TmConst _ -> true
  | TmRecord _ -> true
  | TmRecordUpdate _ -> true
  | TmVar _ -> true
  | TmConApp _ -> true
  | TmSeq _ -> true
  | TmDecl {decl = DeclType _} -> true
  | TmDecl {decl = DeclConDef _} -> true
  | t -> false
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="visitTailPositions" kind="sem">

```mc
sem visitTailPositions : all a. all b. (a -> b -> Ast_Expr -> Ast_Expr) -> (a -> b -> Ast_Expr -> (a, Ast_Expr)) -> (b -> Ast_Expr -> (b, Ast_Expr -> Ast_Expr)) -> (Set Name, a, b) -> Ast_Expr -> ((Set Name, a, b), Ast_Expr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem visitTailPositions baseCase tailCall letexpr acc =
  | TmLam ({ body = (TmVar v)} & t) ->
    match acc with (_, tacc, lacc) in
    let helperLetExpr = bind_ (nulet_ v.ident t.body) t.body in
    (acc, TmLam { t with body = baseCase tacc lacc helperLetExpr })
  | TmDecl (x & {decl = DeclRecLets _}) ->
    match acc with (env, tacc, lacc) in
    match tailPositionsReclet baseCase tailCall letexpr lacc tacc (TmDecl x)
    with (tacc, TmDecl (x & {decl = DeclRecLets t})) in
    match visitTailPositions baseCase tailCall letexpr (env, tacc, lacc) x.inexpr
    with (acc, inexpr) in
    (acc, TmDecl {x with inexpr = inexpr})
  | TmDecl (x & {decl = DeclLet t}) ->
    match acc with (env, tacc, lacc0) in
    match letexpr lacc0 (TmDecl x) with (lacc, prepend) in
    let acc = (env, tacc, lacc) in
    match
    switch (t.body, x.inexpr)
    case (_, TmVar vin) then
      -- The case 'let t = ... in t', i.e. the body of the let is in tail
      -- position.
      if nameEq vin.ident t.ident then
        -- Yes.
        switch t
        -- Application: tail call?
        case { body = TmApp {lhs = TmVar vlhs} } then
          if setMem vlhs.ident env then
            match tailCall tacc lacc t.body with (tacc, body) in
            ((env, tacc, lacc), TmDecl {x with decl = DeclLet { t with body = body }})
          else (acc, baseCase tacc lacc (TmDecl {x with decl = DeclLet t}))
        -- Match: one of the branches returns a variable?
        case { body = TmMatch m } then
          match
            match m with {thn = TmVar v} then
              let helperLetExpr = bind_ (nulet_ v.ident m.thn) m.thn in
              (acc, baseCase tacc lacc helperLetExpr)
            else visitTailPositions baseCase tailCall letexpr acc m.thn
          with (acc, thn) in
          match
            match m with {els = TmVar v} then
              let helperLetExpr = bind_ (nulet_ v.ident m.els) m.els in
              (acc, baseCase tacc lacc helperLetExpr)
            else visitTailPositions baseCase tailCall letexpr acc m.els
          with (acc, els) in
          let body = TmMatch {{m with thn = thn} with els = els} in
          (acc, TmDecl {x with decl = DeclLet {t with body = body}})
        -- All other cases
        case _ then
          if tailPositionBaseCase t.body then
            (acc, baseCase tacc lacc (TmDecl {x with decl = DeclLet t}))
          else
            smapAccumL_Expr_Expr (
              visitTailPositions baseCase tailCall letexpr) acc (TmDecl {x with decl = DeclLet t})
        end
      else
        -- No, only the variable being returned is in tail position.
        let helperLetExpr = bind_ (nulet_ vin.ident x.inexpr) x.inexpr in
        (acc, TmDecl {x with inexpr = baseCase tacc lacc helperLetExpr})
    -- Redefinition of recursive functions
    case (TmApp {lhs = TmVar v} | TmVar v, !TmVar _) then
      let env =
        if setMem v.ident env then
          setInsert t.ident env
        else env
      in
      match visitTailPositions baseCase tailCall letexpr (env, tacc, lacc0) x.inexpr
      with (acc, inexpr) in
      (acc, TmDecl { x with inexpr = inexpr })
    case _ then
      smapAccumL_Expr_Expr (visitTailPositions baseCase tailCall letexpr) (env, tacc, lacc0) (TmDecl x)
    end
    with (acc, expr) in
    (acc, prepend expr)
  | t ->
    smapAccumL_Expr_Expr (visitTailPositions baseCase tailCall letexpr) acc t
```
</ToggleWrapper>
</DocBlock>

