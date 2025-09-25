import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NamedPatSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizePat" kind="sem">

```mc
sem symbolizePat : all ext. SymEnv -> Map String Name -> Ast_Pat -> (Map String Name, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizePat env patEnv =
  | PatNamed p ->
    match _symbolizePatName patEnv p.ident with (patEnv, patname) in
    (patEnv, PatNamed {p with ident = patname})
```
</ToggleWrapper>
</DocBlock>

