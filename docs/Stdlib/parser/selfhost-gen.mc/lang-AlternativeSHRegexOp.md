import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AlternativeSHRegexOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHRegexOp" kind="syn">

```mc
syn SHRegexOp
```



<ToggleWrapper text="Code..">
```mc
syn SHRegexOp lstyle rstyle =
  | AlternativeSHRegexOp {__br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="groupingsAllowed_SHRegexOp" kind="sem">

```mc
sem groupingsAllowed_SHRegexOp : all lstyle. all rstyle. (SHRegexOpBase_SHRegexOp lstyle ROpen, SHRegexOpBase_SHRegexOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHRegexOp =
  | (AlternativeSHRegexOp _, AlternativeSHRegexOp _) ->
    GLeft
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_SHRegexOp" kind="sem">

```mc
sem getInfo_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHRegexOp =
  | AlternativeSHRegexOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHRegexOp" kind="sem">

```mc
sem getTerms_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_SHRegexOp =
  | AlternativeSHRegexOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHRegexOp" kind="sem">

```mc
sem unsplit_SHRegexOp : PermanentNode SHRegexOpBase_SHRegexOp -> (Info, SelfhostBaseAst_SHRegex)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_SHRegexOp =
  | InfixP {self = AlternativeSHRegexOp x, leftChildAlts = [ l ] ++ _, rightChildAlts = [ r ] ++ _} ->
    match
      (unsplit_SHRegexOp l, unsplit_SHRegexOp r)
    with
      ((linfo, l), (rinfo, r))
    in
    let info = foldl mergeInfo linfo [ x.__br_info,
            rinfo ]
      in
      (info, AlternativeSHRegex
        { info = info,
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

