import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SymbEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CGensym _, [_]) ->
    TmConst {val = CSymb {val = gensym ()}, ty = tyunknown_, info = NoInfo ()}
  | (CSym2hash _, [TmConst (t & {val = CSymb s})]) ->
    TmConst {t with val = CInt {val = sym2hash s.val}}
```
</ToggleWrapper>
</DocBlock>

