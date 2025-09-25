import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FileOpEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CFileRead _, [TmSeq s]) ->
    let f = _evalSeqOfCharsToString info s.tms in
    str_ (readFile f)
  | (CFileWrite _, [TmSeq f, TmSeq s]) ->
    let f = _evalSeqOfCharsToString info f.tms in
    let d = _evalSeqOfCharsToString info s.tms in
    writeFile f d;
    uunit_
  | (CFileExists _, [TmSeq s]) ->
    let f = _evalSeqOfCharsToString info s.tms in
    TmConst {
      val = CBool {val = fileExists f}, ty = tyunknown_, info = NoInfo ()
    }
  | (CFileDelete _, [TmSeq s]) ->
    let f = _evalSeqOfCharsToString info s.tms in
    deleteFile f;
    uunit_
```
</ToggleWrapper>
</DocBlock>

