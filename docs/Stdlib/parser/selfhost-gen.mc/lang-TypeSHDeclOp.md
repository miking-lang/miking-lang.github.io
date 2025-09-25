import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TypeSHDeclOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHDeclOp" kind="syn">

```mc
syn SHDeclOp
```



<ToggleWrapper text="Code..">
```mc
syn SHDeclOp lstyle rstyle =
  | TypeSHDeclOp {name: [{i: Info, v: Name}], __br_info: Info, __br_terms: [Info], properties: [{val: SHExpr, name: {i: Info, v: String}}]}
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
  | TypeSHDeclOp x ->
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
  | TypeSHDeclOp x ->
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
  | AtomP {self = TypeSHDeclOp x} ->
    (x.__br_info, TypeSHDecl
      { info = x.__br_info,
        name =
          match
            x.name
          with
            [ x1 ] ++ _
          in
          x1,
        properties = x.properties })
```
</ToggleWrapper>
</DocBlock>

