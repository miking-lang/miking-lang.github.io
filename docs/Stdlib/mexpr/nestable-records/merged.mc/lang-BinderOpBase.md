import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# BinderOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="BinderOp" kind="syn">

```mc
syn BinderOp
```



<ToggleWrapper text="Code..">
```mc
syn BinderOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_BinderOp" kind="sem">

```mc
sem topAllowed_BinderOp : all lstyle. all rstyle. BinderOpBase_BinderOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_BinderOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_BinderOp" kind="sem">

```mc
sem leftAllowed_BinderOp : all lstyle. all style. all rstyle. {child: BinderOpBase_BinderOp lstyle rstyle, parent: BinderOpBase_BinderOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_BinderOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_BinderOp" kind="sem">

```mc
sem rightAllowed_BinderOp : all style. all lstyle. all rstyle. {child: BinderOpBase_BinderOp lstyle rstyle, parent: BinderOpBase_BinderOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_BinderOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_BinderOp" kind="sem">

```mc
sem groupingsAllowed_BinderOp : all lstyle. all rstyle. (BinderOpBase_BinderOp lstyle ROpen, BinderOpBase_BinderOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_BinderOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_BinderOp" kind="sem">

```mc
sem parenAllowed_BinderOp : all lstyle. all rstyle. BinderOpBase_BinderOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_BinderOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_BinderOp" kind="sem">

```mc
sem getInfo_BinderOp : all lstyle. all rstyle. BinderOpBase_BinderOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_BinderOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_BinderOp" kind="sem">

```mc
sem getTerms_BinderOp : all lstyle. all rstyle. BinderOpBase_BinderOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_BinderOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_BinderOp" kind="sem">

```mc
sem unsplit_BinderOp : PermanentNode BinderOpBase_BinderOp -> (Info, MergedBaseAst_Binder)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_BinderOp =
```
</ToggleWrapper>
</DocBlock>

