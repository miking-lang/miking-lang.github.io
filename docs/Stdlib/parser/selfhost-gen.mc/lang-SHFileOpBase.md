import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SHFileOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="SHFileOp" kind="syn">

```mc
syn SHFileOp
```



<ToggleWrapper text="Code..">
```mc
syn SHFileOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_SHFileOp" kind="sem">

```mc
sem topAllowed_SHFileOp : all lstyle. all rstyle. SHFileOpBase_SHFileOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_SHFileOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_SHFileOp" kind="sem">

```mc
sem leftAllowed_SHFileOp : all lstyle. all style. all rstyle. {child: SHFileOpBase_SHFileOp lstyle rstyle, parent: SHFileOpBase_SHFileOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_SHFileOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_SHFileOp" kind="sem">

```mc
sem rightAllowed_SHFileOp : all style. all lstyle. all rstyle. {child: SHFileOpBase_SHFileOp lstyle rstyle, parent: SHFileOpBase_SHFileOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_SHFileOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHFileOp" kind="sem">

```mc
sem groupingsAllowed_SHFileOp : all lstyle. all rstyle. (SHFileOpBase_SHFileOp lstyle ROpen, SHFileOpBase_SHFileOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHFileOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_SHFileOp" kind="sem">

```mc
sem parenAllowed_SHFileOp : all lstyle. all rstyle. SHFileOpBase_SHFileOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_SHFileOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_SHFileOp" kind="sem">

```mc
sem getInfo_SHFileOp : all lstyle. all rstyle. SHFileOpBase_SHFileOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_SHFileOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_SHFileOp" kind="sem">

```mc
sem getTerms_SHFileOp : all lstyle. all rstyle. SHFileOpBase_SHFileOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_SHFileOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_SHFileOp" kind="sem">

```mc
sem unsplit_SHFileOp : PermanentNode SHFileOpBase_SHFileOp -> (Info, SelfhostBaseAst_SHFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_SHFileOp =
```
</ToggleWrapper>
</DocBlock>

