import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExternalBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="ExternalBinderRecord" kind="type">

```mc
type ExternalBinderRecord : { info: Info, ident: { i: Info, v: Name }, effect: Option Info, tyIdent: Merged }
```



<ToggleWrapper text="Code..">
```mc
type ExternalBinderRecord =
    {info: Info, ident: {i: Info, v: Name}, effect: Option Info, tyIdent: Merged}
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
  | ExternalBinder ExternalBinderRecord
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
  | ExternalBinder x ->
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
    (acc, ExternalBinder
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
  | ExternalBinder target ->
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
  | ExternalBinder target ->
    ExternalBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

