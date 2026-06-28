import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="LetBinderRecord" kind="type">

```mc
type LetBinderRecord : { body: Merged, info: Info, ident: { i: Info, v: Name }, tyAnnot: Option Merged }
```



<ToggleWrapper text="Code..">
```mc
type LetBinderRecord =
    {body: Merged, info: Info, ident: {i: Info, v: Name}, tyAnnot: Option Merged}
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
  | LetBinder LetBinderRecord
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
  | LetBinder x ->
    match
      match
        let body =
          x.body
        in
        f
          acc
          body
      with
        (acc, body)
      in
      match
          let tyAnnot =
            x.tyAnnot
          in
          optionMapAccum
            (lam acc1.
               lam x1.
                 f
                   acc1
                   x1)
            acc
            tyAnnot
        with
          (acc, tyAnnot)
        in
        (acc, { { x
              with
              body =
                body }
            with
            tyAnnot =
              tyAnnot })
    with
      (acc, x)
    in
    (acc, LetBinder
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
  | LetBinder target ->
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
  | LetBinder target ->
    LetBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

