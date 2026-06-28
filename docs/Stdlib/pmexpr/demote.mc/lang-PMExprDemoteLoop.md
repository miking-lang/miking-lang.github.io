import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemoteLoop  
  

  
  
  
## Semantics  
  

          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | TmLoop t | TmParallelLoop t ->
    let unitTy = TyRecord {fields = mapEmpty cmpSID, info = t.info} in
    let acc = TmRecord {bindings = mapEmpty cmpSID, ty = unitTy, info = t.info} in
    let f = TmLam {
      ident = nameNoSym "", tyAnnot = unitTy, tyParam = unitTy, body = t.f,
      ty = TyArrow {from = unitTy, to = tyTm t.f, info = t.info},
      info = t.info} in
    let accLoop = TmLoopAcc {
      ne = acc, n = t.n, f = f, ty = unitTy, info = t.info} in
    demoteParallel accLoop
  | TmLoopAcc t ->
    let arrowType = lam from. lam to.
      TyArrow {
        from = tyWithInfo t.info from,
        to = tyWithInfo t.info to,
        info = t.info} in
    let loopId = nameSym "loop" in
    let accTy = tyTm t.ne in
    let loopTy = arrowType accTy (arrowType tyint_ accTy) in
    let accIdent = nameSym "acc" in
    let acc = TmVar {
      ident = accIdent, ty = accTy, info = t.info, frozen = false} in
    let iIdent = nameSym "i" in
    let i = TmVar {
      ident = iIdent, ty = TyInt {info = t.info}, info = t.info,
      frozen = false} in
    let f = demoteParallel t.f in
    let loopCompareExpr = TmApp {
      lhs = TmApp {
        lhs = TmConst {
          val = CLti (),
          ty = arrowType tyint_ (arrowType tyint_ tybool_),
          info = t.info},
        rhs = i, ty = arrowType tyint_ tybool_, info = t.info},
      rhs = t.n, ty = tybool_, info = t.info} in
    let incrementIterExpr = TmApp {
      lhs = TmApp {
        lhs = TmConst {
          val = CAddi (),
          ty = arrowType tyint_ (arrowType tyint_ tyint_),
          info = t.info},
        rhs = i, ty = arrowType tyint_ tyint_, info = t.info},
      rhs = TmConst {
        val = CInt {val = 1},
        ty = TyInt {info = t.info},
        info = t.info},
      ty = tyint_, info = t.info} in
    let tIdent = nameSym "t" in
    let tVar = TmVar {ident = tIdent, ty = accTy, info = t.info, frozen = false} in
    let thnExpr = TmDecl
      { decl = DeclLet
        { ident = tIdent
        , tyAnnot = accTy
        , tyBody = accTy
        , body = TmApp
          { lhs = TmApp {lhs = f, rhs = acc, ty = arrowType tyint_ accTy, info = t.info}
          , rhs = i
          , ty = accTy
          , info = t.info
          }
        , info = t.info
        }
      , inexpr = TmApp
        { lhs = TmApp
          { lhs = TmVar {ident = loopId, ty = loopTy, info = t.info, frozen = false}
          , rhs = tVar
          , ty = arrowType tyint_ accTy
          , info = t.info
          }
        , rhs = incrementIterExpr
        , ty = accTy
        , info = t.info
        }
      , ty = accTy
      , info = t.info
      } in
    let loopBindingDef = {
      ident = loopId, tyAnnot = loopTy, tyBody = loopTy, info = t.info,
      body = TmLam {
        ident = accIdent, tyAnnot = accTy, tyParam = accTy,
        body = TmLam {
          ident = iIdent,
          tyAnnot = TyInt {info = t.info}, tyParam = TyInt {info = t.info},
          body = TmMatch {
            target = loopCompareExpr,
            pat = PatBool {val = true, ty = TyBool {info = t.info}, info = t.info},
            thn = thnExpr,
            els = acc,
            ty = accTy, info = t.info},
          ty = arrowType tyint_ accTy, info = t.info},
        ty = loopTy, info = t.info}} in
    TmDecl
    { decl = DeclRecLets
      { bindings = [loopBindingDef]
      , info = t.info
      }
    , inexpr = TmApp
      { lhs = TmApp
        { lhs = TmVar
          { ident = loopId
          , ty = loopTy
          , info = t.info
          , frozen = false
          }
        , rhs = t.ne
        , ty = arrowType tyint_ accTy
        , info = t.info
        }
      , rhs = TmConst
        { val = CInt {val = 0}
        , ty = TyInt {info = t.info}
        , info = t.info
        }
      , ty = accTy
      , info = t.info
      }
    , ty = accTy
    , info = t.info
    }
```
</ToggleWrapper>
</DocBlock>

