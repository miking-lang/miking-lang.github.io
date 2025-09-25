import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqOpEvalFirstOrder  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CHead _, [TmSeq s]) -> head s.tms
  | (CTail _, [TmSeq s]) -> TmSeq {s with tms = tail s.tms}
  | (CNull _, [TmSeq s]) -> TmConst {
    val = CBool {val = null s.tms}, ty = tyunknown_, info = NoInfo ()
  }
  | (CGet _, [TmSeq s, TmConst {val = CInt n}]) -> get s.tms n.val
  | (CSet _, [TmSeq s, TmConst {val = CInt n}, val]) ->
    TmSeq {s with tms = set s.tms n.val val}
  | (CCons _, [tm, TmSeq s]) -> TmSeq {s with tms = cons tm s.tms}
  | (CSnoc _, [TmSeq s, tm]) -> TmSeq {s with tms = snoc s.tms tm}
  | (CConcat _, [TmSeq s1, TmSeq s2]) ->
    TmSeq {s2 with tms = concat s1.tms s2.tms}
  | (CLength _, [TmSeq s]) ->
    TmConst {val = CInt {val = length s.tms}, ty = tyunknown_, info = NoInfo ()}
  | (CReverse _, [TmSeq s]) -> TmSeq {s with tms = reverse s.tms}
  | (CSplitAt _, [TmSeq s, TmConst {val = CInt n}]) ->
    let t = splitAt s.tms n.val in
    utuple_ [TmSeq {s with tms = t.0}, TmSeq {s with tms = t.1}]
  | (CIsList _, [TmSeq s]) ->
    TmConst {
      val = CBool {val = isList s.tms}, ty = tyunknown_, info = NoInfo ()
    }
  | (CIsRope _, [TmSeq s]) ->
    TmConst {
      val = CBool {val = isRope s.tms}, ty = tyunknown_, info = NoInfo ()
    }
  | (CSubsequence _, [
    TmSeq s, TmConst {val = CInt ofs}, TmConst {val = CInt len}
  ]) ->
    TmSeq {s with tms = subsequence s.tms ofs.val len.val}
```
</ToggleWrapper>
</DocBlock>

