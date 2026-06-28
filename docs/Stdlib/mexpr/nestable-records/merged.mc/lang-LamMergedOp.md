import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamMergedOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedOp" kind="syn">

```mc
syn MergedOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedOp lstyle rstyle =
  | LamMergedOp {ident: [{i: Info, v: Name}], tyAnnot: [Merged], __br_info: Info, __br_terms: [Info]}
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
  | LamMergedOp x ->
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
  | LamMergedOp x ->
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
  | PrefixP {self = LamMergedOp x, rightChildAlts = [ r ] ++ _} ->
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
      (info, LamMerged
        { info =
            info,
          ident =
            match
              x.ident
            with
              [ x1 ] ++ _
            then
              Some
                x1
            else
              None
                {},
          tyAnnot =
            match
              x.tyAnnot
            with
              [ x2 ] ++ _
            then
              Some
                x2
            else
              None
                {},
          right =
            match
              [ r ]
            with
              [ x3 ] ++ _
            in
            x3 })
```
</ToggleWrapper>
</DocBlock>

