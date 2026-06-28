import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UtestBinderOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="BinderOp" kind="syn">

```mc
syn BinderOp
```



<ToggleWrapper text="Code..">
```mc
syn BinderOp lstyle rstyle =
  | UtestBinderOp {test: [Merged], tusing: [Merged], tonfail: [Merged], expected: [Merged], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_BinderOp" kind="sem">

```mc
sem getInfo_BinderOp : all lstyle. all rstyle. BinderOpBase_BinderOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_BinderOp =
  | UtestBinderOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_BinderOp" kind="sem">

```mc
sem getTerms_BinderOp : all lstyle. all rstyle. BinderOpBase_BinderOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_BinderOp =
  | UtestBinderOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_BinderOp" kind="sem">

```mc
sem unsplit_BinderOp : PermanentNode BinderOpBase_BinderOp -> (Info, MergedBaseAst_Binder)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_BinderOp =
  | AtomP {self = UtestBinderOp x} ->
    (x.__br_info, UtestBinder
      { info =
          x.__br_info,
        tusing =
          match
            x.tusing
          with
            [ x1 ] ++ _
          then
            Some
              x1
          else
            None
              {},
        tonfail =
          match
            x.tonfail
          with
            [ x2 ] ++ _
          then
            Some
              x2
          else
            None
              {},
        test =
          match
            x.test
          with
            [ x3 ] ++ _
          in
          x3,
        expected =
          match
            x.expected
          with
            [ x4 ] ++ _
          in
          x4 })
```
</ToggleWrapper>
</DocBlock>

