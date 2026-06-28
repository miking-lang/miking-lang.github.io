import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ConSHExprOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHExprOp" kind="syn">

```mc
syn SHExprOp
```



<ToggleWrapper text="Code..">
```mc
syn SHExprOp lstyle rstyle =
  | ConSHExprOp {name: [{i: Info, v: Name}], __br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="getInfo_SHExprOp" kind="sem">

```mc
sem getInfo_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHExprOp =
  | ConSHExprOp x ->
    x.__br_info
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHExprOp" kind="sem">

```mc
sem getTerms_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> [Info]
```



<ToggleWrapper text="Code..">
```mc
sem getTerms_SHExprOp =
  | ConSHExprOp x ->
    x.__br_terms
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHExprOp" kind="sem">

```mc
sem unsplit_SHExprOp : PermanentNode SHExprOpBase_SHExprOp -> (Info, SelfhostBaseAst_SHExpr)
```



<ToggleWrapper text="Code..">
```mc
sem unsplit_SHExprOp =
  | AtomP {self = ConSHExprOp x} ->
    (x.__br_info, ConSHExpr
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

