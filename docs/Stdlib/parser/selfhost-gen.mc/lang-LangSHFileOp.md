import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# LangSHFileOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHFileOp" kind="syn">

```mc
syn SHFileOp
```



<ToggleWrapper text="Code..">
```mc
syn SHFileOp lstyle rstyle =
  | LangSHFileOp {name: [{i: Info, v: String}], decls: [SHDecl], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_SHFileOp" kind="sem">

```mc
sem getInfo_SHFileOp : all lstyle. all rstyle. SHFileOpBase_SHFileOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHFileOp =
  | LangSHFileOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHFileOp" kind="sem">

```mc
sem getTerms_SHFileOp : all lstyle. all rstyle. SHFileOpBase_SHFileOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_SHFileOp =
  | LangSHFileOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHFileOp" kind="sem">

```mc
sem unsplit_SHFileOp : PermanentNode SHFileOpBase_SHFileOp -> (Info, SelfhostBaseAst_SHFile)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_SHFileOp =
  | AtomP {self = LangSHFileOp x} ->
    (x.__br_info, LangSHFile
      { info = x.__br_info,
        decls = x.decls,
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

