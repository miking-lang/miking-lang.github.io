import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AppSHExprOp  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHExprOp" kind="syn">

```mc
syn SHExprOp
```



<ToggleWrapper text="Code..">
```mc
syn SHExprOp lstyle rstyle =
  | AppSHExprOp {__br_info: Info, __br_terms: [Info]}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="groupingsAllowed_SHExprOp" kind="sem">

```mc
sem groupingsAllowed_SHExprOp : all lstyle. all rstyle. (SHExprOpBase_SHExprOp lstyle ROpen, SHExprOpBase_SHExprOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHExprOp =
  | (AppSHExprOp _, AppSHExprOp _) ->
    GLeft
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_SHExprOp" kind="sem">

```mc
sem getInfo_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> Info
```



<ToggleWrapper text="Code..">
```mc
sem getInfo_SHExprOp =
  | AppSHExprOp x ->
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
  | AppSHExprOp x ->
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
  | InfixP {self = AppSHExprOp x, leftChildAlts = [ l ] ++ _, rightChildAlts = [ r ] ++ _} ->
    match
      (unsplit_SHExprOp l, unsplit_SHExprOp r)
    with
      ((linfo, l), (rinfo, r))
    in
    let info = foldl mergeInfo linfo [ x.__br_info,
            rinfo ]
      in
      (info, AppSHExpr
        { info = info,
          left =
            match
              [ l ]
            with
              [ x1 ] ++ _
            in
            x1,
          right =
            match
              [ r ]
            with
              [ x2 ] ++ _
            in
            x2 })
```
</ToggleWrapper>
</DocBlock>

