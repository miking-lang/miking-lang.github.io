import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DefMergedTopAst  
  

  
  
  
## Types  
  

          <DocBlock title="DefMergedTopRecord" kind="type">

```mc
type DefMergedTopRecord : { b: Binder, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type DefMergedTopRecord =
    {b: Binder, info: Info}
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
  | DefMergedTop DefMergedTopRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_MergedTop_Binder" kind="sem">

```mc
sem smapAccumL_MergedTop_Binder : all a. (a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedTop_Binder f acc =
  | DefMergedTop x ->
    match
      match
        let b =
          x.b
        in
        f
          acc
          b
      with
        (acc, b)
      in
      (acc, { x
          with
          b =
            b })
    with
      (acc, x)
    in
    (acc, DefMergedTop
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
  | DefMergedTop target ->
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
  | DefMergedTop target ->
    DefMergedTop
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

