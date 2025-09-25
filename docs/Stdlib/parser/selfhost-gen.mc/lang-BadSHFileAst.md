import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BadSHFileAst  
  

  
  
  
## Types  
  

          <DocBlock title="BadSHFileRecord" kind="type">

```mc
type BadSHFileRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type BadSHFileRecord =
    {info: Info}
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
  | BadSHFile BadSHFileRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_SHFile_info" kind="sem">

```mc
sem get_SHFile_info : SelfhostBaseAst_SHFile -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_SHFile_info =
  | BadSHFile target ->
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
  | BadSHFile target ->
    BadSHFile
      { target with info = val }
```
</ToggleWrapper>
</DocBlock>

