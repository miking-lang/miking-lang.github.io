import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordSubMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="RecordSubMergedRecord" kind="type">

```mc
type RecordSubMergedRecord : { info: Info, left: Merged, fields: [{ i: Info, v: String }] }
```



<ToggleWrapper text="Code..">
```mc
type RecordSubMergedRecord =
    {info: Info, left: Merged, fields: [{i: Info, v: String}]}
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
  | RecordSubMerged RecordSubMergedRecord
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
  | RecordSubMerged x ->
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
    (acc, RecordSubMerged
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
  | RecordSubMerged target ->
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
  | RecordSubMerged target ->
    RecordSubMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

