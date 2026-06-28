import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# MergedFileOpBase  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="MergedFileOp" kind="syn">

```mc
syn MergedFileOp
```



<ToggleWrapper text="Code..">
```mc
syn MergedFileOp lstyle rstyle =
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="topAllowed_MergedFileOp" kind="sem">

```mc
sem topAllowed_MergedFileOp : all lstyle. all rstyle. MergedFileOpBase_MergedFileOp lstyle rstyle -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem topAllowed_MergedFileOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="leftAllowed_MergedFileOp" kind="sem">

```mc
sem leftAllowed_MergedFileOp : all lstyle. all style. all rstyle. {child: MergedFileOpBase_MergedFileOp lstyle rstyle, parent: MergedFileOpBase_MergedFileOp LOpen style} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem leftAllowed_MergedFileOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="rightAllowed_MergedFileOp" kind="sem">

```mc
sem rightAllowed_MergedFileOp : all style. all lstyle. all rstyle. {child: MergedFileOpBase_MergedFileOp lstyle rstyle, parent: MergedFileOpBase_MergedFileOp style ROpen} -> Bool
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem rightAllowed_MergedFileOp =
  | _ ->
    true
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_MergedFileOp" kind="sem">

```mc
sem groupingsAllowed_MergedFileOp : all lstyle. all rstyle. (MergedFileOpBase_MergedFileOp lstyle ROpen, MergedFileOpBase_MergedFileOp LOpen rstyle) -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_MergedFileOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="parenAllowed_MergedFileOp" kind="sem">

```mc
sem parenAllowed_MergedFileOp : all lstyle. all rstyle. MergedFileOpBase_MergedFileOp lstyle rstyle -> AllowedDirection
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem parenAllowed_MergedFileOp =
  | _ ->
    GEither
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getInfo_MergedFileOp" kind="sem">

```mc
sem getInfo_MergedFileOp : all lstyle. all rstyle. MergedFileOpBase_MergedFileOp lstyle rstyle -> Info
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getInfo_MergedFileOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="getTerms_MergedFileOp" kind="sem">

```mc
sem getTerms_MergedFileOp : all lstyle. all rstyle. MergedFileOpBase_MergedFileOp lstyle rstyle -> [Info]
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem getTerms_MergedFileOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unsplit_MergedFileOp" kind="sem">

```mc
sem unsplit_MergedFileOp : PermanentNode MergedFileOpBase_MergedFileOp -> (Info, MergedBaseAst_MergedFile)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unsplit_MergedFileOp =
```
</ToggleWrapper>
</DocBlock>

