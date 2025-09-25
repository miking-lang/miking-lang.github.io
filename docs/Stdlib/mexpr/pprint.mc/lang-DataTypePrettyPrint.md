import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataTypePrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="getTypeStringCode" kind="sem">

```mc
sem getTypeStringCode : Int -> PprintEnv -> Ast_Type -> (PprintEnv, String)
```



<ToggleWrapper text="Code..">
```mc
sem getTypeStringCode (indent : Int) (env: PprintEnv) =
  | TyData t ->
    match
      mapFoldWithKey
        (lam acc. lam. lam ks.
          if setIsEmpty ks then acc
          else
            match mapAccumL pprintConName acc.0 (setToSeq ks)
            with (env, kstr) in
            (env, snoc acc.1 (strJoin " " kstr)))
        (env, [])
        (computeData t)
    with (env, consstr) in
    (env, join ["{", strJoin " " consstr, "}"])
```
</ToggleWrapper>
</DocBlock>

