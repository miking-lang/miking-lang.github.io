import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BadMergedFileAst  
  

  
  
  
## Types  
  

          <DocBlock title="BadMergedFileRecord" kind="type">

```mc
type BadMergedFileRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type BadMergedFileRecord =
    {info: Info}
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
  | BadMergedFile BadMergedFileRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_MergedFile_info" kind="sem">

```mc
sem get_MergedFile_info : MergedBaseAst_MergedFile -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_MergedFile_info =
  | BadMergedFile target ->
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
  | BadMergedFile target ->
    BadMergedFile
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

