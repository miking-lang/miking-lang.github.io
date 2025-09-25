import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindCmp  
  

  
  
  
## Semantics  
  

          <DocBlock title="cmpKind" kind="sem">

```mc
sem cmpKind : _a -> Int
```



<ToggleWrapper text="Code..">
```mc
sem cmpKind =
  | (Data l, Data r) ->
    let recCmp = lam r1. lam r2.
      let lowerDiff = setCmp r1.lower r2.lower in
      if eqi lowerDiff 0 then
        switch (r1.upper, r2.upper)
        case (Some u1, Some u2) then setCmp u1 u2
        case (Some _, None _) then 1
        case (None _, Some _) then negi 1
        case _ then 0
        end
      else lowerDiff
    in
    mapCmp recCmp l.types r.types
```
</ToggleWrapper>
</DocBlock>

