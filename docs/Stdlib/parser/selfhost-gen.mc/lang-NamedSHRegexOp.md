import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedSHRegexOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHRegexOp" kind="syn">

```mc
syn SHRegexOp
```



<ToggleWrapper text="Code..">
```mc
syn SHRegexOp lstyle rstyle =
  | NamedSHRegexOp {name: [{i: Info, v: String}], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_SHRegexOp" kind="sem">

```mc
sem getInfo_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHRegexOp =
  | NamedSHRegexOp x ->
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
  | NamedSHRegexOp x ->
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
  | PrefixP {self = NamedSHRegexOp x, rightChildAlts = [ r ] ++ _} ->
    match
      unsplit_SHRegexOp r
    with
      (rinfo, r)
    in
    let info = mergeInfo x.__br_info rinfo in
      (info, NamedSHRegex
        { info = info,
          name =
            match
              x.name
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

