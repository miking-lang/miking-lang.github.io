import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordSubMergedOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedOp" kind="syn">

```mc
syn MergedOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedOp lstyle rstyle =
  | RecordSubMergedOp {fields: [{i: Info, v: String}], __br_info: Info, __br_terms: [Info]}
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
  | RecordSubMergedOp x ->
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
  | RecordSubMergedOp x ->
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
  | PostfixP {self = RecordSubMergedOp x, leftChildAlts = [ l ] ++ _} ->
    match
      unsplit_MergedOp
        l
    with
      (linfo, l)
    in
    let info =
        mergeInfo
          linfo
          x.__br_info
      in
      (info, RecordSubMerged
        { info =
            info,
          fields =
            x.fields,
          left =
            match
              [ l ]
            with
              [ x1 ] ++ _
            in
            x1 })
```
</ToggleWrapper>
</DocBlock>

