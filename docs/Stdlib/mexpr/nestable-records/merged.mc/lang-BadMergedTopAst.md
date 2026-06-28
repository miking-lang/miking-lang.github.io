import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BadMergedTopAst  
  

  
  
  
## Types  
  

          <DocBlock title="BadMergedTopRecord" kind="type">

```mc
type BadMergedTopRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type BadMergedTopRecord =
    {info: Info}
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
  | BadMergedTop BadMergedTopRecord
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
  | BadMergedTop target ->
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
  | BadMergedTop target ->
    BadMergedTop
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

