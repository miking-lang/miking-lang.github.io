import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# record.mc  
  

record.mc  
Utilities related to records in MExpr

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/stringid.mc"} style={S.link}>stringid.mc</a>, <a href={"/docs/Stdlib/mexpr/ast.mc"} style={S.link}>mexpr/ast.mc</a>, <a href={"/docs/Stdlib/error.mc"} style={S.link}>error.mc</a>  
  
## Languages  
  

          <DocBlock title="RecordTypeUtils" kind="lang" link="/docs/Stdlib/mexpr/record.mc/lang-RecordTypeUtils">

```mc
lang RecordTypeUtils
```



<ToggleWrapper text="Code..">
```mc
lang RecordTypeUtils = RecordTypeAst
  sem tyRecordOrderedLabels =
  | TyRecord {fields = fields} ->
    recordOrderedLabels (mapKeys fields)
  | ty ->
    errorSingle [infoTy ty] "Not a TyRecord, cannot extract labels."

  sem tyRecordOrderedFields =
  | TyRecord {fields = fields} ->
    let labels = recordOrderedLabels (mapKeys fields) in
    map (lam sid. (sid, mapFindExn sid fields)) labels
  | ty ->
    errorSingle [infoTy ty] "Not a TyRecord, cannot extract fields."
end
```
</ToggleWrapper>
</DocBlock>

## Variables  
  

          <DocBlock title="recordOrderedLabels" kind="let">

```mc
let recordOrderedLabels labels : [SID] -> [SID]
```



<ToggleWrapper text="Code..">
```mc
let recordOrderedLabels = lam labels: [SID].
  let isTupleLabel = lam sid.
    let l = sidToString sid in
    if null l then false
    else if eqChar (get l 0) '0' then eqi (length l) 1
    else forAll (lam c. and (geqChar c '0') (leqChar c '9')) l
  in
  -- NOTE(johnwikman, 2022-04-27): cmpString uses shortlex ordering, so this
  -- works fine for comparing string representations of natural numbers.
  let cmpLabel = lam a. lam b. cmpString (sidToString a) (sidToString b) in
  let sortLabel = quickSort cmpLabel in
  match partition isTupleLabel labels with (tupLabels, recLabels) in
  concat (sortLabel tupLabels) (sortLabel recLabels)
```
</ToggleWrapper>
</DocBlock>

