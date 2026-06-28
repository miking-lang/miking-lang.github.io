import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UIntParser  
  

Parsing of an unsigned integer

  
  
  
## Semantics  
  

          <DocBlock title="nextNum" kind="sem">

```mc
sem nextNum : Pos -> String -> String -> Option Char -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextNum (p: Pos) (xs: String) (nval: String) =
  | _ ->
    let p2 = advanceCol p (length nval) in
    {val = TmConst {val = CInt {val = string2int nval},
                    ty = tyunknown_,
                    info = makeInfo p p2},
     pos = p2, str = xs}
```
</ToggleWrapper>
</DocBlock>

