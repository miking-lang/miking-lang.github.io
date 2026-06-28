import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SHDeclOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHDeclOp" kind="syn">

```mc
syn SHDeclOp
```



<ToggleWrapper text="Code..">
```mc
syn SHDeclOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_SHDeclOp" kind="sem">

```mc
sem topAllowed_SHDeclOp : all lstyle. all rstyle. SHDeclOpBase_SHDeclOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_SHDeclOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_SHDeclOp" kind="sem">

```mc
sem leftAllowed_SHDeclOp : all lstyle. all style. all rstyle. {child: SHDeclOpBase_SHDeclOp lstyle rstyle, parent: SHDeclOpBase_SHDeclOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_SHDeclOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_SHDeclOp" kind="sem">

```mc
sem rightAllowed_SHDeclOp : all style. all lstyle. all rstyle. {child: SHDeclOpBase_SHDeclOp lstyle rstyle, parent: SHDeclOpBase_SHDeclOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_SHDeclOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHDeclOp" kind="sem">

```mc
sem groupingsAllowed_SHDeclOp : all lstyle. all rstyle. (SHDeclOpBase_SHDeclOp lstyle ROpen, SHDeclOpBase_SHDeclOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHDeclOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_SHDeclOp" kind="sem">

```mc
sem parenAllowed_SHDeclOp : all lstyle. all rstyle. SHDeclOpBase_SHDeclOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_SHDeclOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_SHDeclOp" kind="sem">

```mc
sem getInfo_SHDeclOp : all lstyle. all rstyle. SHDeclOpBase_SHDeclOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_SHDeclOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHDeclOp" kind="sem">

```mc
sem getTerms_SHDeclOp : all lstyle. all rstyle. SHDeclOpBase_SHDeclOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_SHDeclOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHDeclOp" kind="sem">

```mc
sem unsplit_SHDeclOp : PermanentNode SHDeclOpBase_SHDeclOp -> (Info, SelfhostBaseAst_SHDecl)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_SHDeclOp =
```
</ToggleWrapper>
</DocBlock>

