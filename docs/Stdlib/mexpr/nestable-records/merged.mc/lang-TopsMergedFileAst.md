import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TopsMergedFileAst  
  

  
  
  
## Types  
  

          <DocBlock title="TopsMergedFileRecord" kind="type">

```mc
type TopsMergedFileRecord : { info: Info, tops: [MergedTop] }
```



<ToggleWrapper text="Code..">
```mc
type TopsMergedFileRecord =
    {info: Info, tops: [MergedTop]}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="MergedFile" kind="syn">

```mc
syn MergedFile
```



<ToggleWrapper text="Code..">
```mc
syn MergedFile =
  | TopsMergedFile TopsMergedFileRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_MergedFile_MergedTop" kind="sem">

```mc
sem smapAccumL_MergedFile_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)) -> a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedFile_MergedTop f acc =
  | TopsMergedFile x ->
    match
      match
        let tops =
          x.tops
        in
        mapAccumL
          (lam acc1.
             lam x1: MergedTop.
               f
                 acc1
                 x1)
          acc
          tops
      with
        (acc, tops)
      in
      (acc, { x
          with
          tops =
            tops })
    with
      (acc, x)
    in
    (acc, TopsMergedFile
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_MergedFile_info" kind="sem">

```mc
sem get_MergedFile_info : MergedBaseAst_MergedFile -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_MergedFile_info =
  | TopsMergedFile target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_MergedFile_info" kind="sem">

```mc
sem set_MergedFile_info : Info -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```



<ToggleWrapper text="Code..">
```mc
sem set_MergedFile_info val =
  | TopsMergedFile target ->
    TopsMergedFile
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

