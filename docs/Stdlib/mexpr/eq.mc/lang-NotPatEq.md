import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# NotPatEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : EqEnv -> EqEnv -> BiNameMap -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
  | PatNot {subpat = p2} ->
    match lhs with PatNot {subpat = p1} then
      eqPat env free patEnv p1 p2
    else None ()
```
</ToggleWrapper>
</DocBlock>

