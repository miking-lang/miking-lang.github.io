import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RepeatQuestionSHRegexOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHRegexOp" kind="syn">

```mc
syn SHRegexOp
```



<ToggleWrapper text="Code..">
```mc
syn SHRegexOp lstyle rstyle =
  | RepeatQuestionSHRegexOp {__br_info: Info, __br_terms: [Info]}
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
  | RepeatQuestionSHRegexOp x ->
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
  | RepeatQuestionSHRegexOp x ->
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
  | PostfixP {self = RepeatQuestionSHRegexOp x, leftChildAlts = [ l ] ++ _} ->
    match
      unsplit_SHRegexOp l
    with
      (linfo, l)
    in
    let info = mergeInfo linfo x.__br_info in
      (info, RepeatQuestionSHRegex
        { info = info,
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

