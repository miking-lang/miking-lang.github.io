import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetParser  
  

Parsing let expressions

  
  
  
## Semantics  
  

          <DocBlock title="nextIdent" kind="sem">

```mc
sem nextIdent : Pos -> String -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextIdent (p: Pos) (xs: String) =
  | "let" ->
    let r : StrPos = eatWSAC (advanceCol p 3) xs in
    let r2 : ParseResult String = parseIdent false r.pos r.str in
    let r3 : StrPos = matchKeyword "=" r2.pos r2.str in
    let e1 : ParseResult Expr = parseExprMain r3.pos 0 r3.str in
    let r4 : StrPos = matchKeyword "in" e1.pos e1.str in
    let e2 : ParseResult Expr = parseExprMain r4.pos 0 r4.str in
    { val = TmDecl
      { decl = DeclLet
        { ident = nameNoSym r2.val
        , tyAnnot = tyunknown_
        , tyBody = tyunknown_
        , body = e1.val
        , info = makeInfo p e2.pos
        }
      , inexpr = e2.val
      , ty = tyunknown_
      , info = makeInfo p e2.pos
      }
    , pos = e2.pos
    , str = e2.str
    }
```
</ToggleWrapper>
</DocBlock>

