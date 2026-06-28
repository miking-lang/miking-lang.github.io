import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TopsMergedFileOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedFileOp" kind="syn">

```mc
syn MergedFileOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedFileOp lstyle rstyle =
  | TopsMergedFileOp {tops: [MergedTop], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_MergedFileOp" kind="sem">

```mc
sem getInfo_MergedFileOp : all lstyle. all rstyle. MergedFileOpBase_MergedFileOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_MergedFileOp =
  | TopsMergedFileOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_MergedFileOp" kind="sem">

```mc
sem getTerms_MergedFileOp : all lstyle. all rstyle. MergedFileOpBase_MergedFileOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_MergedFileOp =
  | TopsMergedFileOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_MergedFileOp" kind="sem">

```mc
sem unsplit_MergedFileOp : PermanentNode MergedFileOpBase_MergedFileOp -> (Info, MergedBaseAst_MergedFile)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_MergedFileOp =
  | AtomP {self = TopsMergedFileOp x} ->
    (x.__br_info, TopsMergedFile
      { tops =
          x.tops,
        info =
          x.__br_info })
```
</ToggleWrapper>
</DocBlock>

