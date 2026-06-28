import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# RecordPatEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : EqEnv -> EqEnv -> BiNameMap -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
  | PatRecord {bindings = bs2} ->
    match lhs with PatRecord {bindings = bs1} then
      if eqi (mapLength bs1) (mapLength bs2) then
        mapFoldlOption
          (lam tEnv. lam k1. lam p1.
             match tEnv with (free,patEnv) then
               match mapLookup k1 bs2 with Some p2 then
                 eqPat env free patEnv p1 p2
               else None ()
             else never)
          (free,patEnv) bs1
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

