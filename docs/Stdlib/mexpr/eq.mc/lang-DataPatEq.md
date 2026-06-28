import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# DataPatEq  
  

  
  
  
## Semantics  
  

          <DocBlock title="eqPat" kind="sem">

```mc
sem eqPat : EqEnv -> EqEnv -> BiNameMap -> Ast_Pat -> Ast_Pat -> Option (EqEnv, BiNameMap)
```



<ToggleWrapper text="Code..">
```mc
sem eqPat (env : EqEnv) (free : EqEnv) (patEnv : BiNameMap) (lhs : Pat) =
  | PatCon {ident = i2, subpat = s2} ->
    match lhs with PatCon {ident = i1, subpat = s1} then
      match (env,free) with ({conEnv = conEnv},{conEnv = freeConEnv}) then
        match _eqCheck i1 i2 conEnv freeConEnv with Some freeConEnv then
          eqPat env {free with conEnv = freeConEnv} patEnv s1 s2
        else None ()
      else never
    else None ()
```
</ToggleWrapper>
</DocBlock>

