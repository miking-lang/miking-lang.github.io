import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# UnifyRecords  
  

Helper language providing functions to unify fields of record\-like types

  
  
  
## Semantics  
  

          <DocBlock title="unifyRecordsSubset" kind="sem">

```mc
sem unifyRecordsSubset : all u. Unify_Unifier u -> Unify_UnifyEnv -> Map SID Ast_Type -> Map SID Ast_Type -> u
```

<Description>{`Check that 'm1' is a subset of 'm2'No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyRecordsSubset u env m1 =
  | m2 ->
    let f = lam acc. lam b.
      let unifier =
        match b with (k, tyfield1) in
        match mapLookup k m2 with Some tyfield2 then
          unifyTypes u env (tyfield1, tyfield2)
        else
          u.err (Records (m1, m2))
      in
      u.combine acc unifier
    in
    foldl f u.empty (mapBindings m1)
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyRecordsStrict" kind="sem">

```mc
sem unifyRecordsStrict : all u. Unify_Unifier u -> Unify_UnifyEnv -> Map SID Ast_Type -> Map SID Ast_Type -> u
```

<Description>{`Check that 'm1' and 'm2' contain the same fieldsNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyRecordsStrict u env m1 =
  | m2 ->
    if eqi (mapSize m1) (mapSize m2) then
      unifyRecordsSubset u env m1 m2
    else
      u.err (Records (m1, m2))
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="unifyRecordsUnion" kind="sem">

```mc
sem unifyRecordsUnion : all u. Unify_Unifier u -> Unify_UnifyEnv -> Map SID Ast_Type -> Map SID Ast_Type -> (u, Map SID Ast_Type)
```

<Description>{`Check that the intersection of 'm1' and 'm2' unifies, then return their unionNo documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem unifyRecordsUnion u env m1 =
  | m2 ->
    let f = lam acc. lam b.
      match b with (k, tyfield1) in
      match mapLookup k acc.1 with Some tyfield2 then
        (u.combine acc.0 (unifyTypes u env (tyfield1, tyfield2)), acc.1)
      else
        (acc.0, mapInsert k tyfield1 acc.1)
    in
    foldl f (u.empty, m2) (mapBindings m1)
```
</ToggleWrapper>
</DocBlock>

