import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# StringMergedAst  
  

  
  
  
## Types  
  

          <DocBlock title="StringMergedRecord" kind="type">

```mc
type StringMergedRecord : { val: { i: Info, v: String }, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type StringMergedRecord =
    {val: {i: Info, v: String}, info: Info}
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
  | StringMerged StringMergedRecord
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
  | StringMerged target ->
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
  | StringMerged target ->
    StringMerged
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

