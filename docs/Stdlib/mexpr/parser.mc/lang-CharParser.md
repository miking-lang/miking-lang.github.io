import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# CharParser  
  

Parses character literals

  
  
  
## Semantics  
  

          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p: Pos) =
  | "\'" ++ xs ->
      let r : ParseResult Char = matchChar (advanceCol p 1) xs in
      let r2 : StrPos = matchKeyword "\'" r.pos r.str in
      {val = TmConst {val = CChar {val = r.val}, ty = tyunknown_,
                      info = makeInfo p r2.pos},
       pos = r2.pos, str = r2.str}
```
</ToggleWrapper>
</DocBlock>

