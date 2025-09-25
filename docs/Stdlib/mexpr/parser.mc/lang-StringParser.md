import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# StringParser  
  

Parses strings, including escape characters

  
  
  
## Semantics  
  

          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p: Pos) =
  | "\"" ++ xs ->
    recursive let work = lam acc. lam p2. lam str : String.
      match str with "\"" ++ xs then
        {val = TmSeq {tms = acc, ty = tyunknown_,
                      info = makeInfo p (advanceCol p2 1)},
	                    pos = advanceCol p2 1, str = xs}
      else
        let r : ParseResult Char = matchChar p2 str in
        let v = TmConst {val = CChar {val = r.val}, ty = tyunknown_,
                         info = makeInfo p2 r.pos} in
	      work (snoc acc v) r.pos r.str
    in
    work [] (advanceCol p 1) xs
```
</ToggleWrapper>
</DocBlock>

