import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BoolParser  
  

Parsing of boolean literals

  
  
  
## Semantics  
  

          <DocBlock title="nextIdent" kind="sem">

```mc
sem nextIdent : Pos -> String -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextIdent (p: Pos) (xs: String) =
  | "true" ->
      let p2 = advanceCol p 4 in
      {val = TmConst {val = CBool {val = true},
                      ty = tyunknown_,
                      info = makeInfo p p2},
       pos = p2, str = xs}
  | "false" ->
      let p2 = advanceCol p 5 in
      {val = TmConst {val = CBool {val = false},
                      ty = tyunknown_,
                      info = makeInfo p p2},
       pos = p2, str = xs}
```
</ToggleWrapper>
</DocBlock>

