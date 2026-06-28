import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="RecordMergedRecord" kind="type">

```mc
type RecordMergedRecord : { info: Info, fields: [{ e: Option Merged, ty: Option Merged, label: { i: Info, v: String } }] }
```



<ToggleWrapper text="Code..">
```mc
type RecordMergedRecord =
    {info: Info, fields: [{e: Option Merged, ty: Option Merged, label: {i: Info, v: String}}]}
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
  | RecordMerged RecordMergedRecord
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
  | RecordMerged x ->
    match
      match
        let fields =
          x.fields
        in
        mapAccumL
          (lam acc1.
             lam x1: {e: Option Merged, ty: Option Merged, label: {i: Info, v: String}}.
               match
                 let e =
                   x1.e
                 in
                 optionMapAccum
                   (lam acc2.
                      lam x2.
                        f
                          acc2
                          x2)
                   acc1
                   e
               with
                 (acc1, e)
               in
               match
                   let ty =
                     x1.ty
                   in
                   optionMapAccum
                     (lam acc3.
                        lam x3.
                          f
                            acc3
                            x3)
                     acc1
                     ty
                 with
                   (acc1, ty)
                 in
                 (acc1, { { x1
                       with
                       e =
                         e }
                     with
                     ty =
                       ty }))
          acc
          fields
      with
        (acc, fields)
      in
      (acc, { x
          with
          fields =
            fields })
    with
      (acc, x)
    in
    (acc, RecordMerged
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
  | RecordMerged target ->
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
  | RecordMerged target ->
    RecordMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

