import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# StartSHDeclAst  
  

  
  
  
## Types  
  

          <DocBlock title="StartSHDeclRecord" kind="type">

```mc
type StartSHDeclRecord : { info: Info, name: { i: Info, v: Name } }
```



<ToggleWrapper text="Code..">
```mc
type StartSHDeclRecord =
    {info: Info, name: {i: Info, v: Name}}
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
  | StartSHDecl StartSHDeclRecord
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
  | StartSHDecl target ->
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
  | StartSHDecl target ->
    StartSHDecl
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

