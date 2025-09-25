import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SHExprOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHExprOp" kind="syn">

```mc
syn SHExprOp
```



<ToggleWrapper text="Code..">
```mc
syn SHExprOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_SHExprOp" kind="sem">

```mc
sem topAllowed_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_SHExprOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_SHExprOp" kind="sem">

```mc
sem leftAllowed_SHExprOp : all lstyle. all style. all rstyle. {child: SHExprOpBase_SHExprOp lstyle rstyle, parent: SHExprOpBase_SHExprOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_SHExprOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_SHExprOp" kind="sem">

```mc
sem rightAllowed_SHExprOp : all style. all lstyle. all rstyle. {child: SHExprOpBase_SHExprOp lstyle rstyle, parent: SHExprOpBase_SHExprOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_SHExprOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHExprOp" kind="sem">

```mc
sem groupingsAllowed_SHExprOp : all lstyle. all rstyle. (SHExprOpBase_SHExprOp lstyle ROpen, SHExprOpBase_SHExprOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHExprOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_SHExprOp" kind="sem">

```mc
sem parenAllowed_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_SHExprOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_SHExprOp" kind="sem">

```mc
sem getInfo_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_SHExprOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHExprOp" kind="sem">

```mc
sem getTerms_SHExprOp : all lstyle. all rstyle. SHExprOpBase_SHExprOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_SHExprOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHExprOp" kind="sem">

```mc
sem unsplit_SHExprOp : PermanentNode SHExprOpBase_SHExprOp -> (Info, SelfhostBaseAst_SHExpr)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_SHExprOp =
```
</ToggleWrapper>
</DocBlock>

