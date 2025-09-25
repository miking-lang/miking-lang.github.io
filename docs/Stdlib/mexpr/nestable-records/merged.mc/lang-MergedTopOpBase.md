import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MergedTopOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedTopOp" kind="syn">

```mc
syn MergedTopOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedTopOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_MergedTopOp" kind="sem">

```mc
sem topAllowed_MergedTopOp : all lstyle. all rstyle. MergedTopOpBase_MergedTopOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_MergedTopOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_MergedTopOp" kind="sem">

```mc
sem leftAllowed_MergedTopOp : all lstyle. all style. all rstyle. {child: MergedTopOpBase_MergedTopOp lstyle rstyle, parent: MergedTopOpBase_MergedTopOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_MergedTopOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_MergedTopOp" kind="sem">

```mc
sem rightAllowed_MergedTopOp : all style. all lstyle. all rstyle. {child: MergedTopOpBase_MergedTopOp lstyle rstyle, parent: MergedTopOpBase_MergedTopOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_MergedTopOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_MergedTopOp" kind="sem">

```mc
sem groupingsAllowed_MergedTopOp : all lstyle. all rstyle. (MergedTopOpBase_MergedTopOp lstyle ROpen, MergedTopOpBase_MergedTopOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_MergedTopOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_MergedTopOp" kind="sem">

```mc
sem parenAllowed_MergedTopOp : all lstyle. all rstyle. MergedTopOpBase_MergedTopOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_MergedTopOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_MergedTopOp" kind="sem">

```mc
sem getInfo_MergedTopOp : all lstyle. all rstyle. MergedTopOpBase_MergedTopOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_MergedTopOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_MergedTopOp" kind="sem">

```mc
sem getTerms_MergedTopOp : all lstyle. all rstyle. MergedTopOpBase_MergedTopOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_MergedTopOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_MergedTopOp" kind="sem">

```mc
sem unsplit_MergedTopOp : PermanentNode MergedTopOpBase_MergedTopOp -> (Info, MergedBaseAst_MergedTop)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_MergedTopOp =
```
</ToggleWrapper>
</DocBlock>

