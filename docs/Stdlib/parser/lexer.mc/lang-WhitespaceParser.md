import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# WhitespaceParser  
  

Eats whitespace

  
  
  
## Semantics  
  

          <DocBlock title="eatWSAC" kind="sem">

```mc
sem eatWSAC : Pos -> String -> {pos: Pos, str: String}
```



<ToggleWrapper text="Code..">
```mc
sem eatWSAC (p : Pos)  =
  | " " ++ xs -> eatWSAC (advanceCol p 1)  xs
  | "\t" ++ xs -> eatWSAC (advanceCol p tabSpace) xs
  | "\n" ++ xs -> eatWSAC (advanceRow p 1) xs
  | "\r" ++ xs -> eatWSAC p xs
```
</ToggleWrapper>
</DocBlock>

