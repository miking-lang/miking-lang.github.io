import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IncludeMergedTopOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedTopOp" kind="syn">

```mc
syn MergedTopOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedTopOp lstyle rstyle =
  | IncludeMergedTopOp {path: [{i: Info, v: String}], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_MergedTopOp" kind="sem">

```mc
sem getInfo_MergedTopOp : all lstyle. all rstyle. MergedTopOpBase_MergedTopOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_MergedTopOp =
  | IncludeMergedTopOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_MergedTopOp" kind="sem">

```mc
sem getTerms_MergedTopOp : all lstyle. all rstyle. MergedTopOpBase_MergedTopOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_MergedTopOp =
  | IncludeMergedTopOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_MergedTopOp" kind="sem">

```mc
sem unsplit_MergedTopOp : PermanentNode MergedTopOpBase_MergedTopOp -> (Info, MergedBaseAst_MergedTop)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_MergedTopOp =
  | AtomP {self = IncludeMergedTopOp x} ->
    (x.__br_info, IncludeMergedTop
      { info =
          x.__br_info,
        path =
          match
            x.path
          with
            [ x1 ] ++ _
          in
          x1 })
```
</ToggleWrapper>
</DocBlock>

