import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LineCommentParser  
  

Eat line comments of the form \-\-

  
  
  
## Semantics  
  

          <DocBlock title="eatWSAC" kind="sem">

```mc
sem eatWSAC : Pos -> String -> {pos: Pos, str: String}
```



<ToggleWrapper text="Code..">
```mc
sem eatWSAC (p : Pos)  =
  | "--" ++ xs ->
    recursive
    let remove = lam p. lam str.
      match str with "\n" ++ xs then eatWSAC (advanceRow p 1) xs else
      match str with [x] ++ xs then remove (advanceCol p 1) xs else
      eatWSAC p str
    in remove p xs
```
</ToggleWrapper>
</DocBlock>

