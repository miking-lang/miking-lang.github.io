import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ProjMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="ProjMergedRecord" kind="type">

```mc
type ProjMergedRecord : { info: Info, left: Merged, label: { i: Info, v: String } }
```



<ToggleWrapper text="Code..">
```mc
type ProjMergedRecord =
    {info: Info, left: Merged, label: {i: Info, v: String}}
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
  | ProjMerged ProjMergedRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_Merged_Merged" kind="sem">

```mc
sem smapAccumL_Merged_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Merged_Merged f acc =
  | ProjMerged x ->
    match
      match
        let left =
          x.left
        in
        f
          acc
          left
      with
        (acc, left)
      in
      (acc, { x
          with
          left =
            left })
    with
      (acc, x)
    in
    (acc, ProjMerged
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_Merged_info" kind="sem">

```mc
sem get_Merged_info : MergedBaseAst_Merged -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_Merged_info =
  | ProjMerged target ->
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
  | ProjMerged target ->
    ProjMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

