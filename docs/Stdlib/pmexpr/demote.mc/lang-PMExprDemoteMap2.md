import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprDemoteMap2  
  

  
  
  
## Semantics  
  

          <DocBlock title="demoteParallel" kind="sem">

```mc
sem demoteParallel : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem demoteParallel =
  | TmMap2 t ->
    let tyuk = TyUnknown {info = t.info} in
    let lty = match tyTm t.as with TySeq {ty = elemTy} then elemTy else tyuk in
    let rty = match tyTm t.bs with TySeq {ty = elemTy} then elemTy else tyuk in
    let tytuple = tyWithInfo t.info (tytuple_ [lty, rty]) in
    let tyseqtuple = TySeq {ty = tytuple, info = t.info} in
    let tyresult = TySeq {ty = tyuk, info = t.info} in
    let aid = nameSym "a" in
    let bid = nameSym "b" in
    let tid = nameSym "t" in
    let iid = nameSym "i" in
    let xid = nameSym "x" in
    let aExpr = DeclLet
      { ident = aid
      , tyAnnot = tyTm t.as
      , tyBody = tyTm t.as
      , body = demoteParallel t.as
      , info = infoTm t.as
      } in
    let bExpr = DeclLet
      { ident = bid
      , tyAnnot = tyTm t.bs
      , tyBody = tyTm t.bs
      , body = demoteParallel t.bs
      , info = infoTm t.bs
      } in
    let access = lam seqId. lam seqTy. lam elemTy.
      TmApp {
        lhs = TmApp {
          lhs = TmConst {val = CGet (), ty = tyuk, info = t.info},
          rhs = TmVar {ident = seqId, ty = seqTy, info = t.info, frozen = false},
          ty = tyuk, info = t.info},
        rhs = TmVar {ident = iid, ty = TyInt {info = t.info}, info = t.info,
                     frozen = false},
        ty = elemTy, info = t.info} in
    let tExpr = DeclLet
      { ident = tid
      , tyAnnot = tyseqtuple
      , tyBody = tyseqtuple
      , body = TmApp
        { lhs = TmApp
          { lhs = TmConst {val = CCreate (), ty = tyuk, info = t.info}
          , rhs = TmApp
            { lhs = TmConst {val = CLength (), ty = tyuk, info = t.info}
            , rhs = TmVar {ident = aid, ty = tyTm t.as, info = t.info, frozen = false}
            , ty = TyInt {info = t.info}
            , info = t.info
            }
          , ty = tyuk
          , info = t.info
          }
        , rhs = TmLam
          { ident = iid
          , tyAnnot = TyInt {info = t.info}
          , tyParam = TyInt {info = t.info}
          , body = TmRecord
            { bindings = mapFromSeq cmpSID
              [ (stringToSid "0", access aid (tyTm t.as) lty)
              , (stringToSid "1", access bid (tyTm t.bs) rty)
              ]
            , ty = tytuple
            , info = t.info
            }
          , ty = tytuple
          , info = t.info
          }
        , ty = tyseqtuple
        , info = t.info
        }
      , info = t.info
      } in
    let projection = lam key. lam id. lam ty.
      let keySid = stringToSid key in
      let x = nameSym "x" in
      let identPat = PatNamed {ident = PName x, ty = ty, info = t.info} in
      let patBinds = mapFromSeq cmpSID [(keySid, identPat)] in
      TmMatch {
        target = TmVar {ident = id, ty = tytuple, info = t.info, frozen = false},
        pat = PatRecord {bindings = patBinds, ty = tytuple, info = t.info},
        thn = TmVar {ident = x, ty = ty, info = t.info, frozen = false},
        els = TmNever {ty = tyuk, info = t.info},
        ty = tyuk, info = t.info}
    in
    let mapExpr = TmApp {
      lhs = TmApp {
        lhs = TmConst {val = CMap (), ty = tyuk, info = t.info},
        rhs = TmLam {
          ident = xid, tyAnnot = tytuple, tyParam = tytuple,
          body = TmApp {
            lhs = TmApp {
              lhs = demoteParallel t.f,
              rhs = projection "0" xid lty,
              ty = TyArrow {from = rty, to = tyuk, info = t.info},
              info = t.info},
            rhs = projection "1" xid rty,
            ty = tyuk, info = t.info},
          ty = TyArrow {from = tytuple, to = tyuk, info = t.info},
          info = t.info},
        ty = tyuk, info = t.info},
      rhs = TmVar {ident = tid, ty = tyseqtuple, info = t.info, frozen = false},
      ty = TySeq {ty = tyuk, info = t.info}, info = t.info} in
    bindall_ [aExpr, bExpr, tExpr] mapExpr
```
</ToggleWrapper>
</DocBlock>

