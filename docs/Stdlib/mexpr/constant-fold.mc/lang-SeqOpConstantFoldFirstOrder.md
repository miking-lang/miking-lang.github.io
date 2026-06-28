import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpConstantFoldFirstOrder  
  

  
  
  
## Semantics  
  

          <DocBlock title="constantFoldConstAppConsts" kind="sem">

```mc
sem constantFoldConstAppConsts : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldConstAppConsts =
  | TmApp {lhs = TmConst {val = CHead _}, rhs = TmSeq r} -> head r.tms
  | TmApp {lhs = TmConst {val = CTail _}, rhs = TmSeq r} ->
    TmSeq { r with tms = tail r.tms }
  | TmApp {
    lhs = TmApp {lhs = TmConst {val = CGet _}, rhs = TmSeq r},
    rhs = TmConst {val = CInt {val = i}}
  } ->
    get r.tms i
  | TmApp {
    lhs = TmApp {
      lhs = TmApp {lhs = TmConst {val = CSet _}, rhs = TmSeq r},
      rhs = TmConst {val = CInt {val = i}}},
    rhs = val
  } ->
    TmSeq { r with tms = set r.tms i val }
  | TmApp {lhs = TmConst {val = CReverse _}, rhs = TmSeq r} ->
    TmSeq { r with tms = reverse r.tms }
  | TmApp {
    lhs = TmApp {
      lhs = TmApp {lhs = TmConst {val = CSubsequence _}, rhs = TmSeq r},
      rhs = TmConst {val = CInt {val = ofs}}},
    rhs = TmConst {val = CInt {val = len}}
  } ->
    TmSeq { r with tms = subsequence r.tms ofs len }
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="constantFoldConstApp" kind="sem">

```mc
sem constantFoldConstApp : Ast_Expr -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem constantFoldConstApp =
  | TmApp {
    lhs = TmApp {lhs = TmConst {val = CCons _}, rhs = val},
    rhs = TmSeq r
  } ->
    TmSeq { r with tms = cons val r.tms }
  | TmApp {
    lhs = TmApp {lhs = TmConst {val = CSnoc _}, rhs = TmSeq r},
    rhs = val
  } ->
    TmSeq { r with tms = snoc r.tms val }
  | TmApp {
    lhs = TmApp {lhs = TmConst {val = CConcat _}, rhs = TmSeq r1},
    rhs = TmSeq r2
  } ->
    TmSeq { r1 with tms = concat r1.tms r2.tms }
  | TmApp (appr & {lhs = TmConst {val = CLength _}, rhs = TmSeq seqr}) ->
    TmConst {
      val = CInt { val = length seqr.tms },
      ty = appr.ty,
      info = appr.info
    }
  | TmApp (appr & {
    lhs = TmApp {lhs = TmConst {val = CSplitAt _}, rhs = TmSeq seqr},
    rhs = TmConst {val = CInt {val = i}}
  }) ->
    let t = splitAt seqr.tms i in
    tmTuple appr.info appr.ty
      [TmSeq { seqr with tms = t.0 }, TmSeq { seqr with tms = t.1 }]
```
</ToggleWrapper>
</DocBlock>

