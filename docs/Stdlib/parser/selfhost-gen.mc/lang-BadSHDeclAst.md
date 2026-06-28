import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BadSHDeclAst  
  

  
  
  
## Types  
  

          <DocBlock title="BadSHDeclRecord" kind="type">

```mc
type BadSHDeclRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type BadSHDeclRecord =
    {info: Info}
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
  | BadSHDecl BadSHDeclRecord
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
  | BadSHDecl target ->
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
  | BadSHDecl target ->
    BadSHDecl
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

