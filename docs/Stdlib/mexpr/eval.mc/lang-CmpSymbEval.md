import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpSymbEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CEqsym _, [TmConst {val = CSymb s1}, TmConst (t & {val = CSymb s2})]) ->
    TmConst {t with val = CBool {val = eqsym s1.val s2.val}}
```
</ToggleWrapper>
</DocBlock>

