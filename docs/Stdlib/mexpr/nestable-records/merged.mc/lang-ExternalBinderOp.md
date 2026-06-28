import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ExternalBinderOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="BinderOp" kind="syn">

```mc
syn BinderOp
```



<ToggleWrapper text="Code..">
```mc
syn BinderOp lstyle rstyle =
  | ExternalBinderOp {ident: [{i: Info, v: Name}], effect: [Info], tyIdent: [Merged], __br_info: Info, __br_terms: [Info]}
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
  | ExternalBinderOp x ->
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
  | ExternalBinderOp x ->
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
  | AtomP {self = ExternalBinderOp x} ->
    (x.__br_info, ExternalBinder
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
          x2,
        effect =
          match
            x.effect
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

