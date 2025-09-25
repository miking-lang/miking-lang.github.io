import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# OrMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="OrMergedRecord" kind="type">

```mc
type OrMergedRecord : { info: Info, left: Merged, right: Merged }
```



<ToggleWrapper text="Code..">
```mc
type OrMergedRecord =
    {info: Info, left: Merged, right: Merged}
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
  | OrMerged OrMergedRecord
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
  | OrMerged x ->
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
      match
          let right =
            x.right
          in
          f
            acc
            right
        with
          (acc, right)
        in
        (acc, { { x
              with
              left =
                left }
            with
            right =
              right })
    with
      (acc, x)
    in
    (acc, OrMerged
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
  | OrMerged target ->
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
  | OrMerged target ->
    OrMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

