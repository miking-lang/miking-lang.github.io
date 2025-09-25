import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecLetBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="RecLetBinderRecord" kind="type">

```mc
type RecLetBinderRecord : { info: Info, bindings: [{ body: Merged, ident: { i: Info, v: Name }, tyAnnot: Option Merged }] }
```



<ToggleWrapper text="Code..">
```mc
type RecLetBinderRecord =
    {info: Info, bindings: [{body: Merged, ident: {i: Info, v: Name}, tyAnnot: Option Merged}]}
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
  | RecLetBinder RecLetBinderRecord
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
  | RecLetBinder x ->
    match
      match
        let bindings =
          x.bindings
        in
        mapAccumL
          (lam acc1.
             lam x1: {body: Merged, ident: {i: Info, v: Name}, tyAnnot: Option Merged}.
               match
                 let body =
                   x1.body
                 in
                 f
                   acc1
                   body
               with
                 (acc1, body)
               in
               match
                   let tyAnnot =
                     x1.tyAnnot
                   in
                   optionMapAccum
                     (lam acc2.
                        lam x2.
                          f
                            acc2
                            x2)
                     acc1
                     tyAnnot
                 with
                   (acc1, tyAnnot)
                 in
                 (acc1, { { x1
                       with
                       body =
                         body }
                     with
                     tyAnnot =
                       tyAnnot }))
          acc
          bindings
      with
        (acc, bindings)
      in
      (acc, { x
          with
          bindings =
            bindings })
    with
      (acc, x)
    in
    (acc, RecLetBinder
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
  | RecLetBinder target ->
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
  | RecLetBinder target ->
    RecLetBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

