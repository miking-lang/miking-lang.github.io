import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ArithIntEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CAddi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = addi n1.val n2.val}}
  | (CSubi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = subi n1.val n2.val}}
  | (CMuli _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = muli n1.val n2.val}}
  | (CDivi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = divi n1.val n2.val}}
  | (CModi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CInt {val = modi n1.val n2.val}}
  | (CNegi _, [TmConst (t & {val = CInt n})]) ->
    TmConst {t with val = CInt {val = negi n.val}}
```
</ToggleWrapper>
</DocBlock>

