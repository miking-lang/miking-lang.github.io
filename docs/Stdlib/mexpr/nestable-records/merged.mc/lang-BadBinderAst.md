import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BadBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="BadBinderRecord" kind="type">

```mc
type BadBinderRecord : { info: Info }
```



<ToggleWrapper text="Code..">
```mc
type BadBinderRecord =
    {info: Info}
```
</ToggleWrapper>
</DocBlock>

## Syntaxes  
  

          <DocBlock title="Binder" kind="syn">

```mc
syn Binder
```



<ToggleWrapper text="Code..">
```mc
syn Binder =
  | BadBinder BadBinderRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="get_Binder_info" kind="sem">

```mc
sem get_Binder_info : MergedBaseAst_Binder -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_Binder_info =
  | BadBinder target ->
    target.info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="set_Binder_info" kind="sem">

```mc
sem set_Binder_info : Info -> MergedBaseAst_Binder -> MergedBaseAst_Binder
```



<ToggleWrapper text="Code..">
```mc
sem set_Binder_info val =
  | BadBinder target ->
    BadBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

