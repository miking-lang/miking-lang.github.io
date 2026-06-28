import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="ConBinderRecord" kind="type">

```mc
type ConBinderRecord : { info: Info, ident: { i: Info, v: Name }, tyIdent: Merged }
```



<ToggleWrapper text="Code..">
```mc
type ConBinderRecord =
    {info: Info, ident: {i: Info, v: Name}, tyIdent: Merged}
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
  | ConBinder ConBinderRecord
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_Binder_Merged" kind="sem">

```mc
sem smapAccumL_Binder_Merged : all a. (a -> MergedBaseAst_Merged -> (a, MergedBaseAst_Merged)) -> a -> MergedBaseAst_Binder -> (a, MergedBaseAst_Binder)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Binder_Merged f acc =
  | ConBinder x ->
    match
      match
        let tyIdent =
          x.tyIdent
        in
        f
          acc
          tyIdent
      with
        (acc, tyIdent)
      in
      (acc, { x
          with
          tyIdent =
            tyIdent })
    with
      (acc, x)
    in
    (acc, ConBinder
        x)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="get_Binder_info" kind="sem">

```mc
sem get_Binder_info : MergedBaseAst_Binder -> Info
```



<ToggleWrapper text="Code..">
```mc
sem get_Binder_info =
  | ConBinder target ->
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
  | ConBinder target ->
    ConBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

