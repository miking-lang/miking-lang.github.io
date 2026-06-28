import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConcatMergedOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedOp" kind="syn">

```mc
syn MergedOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedOp lstyle rstyle =
  | ConcatMergedOp {__br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="groupingsAllowed_MergedOp" kind="sem">

```mc
sem groupingsAllowed_MergedOp : all lstyle. all rstyle. (MergedOpBase_MergedOp lstyle ROpen, MergedOpBase_MergedOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_MergedOp =
  | (ConcatMergedOp _, ConcatMergedOp _) ->
    GLeft
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_MergedOp" kind="sem">

```mc
sem getInfo_MergedOp : all lstyle. all rstyle. MergedOpBase_MergedOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_MergedOp =
  | ConcatMergedOp x ->
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
  | ConcatMergedOp x ->
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
  | InfixP {self = ConcatMergedOp x, leftChildAlts = [ l ] ++ _, rightChildAlts = [ r ] ++ _} ->
    match
      (unsplit_MergedOp
        l, unsplit_MergedOp
        r)
    with
      ((linfo, l), (rinfo, r))
    in
    let info =
        foldl
          mergeInfo
          linfo
          [ x.__br_info,
            rinfo ]
      in
      (info, ConcatMerged
        { info =
            info,
          left =
            match
              [ l ]
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

