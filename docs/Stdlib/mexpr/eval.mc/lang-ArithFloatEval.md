import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithFloatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CAddf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CFloat {val = addf f1.val f2.val}}
  | (CSubf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CFloat {val = subf f1.val f2.val}}
  | (CMulf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CFloat {val = mulf f1.val f2.val}}
  | (CDivf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CFloat {val = divf f1.val f2.val}}
  | (CNegf _, [TmConst (t & {val = CFloat f})]) ->
    TmConst {t with val = CFloat {val = negf f.val}}
```
</ToggleWrapper>
</DocBlock>

