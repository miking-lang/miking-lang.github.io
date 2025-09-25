import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# SeqEdgePatSym  
  

  
  
  
## Semantics  
  

          <DocBlock title="symbolizePat" kind="sem">

```mc
sem symbolizePat : all ext. SymEnv -> Map String Name -> Ast_Pat -> (Map String Name, Ast_Pat)
```



<ToggleWrapper text="Code..">
```mc
sem symbolizePat env patEnv =
  | PatSeqEdge p ->
    match mapAccumL (symbolizePat env) patEnv p.prefix with (patEnv, prefix) in
    match _symbolizePatName patEnv p.middle with (patEnv, middle) in
    match mapAccumL (symbolizePat env) patEnv p.postfix with (patEnv, postfix) in
    (patEnv, PatSeqEdge {p with prefix = prefix,
                                middle = middle,
                                postfix = postfix})
```
</ToggleWrapper>
</DocBlock>

