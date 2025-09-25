import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ProductionSHDeclOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHDeclOp" kind="syn">

```mc
syn SHDeclOp
```



<ToggleWrapper text="Code..">
```mc
syn SHDeclOp lstyle rstyle =
  | ProductionSHDeclOp {nt: [{i: Info, v: Name}], kinf: [Info], name: [{i: Info, v: Name}], assoc: [{i: Info, v: String}], kpref: [Info], kprod: [Info], regex: [SHRegex], kpostf: [Info], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_SHDeclOp" kind="sem">

```mc
sem getInfo_SHDeclOp : all lstyle. all rstyle. SHDeclOpBase_SHDeclOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHDeclOp =
  | ProductionSHDeclOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHDeclOp" kind="sem">

```mc
sem getTerms_SHDeclOp : all lstyle. all rstyle. SHDeclOpBase_SHDeclOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_SHDeclOp =
  | ProductionSHDeclOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHDeclOp" kind="sem">

```mc
sem unsplit_SHDeclOp : PermanentNode SHDeclOpBase_SHDeclOp -> (Info, SelfhostBaseAst_SHDecl)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_SHDeclOp =
  | AtomP {self = ProductionSHDeclOp x} ->
    (x.__br_info, ProductionSHDecl
      { info = x.__br_info,
        nt =
          match
            x.nt
          with
            [ x1 ] ++ _
          in
          x1,
        name =
          match
            x.name
          with
            [ x2 ] ++ _
          in
          x2,
        kinf =
          match
            x.kinf
          with
            [ x3 ] ++ _
          then
            Some
              x3
          else
            None
              {},
        kpref =
          match
            x.kpref
          with
            [ x4 ] ++ _
          then
            Some
              x4
          else
            None
              {},
        kprod =
          match
            x.kprod
          with
            [ x5 ] ++ _
          then
            Some
              x5
          else
            None
              {},
        kpostf =
          match
            x.kpostf
          with
            [ x6 ] ++ _
          then
            Some
              x6
          else
            None
              {},
        assoc =
          match
            x.assoc
          with
            [ x7 ] ++ _
          then
            Some
              x7
          else
            None
              {},
        regex =
          match
            x.regex
          with
            [ x8 ] ++ _
          in
          x8 })
```
</ToggleWrapper>
</DocBlock>

