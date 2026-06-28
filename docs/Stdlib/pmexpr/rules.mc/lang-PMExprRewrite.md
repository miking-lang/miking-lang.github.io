import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PMExprRewrite  
  

  
  
  
## Semantics  
  

          <DocBlock title="rewriteTerm" kind="sem">

```mc
sem rewriteTerm : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem rewriteTerm =
  -- cons e seq -> concat [e] seq
  | TmApp ({lhs = TmApp ({lhs = TmConst ({val = CCons _} & cons),
                          rhs = arg1} & innerApp)} & t) ->
    let newArgType = TySeq {ty = tyTm arg1, info = infoTm arg1} in
    let concat = TmConst {
      val = CConcat (),
      ty = TyArrow {
        from = newArgType,
        to = TyArrow {from = newArgType, to = newArgType, info = cons.info},
        info = cons.info},
      info = cons.info} in
    let elemSeq = TmSeq {tms = [arg1], ty = newArgType, info = infoTm arg1} in
    TmApp {t with lhs = TmApp {{innerApp with lhs = concat}
                                         with rhs = rewriteTerm elemSeq}}
  -- snoc seq e -> concat seq [e]
  | TmApp ({lhs = TmApp ({lhs = TmConst ({val = CSnoc _} & snoc)} & innerApp),
            rhs = arg2} & t) ->
    let newArgType = TySeq {ty = tyTm arg2, info = infoTm arg2} in
    let concat = TmConst {
      val = CConcat (),
      ty = TyArrow {
        from = newArgType,
        to = TyArrow {from = newArgType, to = newArgType, info = snoc.info},
        info = snoc.info},
      info = snoc.info} in
    let elemSeq = TmSeq {
      tms = [arg2],
      ty = TySeq {ty = tyTm arg2, info = infoTm arg2},
      info = infoTm arg2
    } in
    TmApp {{t with lhs = TmApp {innerApp with lhs = concat}}
              with rhs = rewriteTerm elemSeq}
  -- match s with [h] ++ t then e1 else match s with [] then e2 else e3 ->
  -- match s with [] then e2 else match s with [h] ++ t then e1 else e3
  | TmMatch ({pat = (PatSeqEdge {prefix = [PatNamed {ident = PName _}],
                                 middle = PName _, postfix = []}) & pat1,
              thn = e1,
              els = TmMatch ({pat = (PatSeqTot {pats = []} & pat2),
                              thn = e2} & innerMatch)} & outerMatch) ->
    if eqExpr innerMatch.target outerMatch.target then
      rewriteTerm
        (TmMatch {{{outerMatch with pat = pat2}
                               with thn = e2}
                               with els = TmMatch {{innerMatch with pat = pat1}
                                                               with thn = e1}})
    else
      TmMatch outerMatch
  -- match s with [h] ++ t then e1 else e2 ->
  -- match s with [] then e2 else match s with [h] ++ t then e1 else never
  -- where e2 != match _ and e2 != never
  | TmMatch ({pat = PatSeqEdge {prefix = [PatNamed {ident = PName _}],
                                middle = PName _, postfix = [],
                                info = patInfo},
              els = !(TmMatch _ | TmNever _)} & t) ->
    let newThn = TmMatch {t with els = TmNever {ty = TyUnknown {info = t.info},
                                                info = t.info}} in
    rewriteTerm
      (TmMatch {{{t with pat = PatSeqTot {pats = [],
                                          ty = TyUnknown {info = patInfo},
                                          info = patInfo}}
                   with thn = t.els}
                   with els = newThn})
  -- match s with [] then e1 else e2 ->
  -- if null s then e1 else e2
  | TmMatch ({pat = PatSeqTot {pats = []}} & matchTm) ->
    let makeConstTerm = lam const : Const. lam info.
      TmConst {val = const, ty = tyWithInfo info (tyConst const),
               info = info}
    in
    let targetInfo = infoTm matchTm.target in
    let nullTarget = TmApp {
      lhs = makeConstTerm (CNull ()) targetInfo,
      rhs = matchTm.target,
      ty = TyBool {info = targetInfo},
      info = targetInfo} in
    let boolPat = PatBool {val = true, info = infoPat matchTm.pat,
                           ty = TyBool {info = infoPat matchTm.pat}} in
    TmMatch {{{{matchTm with target = rewriteTerm nullTarget}
                        with pat = boolPat}
                        with thn = rewriteTerm matchTm.thn}
                        with els = rewriteTerm matchTm.els}
  -- match s with [h] ++ t then e2 else never ->
  -- e2[h -> head s][t -> tail s]
  | TmMatch ({pat = PatSeqEdge {prefix = [PatNamed {ident = PName h}],
                                middle = PName t, postfix = []},
              els = TmNever _} & matchTm) ->
    let makeConstTerm = lam const : Const. lam info.
      TmConst {val = const, ty = tyWithInfo info (tyConst const),
               info = info}
    in
    let elemTy =
      match tyTm matchTm.target with TySeq {ty = elemTy} then
        elemTy
      else TyUnknown {info = infoTy (tyTm matchTm.target)} in
    let nameMap = mapFromSeq nameCmp [
      (h, lam info. TmApp {
        lhs = makeConstTerm (CHead ()) info,
        rhs = matchTm.target, ty = elemTy, info = info}),
      (t, lam info. TmApp {
        lhs = makeConstTerm (CTail ()) info,
        rhs = matchTm.target, ty = tyTm matchTm.target, info = info})] in
    rewriteTerm (substituteVariables nameMap matchTm.thn)
  | t -> smap_Expr_Expr rewriteTerm t
```
</ToggleWrapper>
</DocBlock>

