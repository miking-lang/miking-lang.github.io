import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LiteralSHRegexAst  
  

  
  
  
## Types  
  

          <DocBlock title="LiteralSHRegexRecord" kind="type">

```mc
type LiteralSHRegexRecord : { val: { i: Info, v: String }, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type LiteralSHRegexRecord =
    {val: {i: Info, v: String}, info: Info}
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
  | LiteralSHRegex LiteralSHRegexRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_SHRegex_info" kind="sem">

```mc
sem get_SHRegex_info : SelfhostBaseAst_SHRegex -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHRegex_info =
  | LiteralSHRegex target ->
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
  | LiteralSHRegex target ->
    LiteralSHRegex
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

