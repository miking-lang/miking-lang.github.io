import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatStringConversionEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CStringIsFloat _, [TmSeq {tms = tms}]) ->
    TmConst {
      val = CBool {val = stringIsFloat (_evalSeqOfCharsToString info tms)},
      ty = tyunknown_,
      info = NoInfo ()
    }
  | (CString2float _, [TmSeq {tms = tms}]) ->
    TmConst {
      val = CFloat {val = string2float (_evalSeqOfCharsToString info tms)},
      ty = tyunknown_,
      info = NoInfo ()
    }
  | (CFloat2string _, [TmConst {val = CFloat f}]) ->
    TmSeq {
      tms = _evalStringToSeqOfChars (float2string f.val),
      ty = tyunknown_,
      info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>

