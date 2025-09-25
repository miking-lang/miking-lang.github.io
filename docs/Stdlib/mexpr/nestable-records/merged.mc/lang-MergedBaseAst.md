import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MergedBaseAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Binder" kind="syn">

```mc
syn Binder
```



<ToggleWrapper text="Code..">
```mc
syn Binder =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="Merged" kind="syn">

```mc
syn Merged
```



<ToggleWrapper text="Code..">
```mc
syn Merged =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MergedTop" kind="syn">

```mc
syn MergedTop
```



<ToggleWrapper text="Code..">
```mc
syn MergedTop =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="MergedFile" kind="syn">

```mc
syn MergedFile
```



<ToggleWrapper text="Code..">
```mc
syn MergedFile =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_MergedFile_MergedFile" kind="sem">

```mc
sem smapAccumL_MergedFile_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)) -> a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedFile_MergedFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedFile_MergedFile" kind="sem">

```mc
sem smap_MergedFile_MergedFile : (MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile) -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedFile_MergedFile f =
  | x ->
    (smapAccumL_MergedFile_MergedFile
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedFile_MergedFile" kind="sem">

```mc
sem sfold_MergedFile_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> a) -> a -> MergedBaseAst_MergedFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedFile_MergedFile f acc =
  | x ->
    (smapAccumL_MergedFile_MergedFile
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedFile_MergedTop" kind="sem">

```mc
sem smapAccumL_MergedFile_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)) -> a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedFile_MergedTop f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedFile_MergedTop" kind="sem">

```mc
sem smap_MergedFile_MergedTop : (MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop) -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedFile_MergedTop f =
  | x ->
    (smapAccumL_MergedFile_MergedTop
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedFile_MergedTop" kind="sem">

```mc
sem sfold_MergedFile_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> a) -> a -> MergedBaseAst_MergedFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedFile_MergedTop f acc =
  | x ->
    (smapAccumL_MergedFile_MergedTop
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedFile_Merged" kind="sem">

```mc
sem smapAccumL_MergedFile_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedFile_Merged f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedFile_Merged" kind="sem">

```mc
sem smap_MergedFile_Merged : (MergedBaseAst_Merged -> MergedBaseAst_Merged) -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedFile_Merged f =
  | x ->
    (smapAccumL_MergedFile_Merged
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedFile_Merged" kind="sem">

```mc
sem sfold_MergedFile_Merged : all a. (a -> MergedBaseAst_Merged -> a) -> a -> MergedBaseAst_MergedFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedFile_Merged f acc =
  | x ->
    (smapAccumL_MergedFile_Merged
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedFile_Binder" kind="sem">

```mc
sem smapAccumL_MergedFile_Binder : all a. (a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)) -> a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedFile_Binder f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedFile_Binder" kind="sem">

```mc
sem smap_MergedFile_Binder : (MergedBaseAst_Binder -> MergedBaseAst_Binder) -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedFile_Binder f =
  | x ->
    (smapAccumL_MergedFile_Binder
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedFile_Binder" kind="sem">

```mc
sem sfold_MergedFile_Binder : all a. (a -> MergedBaseAst_Binder -> a) -> a -> MergedBaseAst_MergedFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedFile_Binder f acc =
  | x ->
    (smapAccumL_MergedFile_Binder
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedTop_MergedFile" kind="sem">

```mc
sem smapAccumL_MergedTop_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedTop_MergedFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedTop_MergedFile" kind="sem">

```mc
sem smap_MergedTop_MergedFile : (MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile) -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedTop_MergedFile f =
  | x ->
    (smapAccumL_MergedTop_MergedFile
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedTop_MergedFile" kind="sem">

```mc
sem sfold_MergedTop_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> a) -> a -> MergedBaseAst_MergedTop -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedTop_MergedFile f acc =
  | x ->
    (smapAccumL_MergedTop_MergedFile
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedTop_MergedTop" kind="sem">

```mc
sem smapAccumL_MergedTop_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedTop_MergedTop f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedTop_MergedTop" kind="sem">

```mc
sem smap_MergedTop_MergedTop : (MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop) -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedTop_MergedTop f =
  | x ->
    (smapAccumL_MergedTop_MergedTop
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedTop_MergedTop" kind="sem">

```mc
sem sfold_MergedTop_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> a) -> a -> MergedBaseAst_MergedTop -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedTop_MergedTop f acc =
  | x ->
    (smapAccumL_MergedTop_MergedTop
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedTop_Merged" kind="sem">

```mc
sem smapAccumL_MergedTop_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedTop_Merged f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedTop_Merged" kind="sem">

```mc
sem smap_MergedTop_Merged : (MergedBaseAst_Merged -> MergedBaseAst_Merged) -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedTop_Merged f =
  | x ->
    (smapAccumL_MergedTop_Merged
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedTop_Merged" kind="sem">

```mc
sem sfold_MergedTop_Merged : all a. (a -> MergedBaseAst_Merged -> a) -> a -> MergedBaseAst_MergedTop -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedTop_Merged f acc =
  | x ->
    (smapAccumL_MergedTop_Merged
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_MergedTop_Binder" kind="sem">

```mc
sem smapAccumL_MergedTop_Binder : all a. (a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_MergedTop_Binder f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_MergedTop_Binder" kind="sem">

```mc
sem smap_MergedTop_Binder : (MergedBaseAst_Binder -> MergedBaseAst_Binder) -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_MergedTop_Binder f =
  | x ->
    (smapAccumL_MergedTop_Binder
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_MergedTop_Binder" kind="sem">

```mc
sem sfold_MergedTop_Binder : all a. (a -> MergedBaseAst_Binder -> a) -> a -> MergedBaseAst_MergedTop -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_MergedTop_Binder f acc =
  | x ->
    (smapAccumL_MergedTop_Binder
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Merged_MergedFile" kind="sem">

```mc
sem smapAccumL_Merged_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Merged_MergedFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Merged_MergedFile" kind="sem">

```mc
sem smap_Merged_MergedFile : (MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile) -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Merged_MergedFile f =
  | x ->
    (smapAccumL_Merged_MergedFile
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Merged_MergedFile" kind="sem">

```mc
sem sfold_Merged_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> a) -> a -> MergedBaseAst_Merged -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Merged_MergedFile f acc =
  | x ->
    (smapAccumL_Merged_MergedFile
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Merged_MergedTop" kind="sem">

```mc
sem smapAccumL_Merged_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Merged_MergedTop f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Merged_MergedTop" kind="sem">

```mc
sem smap_Merged_MergedTop : (MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop) -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Merged_MergedTop f =
  | x ->
    (smapAccumL_Merged_MergedTop
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Merged_MergedTop" kind="sem">

```mc
sem sfold_Merged_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> a) -> a -> MergedBaseAst_Merged -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Merged_MergedTop f acc =
  | x ->
    (smapAccumL_Merged_MergedTop
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Merged_Merged" kind="sem">

```mc
sem smapAccumL_Merged_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Merged_Merged f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Merged_Merged" kind="sem">

```mc
sem smap_Merged_Merged : (MergedBaseAst_Merged -> MergedBaseAst_Merged) -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Merged_Merged f =
  | x ->
    (smapAccumL_Merged_Merged
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Merged_Merged" kind="sem">

```mc
sem sfold_Merged_Merged : all a. (a -> MergedBaseAst_Merged -> a) -> a -> MergedBaseAst_Merged -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Merged_Merged f acc =
  | x ->
    (smapAccumL_Merged_Merged
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Merged_Binder" kind="sem">

```mc
sem smapAccumL_Merged_Binder : all a. (a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Merged_Binder f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Merged_Binder" kind="sem">

```mc
sem smap_Merged_Binder : (MergedBaseAst_Binder -> MergedBaseAst_Binder) -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Merged_Binder f =
  | x ->
    (smapAccumL_Merged_Binder
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Merged_Binder" kind="sem">

```mc
sem sfold_Merged_Binder : all a. (a -> MergedBaseAst_Binder -> a) -> a -> MergedBaseAst_Merged -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Merged_Binder f acc =
  | x ->
    (smapAccumL_Merged_Binder
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Binder_MergedFile" kind="sem">

```mc
sem smapAccumL_Binder_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)) -> a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Binder_MergedFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Binder_MergedFile" kind="sem">

```mc
sem smap_Binder_MergedFile : (MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile) -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Binder_MergedFile f =
  | x ->
    (smapAccumL_Binder_MergedFile
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Binder_MergedFile" kind="sem">

```mc
sem sfold_Binder_MergedFile : all a. (a -> MergedBaseAst_MergedFile -> a) -> a -> MergedBaseAst_Binder -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Binder_MergedFile f acc =
  | x ->
    (smapAccumL_Binder_MergedFile
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Binder_MergedTop" kind="sem">

```mc
sem smapAccumL_Binder_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)) -> a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Binder_MergedTop f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Binder_MergedTop" kind="sem">

```mc
sem smap_Binder_MergedTop : (MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop) -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Binder_MergedTop f =
  | x ->
    (smapAccumL_Binder_MergedTop
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Binder_MergedTop" kind="sem">

```mc
sem sfold_Binder_MergedTop : all a. (a -> MergedBaseAst_MergedTop -> a) -> a -> MergedBaseAst_Binder -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Binder_MergedTop f acc =
  | x ->
    (smapAccumL_Binder_MergedTop
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Binder_Merged" kind="sem">

```mc
sem smapAccumL_Binder_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Binder_Merged f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Binder_Merged" kind="sem">

```mc
sem smap_Binder_Merged : (MergedBaseAst_Merged -> MergedBaseAst_Merged) -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Binder_Merged f =
  | x ->
    (smapAccumL_Binder_Merged
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Binder_Merged" kind="sem">

```mc
sem sfold_Binder_Merged : all a. (a -> MergedBaseAst_Merged -> a) -> a -> MergedBaseAst_Binder -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Binder_Merged f acc =
  | x ->
    (smapAccumL_Binder_Merged
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_Binder_Binder" kind="sem">

```mc
sem smapAccumL_Binder_Binder : all a. (a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)) -> a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Binder_Binder f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_Binder_Binder" kind="sem">

```mc
sem smap_Binder_Binder : (MergedBaseAst_Binder -> MergedBaseAst_Binder) -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_Binder_Binder f =
  | x ->
    (smapAccumL_Binder_Binder
       (lam #var"".
          lam x.
            ({}, f
              x))
       {}
       x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_Binder_Binder" kind="sem">

```mc
sem sfold_Binder_Binder : all a. (a -> MergedBaseAst_Binder -> a) -> a -> MergedBaseAst_Binder -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_Binder_Binder f acc =
  | x ->
    (smapAccumL_Binder_Binder
       (lam acc.
          lam x.
            (f
              acc
              x, x))
       acc
       x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_MergedFile_info" kind="sem">

```mc
sem get_MergedFile_info : MergedBaseAst_MergedFile -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_MergedFile_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_MergedFile_info" kind="sem">

```mc
sem set_MergedFile_info : Info -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_MergedFile_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_MergedFile_info" kind="sem">

```mc
sem mapAccum_MergedFile_info : all a. (a -> Info -> (a, Info)) -> a -> MergedBaseAst_MergedFile -> (a, MergedBaseAst_MergedFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_MergedFile_info f acc =
  | target ->
    match
      f
        acc
        (get_MergedFile_info
           target)
    with
      (acc, val)
    in
    (acc, set_MergedFile_info
        val
        target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_MergedFile_info" kind="sem">

```mc
sem map_MergedFile_info : (Info -> Info) -> MergedBaseAst_MergedFile -> MergedBaseAst_MergedFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_MergedFile_info f =
  | target ->
    set_MergedFile_info
      (f
         (get_MergedFile_info
            target))
      target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_MergedTop_info" kind="sem">

```mc
sem get_MergedTop_info : MergedBaseAst_MergedTop -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_MergedTop_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_MergedTop_info" kind="sem">

```mc
sem set_MergedTop_info : Info -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_MergedTop_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_MergedTop_info" kind="sem">

```mc
sem mapAccum_MergedTop_info : all a. (a -> Info -> (a, Info)) -> a -> MergedBaseAst_MergedTop -> (a, MergedBaseAst_MergedTop)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_MergedTop_info f acc =
  | target ->
    match
      f
        acc
        (get_MergedTop_info
           target)
    with
      (acc, val)
    in
    (acc, set_MergedTop_info
        val
        target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_MergedTop_info" kind="sem">

```mc
sem map_MergedTop_info : (Info -> Info) -> MergedBaseAst_MergedTop -> MergedBaseAst_MergedTop
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_MergedTop_info f =
  | target ->
    set_MergedTop_info
      (f
         (get_MergedTop_info
            target))
      target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_Merged_info" kind="sem">

```mc
sem get_Merged_info : MergedBaseAst_Merged -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_Merged_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_Merged_info" kind="sem">

```mc
sem set_Merged_info : Info -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_Merged_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_Merged_info" kind="sem">

```mc
sem mapAccum_Merged_info : all a. (a -> Info -> (a, Info)) -> a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_Merged_info f acc =
  | target ->
    match
      f
        acc
        (get_Merged_info
           target)
    with
      (acc, val)
    in
    (acc, set_Merged_info
        val
        target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_Merged_info" kind="sem">

```mc
sem map_Merged_info : (Info -> Info) -> MergedBaseAst_Merged -> MergedBaseAst_Merged
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_Merged_info f =
  | target ->
    set_Merged_info
      (f
         (get_Merged_info
            target))
      target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_Binder_info" kind="sem">

```mc
sem get_Binder_info : MergedBaseAst_Binder -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_Binder_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_Binder_info" kind="sem">

```mc
sem set_Binder_info : Info -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_Binder_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_Binder_info" kind="sem">

```mc
sem mapAccum_Binder_info : all a. (a -> Info -> (a, Info)) -> a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_Binder_info f acc =
  | target ->
    match
      f
        acc
        (get_Binder_info
           target)
    with
      (acc, val)
    in
    (acc, set_Binder_info
        val
        target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_Binder_info" kind="sem">

```mc
sem map_Binder_info : (Info -> Info) -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_Binder_info f =
  | target ->
    set_Binder_info
      (f
         (get_Binder_info
            target))
      target
```
</ToggleWrapper>
</DocBlock>

