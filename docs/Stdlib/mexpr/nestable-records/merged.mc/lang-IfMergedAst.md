import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IfMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="IfMergedRecord" kind="type">

```mc
type IfMergedRecord : { els: Merged, thn: Merged, info: Info, target: Merged }
```



<ToggleWrapper text="Code..">
```mc
type IfMergedRecord =
    {els: Merged, thn: Merged, info: Info, target: Merged}
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
  | IfMerged IfMergedRecord
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
  | IfMerged x ->
    match
      match
        let els =
          x.els
        in
        f
          acc
          els
      with
        (acc, els)
      in
      match
          let thn =
            x.thn
          in
          f
            acc
            thn
        with
          (acc, thn)
        in
        match
            let target =
              x.target
            in
            f
              acc
              target
          with
            (acc, target)
          in
          (acc, { { { x
                  with
                  els =
                    els }
                with
                thn =
                  thn }
              with
              target =
                target })
    with
      (acc, x)
    in
    (acc, IfMerged
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
  | IfMerged target ->
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
  | IfMerged target ->
    IfMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

