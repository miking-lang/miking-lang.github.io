import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MultilineCommentParser  
  

Eat multiline comment of the form /\-  \-/

  
  
  
## Semantics  
  

          <DocBlock title="eatWSAC" kind="sem">

```mc
sem eatWSAC : Pos -> String -> {pos: Pos, str: String}
```



<ToggleWrapper text="Code..">
```mc
sem eatWSAC (p : Pos) =
  | "/-" ++ xs ->
    recursive
    let remove = lam p. lam str. lam d.
      match str with "/-" ++ xs then remove (advanceCol p 2) xs (addi d 1) else
      match str with "\n" ++ xs then remove (advanceRow p 1) xs d else
      match str with "-/" ++ xs then
        if eqi d 1 then eatWSAC (advanceCol p 2) xs
        else remove (advanceCol p 2) xs (subi d 1) else
      match str with [_] ++ xs then remove (advanceCol p 1) xs d else
      if eqi d 0 then eatWSAC p str else posErrorExit p "Unmatched multiline comments."
    in remove (advanceCol p 2) xs 1
```
</ToggleWrapper>
</DocBlock>

