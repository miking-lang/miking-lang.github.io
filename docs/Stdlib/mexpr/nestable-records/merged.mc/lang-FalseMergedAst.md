import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FalseMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="FalseMergedRecord" kind="type">

```mc
type FalseMergedRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type FalseMergedRecord =
    {info: Info}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Merged" kind="syn">

```mc
syn Merged
```



<ToggleWrapper text="Code..">
```mc
syn Merged =
  | FalseMerged FalseMergedRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_Merged_info" kind="sem">

```mc
sem get_Merged_info : MergedBaseAst_Merged -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_Merged_info =
  | FalseMerged target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_Merged_info" kind="sem">

```mc
sem set_Merged_info : Info -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```



<ToggleWrapper text="Code..">
```mc
sem set_Merged_info val =
  | FalseMerged target ->
    FalseMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

