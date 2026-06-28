import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpCharEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CEqc _, [TmConst {val = CChar c1}, TmConst (t & {val = CChar c2})]) ->
    TmConst {t with val = CBool {val = eqc c1.val c2.val}}
```
</ToggleWrapper>
</DocBlock>

