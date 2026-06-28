import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TimeEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CSleepMs _, [TmConst {val = CInt n}]) ->
    sleepMs n.val;
    uunit_
  | (CWallTimeMs _, [_]) ->
    float_ (wallTimeMs ())
```
</ToggleWrapper>
</DocBlock>

