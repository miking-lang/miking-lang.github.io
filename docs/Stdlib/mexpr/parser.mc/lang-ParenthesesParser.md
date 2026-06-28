import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParenthesesParser  
  

Parse parentheses

  
  
  
## Semantics  
  

          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p: Pos) =
  | "(" ++ xs ->
    let e : ParseResult Expr = parseExprMain (advanceCol p 1) 0 xs in
    let r : StrPos = matchKeyword ")" e.pos e.str in
    {val = e.val, pos = r.pos, str = r.str}
```
</ToggleWrapper>
</DocBlock>

