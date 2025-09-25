import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmAccelerate {e : Expr, ty : Type, info : Info}
  | TmFlatten {e : Expr, ty : Type, info : Info}
  | TmMap2 {f : Expr, as : Expr, bs : Expr, ty : Type, info : Info}
  | TmParallelReduce {f : Expr, ne : Expr, as : Expr, ty : Type, info : Info}
  | TmLoop {n : Expr, f : Expr, ty : Type, info : Info}
  | TmLoopAcc {ne : Expr, n : Expr, f : Expr, ty : Type, info : Info}
  | TmParallelLoop {n : Expr, f : Expr, ty : Type, info : Info}
  | TmPrintFloat {e : Expr, ty : Type, info : Info}
  | TmParallelSizeCoercion {e: Expr, size : Name, ty : Type, info : Info}
  | TmParallelSizeEquality {x1: Name, d1: Int, x2: Name, d2: Int, ty : Type, info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isKeyword" kind="sem">

```mc
sem isKeyword : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isKeyword =
  | TmAccelerate _ -> true
  | TmFlatten _ -> true
  | TmMap2 _ -> true
  | TmParallelReduce _ -> true
  | TmLoop _ -> true
  | TmLoopAcc _ -> true
  | TmParallelLoop _ -> true
  | TmPrintFloat _ -> true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="matchKeywordString" kind="sem">

```mc
sem matchKeywordString : Info -> String -> Option (Int, [Ast_Expr] -> Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem matchKeywordString (info : Info) =
  | "accelerate" ->
    Some (1, lam lst. TmAccelerate {e = get lst 0, ty = TyUnknown {info = info},
                                    info = info})
  | "parallelMap" ->
    Some (2, lam lst. TmConst {val = CMap (), ty = TyUnknown {info = info}, info = info})
  | "flatten" ->
    Some (1, lam lst. TmFlatten {e = get lst 0, ty = TyUnknown {info = info},
                                 info = info})
  | "map2" ->
    Some (3, lam lst. TmMap2 {f = get lst 0, as = get lst 1,
                              bs = get lst 2,
                              ty = TyUnknown {info = info}, info = info})
  | "reduce" ->
    Some (3, lam lst. TmParallelReduce {f = get lst 0, ne = get lst 1,
                                        as = get lst 2,
                                        ty = TyUnknown {info = info},
                                        info = info})
  | "seqLoop" ->
    Some (2, lam lst. TmLoop {n = get lst 0, f = get lst 1,
                              ty = TyUnknown {info = info}, info = info})
  | "seqLoopAcc" ->
    Some (3, lam lst. TmLoopAcc {ne = get lst 0, n = get lst 1,
                                 f = get lst 2, ty = TyUnknown {info = info},
                                 info = info})
  | "loop" ->
    Some (2, lam lst. TmParallelLoop {n = get lst 0, f = get lst 1,
                                      ty = TyUnknown {info = info},
                                      info = info})
  | "printFloat" ->
    Some (1, lam lst. TmPrintFloat {e = get lst 0,
                                    ty = TyUnknown {info = info}, info = info})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyTm" kind="sem">

```mc
sem tyTm : Ast_Expr -> Ast_Type
```



<ToggleWrapper text="Code..">
```mc
sem tyTm =
  | TmAccelerate t -> t.ty
  | TmFlatten t -> t.ty
  | TmMap2 t -> t.ty
  | TmParallelReduce t -> t.ty
  | TmLoop t -> t.ty
  | TmLoopAcc t -> t.ty
  | TmParallelLoop t -> t.ty
  | TmPrintFloat t -> t.ty
  | TmParallelSizeCoercion t -> t.ty
  | TmParallelSizeEquality t -> t.ty
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="infoTm" kind="sem">

```mc
sem infoTm : Ast_Expr -> Info
```



<ToggleWrapper text="Code..">
```mc
sem infoTm =
  | TmAccelerate t -> t.info
  | TmFlatten t -> t.info
  | TmMap2 t -> t.info
  | TmParallelReduce t -> t.info
  | TmLoop t -> t.info
  | TmLoopAcc t -> t.info
  | TmParallelLoop t -> t.info
  | TmPrintFloat t -> t.info
  | TmParallelSizeCoercion t -> t.info
  | TmParallelSizeEquality t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType (ty : Type) =
  | TmAccelerate t -> TmAccelerate {t with ty = ty}
  | TmFlatten t -> TmFlatten {t with ty = ty}
  | TmMap2 t -> TmMap2 {t with ty = ty}
  | TmParallelReduce t -> TmParallelReduce {t with ty = ty}
  | TmLoop t -> TmLoop {t with ty = ty}
  | TmLoopAcc t -> TmLoopAcc {t with ty = ty}
  | TmParallelLoop t -> TmParallelLoop {t with ty = ty}
  | TmPrintFloat t -> TmPrintFloat {t with ty = ty}
  | TmParallelSizeCoercion t -> TmParallelSizeCoercion {t with ty = ty}
  | TmParallelSizeEquality t -> TmParallelSizeEquality {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Expr_Expr" kind="sem">

```mc
sem smapAccumL_Expr_Expr : all acc. (acc -> Ast_Expr -> (acc, Ast_Expr)) -> acc -> Ast_Expr -> (acc, Ast_Expr)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Expr_Expr f acc =
  | TmAccelerate t ->
    match f acc t.e with (acc, e) in
    (acc, TmAccelerate {t with e = e})
  | TmFlatten t ->
    match f acc t.e with (acc, e) in
    (acc, TmFlatten {t with e = e})
  | TmMap2 t ->
    match f acc t.f with (acc, tf) in
    match f acc t.as with (acc, as) in
    match f acc t.bs with (acc, bs) in
    (acc, TmMap2 {{{t with f = tf} with as = as} with bs = bs})
  | TmParallelReduce t ->
    match f acc t.f with (acc, tf) in
    match f acc t.ne with (acc, ne) in
    match f acc t.as with (acc, as) in
    (acc, TmParallelReduce {{{t with f = tf} with ne = ne} with as = as})
  | TmLoop t ->
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, TmLoop {{t with n = n} with f = tf})
  | TmLoopAcc t ->
    match f acc t.ne with (acc, ne) in
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, TmLoopAcc {{{t with ne = ne} with n = n} with f = tf})
  | TmParallelLoop t ->
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, TmParallelLoop {{t with n = n} with f = tf})
  | TmPrintFloat t ->
    match f acc t.e with (acc, e) in
    (acc, TmPrintFloat {t with e = e})
  | TmParallelSizeCoercion t ->
    match f acc t.e with (acc, e) in
    (acc, TmParallelSizeCoercion {t with e = e})
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="typeCheckExpr" kind="sem">

```mc
sem typeCheckExpr : TCEnv -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem typeCheckExpr env =
  | TmAccelerate t ->
    let e = typeCheckExpr env t.e in
    TmAccelerate {{t with e = e}
                     with ty = tyTm e}
  | TmFlatten t ->
    let e = typeCheckExpr env t.e in
    let elemTy = newvar env.currentLvl t.info in
    unify env [infoTm e, t.info] (tyTm e) (ityseq_ t.info (ityseq_ t.info elemTy));
    TmFlatten {{t with e = e}
                  with ty = TySeq {ty = elemTy, info = t.info}}
  | TmMap2 t ->
    let f = typeCheckExpr env t.f in
    let as = typeCheckExpr env t.as in
    let bs = typeCheckExpr env t.bs in
    let aElemTy = newvar env.currentLvl t.info in
    let bElemTy = newvar env.currentLvl t.info in
    let outElemTy = newvar env.currentLvl t.info in
    unify env [infoTm as, t.info] (tyTm as) (ityseq_ t.info aElemTy);
    unify env [infoTm bs, t.info] (tyTm bs) (ityseq_ t.info bElemTy);
    unify env [infoTm f, t.info] (tyTm f)
      (ityarrow_ t.info aElemTy (ityarrow_ t.info bElemTy outElemTy));
    TmMap2 {{{{t with f = f}
                 with as = as}
                 with bs = bs}
                 with ty = TySeq {ty = outElemTy, info = t.info}}
  | TmParallelReduce t ->
    let f = typeCheckExpr env t.f in
    let ne = typeCheckExpr env t.ne in
    let as = typeCheckExpr env t.as in
    let accType = tyTm ne in
    unify env [infoTm as, t.info] (tyTm as) (ityseq_ t.info accType);
    unify env [infoTm f, t.info] (tyTm f)
      (ityarrow_ t.info accType (ityarrow_ t.info accType accType));
    TmParallelReduce {{{{t with f = f}
                           with ne = ne}
                           with as = as}
                           with ty = tyTm ne}
  | TmLoop t ->
    let n = typeCheckExpr env t.n in
    let f = typeCheckExpr env t.f in
    let unitType = tyWithInfo t.info tyunit_ in
    unify env [infoTm n, t.info] (tyTm n) (tyWithInfo t.info tyint_);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info (tyTm n) unitType);
    TmLoop {{{t with n = n}
                with f = f}
                with ty = unitType}
  | TmLoopAcc t ->
    let ne = typeCheckExpr env t.ne in
    let n = typeCheckExpr env t.n in
    let f = typeCheckExpr env t.f in
    unify env [infoTm n, t.info] (tyTm n) (tyWithInfo t.info tyint_);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info (tyTm ne)
                                         (ityarrow_ t.info (tyTm n) (tyTm ne)));
    TmLoopAcc {{{{t with ne = ne}
                    with n = n}
                    with f = f}
                    with ty = tyTm ne}
  | TmParallelLoop t ->
    let n = typeCheckExpr env t.n in
    let f = typeCheckExpr env t.f in
    let unitType = tyWithInfo t.info tyunit_ in
    unify env [infoTm n, t.info] (tyTm n) (tyWithInfo t.info tyint_);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info (tyTm n) unitType);
    TmParallelLoop {{{t with n = n}
                        with f = f}
                        with ty = unitType}
  | TmPrintFloat t ->
    let e = typeCheckExpr env t.e in
    let unitType = tyWithInfo t.info tyunit_ in
    unify env [infoTm e, t.info] (tyTm e) (tyWithInfo t.info tyfloat_);
    TmPrintFloat {{t with e = e} with ty = unitType}
  | TmParallelSizeCoercion t ->
    let e = typeCheckExpr env t.e in
    TmParallelSizeCoercion {{t with e = e} with ty = tyTm e}
  | TmParallelSizeEquality t ->
    TmParallelSizeEquality {t with ty = tyWithInfo t.info tyunit_}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH (env : EqEnv) (free : EqEnv) (lhs : Expr) =
  | TmAccelerate r ->
    match lhs with TmAccelerate l then
      eqExprH env free l.e r.e
    else None ()
  | TmFlatten r ->
    match lhs with TmFlatten l then
      eqExprH env free l.e r.e
    else None ()
  | TmMap2 r ->
    match lhs with TmMap2 l then
      match eqExprH env free l.f r.f with Some free then
        match eqExprH env free l.as r.as with Some free then
          eqExprH env free l.bs r.bs
        else None ()
      else None ()
    else None ()
  | TmParallelReduce r ->
    match lhs with TmParallelReduce l then
      match eqExprH env free l.f r.f with Some free then
        match eqExprH env free l.ne r.ne with Some free then
          eqExprH env free l.as r.as
        else None ()
      else None ()
    else None ()
  | TmLoop r ->
    match lhs with TmLoop l then
      match eqExprH env free l.n r.n with Some free then
        eqExprH env free l.f r.f
      else None ()
    else None ()
  | TmLoopAcc r ->
    match lhs with TmLoopAcc l then
      match eqExprH env free l.ne r.ne with Some free then
        match eqExprH env free l.n r.n with Some free then
          eqExprH env free l.f r.f
        else None ()
      else None ()
    else None ()
  | TmParallelLoop r ->
    match lhs with TmParallelLoop l then
      match eqExprH env free l.n r.n with Some free then
        eqExprH env free l.f r.f
      else None ()
    else None ()
  | TmPrintFloat r ->
    match lhs with TmPrintFloat l then
      eqExprH env free l.e r.e
    else None ()
  | TmParallelSizeCoercion r ->
    match lhs with TmParallelSizeCoercion l then
      match eqExprH env free l.e r.e with Some free then
        let free : EqEnv = free in
        match (env,free) with ({varEnv = varEnv},{varEnv = freeVarEnv}) in
        match _eqCheck l.size r.size varEnv freeVarEnv with Some freeVarEnv then
          Some {free with varEnv = freeVarEnv}
        else None ()
      else None ()
    else None ()
  | TmParallelSizeEquality r ->
    match lhs with TmParallelSizeEquality l then
      match (env,free) with ({varEnv = varEnv},{varEnv = freeVarEnv}) in
      match _eqCheck l.x1 r.x1 varEnv freeVarEnv with Some freeVarEnv then
        if eqi l.d1 r.d1 then
          match _eqCheck l.x2 r.x2 varEnv freeVarEnv with Some freeVarEnv then
            if eqi l.d2 r.d2 then Some {free with varEnv = freeVarEnv}
            else None ()
          else None ()
        else None ()
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmAccelerate t ->
    k (TmAccelerate {t with e = normalizeTerm t.e})
  | TmFlatten t ->
    normalizeName (lam e. k (TmFlatten {t with e = e})) t.e
  | TmMap2 t ->
    normalizeNames
      (lam f.
        normalizeName
          (lam as.
            normalizeName
              (lam bs.
                k (TmMap2 {t with f = f, as = as, bs = bs}))
              t.bs)
          t.as)
      t.f
  | TmParallelReduce t ->
    normalizeNames
      (lam f.
        normalizeName
          (lam as.
            normalizeName
              (lam ne.
                k (TmParallelReduce {t with f = f, ne = ne, as = as}))
              t.ne)
          t.as)
      t.f
  | TmLoop t ->
    normalizeNames
      (lam n.
        normalizeName
          (lam f.
            k (TmLoop {t with n = n, f = f}))
          t.f)
      t.n
  | TmLoopAcc t ->
    normalizeNames
      (lam ne.
        normalizeName
          (lam n.
            normalizeName
              (lam f.
                k (TmLoopAcc {t with ne = ne, n = n, f = f}))
              t.f)
          t.n)
      t.ne
  | TmParallelLoop t ->
    normalizeNames
      (lam n.
        normalizeName
          (lam f.
            k (TmParallelLoop {t with n = n, f = f}))
          t.f)
      t.n
  | TmPrintFloat t ->
    normalizeName (lam e. k (TmPrintFloat {t with e = e})) t.e
  | TmParallelSizeCoercion t ->
    normalizeName (lam e. k (TmParallelSizeCoercion {t with e = e})) t.e
  | TmParallelSizeEquality t -> k (TmParallelSizeEquality t)
```
</ToggleWrapper>
</DocBlock>

