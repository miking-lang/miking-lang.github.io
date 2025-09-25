import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UseBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="UseBinderRecord" kind="type">

```mc
type UseBinderRecord : { n: { i: Info, v: Name }, info: Info }
```



<ToggleWrapper text="Code..">
```mc
type UseBinderRecord =
    {n: {i: Info, v: Name}, info: Info}
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
  | UseBinder UseBinderRecord
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
  | UseBinder target ->
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
  | UseBinder target ->
    UseBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

