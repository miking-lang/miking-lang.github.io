import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SysEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CError _, [TmSeq s]) ->
    errorSingle [info] (_evalSeqOfCharsToString info s.tms)
  | (CExit _, [TmConst {val = CInt n}]) -> exit n.val
  | (CCommand _, [TmSeq s]) ->
    TmConst {
      val = CInt {val = command (_evalSeqOfCharsToString info s.tms)},
      ty = tyunknown_, info = NoInfo ()
    }
```
</ToggleWrapper>
</DocBlock>

