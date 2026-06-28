import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CudaPMExprAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Expr" kind="syn">

```mc
syn Expr
```



<ToggleWrapper text="Code..">
```mc
syn Expr =
  | TmSeqMap {f : Expr, s : Expr, ty : Type, info : Info}
  | TmSeqFoldl {f : Expr, acc : Expr, s : Expr, ty : Type, info : Info}
  | TmTensorSliceExn {t : Expr, slice : Expr, ty : Type, info : Info}
  | TmTensorSubExn {t : Expr, ofs : Expr, len : Expr, ty : Type, info : Info}
  | TmMapKernel {f : Expr, s : Expr, ty : Type, info : Info}
  | TmReduceKernel {f : Expr, ne : Expr, s : Expr, commutative : Bool, ty : Type, info : Info}
  | TmLoopKernel {n : Expr, f : Expr, ty : Type, info : Info}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="isKernel" kind="sem">

```mc
sem isKernel : Ast_Expr -> Bool
```



<ToggleWrapper text="Code..">
```mc
sem isKernel =
  | TmMapKernel t -> true
  | TmReduceKernel t -> true
  | TmLoopKernel t -> true
  | _ -> false
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
  | TmSeqMap t -> t.ty
  | TmSeqFoldl t -> t.ty
  | TmTensorSliceExn t -> t.ty
  | TmTensorSubExn t -> t.ty
  | TmMapKernel t -> t.ty
  | TmReduceKernel t -> t.ty
  | TmLoopKernel t -> t.ty
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
  | TmSeqMap t -> t.info
  | TmSeqFoldl t -> t.info
  | TmTensorSliceExn t -> t.info
  | TmTensorSubExn t -> t.info
  | TmMapKernel t -> t.info
  | TmReduceKernel t -> t.info
  | TmLoopKernel t -> t.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withType" kind="sem">

```mc
sem withType : Ast_Type -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withType ty =
  | TmSeqMap t -> TmSeqMap {t with ty = ty}
  | TmSeqFoldl t -> TmSeqFoldl {t with ty = ty}
  | TmTensorSliceExn t -> TmTensorSliceExn {t with ty = ty}
  | TmTensorSubExn t -> TmTensorSubExn {t with ty = ty}
  | TmMapKernel t -> TmMapKernel {t with ty = ty}
  | TmReduceKernel t -> TmReduceKernel {t with ty = ty}
  | TmLoopKernel t -> TmLoopKernel {t with ty = ty}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="withInfo" kind="sem">

```mc
sem withInfo : Info -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem withInfo info =
  | TmSeqMap t -> TmSeqMap {t with info = info}
  | TmSeqFoldl t -> TmSeqFoldl {t with info = info}
  | TmTensorSliceExn t -> TmTensorSliceExn {t with info = info}
  | TmTensorSubExn t -> TmTensorSubExn {t with info = info}
  | TmMapKernel t -> TmMapKernel {t with info = info}
  | TmReduceKernel t -> TmReduceKernel {t with info = info}
  | TmLoopKernel t -> TmLoopKernel {t with info = info}
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
  | TmSeqMap t ->
    match f acc t.f with (acc, tf) in
    match f acc t.s with (acc, s) in
    (acc, TmSeqMap {{t with f = tf} with s = s})
  | TmSeqFoldl t ->
    match f acc t.f with (acc, tf) in
    match f acc t.acc with (acc, tacc) in
    match f acc t.s with (acc, s) in
    (acc, TmSeqFoldl {{{t with f = tf} with acc = tacc} with s = s})
  | TmTensorSliceExn t ->
    match f acc t.t with (acc, tt) in
    match f acc t.slice with (acc, slice) in
    (acc, TmTensorSliceExn {{t with t = tt} with slice = slice})
  | TmTensorSubExn t ->
    match f acc t.t with (acc, tt) in
    match f acc t.ofs with (acc, ofs) in
    match f acc t.len with (acc, len) in
    (acc, TmTensorSubExn {{{t with t = tt} with ofs = ofs} with len = len})
  | TmMapKernel t ->
    match f acc t.f with (acc, tf) in
    match f acc t.s with (acc, s) in
    (acc, TmMapKernel {{t with f = tf} with s = s})
  | TmReduceKernel t ->
    match f acc t.f with (acc, tf) in
    match f acc t.ne with (acc, ne) in
    match f acc t.s with (acc, s) in
    (acc, TmReduceKernel {{{t with f = tf} with ne = ne} with s = s})
  | TmLoopKernel t ->
    match f acc t.n with (acc, n) in
    match f acc t.f with (acc, tf) in
    (acc, TmLoopKernel {{t with n = n} with f = tf})
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
  | TmSeqMap t ->
    let f = typeCheckExpr env t.f in
    let s = typeCheckExpr env t.s in
    let inElemType = newvar env.currentLvl t.info in
    let outElemType = newvar env.currentLvl t.info in
    unify env [infoTm s, t.info] (tyTm s) (ityseq_ t.info inElemType);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info inElemType outElemType);
    TmSeqMap {{{t with f = f}
                  with s = s}
                  with ty = TySeq {ty = outElemType, info = t.info}}
  | TmSeqFoldl t ->
    let f = typeCheckExpr env t.f in
    let acc = typeCheckExpr env t.acc in
    let s = typeCheckExpr env t.s in
    let sElemTy = newvar env.currentLvl t.info in
    unify env [infoTm s, t.info] (tyTm s) (ityseq_ t.info sElemTy);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info (tyTm acc)
                                         (ityarrow_ t.info sElemTy (tyTm acc)));
    TmSeqFoldl {{{{t with f = f}
                     with acc = acc}
                     with s = s}
                     with ty = tyTm acc}
  | TmTensorSliceExn t ->
    let tt = typeCheckExpr env t.t in
    let slice = typeCheckExpr env t.slice in
    let elemTy = newvar env.currentLvl t.info in
    unify env [infoTm tt, t.info] (tyTm tt) (tyWithInfo t.info (tytensor_ elemTy));
    unify env [infoTm slice, t.info] (tyTm slice) (ityseq_ t.info (tyWithInfo t.info tyint_));
    TmTensorSliceExn {{{t with t = tt}
                          with slice = slice}
                          with ty = tyTm tt}
  | TmTensorSubExn t ->
    let tt = typeCheckExpr env t.t in
    let ofs = typeCheckExpr env t.ofs in
    let len = typeCheckExpr env t.len in
    let elemTy = newvar env.currentLvl t.info in
    unify env [infoTm tt, t.info] (tyTm tt) (tyWithInfo t.info (tytensor_ elemTy));
    unify env [infoTm ofs, t.info] (tyTm ofs) (tyWithInfo t.info tyint_);
    unify env [infoTm len, t.info] (tyTm len) (tyWithInfo t.info tyint_);
    TmTensorSubExn {{{{t with t = tt}
                         with ofs = ofs}
                         with len = len}
                         with ty = tyTm tt}
  | TmMapKernel t ->
    let f = typeCheckExpr env t.f in
    let s = typeCheckExpr env t.s in
    let inElemType = newvar env.currentLvl t.info in
    let outElemType = newvar env.currentLvl t.info in
    unify env [infoTm s, t.info] (tyTm s) (ityseq_ t.info inElemType);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info inElemType outElemType);
    TmMapKernel {{{t with f = f}
                     with s = s}
                     with ty = TySeq {ty = outElemType, info = t.info}}
  | TmReduceKernel t ->
    let f = typeCheckExpr env t.f in
    let ne = typeCheckExpr env t.ne in
    let s = typeCheckExpr env t.s in
    let seqElemTy = newvar env.currentLvl t.info in
    let neTy = tyTm ne in
    unify env [infoTm s, t.info] (tyTm s) (ityseq_ t.info neTy);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info neTy (ityarrow_ t.info neTy neTy));
    TmReduceKernel {{{{t with f = f}
                         with ne = ne}
                         with s = s}
                         with ty = neTy}
  | TmLoopKernel t ->
    let n = typeCheckExpr env t.n in
    let f = typeCheckExpr env t.f in
    let unitType = tyWithInfo t.info tyunit_ in
    unify env [infoTm n, t.info] (tyTm n) (tyWithInfo t.info tyint_);
    unify env [infoTm f, t.info] (tyTm f) (ityarrow_ t.info (tyTm n) unitType);
    TmLoopKernel {{{t with n = n}
                      with f = f}
                      with ty = unitType}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="eqExprH" kind="sem">

```mc
sem eqExprH : {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> {conEnv: [(Name, Name)], varEnv: [(Name, Name)]} -> Ast_Expr -> Ast_Expr -> Option {conEnv: [(Name, Name)], varEnv: [(Name, Name)]}
```



<ToggleWrapper text="Code..">
```mc
sem eqExprH env free lhs =
  | TmSeqMap r ->
    match lhs with TmSeqMap l then
      match eqExprH env free l.f r.f with Some free then
        eqExprH env free l.s r.s
      else None ()
    else None ()
  | TmSeqFoldl r ->
    match lhs with TmSeqFoldl l then
      match eqExprH env free l.f r.f with Some free then
        match eqExprH env free l.acc r.acc with Some free then
          eqExprH env free l.s r.s
        else None ()
      else None ()
    else None ()
  | TmTensorSliceExn r ->
    match lhs with TmTensorSliceExn l then
      match eqExprH env free l.t r.t with Some free then
        eqExprH env free l.slice r.slice
      else None ()
    else None ()
  | TmTensorSubExn r ->
    match lhs with TmTensorSubExn l then
      match eqExprH env free l.t r.t with Some free then
        match eqExprH env free l.ofs r.ofs with Some free then
          eqExprH env free l.len r.len
        else None ()
      else None ()
    else None ()
  | TmMapKernel r ->
    match lhs with TmMapKernel l then
      match eqExprH env free l.f r.f with Some free then
        eqExprH env free l.s r.s
      else None ()
    else None ()
  | TmReduceKernel r ->
    match lhs with TmReduceKernel l then
      match eqExprH env free l.f r.f with Some free then
        match eqExprH env free l.ne r.ne with Some free then
          eqExprH env free l.s r.s
        else None ()
      else None ()
    else None ()
  | TmLoopKernel r ->
    match lhs with TmLoopKernel l then
      match eqExprH env free l.n r.n with Some free then
        eqExprH env free l.f r.f
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
  | TmSeqMap t ->
    normalizeName
      (lam s.
        k (TmSeqMap {{t with f = normalizeTerm t.f}
                        with s = s}))
      t.s
  | TmSeqFoldl t ->
    normalizeNames
      (lam acc.
        normalizeName
          (lam s.
            k (TmSeqFoldl {{{t with f = normalizeTerm t.f}
                               with acc = acc}
                               with s = s}))
          t.s)
      t.acc
  | TmTensorSliceExn t ->
    normalizeNames
      (lam tt.
        normalizeName
          (lam slice.
            k (TmTensorSliceExn {{t with t = tt} with slice = slice}))
          t.slice)
      t.t
  | TmTensorSubExn t ->
    normalizeNames
      (lam tt.
        normalizeNames
          (lam ofs.
            normalizeName
              (lam len.
                k (TmTensorSubExn {{{t with t = tt}
                                       with ofs = ofs}
                                       with len = len}))
              t.len)
          t.ofs)
      t.t
  | TmMapKernel t ->
    normalizeName
      (lam s. k (TmMapKernel {{t with f = normalizeTerm t.f} with s = s}))
      t.s
  | TmReduceKernel t ->
    normalizeNames
      (lam ne.
        normalizeName
          (lam s.
            k (TmReduceKernel {{{t with f = normalizeTerm t.f}
                                   with ne = ne}
                                   with s = s}))
          t.s)
      t.ne
  | TmLoopKernel t ->
    normalizeName
      (lam n.
        k (TmLoopKernel {{t with n = n}
                            with f = normalizeTerm t.f}))
      t.n
```
</ToggleWrapper>
</DocBlock>

