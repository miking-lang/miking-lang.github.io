import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordTypeUtils  
  

  
  
  
## Semantics  
  

          <DocBlock title="tyRecordOrderedLabels" kind="sem">

```mc
sem tyRecordOrderedLabels : Ast_Type -> [SID]
```



<ToggleWrapper text="Code..">
```mc
sem tyRecordOrderedLabels =
  | TyRecord {fields = fields} ->
    recordOrderedLabels (mapKeys fields)
  | ty ->
    errorSingle [infoTy ty] "Not a TyRecord, cannot extract labels."
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="tyRecordOrderedFields" kind="sem">

```mc
sem tyRecordOrderedFields : Ast_Type -> [(SID, Ast_Type)]
```



<ToggleWrapper text="Code..">
```mc
sem tyRecordOrderedFields =
  | TyRecord {fields = fields} ->
    let labels = recordOrderedLabels (mapKeys fields) in
    map (lam sid. (sid, mapFindExn sid fields)) labels
  | ty ->
    errorSingle [infoTy ty] "Not a TyRecord, cannot extract fields."
```
</ToggleWrapper>
</DocBlock>

