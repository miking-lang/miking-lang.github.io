import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BindMergedOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedOp" kind="syn">

```mc
syn MergedOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedOp lstyle rstyle =
  | BindMergedOp {binder: [Binder], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_MergedOp" kind="sem">

```mc
sem getInfo_MergedOp : all lstyle. all rstyle. MergedOpBase_MergedOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_MergedOp =
  | BindMergedOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_MergedOp" kind="sem">

```mc
sem getTerms_MergedOp : all lstyle. all rstyle. MergedOpBase_MergedOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_MergedOp =
  | BindMergedOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_MergedOp" kind="sem">

```mc
sem unsplit_MergedOp : PermanentNode MergedOpBase_MergedOp -> (Info, MergedBaseAst_Merged)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_MergedOp =
  | PrefixP {self = BindMergedOp x, rightChildAlts = [ r ] ++ _} ->
    match
      unsplit_MergedOp
        r
    with
      (rinfo, r)
    in
    let info =
        mergeInfo
          x.__br_info
          rinfo
      in
      (info, BindMerged
        { info =
            info,
          binder =
            match
              x.binder
            with
              [ x1 ] ++ _
            in
            x1,
          right =
            match
              [ r ]
            with
              [ x2 ] ++ _
            in
            x2 })
```
</ToggleWrapper>
</DocBlock>

