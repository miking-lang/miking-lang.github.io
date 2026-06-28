import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NotPatSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizePat" kind="sem">

```mc
sem symbolizePat : all ext. SymEnv -> Map String Name -> Ast_Pat -> (Map String Name, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizePat env patEnv =
  | PatNot p ->
    -- NOTE(vipa, 2020-09-23): new names in a not-pattern do not
    -- matter since they will never bind (it should probably be an
    -- error to bind a name inside a not-pattern, but we're not doing
    -- that kind of static checks yet.  Note that we still need to run
    -- symbolizePat though, constructors must refer to the right symbol.
    match symbolizePat env patEnv p.subpat with (_, subpat) in
    (patEnv, PatNot {p with subpat = subpat})
```
</ToggleWrapper>
</DocBlock>

