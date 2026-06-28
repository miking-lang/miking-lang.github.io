import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# WSACParser  
  

Base language for whitespace and comments \(WSAC\) parsing

  
  
  
## Semantics  
  

          <DocBlock title="eatWSAC" kind="sem">

```mc
sem eatWSAC : all a. Pos -> a -> {pos: Pos, str: a}
```



<ToggleWrapper text="Code..">
```mc
sem eatWSAC (p : Pos) =
  | x -> {str = x, pos = p}
```
</ToggleWrapper>
</DocBlock>

