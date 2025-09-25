import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordKindAst  
  

  
  
  
## Syntaxes  
  

          <DocBlock title="Kind" kind="syn">

```mc
syn Kind
```



<ToggleWrapper text="Code..">
```mc
syn Kind =
  | Record {fields : Map SID Type}
```
</ToggleWrapper>
</DocBlock>

## Semantics  
  

          <DocBlock title="smapAccumL_Kind_Type" kind="sem">

```mc
sem smapAccumL_Kind_Type : all acc. (acc -> Ast_Type -> (acc, Ast_Type)) -> acc -> Ast_Kind -> (acc, Ast_Kind)
```



<ToggleWrapper text="Code..">
```mc
sem smapAccumL_Kind_Type f acc =
  | Record r ->
    match mapMapAccum (lam acc. lam. lam e. f acc e) acc r.fields with (acc, flds) in
    (acc, Record {r with fields = flds})
```
</ToggleWrapper>
</DocBlock>

