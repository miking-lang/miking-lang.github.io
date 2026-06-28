import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AllMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="AllMergedRecord" kind="type">

```mc
type AllMergedRecord : { rec: Option Info, info: Info, ident: { i: Info, v: Name }, right: Merged }
```



<ToggleWrapper text="Code..">
```mc
type AllMergedRecord =
    {rec: Option Info, info: Info, ident: {i: Info, v: Name}, right: Merged}
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
  | AllMerged AllMergedRecord
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
  | AllMerged x ->
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
    (acc, AllMerged
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
  | AllMerged target ->
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
  | AllMerged target ->
    AllMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

