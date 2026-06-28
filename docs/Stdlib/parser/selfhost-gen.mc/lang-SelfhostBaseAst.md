import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SelfhostBaseAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHExpr" kind="syn">

```mc
syn SHExpr
```



<ToggleWrapper text="Code..">
```mc
syn SHExpr =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SHRegex" kind="syn">

```mc
syn SHRegex
```



<ToggleWrapper text="Code..">
```mc
syn SHRegex =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SHDecl" kind="syn">

```mc
syn SHDecl
```



<ToggleWrapper text="Code..">
```mc
syn SHDecl =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="SHFile" kind="syn">

```mc
syn SHFile
```



<ToggleWrapper text="Code..">
```mc
syn SHFile =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHFile_SHFile" kind="sem">

```mc
sem smapAccumL_SHFile_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)) -> a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHFile_SHFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHFile_SHFile" kind="sem">

```mc
sem smap_SHFile_SHFile : (SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile) -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHFile_SHFile f =
  | x ->
    (smapAccumL_SHFile_SHFile (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHFile_SHFile" kind="sem">

```mc
sem sfold_SHFile_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> a) -> a -> SelfhostBaseAst_SHFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHFile_SHFile f acc =
  | x ->
    (smapAccumL_SHFile_SHFile (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHFile_SHDecl" kind="sem">

```mc
sem smapAccumL_SHFile_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)) -> a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHFile_SHDecl f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHFile_SHDecl" kind="sem">

```mc
sem smap_SHFile_SHDecl : (SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl) -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHFile_SHDecl f =
  | x ->
    (smapAccumL_SHFile_SHDecl (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHFile_SHDecl" kind="sem">

```mc
sem sfold_SHFile_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> a) -> a -> SelfhostBaseAst_SHFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHFile_SHDecl f acc =
  | x ->
    (smapAccumL_SHFile_SHDecl (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHFile_SHRegex" kind="sem">

```mc
sem smapAccumL_SHFile_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)) -> a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHFile_SHRegex f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHFile_SHRegex" kind="sem">

```mc
sem smap_SHFile_SHRegex : (SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex) -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHFile_SHRegex f =
  | x ->
    (smapAccumL_SHFile_SHRegex (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHFile_SHRegex" kind="sem">

```mc
sem sfold_SHFile_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> a) -> a -> SelfhostBaseAst_SHFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHFile_SHRegex f acc =
  | x ->
    (smapAccumL_SHFile_SHRegex (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHFile_SHExpr" kind="sem">

```mc
sem smapAccumL_SHFile_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHFile_SHExpr f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHFile_SHExpr" kind="sem">

```mc
sem smap_SHFile_SHExpr : (SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr) -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHFile_SHExpr f =
  | x ->
    (smapAccumL_SHFile_SHExpr (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHFile_SHExpr" kind="sem">

```mc
sem sfold_SHFile_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> a) -> a -> SelfhostBaseAst_SHFile -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHFile_SHExpr f acc =
  | x ->
    (smapAccumL_SHFile_SHExpr (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHDecl_SHFile" kind="sem">

```mc
sem smapAccumL_SHDecl_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHDecl_SHFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHDecl_SHFile" kind="sem">

```mc
sem smap_SHDecl_SHFile : (SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile) -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHDecl_SHFile f =
  | x ->
    (smapAccumL_SHDecl_SHFile (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHDecl_SHFile" kind="sem">

```mc
sem sfold_SHDecl_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> a) -> a -> SelfhostBaseAst_SHDecl -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHDecl_SHFile f acc =
  | x ->
    (smapAccumL_SHDecl_SHFile (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHDecl_SHDecl" kind="sem">

```mc
sem smapAccumL_SHDecl_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHDecl_SHDecl f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHDecl_SHDecl" kind="sem">

```mc
sem smap_SHDecl_SHDecl : (SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl) -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHDecl_SHDecl f =
  | x ->
    (smapAccumL_SHDecl_SHDecl (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHDecl_SHDecl" kind="sem">

```mc
sem sfold_SHDecl_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> a) -> a -> SelfhostBaseAst_SHDecl -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHDecl_SHDecl f acc =
  | x ->
    (smapAccumL_SHDecl_SHDecl (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHDecl_SHRegex" kind="sem">

```mc
sem smapAccumL_SHDecl_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHDecl_SHRegex f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHDecl_SHRegex" kind="sem">

```mc
sem smap_SHDecl_SHRegex : (SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex) -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHDecl_SHRegex f =
  | x ->
    (smapAccumL_SHDecl_SHRegex (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHDecl_SHRegex" kind="sem">

```mc
sem sfold_SHDecl_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> a) -> a -> SelfhostBaseAst_SHDecl -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHDecl_SHRegex f acc =
  | x ->
    (smapAccumL_SHDecl_SHRegex (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHDecl_SHExpr" kind="sem">

```mc
sem smapAccumL_SHDecl_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHDecl_SHExpr f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHDecl_SHExpr" kind="sem">

```mc
sem smap_SHDecl_SHExpr : (SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr) -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHDecl_SHExpr f =
  | x ->
    (smapAccumL_SHDecl_SHExpr (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHDecl_SHExpr" kind="sem">

```mc
sem sfold_SHDecl_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> a) -> a -> SelfhostBaseAst_SHDecl -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHDecl_SHExpr f acc =
  | x ->
    (smapAccumL_SHDecl_SHExpr (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHRegex_SHFile" kind="sem">

```mc
sem smapAccumL_SHRegex_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHRegex_SHFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHRegex_SHFile" kind="sem">

```mc
sem smap_SHRegex_SHFile : (SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile) -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHRegex_SHFile f =
  | x ->
    (smapAccumL_SHRegex_SHFile (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHRegex_SHFile" kind="sem">

```mc
sem sfold_SHRegex_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> a) -> a -> SelfhostBaseAst_SHRegex -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHRegex_SHFile f acc =
  | x ->
    (smapAccumL_SHRegex_SHFile (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHRegex_SHDecl" kind="sem">

```mc
sem smapAccumL_SHRegex_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHRegex_SHDecl f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHRegex_SHDecl" kind="sem">

```mc
sem smap_SHRegex_SHDecl : (SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl) -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHRegex_SHDecl f =
  | x ->
    (smapAccumL_SHRegex_SHDecl (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHRegex_SHDecl" kind="sem">

```mc
sem sfold_SHRegex_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> a) -> a -> SelfhostBaseAst_SHRegex -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHRegex_SHDecl f acc =
  | x ->
    (smapAccumL_SHRegex_SHDecl (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHRegex_SHRegex" kind="sem">

```mc
sem smapAccumL_SHRegex_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHRegex_SHRegex f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHRegex_SHRegex" kind="sem">

```mc
sem smap_SHRegex_SHRegex : (SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex) -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHRegex_SHRegex f =
  | x ->
    (smapAccumL_SHRegex_SHRegex (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHRegex_SHRegex" kind="sem">

```mc
sem sfold_SHRegex_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> a) -> a -> SelfhostBaseAst_SHRegex -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHRegex_SHRegex f acc =
  | x ->
    (smapAccumL_SHRegex_SHRegex (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHRegex_SHExpr" kind="sem">

```mc
sem smapAccumL_SHRegex_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHRegex_SHExpr f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHRegex_SHExpr" kind="sem">

```mc
sem smap_SHRegex_SHExpr : (SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr) -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHRegex_SHExpr f =
  | x ->
    (smapAccumL_SHRegex_SHExpr (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHRegex_SHExpr" kind="sem">

```mc
sem sfold_SHRegex_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> a) -> a -> SelfhostBaseAst_SHRegex -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHRegex_SHExpr f acc =
  | x ->
    (smapAccumL_SHRegex_SHExpr (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHExpr_SHFile" kind="sem">

```mc
sem smapAccumL_SHExpr_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHExpr_SHFile f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHExpr_SHFile" kind="sem">

```mc
sem smap_SHExpr_SHFile : (SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile) -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHExpr_SHFile f =
  | x ->
    (smapAccumL_SHExpr_SHFile (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHExpr_SHFile" kind="sem">

```mc
sem sfold_SHExpr_SHFile : all a. (a -> SelfhostBaseAst_SHFile -> a) -> a -> SelfhostBaseAst_SHExpr -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHExpr_SHFile f acc =
  | x ->
    (smapAccumL_SHExpr_SHFile (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHExpr_SHDecl" kind="sem">

```mc
sem smapAccumL_SHExpr_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHExpr_SHDecl f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHExpr_SHDecl" kind="sem">

```mc
sem smap_SHExpr_SHDecl : (SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl) -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHExpr_SHDecl f =
  | x ->
    (smapAccumL_SHExpr_SHDecl (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHExpr_SHDecl" kind="sem">

```mc
sem sfold_SHExpr_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> a) -> a -> SelfhostBaseAst_SHExpr -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHExpr_SHDecl f acc =
  | x ->
    (smapAccumL_SHExpr_SHDecl (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHExpr_SHRegex" kind="sem">

```mc
sem smapAccumL_SHExpr_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHExpr_SHRegex f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHExpr_SHRegex" kind="sem">

```mc
sem smap_SHExpr_SHRegex : (SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex) -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHExpr_SHRegex f =
  | x ->
    (smapAccumL_SHExpr_SHRegex (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHExpr_SHRegex" kind="sem">

```mc
sem sfold_SHExpr_SHRegex : all a. (a -> SelfhostBaseAst_SHRegex -> a) -> a -> SelfhostBaseAst_SHExpr -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHExpr_SHRegex f acc =
  | x ->
    (smapAccumL_SHExpr_SHRegex (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smapAccumL_SHExpr_SHExpr" kind="sem">

```mc
sem smapAccumL_SHExpr_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHExpr_SHExpr f acc =
  | x ->
    (acc, x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="smap_SHExpr_SHExpr" kind="sem">

```mc
sem smap_SHExpr_SHExpr : (SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr) -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem smap_SHExpr_SHExpr f =
  | x ->
    (smapAccumL_SHExpr_SHExpr (lam #var"".
          lam x.
            ({}, f x)) {} x).1
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="sfold_SHExpr_SHExpr" kind="sem">

```mc
sem sfold_SHExpr_SHExpr : all a. (a -> SelfhostBaseAst_SHExpr -> a) -> a -> SelfhostBaseAst_SHExpr -> a
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem sfold_SHExpr_SHExpr f acc =
  | x ->
    (smapAccumL_SHExpr_SHExpr (lam acc.
          lam x.
            (f acc x, x)) acc x).0
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHFile_info" kind="sem">

```mc
sem get_SHFile_info : SelfhostBaseAst_SHFile -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_SHFile_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHFile_info" kind="sem">

```mc
sem set_SHFile_info : Info -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_SHFile_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_SHFile_info" kind="sem">

```mc
sem mapAccum_SHFile_info : all a. (a -> Info -> (a, Info)) -> a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_SHFile_info f acc =
  | target ->
    match
      f acc (get_SHFile_info target)
    with
      (acc, val)
    in
    (acc, set_SHFile_info val target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_SHFile_info" kind="sem">

```mc
sem map_SHFile_info : (Info -> Info) -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_SHFile_info f =
  | target ->
    set_SHFile_info (f (get_SHFile_info target)) target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHDecl_info" kind="sem">

```mc
sem get_SHDecl_info : SelfhostBaseAst_SHDecl -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_SHDecl_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHDecl_info" kind="sem">

```mc
sem set_SHDecl_info : Info -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_SHDecl_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_SHDecl_info" kind="sem">

```mc
sem mapAccum_SHDecl_info : all a. (a -> Info -> (a, Info)) -> a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_SHDecl_info f acc =
  | target ->
    match
      f acc (get_SHDecl_info target)
    with
      (acc, val)
    in
    (acc, set_SHDecl_info val target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_SHDecl_info" kind="sem">

```mc
sem map_SHDecl_info : (Info -> Info) -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_SHDecl_info f =
  | target ->
    set_SHDecl_info (f (get_SHDecl_info target)) target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHRegex_info" kind="sem">

```mc
sem get_SHRegex_info : SelfhostBaseAst_SHRegex -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_SHRegex_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHRegex_info" kind="sem">

```mc
sem set_SHRegex_info : Info -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_SHRegex_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_SHRegex_info" kind="sem">

```mc
sem mapAccum_SHRegex_info : all a. (a -> Info -> (a, Info)) -> a -> SelfhostBaseAst_SHRegex -> (a, SelfhostBaseAst_SHRegex)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_SHRegex_info f acc =
  | target ->
    match
      f acc (get_SHRegex_info target)
    with
      (acc, val)
    in
    (acc, set_SHRegex_info val target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_SHRegex_info" kind="sem">

```mc
sem map_SHRegex_info : (Info -> Info) -> SelfhostBaseAst_SHRegex -> SelfhostBaseAst_SHRegex
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_SHRegex_info f =
  | target ->
    set_SHRegex_info (f (get_SHRegex_info target)) target
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHExpr_info" kind="sem">

```mc
sem get_SHExpr_info : SelfhostBaseAst_SHExpr -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem get_SHExpr_info =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHExpr_info" kind="sem">

```mc
sem set_SHExpr_info : Info -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem set_SHExpr_info val =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="mapAccum_SHExpr_info" kind="sem">

```mc
sem mapAccum_SHExpr_info : all a. (a -> Info -> (a, Info)) -> a -> SelfhostBaseAst_SHExpr -> (a, SelfhostBaseAst_SHExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem mapAccum_SHExpr_info f acc =
  | target ->
    match
      f acc (get_SHExpr_info target)
    with
      (acc, val)
    in
    (acc, set_SHExpr_info val target)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="map_SHExpr_info" kind="sem">

```mc
sem map_SHExpr_info : (Info -> Info) -> SelfhostBaseAst_SHExpr -> SelfhostBaseAst_SHExpr
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem map_SHExpr_info f =
  | target ->
    set_SHExpr_info (f (get_SHExpr_info target)) target
```
</ToggleWrapper>
</DocBlock>

