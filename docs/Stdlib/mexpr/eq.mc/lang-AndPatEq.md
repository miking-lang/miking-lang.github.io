import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# AndPatEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : EqEnv -> EqEnv -> BiNameMap -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
  | PatAnd {lpat = l2, rpat = r2} ->
    match lhs with PatAnd {lpat = l1, rpat = r1} then
      match eqPat env free patEnv l1 l2 with Some envs then
        let envs : (EqEnv, BiNameMap) = envs in
        match envs with (free, patEnv) then
          eqPat env free patEnv r1 r2
        else never
      else None ()
    else None ()
```
</ToggleWrapper>
</DocBlock>

