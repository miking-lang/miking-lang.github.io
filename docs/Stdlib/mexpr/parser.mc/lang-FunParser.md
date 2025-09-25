import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FunParser  
  

Parsing of a lambda

  
  
  
## Semantics  
  

          <DocBlock title="nextIdent" kind="sem">

```mc
sem nextIdent : Pos -> String -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextIdent (p: Pos) (xs: String) =
  | "lam" ->
    let r : StrPos = eatWSAC (advanceCol p 3) xs in
    let r2 : ParseResult String = parseIdent false r.pos r.str in
    let r3 : StrPos = matchKeyword "." r2.pos r2.str in
    let e : ParseResult Expr = parseExprMain r3.pos 0 r3.str in
    {val = TmLam {ident = nameNoSym r2.val, ty = tyunknown_,
                  tyAnnot = tyunknown_, tyParam = tyunknown_, body = e.val,
                  info = makeInfo p e.pos},
     pos = e.pos, str = e.str}
```
</ToggleWrapper>
</DocBlock>

