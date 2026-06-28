import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FloatIntConversionEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CFloorfi _, [TmConst (t & {val = CFloat r})]) ->
    TmConst {t with val = CInt {val = floorfi r.val}}
  | (CCeilfi _, [TmConst (t & {val = CFloat r})]) ->
    TmConst {t with val = CInt {val = ceilfi r.val}}
  | (CRoundfi _, [TmConst (t & {val = CFloat r})]) ->
    TmConst {t with val = CInt {val = roundfi r.val}}
  | (CInt2float _, [TmConst (t & {val = CInt n})]) ->
    TmConst {t with val = CFloat {val = int2float n.val}}
```
</ToggleWrapper>
</DocBlock>

