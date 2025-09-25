import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SHRegexOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHRegexOp" kind="syn">

```mc
syn SHRegexOp
```



<ToggleWrapper text="Code..">
```mc
syn SHRegexOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_SHRegexOp" kind="sem">

```mc
sem topAllowed_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_SHRegexOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_SHRegexOp" kind="sem">

```mc
sem leftAllowed_SHRegexOp : all lstyle. all style. all rstyle. {child: SHRegexOpBase_SHRegexOp lstyle rstyle, parent: SHRegexOpBase_SHRegexOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_SHRegexOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_SHRegexOp" kind="sem">

```mc
sem rightAllowed_SHRegexOp : all style. all lstyle. all rstyle. {child: SHRegexOpBase_SHRegexOp lstyle rstyle, parent: SHRegexOpBase_SHRegexOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_SHRegexOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHRegexOp" kind="sem">

```mc
sem groupingsAllowed_SHRegexOp : all lstyle. all rstyle. (SHRegexOpBase_SHRegexOp lstyle ROpen, SHRegexOpBase_SHRegexOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHRegexOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_SHRegexOp" kind="sem">

```mc
sem parenAllowed_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_SHRegexOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_SHRegexOp" kind="sem">

```mc
sem getInfo_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_SHRegexOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHRegexOp" kind="sem">

```mc
sem getTerms_SHRegexOp : all lstyle. all rstyle. SHRegexOpBase_SHRegexOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_SHRegexOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHRegexOp" kind="sem">

```mc
sem unsplit_SHRegexOp : PermanentNode SHRegexOpBase_SHRegexOp -> (Info, SelfhostBaseAst_SHRegex)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_SHRegexOp =
```
</ToggleWrapper>
</DocBlock>

