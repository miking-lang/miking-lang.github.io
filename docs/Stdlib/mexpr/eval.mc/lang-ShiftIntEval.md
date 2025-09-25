import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShiftIntEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CSlli _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = slli n1.val n2.val}}
  | (CSrli _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = srli n1.val n2.val}}
  | (CSrai _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = srai n1.val n2.val}}
```
</ToggleWrapper>
</DocBlock>

