import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataKindSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizeKind" kind="sem">

```mc
sem symbolizeKind : Info -> SymEnv -> Ast_Kind -> Ast_Kind
```



<ToggleWrapper text="Code..">
```mc
sem symbolizeKind info env =
  | Data t ->
    let symbolizeCons = lam cons.
      setFold
        (lam ks. lam k.
          let str = nameGetStr k in
          if isLowerAlpha (head str) then
            setInsert k ks
          else
            setInsert
            (getSymbol {kind = "constructor",
                        info = [info],
                        allowFree = env.allowFree}
               env.currentEnv.conEnv k) ks)
        (setEmpty nameCmp)
        cons
    in
    let types =
      foldl
        (lam m. lam b.
          match b with (t, r) in
          let t = getSymbol {kind = "type constructor",
                             info = [info],
                             allowFree = env.allowFree}
                    env.currentEnv.tyConEnv t
          in
          mapInsert t {r with lower = symbolizeCons r.lower,
                              upper = optionMap symbolizeCons r.upper} m)
        (mapEmpty nameCmp)
        (mapBindings t.types)
    in
    Data {t with types = types}
```
</ToggleWrapper>
</DocBlock>

