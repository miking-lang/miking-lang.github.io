import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordSHRegexAst  
  

  
  
  
## Types  
  

          <DocBlock title="RecordSHRegexRecord" kind="type">

```mc
type RecordSHRegexRecord : { info: Info, regex: SHRegex }
```



<ToggleWrapper text="Code..">
```mc
type RecordSHRegexRecord =
    {info: Info, regex: SHRegex}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHRegex" kind="syn">

```mc
syn SHRegex
```



<ToggleWrapper text="Code..">
```mc
syn SHRegex =
  | RecordSHRegex RecordSHRegexRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHRegex_SHRegex" kind="sem">

```mc
sem smapAccumL_SHRegex_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHRegex_SHRegex f acc =
  | RecordSHRegex x ->
    match
      match
        let regex = x.regex in
        f acc regex
      with
        (acc, regex)
      in
      (acc, { x with regex = regex })
    with
      (acc, x)
    in
    (acc, RecordSHRegex
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHRegex_info" kind="sem">

```mc
sem get_SHRegex_info : SelfhostBaseAst_SHRegex -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHRegex_info =
  | RecordSHRegex target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHRegex_info" kind="sem">

```mc
sem set_SHRegex_info : Info -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```



<ToggleWrapper text="Code..">
```mc
sem set_SHRegex_info val =
  | RecordSHRegex target ->
    RecordSHRegex
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

