import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IncludeMergedTopAst  
  

  
  
  
## Types  
  

          <DocBlock title="IncludeMergedTopRecord" kind="type">

```mc
type IncludeMergedTopRecord : { info: Info, path: { i: Info, v: String } }
```



<ToggleWrapper text="Code..">
```mc
type IncludeMergedTopRecord =
    {info: Info, path: {i: Info, v: String}}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="MergedTop" kind="syn">

```mc
syn MergedTop
```



<ToggleWrapper text="Code..">
```mc
syn MergedTop =
  | IncludeMergedTop IncludeMergedTopRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_MergedTop_info" kind="sem">

```mc
sem get_MergedTop_info : MergedBaseAst_MergedTop -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_MergedTop_info =
  | IncludeMergedTop target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_MergedTop_info" kind="sem">

```mc
sem set_MergedTop_info : Info -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```



<ToggleWrapper text="Code..">
```mc
sem set_MergedTop_info val =
  | IncludeMergedTop target ->
    IncludeMergedTop
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

