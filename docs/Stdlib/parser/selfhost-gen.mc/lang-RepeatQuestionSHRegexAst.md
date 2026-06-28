import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RepeatQuestionSHRegexAst  
  

  
  
  
## Types  
  

          <DocBlock title="RepeatQuestionSHRegexRecord" kind="type">

```mc
type RepeatQuestionSHRegexRecord : { info: Info, left: SHRegex }
```



<ToggleWrapper text="Code..">
```mc
type RepeatQuestionSHRegexRecord =
    {info: Info, left: SHRegex}
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
  | RepeatQuestionSHRegex RepeatQuestionSHRegexRecord
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
  | RepeatQuestionSHRegex x ->
    match
      match
        let left = x.left in
        f acc left
      with
        (acc, left)
      in
      (acc, { x with left = left })
    with
      (acc, x)
    in
    (acc, RepeatQuestionSHRegex
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
  | RepeatQuestionSHRegex target ->
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
  | RepeatQuestionSHRegex target ->
    RepeatQuestionSHRegex
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

