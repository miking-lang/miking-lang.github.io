import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IntCharConversionEval  
  

  
  
  
## Semantics  
  

          <DocBlock title="delta" kind="sem">

```mc
sem delta : Info -> (ConstAst_Const, [Ast_Expr]) -> Ast_Expr
```



<ToggleWrapper text="Code..">
```mc
sem delta info =
  | (CInt2Char _, [TmConst (t & {val = CInt n})]) ->
    TmConst {t with val = CChar {val = int2char n.val}}
  | (CChar2Int _, [TmConst (t & {val = CChar c})]) ->
    TmConst {t with val = CInt {val = char2int c.val}}
```
</ToggleWrapper>
</DocBlock>

