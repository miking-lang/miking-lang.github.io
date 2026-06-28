import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IfParser  
  

Parsing if expressions

  
  
  
## Semantics  
  

          <DocBlock title="nextIdent" kind="sem">

```mc
sem nextIdent : Pos -> String -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextIdent (p: Pos) (xs: String) =
  | "if" ->
     let e1 : ParseResult Expr = parseExprMain (advanceCol p 2) 0 xs in
     let r1 : StrPos = matchKeyword "then" e1.pos e1.str in
     let e2 : ParseResult Expr = parseExprMain r1.pos 0 r1.str in
     let r2 : StrPos = matchKeyword "else" e2.pos e2.str  in
     let e3 : ParseResult Expr = parseExprMain r2.pos 0 r2.str in
     {val = TmMatch {target = e1.val, pat = ptrue_,
                     thn = e2.val, els = e3.val, ty = tyunknown_,
                     info = makeInfo p e3.pos},
      pos = e3.pos,
      str = e3.str}
```
</ToggleWrapper>
</DocBlock>

