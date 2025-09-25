import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordKindUnify  
  

  
  
  
## Semantics  
  

          <DocBlock title="unifyKinds" kind="sem">

```mc
sem unifyKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> u
```



<ToggleWrapper text="Code..">
```mc
sem unifyKinds u env =
  | (Record r1, Record r2) ->
    unifyRecordsSubset u env r2.fields r1.fields
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="addKinds" kind="sem">

```mc
sem addKinds : all u. Unify_Unifier u -> Unify_UnifyEnv -> (Ast_Kind, Ast_Kind) -> (u, Ast_Kind)
```



<ToggleWrapper text="Code..">
```mc
sem addKinds u env =
  | (Record r1, Record r2) ->
    match unifyRecordsUnion u env r1.fields r2.fields with (unifier, fields) in
    (unifier, Record {r1 with fields = fields})
```
</ToggleWrapper>
</DocBlock>

