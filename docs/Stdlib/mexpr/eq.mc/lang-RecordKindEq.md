import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordKindEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqKind" kind="sem">

```mc
sem eqKind : EqTypeEnv -> EqTypeFreeEnv -> _a -> Option EqTypeFreeEnv
```



<ToggleWrapper text="Code..">
```mc
sem eqKind (typeEnv : EqTypeEnv) (free : EqTypeFreeEnv) =
  | (Record l, Record r) ->
      if eqi (mapSize l.fields) (mapSize r.fields) then
        mapFoldlOption
          (lam free. lam k1. lam v1.
            match mapLookup k1 r.fields with Some v2 then
              eqTypeH typeEnv free v1 v2
            else None ())
          free l.fields
      else None ()
```
</ToggleWrapper>
</DocBlock>

