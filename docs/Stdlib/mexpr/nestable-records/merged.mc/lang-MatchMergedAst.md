import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MatchMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="MatchMergedRecord" kind="type">

```mc
type MatchMergedRecord : { els: Merged, pat: Merged, thn: Merged, info: Info, target: Merged }
```



<ToggleWrapper text="Code..">
```mc
type MatchMergedRecord =
    {els: Merged, pat: Merged, thn: Merged, info: Info, target: Merged}
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
  | MatchMerged MatchMergedRecord
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
  | MatchMerged x ->
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
          let pat =
            x.pat
          in
          f
            acc
            pat
        with
          (acc, pat)
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
            (acc, { { { { x
                      with
                      els =
                        els }
                    with
                    pat =
                      pat }
                  with
                  thn =
                    thn }
                with
                target =
                  target })
    with
      (acc, x)
    in
    (acc, MatchMerged
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
  | MatchMerged target ->
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
  | MatchMerged target ->
    MatchMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

