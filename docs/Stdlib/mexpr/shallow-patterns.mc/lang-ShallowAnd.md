import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ShallowAnd  
  

  
  
  
## Semantics  
  

          <DocBlock title="decompose" kind="sem">

```mc
sem decompose : Name -> (ShallowBase_SPat, Ast_Pat) -> (ShallowBase_PatUpdate, Option Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem decompose name =
  | (shallow, PatAnd x) ->
    match decompose name (shallow, x.lpat) with (lPass, lFail) in
    match decompose name (shallow, x.rpat) with (rPass, rFail) in
    let mkAnd = lam l. lam r. PatAnd {{x with lpat = l} with rpat = r} in
    let mergeOnePass : BranchInfo -> BranchInfo -> BranchInfo
      = lam l. lam r. (mapUnionWith mkAnd l.0 r.0, mapUnion l.1 r.1) in
    (seqLiftA2 mergeOnePass lPass rPass, optionZipWith mkAnd lFail rFail)
```
</ToggleWrapper>
</DocBlock>

