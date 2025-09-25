import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# ParseMerged  
  

  
  
  
## Semantics  
  

          <DocBlock title="groupingsAllowed_MergedFileOp" kind="sem">

```mc
sem groupingsAllowed_MergedFileOp : all lstyle. all rstyle. (MergedFileOpBase_MergedFileOp lstyle ROpen, MergedFileOpBase_MergedFileOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_MergedFileOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_MergedTopOp" kind="sem">

```mc
sem groupingsAllowed_MergedTopOp : all lstyle. all rstyle. (MergedTopOpBase_MergedTopOp lstyle ROpen, MergedTopOpBase_MergedTopOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_MergedTopOp =
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_MergedOp" kind="sem">

```mc
sem groupingsAllowed_MergedOp : all lstyle. all rstyle. (MergedOpBase_MergedOp lstyle ROpen, MergedOpBase_MergedOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_MergedOp =
  | (AppMergedOp _, ProjMergedOp _) ->
    GRight
      {}
  | (SemiMergedOp _, ProjMergedOp _) ->
    GRight
      {}
  | (BindMergedOp _, ProjMergedOp _) ->
    GRight
      {}
  | (LamMergedOp _, ProjMergedOp _) ->
    GRight
      {}
  | (MatchMergedOp _, ProjMergedOp _) ->
    GRight
      {}
  | (IfMergedOp _, ProjMergedOp _) ->
    GRight
      {}
  | (AppMergedOp _, SemiMergedOp _) ->
    GLeft
      {}
  | (SemiMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (AppMergedOp _, RecordAddMergedOp _) ->
    GLeft
      {}
  | (AppMergedOp _, RecordSubMergedOp _) ->
    GLeft
      {}
  | (AppMergedOp _, RecordChangeMergedOp _) ->
    GLeft
      {}
  | (BindMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (LamMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (MatchMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (IfMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (AppMergedOp _, ArrowMergedOp _) ->
    GLeft
      {}
  | (ArrowMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (AllMergedOp _, AppMergedOp _) ->
    GRight
      {}
  | (SemiMergedOp _, RecordAddMergedOp _) ->
    GLeft
      {}
  | (SemiMergedOp _, RecordSubMergedOp _) ->
    GLeft
      {}
  | (SemiMergedOp _, RecordChangeMergedOp _) ->
    GLeft
      {}
  | (BindMergedOp _, SemiMergedOp _) ->
    GRight
      {}
  | (LamMergedOp _, SemiMergedOp _) ->
    GRight
      {}
  | (MatchMergedOp _, SemiMergedOp _) ->
    GRight
      {}
  | (IfMergedOp _, SemiMergedOp _) ->
    GRight
      {}
  | (BindMergedOp _, RecordAddMergedOp _) ->
    GRight
      {}
  | (LamMergedOp _, RecordAddMergedOp _) ->
    GRight
      {}
  | (MatchMergedOp _, RecordAddMergedOp _) ->
    GRight
      {}
  | (IfMergedOp _, RecordAddMergedOp _) ->
    GRight
      {}
  | (ArrowMergedOp _, RecordAddMergedOp _) ->
    GRight
      {}
  | (AllMergedOp _, RecordAddMergedOp _) ->
    GRight
      {}
  | (BindMergedOp _, RecordSubMergedOp _) ->
    GRight
      {}
  | (LamMergedOp _, RecordSubMergedOp _) ->
    GRight
      {}
  | (MatchMergedOp _, RecordSubMergedOp _) ->
    GRight
      {}
  | (IfMergedOp _, RecordSubMergedOp _) ->
    GRight
      {}
  | (BindMergedOp _, RecordChangeMergedOp _) ->
    GRight
      {}
  | (LamMergedOp _, RecordChangeMergedOp _) ->
    GRight
      {}
  | (MatchMergedOp _, RecordChangeMergedOp _) ->
    GRight
      {}
  | (IfMergedOp _, RecordChangeMergedOp _) ->
    GRight
      {}
  | (NotMergedOp _, OrMergedOp _) ->
    GLeft
      {}
  | (NotMergedOp _, AndMergedOp _) ->
    GLeft
      {}
  | (AllMergedOp _, ArrowMergedOp _) ->
    GRight
      {}
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="groupingsAllowed_BinderOp" kind="sem">

```mc
sem groupingsAllowed_BinderOp : all lstyle. all rstyle. (BinderOpBase_BinderOp lstyle ROpen, BinderOpBase_BinderOp LOpen rstyle) -> AllowedDirection
```



<ToggleWrapper text="Code..">
```mc
sem groupingsAllowed_BinderOp =
```
</ToggleWrapper>
</DocBlock>

