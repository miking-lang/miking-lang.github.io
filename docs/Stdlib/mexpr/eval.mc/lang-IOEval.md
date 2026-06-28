import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IOEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CPrint _, [TmSeq s]) ->
    let s = _evalSeqOfCharsToString info s.tms in
    print s;
    uunit_
  | (CPrintError _, [TmSeq s]) ->
    let s = _evalSeqOfCharsToString info s.tms in
    printError s;
    uunit_
  | (CDPrint _, [_]) -> uunit_
  | (CFlushStdout _, [_]) ->
    flushStdout ();
    uunit_
  | (CFlushStderr _, [_]) ->
    flushStderr ();
    uunit_
  | (CReadLine _, [_]) ->
    let s = readLine () in
    TmSeq {tms = map char_ s, ty = tyunknown_, info = NoInfo ()}
```
</ToggleWrapper>
</DocBlock>

