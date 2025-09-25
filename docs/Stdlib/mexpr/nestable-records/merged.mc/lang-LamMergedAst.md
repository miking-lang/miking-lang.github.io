import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LamMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="LamMergedRecord" kind="type">

```mc
type LamMergedRecord : { info: Info, ident: Option { i: Info, v: Name }, right: Merged, tyAnnot: Option Merged }
```



<ToggleWrapper text="Code..">
```mc
type LamMergedRecord =
    {info: Info, ident: Option {i: Info, v: Name}, right: Merged, tyAnnot: Option Merged}
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
  | LamMerged LamMergedRecord
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
  | LamMerged x ->
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
      match
          let tyAnnot =
            x.tyAnnot
          in
          optionMapAccum
            (lam acc1.
               lam x1.
                 f
                   acc1
                   x1)
            acc
            tyAnnot
        with
          (acc, tyAnnot)
        in
        (acc, { { x
              with
              right =
                right }
            with
            tyAnnot =
              tyAnnot })
    with
      (acc, x)
    in
    (acc, LamMerged
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
  | LamMerged target ->
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
  | LamMerged target ->
    LamMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

