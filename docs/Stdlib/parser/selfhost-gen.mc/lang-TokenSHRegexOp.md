import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# TokenSHRegexOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHRegexOp" kind="syn">

```mc
syn SHRegexOp
```



<ToggleWrapper text="Code..">
```mc
syn SHRegexOp lstyle rstyle =
  | TokenSHRegexOp {arg: [SHExpr], name: [{i: Info, v: Name}], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_SHRegexOp" kind="sem">

```mc
sem getInfo_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHRegexOp =
  | TokenSHRegexOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHRegexOp" kind="sem">

```mc
sem getTerms_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_SHRegexOp =
  | TokenSHRegexOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHRegexOp" kind="sem">

```mc
sem unsplit_SHRegexOp : PermanentNode SHRegexOpBase_SHRegexOp -> (Info, SelfhostBaseAst_SHRegex)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_SHRegexOp =
  | AtomP {self = TokenSHRegexOp x} ->
    (x.__br_info, TokenSHRegex
      { info = x.__br_info,
        name =
          match
            x.name
          with
            [ x1 ] ++ _
          in
          x1,
        arg =
          match
            x.arg
          with
            [ x2 ] ++ _
          then
            Some
              x2
          else
            None
              {} })
```
</ToggleWrapper>
</DocBlock>

