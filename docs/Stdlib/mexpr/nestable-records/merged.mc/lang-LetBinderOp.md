import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LetBinderOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="BinderOp" kind="syn">

```mc
syn BinderOp
```



<ToggleWrapper text="Code..">
```mc
syn BinderOp lstyle rstyle =
  | LetBinderOp {body: [Merged], ident: [{i: Info, v: Name}], tyAnnot: [Merged], __br_info: Info, __br_terms: [Info]}
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
  | LetBinderOp x ->
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
  | LetBinderOp x ->
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
  | AtomP {self = LetBinderOp x} ->
    (x.__br_info, LetBinder
      { info =
          x.__br_info,
        ident =
          match
            x.ident
          with
            [ x1 ] ++ _
          in
          x1,
        body =
          match
            x.body
          with
            [ x2 ] ++ _
          in
          x2,
        tyAnnot =
          match
            x.tyAnnot
          with
            [ x3 ] ++ _
          then
            Some
              x3
          else
            None
              {} })
```
</ToggleWrapper>
</DocBlock>

