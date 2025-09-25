import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExtANF  
  

  
  
  
## Semantics  
  

          <DocBlock title="normalize" kind="sem">

```mc
sem normalize : (Ast_Expr -> Ast_Expr) -> Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem normalize (k : Expr -> Expr) =
  | TmDecl (x & {decl = d & DeclExt t, inexpr = inexpr}) ->
    -- NOTE(dlunde,2022-06-14): Externals must always be fully applied
    -- (otherwise the parser throws an error). To make this compatible with
    -- ANF, we eta expand definitions of externals. In this way, the only
    -- application of the external is in the body of the eta expansion (where
    -- it is always fully applied).
    --
    let arity = arityFunType t.tyIdent in
    let i = withInfo t.info in

    -- Introduce variable names for each external parameter
    recursive let vars = lam acc. lam arity.
      match acc with (acc, tyIdent) in
      if lti arity 1 then acc
      else
        let arg = nameNoSym (concat "a" (int2string arity)) in
        match
          match tyIdent with TyArrow {from = from, to = to} then
            (from, to)
          else (TyUnknown {info = t.info}, tyIdent)
        with (argTy, innerTy) in
        vars (snoc acc (arg, argTy), innerTy) (subi arity 1)
    in
    let varNameTypes : [(Name, Type)] = vars ([], t.tyIdent) arity in

    -- Variable for the external itself
    let extId = TmVar {
      ident = t.ident, ty = t.tyIdent,
      info = t.info, frozen = false}
    in

    -- The body of the eta expansion
    match
      foldl
        (lam acc. lam v.
          match acc with (acc, tyIdent) in
          match v with (id, ty) in
          let appTy =
            match tyIdent with TyArrow {to = to} then
              to
            else TyUnknown {info = t.info} in
          let app = TmApp {
            lhs = acc,
            rhs = TmVar {ident = id, ty = ty, info = t.info, frozen = false},
            ty = appTy,
            info = t.info} in
          (app, appTy))
        (extId, t.tyIdent)
        varNameTypes
    with (inner, _) in

    let etaExpansion =
      foldr
        (lam v. lam acc.
          match v with (id, ty) in
          TmLam {
            ident = id, tyAnnot = TyUnknown {info = t.info}, tyParam = ty,
            body = acc, ty = TyArrow {from = ty, to = tyTm acc, info = t.info},
            info = t.info})
        inner varNameTypes in
    TmDecl
    { x with decl = d
    , inexpr = TmDecl
      { decl = DeclLet
        { ident = t.ident
        , tyAnnot = TyUnknown {info = t.info}
        , tyBody = t.tyIdent
        , body = etaExpansion
        , info = t.info
        }
      , inexpr = normalize k inexpr
      , ty = tyTm inexpr
      , info = x.info
      }
    }
```
</ToggleWrapper>
</DocBlock>

