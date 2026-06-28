import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SequenceMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="SequenceMergedRecord" kind="type">

```mc
type SequenceMergedRecord : { tms: [Merged], info: Info }
```



<ToggleWrapper text="Code..">
```mc
type SequenceMergedRecord =
    {tms: [Merged], info: Info}
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
  | SequenceMerged SequenceMergedRecord
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
  | SequenceMerged x ->
    match
      match
        let tms =
          x.tms
        in
        mapAccumL
          (lam acc1.
             lam x1: Merged.
               f
                 acc1
                 x1)
          acc
          tms
      with
        (acc, tms)
      in
      (acc, { x
          with
          tms =
            tms })
    with
      (acc, x)
    in
    (acc, SequenceMerged
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
  | SequenceMerged target ->
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
  | SequenceMerged target ->
    SequenceMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

