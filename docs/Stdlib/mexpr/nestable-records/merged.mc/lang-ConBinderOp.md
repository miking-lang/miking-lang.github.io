import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConBinderOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="BinderOp" kind="syn">

```mc
syn BinderOp
```



<ToggleWrapper text="Code..">
```mc
syn BinderOp lstyle rstyle =
  | ConBinderOp {ident: [{i: Info, v: Name}], tyIdent: [Merged], __br_info: Info, __br_terms: [Info]}
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
  | ConBinderOp x ->
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
  | ConBinderOp x ->
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
  | AtomP {self = ConBinderOp x} ->
    (x.__br_info, ConBinder
      { info =
          x.__br_info,
        tyIdent =
          match
            x.tyIdent
          with
            [ x1 ] ++ _
          in
          x1,
        ident =
          match
            x.ident
          with
            [ x2 ] ++ _
          in
          x2 })
```
</ToggleWrapper>
</DocBlock>

