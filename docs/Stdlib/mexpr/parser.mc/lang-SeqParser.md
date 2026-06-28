import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqParser  
  

Parses a sequence of

  
  
  
## Semantics  
  

          <DocBlock title="parseExprImp" kind="sem">

```mc
sem parseExprImp : Pos -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem parseExprImp (p: Pos) =
  | "[" ++ xs ->
    recursive let work = lam acc. lam first. lam p2. lam str.
      let r : StrPos = eatWSAC p2 str in
      match r.str with "]" ++ xs then
        {val = TmSeq{tms = acc, ty = tyunknown_, info = makeInfo p (advanceCol r.pos 1)},
         pos = advanceCol r.pos 1, str = xs}
      else
        let r2 : StrPos =
          if first then r else matchKeyword "," r.pos r.str in
        let e : ParseResult Expr = parseExprMain r2.pos 0 r2.str in
        work (snoc acc e.val) false e.pos e.str
    in work [] true (advanceCol p 1) xs
```
</ToggleWrapper>
</DocBlock>

