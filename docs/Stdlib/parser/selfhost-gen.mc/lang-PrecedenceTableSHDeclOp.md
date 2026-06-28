import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# PrecedenceTableSHDeclOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHDeclOp" kind="syn">

```mc
syn SHDeclOp
```



<ToggleWrapper text="Code..">
```mc
syn SHDeclOp lstyle rstyle =
  | PrecedenceTableSHDeclOp {levels: [{noeq: Option Info, operators: [{i: Info, v: Name}]}], __br_info: Info, __br_terms: [Info], exceptions: [{lefts: [{i: Info, v: Name}], rights: [{i: Info, v: Name}]}]}
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
  | PrecedenceTableSHDeclOp x ->
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
  | PrecedenceTableSHDeclOp x ->
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
  | AtomP {self = PrecedenceTableSHDeclOp x} ->
    (x.__br_info, PrecedenceTableSHDecl
      { info = x.__br_info,
        levels = x.levels,
        exceptions = x.exceptions })
```
</ToggleWrapper>
</DocBlock>

