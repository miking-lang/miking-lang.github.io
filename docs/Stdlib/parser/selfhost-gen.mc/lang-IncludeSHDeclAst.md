import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# IncludeSHDeclAst  
  

  
  
  
## Types  
  

          <DocBlock title="IncludeSHDeclRecord" kind="type">

```mc
type IncludeSHDeclRecord : { info: Info, path: { i: Info, v: String } }
```



<ToggleWrapper text="Code..">
```mc
type IncludeSHDeclRecord =
    {info: Info, path: {i: Info, v: String}}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="SHDecl" kind="syn">

```mc
syn SHDecl
```



<ToggleWrapper text="Code..">
```mc
syn SHDecl =
  | IncludeSHDecl IncludeSHDeclRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_SHDecl_info" kind="sem">

```mc
sem get_SHDecl_info : SelfhostBaseAst_SHDecl -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHDecl_info =
  | IncludeSHDecl target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_SHDecl_info" kind="sem">

```mc
sem set_SHDecl_info : Info -> SelfhostBaseAst_SHDecl -> SelfhostBaseAst_SHDecl
```



<ToggleWrapper text="Code..">
```mc
sem set_SHDecl_info val =
  | IncludeSHDecl target ->
    IncludeSHDecl
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

