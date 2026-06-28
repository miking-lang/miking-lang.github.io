import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BindMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="BindMergedRecord" kind="type">

```mc
type BindMergedRecord : { info: Info, right: Merged, binder: Binder }
```



<ToggleWrapper text="Code..">
```mc
type BindMergedRecord =
    {info: Info, right: Merged, binder: Binder}
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
  | BindMerged BindMergedRecord
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
  | BindMerged x ->
    match
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
      (acc, { x
          with
          right =
            right })
    with
      (acc, x)
    in
    (acc, BindMerged
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Merged_Binder" kind="sem">

```mc
sem smapAccumL_Merged_Binder : all a. (a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Merged_Binder f acc =
  | BindMerged x ->
    match
      match
        let binder =
          x.binder
        in
        f
          acc
          binder
      with
        (acc, binder)
      in
      (acc, { x
          with
          binder =
            binder })
    with
      (acc, x)
    in
    (acc, BindMerged
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
  | BindMerged target ->
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
  | BindMerged target ->
    BindMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

