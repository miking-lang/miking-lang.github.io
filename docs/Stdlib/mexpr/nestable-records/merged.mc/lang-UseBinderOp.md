import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UseBinderOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="BinderOp" kind="syn">

```mc
syn BinderOp
```



<ToggleWrapper text="Code..">
```mc
syn BinderOp lstyle rstyle =
  | UseBinderOp {n: [{i: Info, v: Name}], __br_info: Info, __br_terms: [Info]}
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
  | UseBinderOp x ->
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
  | UseBinderOp x ->
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
  | AtomP {self = UseBinderOp x} ->
    (x.__br_info, UseBinder
      { info =
          x.__br_info,
        n =
          match
            x.n
          with
            [ x1 ] ++ _
          in
          x1 })
```
</ToggleWrapper>
</DocBlock>

