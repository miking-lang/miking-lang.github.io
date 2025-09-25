import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordSHExprOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHExprOp" kind="syn">

```mc
syn SHExprOp
```



<ToggleWrapper text="Code..">
```mc
syn SHExprOp lstyle rstyle =
  | RecordSHExprOp {fields: [{val: SHExpr, name: {i: Info, v: String}}], __br_info: Info, __br_terms: [Info]}
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
  | RecordSHExprOp x ->
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
  | RecordSHExprOp x ->
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
  | AtomP {self = RecordSHExprOp x} ->
    (x.__br_info, RecordSHExpr
      { info = x.__br_info, fields = x.fields })
```
</ToggleWrapper>
</DocBlock>

