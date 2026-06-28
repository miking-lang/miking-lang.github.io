import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# FutharkPatPrettyPrint  
  

  
  
  
## Semantics  
  

          <DocBlock title="pprintPatName" kind="sem">

```mc
sem pprintPatName : PprintEnv -> PatName -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintPatName env =
  | PName name -> futPprintEnvGetStr env name
  | PWildcard _ -> (env, "_")
```
</ToggleWrapper>
</DocBlock>


          <DocBlock title="pprintPat" kind="sem">

```mc
sem pprintPat : Int -> PprintEnv -> FutharkPatAst_FutPat -> (PprintEnv, String)
```

<Description>{`No documentation available here.No documentation available here.`}</Description>


<ToggleWrapper text="Code..">
```mc
sem pprintPat indent env =
  | FPNamed t -> pprintPatName env t.ident
  | FPInt t -> (env, int2string t.val)
  | FPBool t -> (env, if t.val then "true" else "false")
  | FPRecord t ->
    if mapIsEmpty t.bindings then (env, "{}")
    else
      match
        mapMapAccum
          (lam env. lam k. lam v.
             match pprintPat indent env v with (env, str) in
             match futPprintLabelString env k with (env, k) in
             (env, join [k, " = ", str]))
           env t.bindings
      with (env,bindMap) in
      (env,join ["{", strJoin ", " (mapValues bindMap), "}"])
```
</ToggleWrapper>
</DocBlock>

