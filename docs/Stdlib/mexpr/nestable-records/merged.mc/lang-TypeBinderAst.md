import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="TypeBinderRecord" kind="type">

```mc
type TypeBinderRecord : { info: Info, ident: { i: Info, v: Name }, params: [{ i: Info, v: Name }], tyIdent: Option Merged }
```



<ToggleWrapper text="Code..">
```mc
type TypeBinderRecord =
    {info: Info, ident: {i: Info, v: Name}, params: [{i: Info, v: Name}], tyIdent: Option Merged}
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
  | TypeBinder TypeBinderRecord
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
  | TypeBinder x ->
    match
      match
        let tyIdent =
          x.tyIdent
        in
        optionMapAccum
          (lam acc1.
             lam x1.
               f
                 acc1
                 x1)
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
    (acc, TypeBinder
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
  | TypeBinder target ->
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
  | TypeBinder target ->
    TypeBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

