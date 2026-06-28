import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LangSHFileAst  
  

  
  
  
## Types  
  

          <DocBlock title="LangSHFileRecord" kind="type">

```mc
type LangSHFileRecord : { info: Info, name: { i: Info, v: String }, decls: [SHDecl] }
```



<ToggleWrapper text="Code..">
```mc
type LangSHFileRecord =
    {info: Info, name: {i: Info, v: String}, decls: [SHDecl]}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHFile" kind="syn">

```mc
syn SHFile
```



<ToggleWrapper text="Code..">
```mc
syn SHFile =
  | LangSHFile LangSHFileRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_SHFile_SHDecl" kind="sem">

```mc
sem smapAccumL_SHFile_SHDecl : all a. (a -> SelfhostBaseAst_SHDecl -> (a, SelfhostBaseAst_SHDecl)) -> a -> SelfhostBaseAst_SHFile -> (a, SelfhostBaseAst_SHFile)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_SHFile_SHDecl f acc =
  | LangSHFile x ->
    match
      match
        let decls = x.decls in
        mapAccumL
          (lam acc1.
             lam x1: SHDecl.
               f acc1 x1)
          acc
          decls
      with
        (acc, decls)
      in
      (acc, { x with decls = decls })
    with
      (acc, x)
    in
    (acc, LangSHFile
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_SHFile_info" kind="sem">

```mc
sem get_SHFile_info : SelfhostBaseAst_SHFile -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHFile_info =
  | LangSHFile target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHFile_info" kind="sem">

```mc
sem set_SHFile_info : Info -> SelfhostBaseAst_SHFile -> SelfhostBaseAst_SHFile
```



<ToggleWrapper text="Code..">
```mc
sem set_SHFile_info val =
  | LangSHFile target ->
    LangSHFile
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

