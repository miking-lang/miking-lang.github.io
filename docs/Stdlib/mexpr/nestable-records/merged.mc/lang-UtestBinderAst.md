import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestBinderAst  
  

  
  
  
## Types  
  

          <DocBlock title="UtestBinderRecord" kind="type">

```mc
type UtestBinderRecord : { info: Info, test: Merged, tusing: Option Merged, tonfail: Option Merged, expected: Merged }
```



<ToggleWrapper text="Code..">
```mc
type UtestBinderRecord =
    {info: Info, test: Merged, tusing: Option Merged, tonfail: Option Merged, expected: Merged}
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
  | UtestBinder UtestBinderRecord
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
  | UtestBinder x ->
    match
      match
        let test =
          x.test
        in
        f
          acc
          test
      with
        (acc, test)
      in
      match
          let tusing =
            x.tusing
          in
          optionMapAccum
            (lam acc1.
               lam x1.
                 f
                   acc1
                   x1)
            acc
            tusing
        with
          (acc, tusing)
        in
        match
            let tonfail =
              x.tonfail
            in
            optionMapAccum
              (lam acc2.
                 lam x2.
                   f
                     acc2
                     x2)
              acc
              tonfail
          with
            (acc, tonfail)
          in
          match
              let expected =
                x.expected
              in
              f
                acc
                expected
            with
              (acc, expected)
            in
            (acc, { { { { x
                      with
                      test =
                        test }
                    with
                    tusing =
                      tusing }
                  with
                  tonfail =
                    tonfail }
                with
                expected =
                  expected })
    with
      (acc, x)
    in
    (acc, UtestBinder
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
  | UtestBinder target ->
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
  | UtestBinder target ->
    UtestBinder
      { target
        with
        info =
          val }
```
</ToggleWrapper>
</DocBlock>

