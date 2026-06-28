import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# KeywordUtils  
  

Fragment for simple parsing of keyword

  
  
  
## Semantics  
  

          <DocBlock title="matchKeyword" kind="sem">

```mc
sem matchKeyword : String -> Pos -> String -> {pos: Pos, str: String}
```



<ToggleWrapper text="Code..">
```mc
sem matchKeyword (keyword: String) (p: Pos) =
  | s ->
     let r : StrPos = eatWSAC p s in
     if isPrefix eqc keyword r.str then
       let l = length keyword in
       {pos = advanceCol r.pos l, str = subsequence r.str l (subi (length r.str) l)}
     else
       posErrorExit r.pos (join ["Unknown character. Expected '", keyword, "'."])
```
</ToggleWrapper>
</DocBlock>

