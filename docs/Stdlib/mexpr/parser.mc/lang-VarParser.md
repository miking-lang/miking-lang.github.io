import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarParser  
  

Parse variable

  
  
  
## Semantics  
  

          <DocBlock title="nextIdent" kind="sem">

```mc
sem nextIdent : Pos -> String -> String -> {pos: Pos, str: String, val: Ast_Expr}
```



<ToggleWrapper text="Code..">
```mc
sem nextIdent (p: Pos) (xs: String) =
  | x ->
      let p2 = advanceCol p (length x) in
      {val = TmVar {ident = nameNoSym x, ty = tyunknown_, info = makeInfo p p2, frozen = false},
       pos = p2, str = xs}
```
</ToggleWrapper>
</DocBlock>

