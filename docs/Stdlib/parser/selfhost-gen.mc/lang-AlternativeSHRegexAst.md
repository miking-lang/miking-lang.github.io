import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AlternativeSHRegexAst  
  

  
  
  
## Types  
  

          <DocBlock title="AlternativeSHRegexRecord" kind="type">

```mc
type AlternativeSHRegexRecord : { info: Info, left: SHRegex, right: SHRegex }
```



<ToggleWrapper text="Code..">
```mc
type AlternativeSHRegexRecord =
    {info: Info, left: SHRegex, right: SHRegex}
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
  | AlternativeSHRegex AlternativeSHRegexRecord
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
  | AlternativeSHRegex x ->
    match
      match
        let left = x.left in
        f acc left
      with
        (acc, left)
      in
      match
          let right = x.right in
          f acc right
        with
          (acc, right)
        in
        (acc, { x with left = left, right = right })
    with
      (acc, x)
    in
    (acc, AlternativeSHRegex
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
  | AlternativeSHRegex target ->
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
  | AlternativeSHRegex target ->
    AlternativeSHRegex
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

