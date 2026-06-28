import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowOr  
  

  
  
  
## Semantics  
  

          <DocBlock title="decompose" kind="sem">

```mc
sem decompose : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem decompose name =
  | (shallow, PatOr x) ->
    match decompose name (shallow, x.lpat) with (lPass, lFail) in
    match decompose name (shallow, x.rpat) with (rPass, rFail) in
    let patFail = switch (lFail, rFail)
      case (Some l, Some r) then Some (PatOr {{x with lpat = l} with rpat = r})
      case (l & Some _, None ()) then l
      case (None (), r & Some _) then r
      case (None (), None ()) then None ()
      end in
    (concat lPass rPass, patFail)
```
</ToggleWrapper>
</DocBlock>

