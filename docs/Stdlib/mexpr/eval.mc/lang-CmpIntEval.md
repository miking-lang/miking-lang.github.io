import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CmpIntEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CEqi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CBool {val = eqi n1.val n2.val}}
  | (CNeqi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CBool {val = neqi n1.val n2.val}}
  | (CLti _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CBool {val = lti n1.val n2.val}}
  | (CGti _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CBool {val = gti n1.val n2.val}}
  | (CLeqi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CBool {val = leqi n1.val n2.val}}
  | (CGeqi _, [TmConst {val = CInt n1}, TmConst (t & {val = CInt n2})]) ->
    TmConst {t with val = CBool {val = geqi n1.val n2.val}}
```
</ToggleWrapper>
</DocBlock>

