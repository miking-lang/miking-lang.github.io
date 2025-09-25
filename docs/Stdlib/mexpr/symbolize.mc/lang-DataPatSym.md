import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizePat" kind="sem">

```mc
sem symbolizePat : all ext. SymEnv -> Map String Name -> Ast_Pat -> (Map String Name, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizePat env patEnv =
  | PatCon r ->
    let ident =
      getSymbol {kind = "constructor",
                 info = [r.info],
                 allowFree = env.allowFree}
        env.currentEnv.conEnv r.ident
    in
    match symbolizePat env patEnv r.subpat with (patEnv, subpat) in
    (patEnv, PatCon {r with ident = ident,
                            subpat = subpat})
```
</ToggleWrapper>
</DocBlock>

