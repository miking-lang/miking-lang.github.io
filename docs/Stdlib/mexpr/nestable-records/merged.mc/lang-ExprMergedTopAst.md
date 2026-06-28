import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExprMergedTopAst  
  

  
  
  
## Types  
  

          <DocBlock title="ExprMergedTopRecord" kind="type">

```mc
type ExprMergedTopRecord : { e: Merged, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type ExprMergedTopRecord =
    {e: Merged, info: Info}
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
  | ExprMergedTop ExprMergedTopRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_MergedTop_Merged" kind="sem">

```mc
sem smapAccumL_MergedTop_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedTop_Merged f acc =
  | ExprMergedTop x ->
    match
      match
        let e =
          x.e
        in
        f
          acc
          e
      with
        (acc, e)
      in
      (acc, { x
          with
          e =
            e })
    with
      (acc, x)
    in
    (acc, ExprMergedTop
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_MergedTop_info" kind="sem">

```mc
sem get_MergedTop_info : MergedBaseAst_MergedTop -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_MergedTop_info =
  | ExprMergedTop target ->
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
  | ExprMergedTop target ->
    ExprMergedTop
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

