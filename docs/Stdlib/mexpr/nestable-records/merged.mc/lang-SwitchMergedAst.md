import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SwitchMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="SwitchMergedRecord" kind="type">

```mc
type SwitchMergedRecord : { fail: Info, info: Info, cases: [{ pat: Merged, thn: Merged, keyword: Info }], target: Merged }
```



<ToggleWrapper text="Code..">
```mc
type SwitchMergedRecord =
    {fail: Info, info: Info, cases: [{pat: Merged, thn: Merged, keyword: Info}], target: Merged}
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
  | SwitchMerged SwitchMergedRecord
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
  | SwitchMerged x ->
    match
      match
        let cases =
          x.cases
        in
        mapAccumL
          (lam acc1.
             lam x1: {pat: Merged, thn: Merged, keyword: Info}.
               match
                 let pat =
                   x1.pat
                 in
                 f
                   acc1
                   pat
               with
                 (acc1, pat)
               in
               match
                   let thn =
                     x1.thn
                   in
                   f
                     acc1
                     thn
                 with
                   (acc1, thn)
                 in
                 (acc1, { { x1
                       with
                       pat =
                         pat }
                     with
                     thn =
                       thn }))
          acc
          cases
      with
        (acc, cases)
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
        (acc, { { x
              with
              cases =
                cases }
            with
            target =
              target })
    with
      (acc, x)
    in
    (acc, SwitchMerged
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
  | SwitchMerged target ->
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
  | SwitchMerged target ->
    SwitchMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

