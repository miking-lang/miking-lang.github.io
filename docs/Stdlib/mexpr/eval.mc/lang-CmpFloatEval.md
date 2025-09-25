import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpFloatEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CEqf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CBool {val = eqf f1.val f2.val}}
  | (CLtf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CBool {val = ltf f1.val f2.val}}
  | (CLeqf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CBool {val = leqf f1.val f2.val}}
  | (CGtf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CBool {val = gtf f1.val f2.val}}
  | (CGeqf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CBool {val = geqf f1.val f2.val}}
  | (CNeqf _, [TmConst {val = CFloat f1}, TmConst (t & {val = CFloat f2})]) ->
    TmConst {t with val = CBool {val = neqf f1.val f2.val}}
```
</ToggleWrapper>
</DocBlock>

