import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# VarMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="VarMergedRecord" kind="type">

```mc
type VarMergedRecord : { info: Info, ident: { i: Info, v: Name } }
```



<ToggleWrapper text="Code..">
```mc
type VarMergedRecord =
    {info: Info, ident: {i: Info, v: Name}}
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
  | VarMerged VarMergedRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_Merged_info" kind="sem">

```mc
sem get_Merged_info : MergedBaseAst_Merged -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_Merged_info =
  | VarMerged target ->
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
  | VarMerged target ->
    VarMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

