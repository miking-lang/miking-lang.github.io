import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprMergedTopOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedTopOp" kind="syn">

```mc
syn MergedTopOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedTopOp lstyle rstyle =
  | ExprMergedTopOp {e: [Merged], __br_info: Info, __br_terms: [Info]}
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
  | ExprMergedTopOp x ->
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
  | ExprMergedTopOp x ->
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
  | AtomP {self = ExprMergedTopOp x} ->
    (x.__br_info, ExprMergedTop
      { info =
          x.__br_info,
        e =
          match
            x.e
          with
            [ x1 ] ++ _
          in
          x1 })
```
</ToggleWrapper>
</DocBlock>

