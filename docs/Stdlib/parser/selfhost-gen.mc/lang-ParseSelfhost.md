import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParseSelfhost  
  

  
  
  
## Semantics  
  

          <DocBlock title="groupingsAllowed_SHFileOp" kind="sem">

```mc
sem groupingsAllowed_SHFileOp : all lstyle. all rstyle. (SHFileOpBase_SHFileOp lstyle ROpen, SHFileOpBase_SHFileOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHFileOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHDeclOp" kind="sem">

```mc
sem groupingsAllowed_SHDeclOp : all lstyle. all rstyle. (SHDeclOpBase_SHDeclOp lstyle ROpen, SHDeclOpBase_SHDeclOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHDeclOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHRegexOp" kind="sem">

```mc
sem groupingsAllowed_SHRegexOp : all lstyle. all rstyle. (SHRegexOpBase_SHRegexOp lstyle ROpen, SHRegexOpBase_SHRegexOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHRegexOp =
  | (NamedSHRegexOp _, RepeatPlusSHRegexOp _) ->
    GLeft
      {}
  | (AlternativeSHRegexOp _, RepeatPlusSHRegexOp _) ->
    GRight
      {}
  | (ConcatSHRegexOp _, RepeatPlusSHRegexOp _) ->
    GRight
      {}
  | (NamedSHRegexOp _, RepeatStarSHRegexOp _) ->
    GLeft
      {}
  | (AlternativeSHRegexOp _, RepeatStarSHRegexOp _) ->
    GRight
      {}
  | (ConcatSHRegexOp _, RepeatStarSHRegexOp _) ->
    GRight
      {}
  | (NamedSHRegexOp _, RepeatQuestionSHRegexOp _) ->
    GLeft
      {}
  | (AlternativeSHRegexOp _, RepeatQuestionSHRegexOp _) ->
    GRight
      {}
  | (ConcatSHRegexOp _, RepeatQuestionSHRegexOp _) ->
    GRight
      {}
  | (NamedSHRegexOp _, AlternativeSHRegexOp _) ->
    GLeft
      {}
  | (NamedSHRegexOp _, ConcatSHRegexOp _) ->
    GLeft
      {}
  | (AlternativeSHRegexOp _, ConcatSHRegexOp _) ->
    GRight
      {}
  | (ConcatSHRegexOp _, AlternativeSHRegexOp _) ->
    GLeft
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_SHExprOp" kind="sem">

```mc
sem groupingsAllowed_SHExprOp : all lstyle. all rstyle. (SHExprOpBase_SHExprOp lstyle ROpen, SHExprOpBase_SHExprOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_SHExprOp =
```
</ToggleWrapper>
</DocBlock>

