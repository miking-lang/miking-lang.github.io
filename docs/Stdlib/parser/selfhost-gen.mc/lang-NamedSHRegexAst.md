import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedSHRegexAst  
  

  
  
  
## Types  
  

          <DocBlock title="NamedSHRegexRecord" kind="type">

```mc
type NamedSHRegexRecord : { info: Info, name: { i: Info, v: String }, right: SHRegex }
```



<ToggleWrapper text="Code..">
```mc
type NamedSHRegexRecord =
    {info: Info, name: {i: Info, v: String}, right: SHRegex}
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
  | NamedSHRegex NamedSHRegexRecord
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
  | NamedSHRegex x ->
    match
      match
        let right = x.right in
        f acc right
      with
        (acc, right)
      in
      (acc, { x with right = right })
    with
      (acc, x)
    in
    (acc, NamedSHRegex
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
  | NamedSHRegex target ->
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
  | NamedSHRegex target ->
    NamedSHRegex
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

