import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# StartSHDeclOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHDeclOp" kind="syn">

```mc
syn SHDeclOp
```



<ToggleWrapper text="Code..">
```mc
syn SHDeclOp lstyle rstyle =
  | StartSHDeclOp {name: [{i: Info, v: Name}], __br_info: Info, __br_terms: [Info]}
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
  | StartSHDeclOp x ->
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
  | StartSHDeclOp x ->
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
  | AtomP {self = StartSHDeclOp x} ->
    (x.__br_info, StartSHDecl
      { info = x.__br_info,
        name =
          match
            x.name
          with
            [ x1 ] ++ _
          in
          x1 })
```
</ToggleWrapper>
</DocBlock>

