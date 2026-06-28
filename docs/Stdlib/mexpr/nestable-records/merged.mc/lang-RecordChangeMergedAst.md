import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordChangeMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="RecordChangeMergedRecord" kind="type">

```mc
type RecordChangeMergedRecord : { info: Info, left: Merged, fields: [{ ty: Option Merged, label: { i: Info, v: String }, value: Option Merged }] }
```



<ToggleWrapper text="Code..">
```mc
type RecordChangeMergedRecord =
    {info: Info, left: Merged, fields: [{ty: Option Merged, label: {i: Info, v: String}, value: Option Merged}]}
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
  | RecordChangeMerged RecordChangeMergedRecord
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
  | RecordChangeMerged x ->
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
          let fields =
            x.fields
          in
          mapAccumL
            (lam acc1.
               lam x1: {ty: Option Merged, label: {i: Info, v: String}, value: Option Merged}.
                 match
                   let ty =
                     x1.ty
                   in
                   optionMapAccum
                     (lam acc2.
                        lam x2.
                          f
                            acc2
                            x2)
                     acc1
                     ty
                 with
                   (acc1, ty)
                 in
                 match
                     let value =
                       x1.value
                     in
                     optionMapAccum
                       (lam acc3.
                          lam x3.
                            f
                              acc3
                              x3)
                       acc1
                       value
                   with
                     (acc1, value)
                   in
                   (acc1, { { x1
                         with
                         ty =
                           ty }
                       with
                       value =
                         value }))
            acc
            fields
        with
          (acc, fields)
        in
        (acc, { { x
              with
              left =
                left }
            with
            fields =
              fields })
    with
      (acc, x)
    in
    (acc, RecordChangeMerged
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
  | RecordChangeMerged target ->
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
  | RecordChangeMerged target ->
    RecordChangeMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

